"use client";

import { motion } from "framer-motion";
import { LotusDivider, PaisleyBorder, MandalaCorner } from "./TeluguGraphics";

const dressCodes = [
  {
    event: "✨ Sangeeth",
    theme: "Glamorous Night",
    instruction: "Festive Indian wear, or party wear — a suit works great for men. Go bold — this is the party night that kicks off the celebrations!",
    colors: [
      { name: "Midnight Navy", hex: "#0D1B4B" },
      { name: "Emerald", hex: "#004D40" },
      { name: "Deep Burgundy", hex: "#880E4F" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    avoid: "Casual or overly casual outfits, and ivory (reserved for the bride)",
    tip: "Heels & dress shoes recommended — it's a glam night. Thursday Nov 12.",
  },
  {
    event: "💍 Engagement & Wedding Ceremony",
    theme: "Formal & Elegant",
    instruction: "Formal Indian or Western attire for both occasions. Sarees, lehengas, sherwanis, suits welcome — festive for the Engagement, elegant for the Wedding.",
    colors: [
      { name: "Ivory", hex: "#FAF6EE" },
      { name: "Royal Purple", hex: "#4C1D95" },
      { name: "Blush Pink", hex: "#F4A7B9" },
      { name: "Sage Green", hex: "#7CAF7C" },
      { name: "Royal Blue", hex: "#1565C0" },
    ],
    avoid: "All-white, all-red, or Champagne Gold (reserved for the bride)",
    tip: "Engagement — noon, Friday Nov 13. Wedding — noon, Sunday Nov 15. The couple's palette is ivory & gold, so complementary tones (blush, sage, royal blue) are perfect.",
  },
  {
    event: "🤚🪔 Mehendi & Pre-Wedding",
    theme: "Vibrant & Festive",
    instruction: "Semi-formal to traditional Indian wear. Salwar kameez, lehenga, kurta, sherwani. Western semi-formal also welcome.",
    colors: [
      { name: "Sunny Yellow", hex: "#FDD835" },
      { name: "Deep Orange", hex: "#E65100" },
      { name: "Peacock Blue", hex: "#0F6E8C" },
      { name: "Mustard Gold", hex: "#C99A2E" },
      { name: "Teal", hex: "#0D9488" },
      { name: "Coral", hex: "#FF6F5E" },
    ],
    avoid: "Pink or parrot green (reserved for the bride)",
    tip: "Mehendi — Friday evening Nov 13. Pre-Wedding (Pellikuthuru & Pellikoduku) — Saturday evening Nov 14.",
  },
  {
    event: "☀️ Haldi",
    theme: "Casual & Colorful",
    instruction: "Casual wear you don't mind getting turmeric on! Yellow is strongly encouraged.",
    colors: [
      { name: "Sunshine Yellow", hex: "#FDD835" },
      { name: "Cream", hex: "#FFF8E1" },
      { name: "White", hex: "#FFFFFF" },
    ],
    avoid: "Orange and peach shades (reserved for the bride & groom)",
    tip: "Saturday noon Nov 14 — wear clothes you're okay ruining, turmeric is forever!",
  },
];

export default function DressCodeSection() {
  return (
    <section
      id="dresscode"
      className="py-16 px-6 relative overflow-hidden"
      style={{ background: "var(--ivory)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
      />
      <div className="absolute top-1 left-0 right-0 pointer-events-none">
        <PaisleyBorder color="#C9A84C" opacity={0.15} />
      </div>
      <div className="absolute top-0 left-0 pointer-events-none hidden md:block">
        <MandalaCorner size={90} color="#C9A84C" opacity={0.1} />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none hidden md:block" style={{ transform: "scaleX(-1)" }}>
        <MandalaCorner size={90} color="#C9A84C" opacity={0.1} />
      </div>

      <div className="max-w-5xl mx-auto">
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
            WHAT TO WEAR
          </p>
          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#1A1A1A",
              fontWeight: 400,
              letterSpacing: "0.08em",
            }}
          >
            Dress Code Guide
          </h2>
          <div className="section-divider mt-6 mb-6" />
          <div className="flex justify-center mb-2">
            <LotusDivider color="#C9A84C" width={260} opacity={0.45} />
          </div>
          <p
            className="italic text-lg max-w-xl mx-auto"
            style={{ color: "#5C4A2A", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            Each event has its own vibe — dress to match the moment.
          </p>
        </motion.div>

        {/* Dress code cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dressCodes.map((dc, i) => (
            <motion.div
              key={dc.event}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 200px 0px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="p-8 relative gold-border"
              style={{ background: "rgba(250, 246, 238, 0.9)" }}
            >
              <span className="absolute top-2 left-2 w-3 h-3 border-t border-l" style={{ borderColor: "#C9A84C" }} />
              <span className="absolute top-2 right-2 w-3 h-3 border-t border-r" style={{ borderColor: "#C9A84C" }} />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l" style={{ borderColor: "#C9A84C" }} />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r" style={{ borderColor: "#C9A84C" }} />

              <div className="flex items-start justify-between mb-4 gap-2 flex-wrap">
                <h3
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "1rem",
                    color: "#1A1A1A",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                  }}
                >
                  {dc.event}
                </h3>
                <span
                  className="text-xs px-3 py-1"
                  style={{
                    background: "rgba(201,168,76,0.12)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    color: "#8B6914",
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {dc.theme}
                </span>
              </div>

              <p
                className="mb-5 leading-relaxed"
                style={{ color: "#4A3728", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
              >
                {dc.instruction}
              </p>

              {/* Color swatches */}
              <div className="mb-5">
                <p
                  className="text-xs tracking-[0.2em] mb-3"
                  style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                >
                  SUGGESTED COLOURS
                </p>
                <div className="flex flex-wrap gap-2">
                  {dc.colors.map((c) => (
                    <div key={c.name} className="flex flex-col items-center gap-1">
                      <div
                        className="w-10 h-10 rounded-sm"
                        style={{
                          background: c.hex,
                          border: c.hex === "#FFFFFF" || c.hex === "#FAF6EE" ? "1px solid #C9A84C55" : "none",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                        title={c.name}
                      />
                      <span
                        className="text-xs text-center"
                        style={{
                          color: "#7A6040",
                          fontFamily: "'Lato', sans-serif",
                          fontWeight: 300,
                          fontSize: "0.6rem",
                          maxWidth: "2.5rem",
                          lineHeight: 1.2,
                        }}
                      >
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avoid */}
              <div
                className="p-3 mb-4 flex items-start gap-2"
                style={{ background: "rgba(180,50,50,0.06)", border: "1px solid rgba(180,50,50,0.15)" }}
              >
                <span className="text-sm mt-0.5">⚠️</span>
                <p
                  className="text-sm"
                  style={{ color: "#7A3030", fontFamily: "'Cormorant Garamond', serif" }}
                >
                  <strong>Avoid:</strong> {dc.avoid}
                </p>
              </div>

              {/* Tip */}
              <p
                className="text-sm italic"
                style={{ color: "#7A6040", fontFamily: "'Cormorant Garamond', serif" }}
              >
                💡 {dc.tip}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
      />
    </section>
  );
}
