"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GuestEntry {
  adults: number;
  kids: number;
  sangeeth: boolean;
  engagement: boolean;
  mehendi: boolean;
  haldi: boolean;
  prewedding: boolean;
  wedding: boolean;
}

interface FormData {
  primaryName: string;
  email: string;
  phone: string;
  guests: GuestEntry[];
  dietary: string;
  songRequest: string;
  message: string;
}

const defaultGuest = (): GuestEntry => ({
  adults: 1,
  kids: 0,
  sangeeth: false,
  engagement: false,
  mehendi: false,
  haldi: false,
  prewedding: false,
  wedding: false,
});

const events = [
  { key: "sangeeth" as const, label: "Sangeeth", emoji: "✨", color: "#D4AF37" },
  { key: "engagement" as const, label: "Engagement", emoji: "💍", color: "#E879F9" },
  { key: "mehendi" as const, label: "Mehendi", emoji: "🤚", color: "#2D9148" },
  { key: "haldi" as const, label: "Haldi", emoji: "☀️", color: "#FDD835" },
  { key: "prewedding" as const, label: "Pre-Wedding", emoji: "🪔", color: "#F0A6E8" },
  { key: "wedding" as const, label: "Wedding", emoji: "🪷", color: "#C9A84C" },
];

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function RSVPSection() {
  const [form, setForm] = useState<FormData>({
    primaryName: "",
    email: "",
    phone: "",
    guests: [defaultGuest()],
    dietary: "",
    songRequest: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [validationError, setValidationError] = useState("");

  const updateGuest = (index: number, field: keyof GuestEntry, value: number | boolean) => {
    if (validationError) setValidationError("");
    setForm((prev) => {
      const guests = [...prev.guests];
      guests[index] = { ...guests[index], [field]: value };
      return { ...prev, guests };
    });
  };

  const adjustCount = (index: number, field: "adults" | "kids", delta: number) => {
    setForm((prev) => {
      const guests = [...prev.guests];
      const current = guests[index][field];
      const min = field === "adults" ? 1 : 0;
      const next = Math.max(min, Math.min(20, current + delta));
      guests[index] = { ...guests[index], [field]: next };
      return { ...prev, guests };
    });
  };

  const removeGuest = (index: number) => {
    if (form.guests.length > 1) {
      setForm((prev) => ({
        ...prev,
        guests: prev.guests.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Every guest must be attending at least one event
    const eventKeys = ["sangeeth", "engagement", "mehendi", "haldi", "prewedding", "wedding"] as const;
    const guestWithNoEvent = form.guests.findIndex(
      (g) => !eventKeys.some((k) => g[k])
    );
    if (guestWithNoEvent !== -1) {
      setValidationError(
        `Please select at least one event for Guest ${guestWithNoEvent + 1}.`
      );
      return;
    }
    setValidationError("");
    setSubmitState("submitting");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitState("success");
        // Bring the confirmation into view (the page is often scrolled down here)
        requestAnimationFrame(() => {
          document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      } else {
        console.error("RSVP error:", data);
        setSubmitState("error");
      }
    } catch (err) {
      console.error("RSVP fetch error:", err);
      setSubmitState("error");
    }
  };

  const inputStyle = {
    background: "rgba(201,168,76,0.05)",
    border: "1px solid rgba(201,168,76,0.25)",
    color: "#FAF6EE",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1rem",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    color: "#C9A84C",
    fontFamily: "'Lato', sans-serif",
    fontWeight: 300,
    fontSize: "0.7rem",
    letterSpacing: "0.2em",
    display: "block",
    marginBottom: "0.5rem",
  } as React.CSSProperties;

  return (
    <section
      id="rsvp"
      className="py-16 px-6 relative"
      style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #0F0800 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #C9A84C 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 200px 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p
            className="tracking-[0.3em] text-xs mb-4"
            style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
          >
            WE HOPE TO SEE YOU THERE
          </p>
          <h2
            className="gold-text"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              letterSpacing: "0.08em",
            }}
          >
            RSVP
          </h2>
          <div className="section-divider mt-6 mb-6" />
          <p
            className="italic text-lg"
            style={{ color: "#E8D5A3", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            Please RSVP by October 1, 2026
          </p>
          <p
            className="italic mt-4"
            style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.05rem" }}
          >
            &ldquo;Come pet me and bring treats — I&rsquo;ll be there wagging for you!&rdquo; — Noah Salla 🐶
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 px-8 gold-border"
              style={{ background: "rgba(201,168,76,0.05)" }}
            >
              <div className="text-5xl mb-6">🎊</div>
              <h3
                className="gold-text mb-4"
                style={{ fontFamily: "'Cinzel', serif", fontSize: "1.8rem", fontWeight: 400 }}
              >
                We Can&apos;t Wait to See You!
              </h3>
              <p
                className="italic text-lg"
                style={{ color: "#E8D5A3", fontFamily: "'Cormorant Garamond', serif" }}
              >
                Your RSVP has been received. We&apos;ll send a confirmation to your email soon.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Primary contact */}
              <div
                className="p-6"
                style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.03)" }}
              >
                <p
                  className="text-xs tracking-[0.25em] mb-6"
                  style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                >
                  YOUR CONTACT DETAILS
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>PRIMARY GUEST NAME *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ravi & Family"
                      value={form.primaryName}
                      onChange={(e) => setForm((p) => ({ ...p, primaryName: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>EMAIL *</label>
                    <input
                      required
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>PHONE (OPTIONAL)</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Guest entries */}
              <div
                className="p-6"
                style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.03)" }}
              >
                <p
                  className="text-xs tracking-[0.25em] mb-2"
                  style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                >
                  ATTENDING GUESTS
                </p>
                <p
                  className="italic mb-6"
                  style={{ color: "#E8D5A3", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "0.98rem", opacity: 0.85 }}
                >
                  So… who&rsquo;s tagging along? Tell us your crew — adults, little ones, and all! 🎉
                </p>

                <div className="space-y-6">
                  {form.guests.map((guest, i) => (
                    <div
                      key={i}
                      className="p-4 relative"
                      style={{ border: "1px solid rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.02)" }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="text-xs tracking-[0.15em]"
                          style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                        >
                          GUEST {i + 1}
                        </span>
                        {i > 0 && (
                          <button
                            type="button"
                            onClick={() => removeGuest(i)}
                            className="text-xs"
                            style={{ color: "rgba(201,168,76,0.5)", fontFamily: "'Lato', sans-serif" }}
                          >
                            REMOVE
                          </button>
                        )}
                      </div>

                      {/* Adults & Kids counters */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ marginBottom: "0.5rem" }}>
                        {(["adults", "kids"] as const).map((field) => (
                          <div
                            key={field}
                            className="flex items-center justify-between gap-2 p-3"
                            style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.03)" }}
                          >
                            <span
                              style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
                            >
                              {field === "adults" ? "Adults (incl. you)" : "Kids"}
                            </span>
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => adjustCount(i, field, -1)}
                                aria-label={`Decrease ${field}`}
                                style={{
                                  width: "2rem", height: "2rem", lineHeight: 1, flexShrink: 0,
                                  border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C",
                                  background: "transparent", cursor: "pointer", fontSize: "1.1rem",
                                }}
                              >
                                −
                              </button>
                              <span
                                style={{ color: "#FAF6EE", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", minWidth: "1.4rem", textAlign: "center" }}
                              >
                                {guest[field]}
                              </span>
                              <button
                                type="button"
                                onClick={() => adjustCount(i, field, 1)}
                                aria-label={`Increase ${field}`}
                                style={{
                                  width: "2rem", height: "2rem", lineHeight: 1, flexShrink: 0,
                                  border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C",
                                  background: "transparent", cursor: "pointer", fontSize: "1.1rem",
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p
                        style={{ color: "rgba(201,168,76,0.55)", fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "0.62rem", letterSpacing: "0.05em", marginBottom: "1rem" }}
                      >
                        Count yourself in the adults total.
                      </p>

                      {/* Event checkboxes */}
                      <p
                        className="text-xs tracking-[0.15em] mb-3"
                        style={{ color: "#C9A84C66", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                      >
                        ATTENDING EVENTS
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {events.map((ev) => (
                          <label
                            key={ev.key}
                            className="flex items-center gap-2 cursor-pointer p-2"
                            style={{
                              border: `1px solid ${guest[ev.key] ? ev.color + "66" : "rgba(201,168,76,0.1)"}`,
                              background: guest[ev.key] ? ev.color + "15" : "transparent",
                              transition: "all 0.2s",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={guest[ev.key]}
                              onChange={(e) => updateGuest(i, ev.key, e.target.checked)}
                              className="sr-only"
                            />
                            <span
                              className="w-4 h-4 flex items-center justify-center text-xs"
                              style={{
                                border: `1px solid ${ev.color}`,
                                background: guest[ev.key] ? ev.color : "transparent",
                                color: "#fff",
                                flexShrink: 0,
                              }}
                            >
                              {guest[ev.key] ? "✓" : ""}
                            </span>
                            <span
                              className="text-xs"
                              style={{
                                color: guest[ev.key] ? ev.color : "rgba(201,168,76,0.4)",
                                fontFamily: "'Lato', sans-serif",
                                fontWeight: 300,
                              }}
                            >
                              {ev.emoji} {ev.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional info */}
              <div
                className="p-6"
                style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.03)" }}
              >
                <p
                  className="text-xs tracking-[0.25em] mb-6"
                  style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                >
                  A FEW MORE THINGS
                </p>
                <div className="space-y-4">
                  <div>
                    <label style={labelStyle}>DIETARY REQUIREMENTS</label>
                    <input
                      type="text"
                      placeholder="e.g. Vegetarian, Vegan, Nut allergy, Jain food..."
                      value={form.dietary}
                      onChange={(e) => setForm((p) => ({ ...p, dietary: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>🎵 SONG REQUEST FOR SANGEETH</label>
                    <input
                      type="text"
                      placeholder="What should we play for you?"
                      value={form.songRequest}
                      onChange={(e) => setForm((p) => ({ ...p, songRequest: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>💌 MESSAGE FOR THE COUPLE (OPTIONAL)</label>
                    <textarea
                      rows={4}
                      placeholder="Share a wish, memory, or message..."
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      style={{ ...inputStyle, resize: "vertical" }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="text-center">
                {validationError && (
                  <p
                    className="mb-4 text-sm"
                    style={{ color: "#E88", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                  >
                    {validationError}
                  </p>
                )}
                <motion.button
                  type="submit"
                  disabled={submitState === "submitting"}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-12 py-4 text-sm tracking-[0.25em] transition-all duration-300"
                  style={{
                    background: submitState === "submitting" ? "rgba(201,168,76,0.3)" : "#C9A84C",
                    color: "#0A0A0A",
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 400,
                    border: "none",
                    cursor: submitState === "submitting" ? "wait" : "pointer",
                  }}
                >
                  {submitState === "submitting" ? "SENDING..." : "SEND RSVP ♾"}
                </motion.button>
                {submitState === "error" && (
                  <p className="mt-4 text-sm" style={{ color: "#E57373", fontFamily: "'Cormorant Garamond', serif" }}>
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
