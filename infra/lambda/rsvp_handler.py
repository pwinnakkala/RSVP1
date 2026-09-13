"""
Wedding RSVP Lambda Handler
Saves RSVP to DynamoDB, sends confirmation email via SES, backs up to S3
"""

import json
import os
import uuid
import boto3
from datetime import datetime, timezone
from decimal import Decimal

dynamodb = boto3.resource("dynamodb")
ses = boto3.client("ses", region_name=os.environ.get("AWS_REGION", "us-east-1"))
s3 = boto3.client("s3")

import hashlib
import hmac
import base64
import time

RSVP_TABLE = os.environ["RSVP_TABLE"]
GUEST_TABLE = os.environ["GUEST_TABLE"]
BACKUP_BUCKET = os.environ["BACKUP_BUCKET"]
NOTIFICATION_EMAIL = os.environ["NOTIFICATION_EMAIL"]
COUPLE_EMAIL = os.environ["COUPLE_EMAIL"]

# --- Host admin auth config ---
# ADMIN_PASSWORD_HASH: SHA-256 hex of the host password
# AUTH_SECRET: random secret used to sign session tokens (HMAC)
ADMIN_PASSWORD_HASH = os.environ.get("ADMIN_PASSWORD_HASH", "")
AUTH_SECRET = os.environ.get("AUTH_SECRET", "")
TOKEN_TTL_SECONDS = 12 * 60 * 60  # 12 hours

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    "Content-Type": "application/json",
}


def _sign(msg: str) -> str:
    """Return base64url HMAC-SHA256 signature of msg using AUTH_SECRET."""
    sig = hmac.new(AUTH_SECRET.encode(), msg.encode(), hashlib.sha256).digest()
    return base64.urlsafe_b64encode(sig).decode().rstrip("=")


def make_token() -> str:
    """Create a signed session token: base64url(expiry).signature"""
    expiry = str(int(time.time()) + TOKEN_TTL_SECONDS)
    payload = base64.urlsafe_b64encode(expiry.encode()).decode().rstrip("=")
    return f"{payload}.{_sign(payload)}"


def verify_token(token: str) -> bool:
    """Validate a session token's signature and expiry (constant-time)."""
    if not token or "." not in token or not AUTH_SECRET:
        return False
    payload, _, sig = token.partition(".")
    if not hmac.compare_digest(sig, _sign(payload)):
        return False
    try:
        pad = "=" * (-len(payload) % 4)
        expiry = int(base64.urlsafe_b64decode(payload + pad).decode())
    except Exception:
        return False
    return time.time() < expiry


def is_authorized(event: dict) -> bool:
    """Check for a valid Bearer token in the Authorization header."""
    headers = event.get("headers") or {}
    # API Gateway lowercases header names
    auth = headers.get("authorization") or headers.get("Authorization") or ""
    if auth.lower().startswith("bearer "):
        auth = auth[7:]
    return verify_token(auth.strip())


class DecimalEncoder(json.JSONEncoder):
    """Handle DynamoDB Decimal types in JSON serialization."""
    def default(self, obj):
        if isinstance(obj, Decimal):
            return int(obj) if obj % 1 == 0 else float(obj)
        return super().default(obj)


def respond(status_code: int, body: dict) -> dict:
    return {
        "statusCode": status_code,
        "headers": CORS_HEADERS,
        "body": json.dumps(body, cls=DecimalEncoder),
    }


