"use client";

import { motion } from "framer-motion";

const venues = [
  {
    event: "Sangeeth",
    name: "The Venue at Waterstone",
    address: "10455 Co Rd 133, Celina, TX 75009",
    mapQuery: "The+Venue+at+Waterstone,+10455+Co+Rd+133,+Celina,+TX+75009",
    note: "Join us for a night of music and dance at The Venue at Waterstone.",
  },
  {
    event: "Mehendi & Haldi & Engagement & Pre-Wedding",
    name: "Our Home",
    address: "3333 Lakestriker Road, Celina, TX 75009",
    mapQuery: "3333+Lakestriker+Road,+Celina,+TX+75009",
    note: "These four celebrations will be held at our home. We can't wait to host you.",
  },
  {
    event: "Wedding Ceremony",
    name: "Loco Lake Venue",
    address: "2585 US-287, Sunset, TX 76270",
    mapQuery: "Loco+Lake+Venue,+2585+US-287,+Sunset,+TX+76270",
    note: "The wedding ceremony and reception will be held at Loco Lake Venue.",
  },
];

export default function VenueSection() {
  return (
    <section
      id="venue"
      className="py-16 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #0F0800 100%)" }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #C9A84C 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
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
            WHERE TO FIND US
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
            Venue &amp; Directions
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Venue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {venues.map((v, i) => (
            <motion.div
              key={v.event}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 200px 0px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="p-6 relative"
              style={{
                background: "rgba(201,168,76,0.04)",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              <span className="absolute top-2 left-2 w-3 h-3 border-t border-l" style={{ borderColor: "#C9A84C" }} />
              <span className="absolute top-2 right-2 w-3 h-3 border-t border-r" style={{ borderColor: "#C9A84C" }} />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l" style={{ borderColor: "#C9A84C" }} />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r" style={{ borderColor: "#C9A84C" }} />

              <p
                className="text-xs tracking-[0.2em] mb-3"
                style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
              >
                {v.event.toUpperCase()}
              </p>
              <h3
                className="mb-2"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "1.1rem",
                  color: "#E8D5A3",
                  fontWeight: 400,
                }}
              >
                {v.name}
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif" }}
              >
                📍 {v.address}
              </p>
              <p
                className="text-sm italic leading-relaxed"
                style={{ color: "#B0A080", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
              >
                {v.note}
              </p>

              <a
                href={`https://maps.google.com/?q=${v.mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-5 text-xs tracking-[0.15em] px-4 py-2 transition-all duration-300"
                style={{
                  border: "1px solid rgba(201,168,76,0.4)",
                  color: "#C9A84C",
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = "#C9A84C";
                  (e.target as HTMLElement).style.color = "#0A0A0A";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = "transparent";
                  (e.target as HTMLElement).style.color = "#C9A84C";
                }}
              >
                GET DIRECTIONS →
              </a>
            </motion.div>
          ))}
        </div>

        {/* Map embed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px 200px 0px" }}
          transition={{ duration: 0.8 }}
          className="w-full overflow-hidden"
          style={{
            height: "380px",
            background: "#0A0A0A",
            border: "1px solid rgba(201,168,76,0.25)",
          }}
        >
          <iframe
            title="Wedding Venue Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13888049.985885322!2d-105.20545285!3d31.000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864070360b823249%3A0x16eb1c8f1808de3c!2sTexas%2C%20USA!5e0!3m2!1sen!2sus!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(0.8) sepia(0.4) brightness(0.7)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
      />
    </section>
  );
}
