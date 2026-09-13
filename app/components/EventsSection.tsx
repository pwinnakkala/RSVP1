"use client";

import { motion } from "framer-motion";

interface Event {
  id: string;
  emoji: string;
  name: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  venueName: string;
  venueAddress: string;
  mapQuery: string;
  description: string;
  dress: string;
  details: string[];
  bg: string;
  accent: string;
  accentLight: string;
  textColor: string;
}

const events: Event[] = [
  {
    id: "sangeeth",
    emoji: "✨",
    name: "SANGEETH",
    subtitle: "Dance · Music · Cocktails",
    date: "Thursday, November 12, 2026",
    time: "Evening",
    venue: "TBD, Texas",
    venueName: "The Venue at Waterstone",
    venueAddress: "10455 Co Rd 133, Celina, TX 75009",
    mapQuery: "The+Venue+at+Waterstone,+10455+Co+Rd+133,+Celina,+TX+75009",
    description:
      "Kick off the wedding week with the biggest party night. Family dance-offs, musical performances, and an evening that will be talked about for years. Come ready to dance.",
    dress: "Festive Indian wear · Black, navy preferred",
    details: [
      "Family & friends dance performances",
      "Live music",
      "Dinner & late night snacks",
      "Open bar",
      "DJ till late",
    ],
    bg: "linear-gradient(135deg, #020014 0%, #0D0D2B 40%, #1A1040 100%)",
    accent: "#D4AF37",
    accentLight: "rgba(212,175,55,0.12)",
    textColor: "#E8E0F8",
  },
  {
    id: "engagement",
    emoji: "💍",
    name: "ENGAGEMENT",
    subtitle: "Rings · Blessings · Celebration",
    date: "Friday, November 13, 2026",
    time: "Noon",
    venue: "TBD, Texas",
    venueName: "Our Home",
    venueAddress: "3333 Lakestriker Road, Celina, TX 75009",
    mapQuery: "3333+Lakestriker+Road,+Celina,+TX+75009",
    description:
      "The official exchange of rings as both families come together to bless Rahul and Harshu. A beautiful afternoon ceremony followed by lunch and celebration.",
    dress: "Semi-formal Indian wear · Bright, festive colours welcome",
    details: [
      "Ring exchange ceremony",
      "Family blessings",
      "Lunch served",
      "Photos with family",
    ],
    bg: "linear-gradient(135deg, #1A0A2E 0%, #2D1B69 40%, #4C1D95 100%)",
    accent: "#E879F9",
    accentLight: "rgba(232,121,249,0.12)",
    textColor: "#F5E6FF",
  },
  {
    id: "mehendi",
    emoji: "🤚",
    name: "MEHENDI",
    subtitle: "Music · Henna",
    date: "Friday, November 13, 2026",
    time: "Evening",
    venue: "TBD, Texas",
    venueName: "Our Home",
    venueAddress: "3333 Lakestriker Road, Celina, TX 75009",
    mapQuery: "3333+Lakestriker+Road,+Celina,+TX+75009",
    description:
      "An evening of intricate henna, joyful music, and cocktails as the celebrations continue. Watch the artists weave beautiful stories on hands that are about to hold each other forever.",
    dress: "Semi-formal · Parrot Green, Pink, or Yellow encouraged",
    details: [
      "Henna artists available all evening",
      "Live dhol & DJ music",
      "Cocktails & mocktails",
      "Snacks & dinner served",
    ],
    bg: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 40%, #40916C 100%)",
    accent: "#E91E8C",
    accentLight: "rgba(233,30,140,0.15)",
    textColor: "#D8F3DC",
  },
  {
    id: "haldi",
    emoji: "☀️",
    name: "HALDI",
    subtitle: "Turmeric · Traditions · Cocktails",
    date: "Saturday, November 14, 2026",
    time: "Noon",
    venue: "TBD, Texas",
    venueName: "Our Home",
    venueAddress: "3333 Lakestriker Road, Celina, TX 75009",
    mapQuery: "3333+Lakestriker+Road,+Celina,+TX+75009",
    description: "",
    dress: "Casual · Bright yellows & oranges preferred (wear clothes you don't mind getting yellow!)",
    details: [
      "Traditional Haldi ceremony",
      "Family blessings ritual",
      "Lunch served",
      "Outdoor celebration (weather permitting)",
    ],
    bg: "linear-gradient(135deg, #5C4A00 0%, #8A6D00 40%, #B8930A 100%)",
    accent: "#FDD835",
    accentLight: "rgba(253,216,53,0.15)",
    textColor: "#FFF9E0",
  },
  {
    id: "prewedding",
    emoji: "🪔",
    name: "PRE-WEDDING CEREMONY",
    subtitle: "Pellikuthuru & Pellikoduku",
    date: "Saturday, November 14, 2026",
    time: "Evening",
    venue: "TBD, Texas",
    venueName: "Our Home",
    venueAddress: "3333 Lakestriker Road, Celina, TX 75009",
    mapQuery: "3333+Lakestriker+Road,+Celina,+TX+75009",
    description: "",
    dress: "Traditional Indian wear",
    details: [],
    bg: "linear-gradient(135deg, #2A0A2E 0%, #5B1E5F 40%, #8E3A96 100%)",
    accent: "#F0A6E8",
    accentLight: "rgba(240,166,232,0.15)",
    textColor: "#FCE8FB",
  },
  {
    id: "wedding",
    emoji: "🪷",
    name: "WEDDING",
    subtitle: "The Moment We Say 'I Do'",
    date: "Sunday, November 15, 2026",
    time: "Noon",
    venue: "TBD, Texas",
    venueName: "Loco Lake Venue",
    venueAddress: "2585 US-287, Sunset, TX 76270",
    mapQuery: "Loco+Lake+Venue,+2585+US-287,+Sunset,+TX+76270",
    description:
      "The main event. In the presence of our families and God, Rahul and Harshu exchange vows and begin their forever. A traditional Telugu ceremony followed by a reception.",
    dress: "Formal Indian or Western attire · Ivory, gold, pastels welcome",
    details: [
      "Traditional Telugu wedding ceremony",
      "Baraat procession",
      "Reception lunch & desserts",
      "Family celebrations",
    ],
    bg: "linear-gradient(135deg, #1A0A00 0%, #2C1810 40%, #3D2314 100%)",
    accent: "#C9A84C",
    accentLight: "rgba(201,168,76,0.12)",
    textColor: "#FAF6EE",
  },
];