def handler(event: dict, context) -> dict:
    method = event.get("requestContext", {}).get("http", {}).get("method", "GET")
    path = event.get("rawPath", "/")

    # CORS preflight
    if method == "OPTIONS":
        return respond(200, {"message": "ok"})

    # POST /api/login — host admin login
    if method == "POST" and path == "/api/login":
        return admin_login(event)

    # POST /api/rsvp — submit RSVP
    if method == "POST" and path == "/api/rsvp":
        return submit_rsvp(event)

    # GET /api/rsvps — list all RSVPs (HOST ONLY — requires valid token)
    if method == "GET" and path == "/api/rsvps":
        if not is_authorized(event):
            return respond(401, {"error": "Unauthorized"})
        return list_rsvps(event)

    # GET /api/health
    if path == "/api/health":
        return respond(200, {"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()})

    return respond(404, {"error": "Not found"})


def submit_rsvp(event: dict) -> dict:
    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return respond(400, {"error": "Invalid JSON body"})

    # Validate required fields
    primary_name = (body.get("primaryName") or "").strip()
    email = (body.get("email") or "").strip()
    if not primary_name or not email:
        return respond(400, {"error": "primaryName and email are required"})

    guests = body.get("guests", [])
    if not guests:
        return respond(400, {"error": "At least one guest is required"})

    # Build RSVP record
    rsvp_id = str(uuid.uuid4())
    submitted_at = datetime.now(timezone.utc).isoformat()

    record = {
        "rsvpId": rsvp_id,
        "submittedAt": submitted_at,
        "primaryName": primary_name,
        "email": email,
        "phone": body.get("phone", ""),
        "guests": guests,
        "dietary": body.get("dietary", ""),
        "songRequest": body.get("songRequest", ""),
        "message": body.get("message", ""),
        "guestCount": sum(int(g.get("adults", 0)) + int(g.get("kids", 0)) for g in guests),
        "adultsCount": sum(int(g.get("adults", 0)) for g in guests),
        "kidsCount": sum(int(g.get("kids", 0)) for g in guests),
        "events": {
            "sangeeth": sum((int(g.get("adults", 0)) + int(g.get("kids", 0))) for g in guests if g.get("sangeeth")),
            "engagement": sum((int(g.get("adults", 0)) + int(g.get("kids", 0))) for g in guests if g.get("engagement")),
            "mehendi": sum((int(g.get("adults", 0)) + int(g.get("kids", 0))) for g in guests if g.get("mehendi")),
            "haldi": sum((int(g.get("adults", 0)) + int(g.get("kids", 0))) for g in guests if g.get("haldi")),
            "prewedding": sum((int(g.get("adults", 0)) + int(g.get("kids", 0))) for g in guests if g.get("prewedding")),
            "wedding": sum((int(g.get("adults", 0)) + int(g.get("kids", 0))) for g in guests if g.get("wedding")),
        }
    }

    # Save to DynamoDB
    table = dynamodb.Table(RSVP_TABLE)
    table.put_item(Item=record)

    # Backup to S3
    try:
        s3.put_object(
            Bucket=BACKUP_BUCKET,
            Key=f"rsvps/{submitted_at[:10]}/{rsvp_id}.json",
            Body=json.dumps(record, indent=2),
            ContentType="application/json",
        )
    except Exception as e:
        print(f"S3 backup failed (non-fatal): {e}")

    # Send confirmation email to guest
    try:
        send_confirmation_email(record)
    except Exception as e:
        print(f"Confirmation email failed (non-fatal): {e}")

    # Send notification email to couple
    try:
        send_notification_email(record)
    except Exception as e:
        print(f"Notification email failed (non-fatal): {e}")

    return respond(200, {
        "success": True,
        "rsvpId": rsvp_id,
        "message": f"RSVP received for {primary_name}! We can't wait to celebrate with you."
    })


def admin_login(event: dict) -> dict:
    """Verify host password and issue a signed session token."""
    if not ADMIN_PASSWORD_HASH or not AUTH_SECRET:
        return respond(500, {"error": "Admin auth not configured"})
    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return respond(400, {"error": "Invalid JSON body"})

    password = body.get("password") or ""
    supplied_hash = hashlib.sha256(password.encode()).hexdigest()
    if not hmac.compare_digest(supplied_hash, ADMIN_PASSWORD_HASH):
        return respond(401, {"error": "Incorrect password"})

    return respond(200, {"token": make_token(), "expiresIn": TOKEN_TTL_SECONDS})


def list_rsvps(event: dict) -> dict:
    """Return all RSVPs — for admin use"""
    table = dynamodb.Table(RSVP_TABLE)
    result = table.scan()
    items = result.get("Items", [])

    # Build summary
    summary = {
        "total_rsvps": len(items),
        "total_guests": sum(int(r.get("guestCount", 0)) for r in items),
        "by_event": {
            "sangeeth": sum(int(r.get("events", {}).get("sangeeth", 0)) for r in items),
            "engagement": sum(int(r.get("events", {}).get("engagement", 0)) for r in items),
            "mehendi": sum(int(r.get("events", {}).get("mehendi", 0)) for r in items),
            "haldi": sum(int(r.get("events", {}).get("haldi", 0)) for r in items),
            "prewedding": sum(int(r.get("events", {}).get("prewedding", 0)) for r in items),
            "wedding": sum(int(r.get("events", {}).get("wedding", 0)) for r in items),
        },
        "rsvps": items,
    }
    return respond(200, summary)


def send_confirmation_email(record: dict):
    guests_list = "\n".join(
        f"  • {int(g.get('adults', 0))} adult(s)" +
        (f", {int(g.get('kids', 0))} kid(s)" if int(g.get('kids', 0)) else "") + " — " +
        ", ".join(("Pre-Wedding" if ev == "prewedding" else ev.title()) for ev in ["sangeeth", "engagement", "mehendi", "haldi", "prewedding", "wedding"] if g.get(ev))
        for g in record["guests"]
    )

    html_body = f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body {{ font-family: Georgia, serif; background: #FAF6EE; margin: 0; padding: 0; }}
  .container {{ max-width: 600px; margin: 40px auto; background: #0A0A0A; padding: 40px; }}
  .gold {{ color: #C9A84C; }}
  .header {{ text-align: center; border-bottom: 1px solid #C9A84C33; padding-bottom: 30px; margin-bottom: 30px; }}
  h1 {{ color: #C9A84C; font-family: Georgia, serif; font-size: 2rem; font-weight: normal; letter-spacing: 0.1em; margin: 0; }}
  p {{ color: #E8D5A3; line-height: 1.8; font-size: 1rem; }}
  .detail {{ color: #C9A84C; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; }}
  .events {{ background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.2); padding: 20px; margin: 20px 0; }}
  .footer {{ text-align: center; margin-top: 30px; border-top: 1px solid #C9A84C33; padding-top: 20px; }}
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <p class="detail">శుభమస్తు · Shubhamastu</p>
    <h1>Harshini ♾ Rahul</h1>
    <p style="color:#C9A84C; font-style:italic; margin:10px 0 0;">November 12–15, 2026 · Texas</p>
  </div>

  <p>Dear <strong style="color:#C9A84C;">{record['primaryName']}</strong>,</p>
  <p>We are so happy to confirm that your RSVP has been received! We are counting down the days until we celebrate with you.</p>

  <div class="events">
    <p class="detail" style="margin-bottom:12px;">Your RSVP — {record['guestCount']} guest(s)</p>
    {''.join(f'<p style="color:#E8D5A3; margin:4px 0;">◆ {int(g.get("adults",0))} adult(s)' + (f', {int(g.get("kids",0))} kid(s)' if int(g.get("kids",0)) else '') + ' — ' + ', '.join(("Pre-Wedding" if ev == "prewedding" else ev.title()) for ev in ["sangeeth","engagement","mehendi","haldi","prewedding","wedding"] if g.get(ev)) + '</p>' for g in record['guests'])}
  </div>

  {'<p><span class="detail">Dietary:</span> <span style="color:#E8D5A3;">' + record["dietary"] + '</span></p>' if record.get("dietary") else ""}
  {'<p><span class="detail">Song Request 🎵</span> <span style="color:#E8D5A3;">' + record["songRequest"] + '</span></p>' if record.get("songRequest") else ""}

  <p>If you have any questions, reach out to us directly. We cannot wait to celebrate with you!</p>

  <div class="footer">
    <p style="color:#C9A84C; font-style:italic;">Two hearts. One forever.</p>
    <p style="color:rgba(201,168,76,0.4); font-size:0.8rem;">Harshini & Rahul · November 2026 · Texas</p>
  </div>
</div>
</body>
</html>
"""

    ses.send_email(
        Source=f"Harshini & Rahul Wedding <{COUPLE_EMAIL}>",
        Destination={"ToAddresses": [record["email"]]},
        Message={
            "Subject": {"Data": "Your RSVP is confirmed — Harshini ♾ Rahul, November 2026 🪷"},
            "Body": {
                "Html": {"Data": html_body},
                "Text": {"Data": f"Dear {record['primaryName']}, your RSVP is confirmed! See you in Texas in November 2026. — Harshini & Rahul"},
            },
        },
    )


def send_notification_email(record: dict):
    events_summary = ", ".join(
        f"{ev.title()}: {count}"
        for ev, count in record["events"].items()
        if count > 0
    )

    ses.send_email(
        Source=f"Wedding RSVP <{COUPLE_EMAIL}>",
        Destination={"ToAddresses": [NOTIFICATION_EMAIL]},
        Message={
            "Subject": {"Data": f"New RSVP: {record['primaryName']} ({record['guestCount']} guests)"},
            "Body": {
                "Text": {
                    "Data": (
                        f"New RSVP received!\n\n"
                        f"Name: {record['primaryName']}\n"
                        f"Email: {record['email']}\n"
                        f"Phone: {record.get('phone', 'N/A')}\n"
                        f"Guests: {record['guestCount']}\n"
                        f"Events: {events_summary}\n"
                        f"Dietary: {record.get('dietary', 'None')}\n"
                        f"Song: {record.get('songRequest', 'None')}\n"
                        f"Message: {record.get('message', 'None')}\n\n"
                        f"RSVP ID: {record['rsvpId']}\n"
                        f"Submitted: {record['submittedAt']}"
                    )
                }
            },
        },
    )
