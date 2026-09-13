"use client";

import { motion } from "framer-motion";
import { LotusDivider, KolamBorder, MandalaCorner } from "./TeluguGraphics";

const chapters = [
  {
    number: "01",
    title: "How We Met",
    year: "2021",
    body: "Two souls, one chance encounter that would change everything. What started as a casual introduction turned into hours of conversation, laughter, and the quiet realization that something special had just begun.",
    icon: "✨",
  },
  {
    number: "02",
    title: "The Journey Together",
    year: "2022–2024",
    body: "Through adventures big and small — road trips, family dinners, quiet evenings and loud celebrations — we built a life together, one memory at a time. Every moment only confirmed what we already knew.",
    icon: "🌸",
  },
  {
    number: "03",
    title: "The Proposal",
    year: "2025",
    body: "Under the Texas sky, surrounded by the warmth of everything we love, Rahul asked the question that made time stand still. Harshu said yes — and our forever officially began.",
    icon: "💍",
  },
  {
    number: "04",
    title: "The Celebration",
    year: "November 2026",
    body: "Now we invite our families and dearest friends to witness what our hearts already know. Four days of celebration, tradition, music, and love — the wedding festival of a lifetime.",
    icon: "🎊",
  },
];

export default function OurStorySection() {
  return (
    <section
      id="story"
      className="py-16 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--ivory) 0%, var(--ivory-dark) 100%)" }}
    >
      {/* Subtle mandala watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.03] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #C9A84C 0%, transparent 60%)",
          borderRadius: "50%",
        }}
      />

      {/* Kolam border top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <KolamBorder color="#C9A84C" opacity={0.12} />
      </div>

      {/* Mandala corners */}
      <div className="absolute top-0 left-0 pointer-events-none hidden md:block">
        <MandalaCorner size={100} color="#C9A84C" opacity={0.12} />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none hidden md:block" style={{ transform: "scaleX(-1)" }}>
        <MandalaCorner size={100} color="#C9A84C" opacity={0.12} />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 200px 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p
            className="tracking-[0.3em] text-xs mb-4"
            style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
          >
            OUR JOURNEY
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
            Our Story
          </h2>
          <div className="section-divider mt-6" />
          <div className="flex justify-center mt-4">
            <LotusDivider color="#C9A84C" width={280} opacity={0.5} />
          </div>
          <p
            className="mt-6 max-w-xl mx-auto italic text-lg leading-relaxed"
            style={{ color: "#5C4A2A", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            Every great love story deserves to be told.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(180deg, transparent, #C9A84C 10%, #C9A84C 90%, transparent)" }}
          />

          <div className="space-y-16">
            {chapters.map((chapter, i) => (
              <motion.div
                key={chapter.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  i % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content card */}
                <div className="md:w-5/12 w-full">
                  <div
                    className="p-8 relative gold-border"
                    style={{
                      background: "rgba(250, 246, 238, 0.8)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {/* Corner accents */}
                    <span className="absolute top-2 left-2 w-3 h-3 border-t border-l" style={{ borderColor: "#C9A84C" }} />
                    <span className="absolute top-2 right-2 w-3 h-3 border-t border-r" style={{ borderColor: "#C9A84C" }} />
                    <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l" style={{ borderColor: "#C9A84C" }} />
                    <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r" style={{ borderColor: "#C9A84C" }} />

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{chapter.icon}</span>
                      <span
                        className="text-xs tracking-[0.2em]"
                        style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                      >
                        CHAPTER {chapter.number} · {chapter.year}
                      </span>
                    </div>
                    <h3
                      className="mb-4"
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "1.3rem",
                        color: "#1A1A1A",
                        fontWeight: 400,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {chapter.title}
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "#4A3728",
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        fontWeight: 400,
                      }}
                    >
                      {chapter.body}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="md:w-2/12 hidden md:flex justify-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: "#0A0A0A",
                      border: "2px solid #C9A84C",
                      boxShadow: "0 0 20px rgba(201,168,76,0.3)",
                    }}
                  >
                    <span className="text-sm">{chapter.icon}</span>
                  </div>
                </div>

                {/* Year (opposite side) */}
                <div className="md:w-5/12 hidden md:flex items-center justify-center">
                  <span
                    className="gold-text opacity-20"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "5rem",
                      fontWeight: 600,
                    }}
                  >
                    {chapter.number}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