export default function EventsSection() {
  return (
    <section
      id="events"
      className="py-16 px-6 relative"
      style={{ background: "#0A0A0A" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px 200px 0px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p
          className="tracking-[0.3em] text-xs mb-4"
          style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
        >
          6 CELEBRATIONS · 2 FAMILIES
        </p>
        <h2
          className="gold-text"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400,
            letterSpacing: "0.1em",
          }}
        >
          The Wedding Festival
        </h2>
        <div className="section-divider mt-6 mb-6" />
      </motion.div>

      {/* Event Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative overflow-hidden"
            style={{
              background: event.bg,
              border: `1px solid ${event.accent}33`,
              boxShadow: `0 4px 30px ${event.accent}22`,
              minHeight: "300px",
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at center, ${event.accentLight}, transparent 70%)` }}
            />

            {/* Corner accents */}
            <span className="absolute top-3 left-3 w-3 h-3 border-t border-l" style={{ borderColor: event.accent }} />
            <span className="absolute top-3 right-3 w-3 h-3 border-t border-r" style={{ borderColor: event.accent }} />
            <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l" style={{ borderColor: event.accent }} />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r" style={{ borderColor: event.accent }} />

            <div className="p-8 flex flex-col h-full">
              <span className="text-4xl mb-4">{event.emoji}</span>
              <h3
                className="mb-2"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "1.1rem",
                  letterSpacing: "0.15em",
                  color: event.accent,
                  fontWeight: 500,
                }}
              >
                {event.name}
              </h3>
              <p
                className="italic mb-6"
                style={{
                  color: event.textColor,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.95rem",
                  opacity: 0.8,
                }}
              >
                {event.subtitle}
              </p>
              <div className="mt-auto">
                <p
                  className="tracking-wider mb-1"
                  style={{ color: event.accent, fontFamily: "'Lato', sans-serif", fontWeight: 500, fontSize: "clamp(0.95rem, 2.4vw, 1.15rem)" }}
                >
                  {event.date}
                </p>
                <p
                  style={{ color: event.textColor, fontFamily: "'Lato', sans-serif", fontWeight: 400, fontSize: "clamp(0.85rem, 2vw, 1rem)", opacity: 0.85, letterSpacing: "0.08em" }}
                >
                  {event.time}
                </p>

                {/* Venue + directions */}
                <div
                  className="mt-4 pt-4"
                  style={{ borderTop: `1px solid ${event.accent}33` }}
                >
                  <p
                    className="text-sm mb-1"
                    style={{ color: event.textColor, fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
                  >
                    📍 {event.venueName}
                  </p>
                  <p
                    className="text-xs mb-3"
                    style={{ color: event.textColor, fontFamily: "'Lato', sans-serif", fontWeight: 300, opacity: 0.7 }}
                  >
                    {event.venueAddress}
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${event.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs tracking-[0.15em] px-3 py-2 transition-all duration-300"
                    style={{
                      border: `1px solid ${event.accent}66`,
                      color: event.accent,
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 300,
                      textDecoration: "none",
                    }}
                  >
                    GET DIRECTIONS →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
