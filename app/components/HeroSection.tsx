"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MandalaCorner, LotusDivider, DiyaIcon, MangalamSymbol } from "./TeluguGraphics";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function HeroSection() {
  const [phase, setPhase] = useState<"black" | "particles" | "names" | "full">("black");
  const [particles, setParticles] = useState<Particle[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.6 + 0.2,
    }));
    setParticles(generated);

    const t1 = setTimeout(() => setPhase("particles"), 800);
    const t2 = setTimeout(() => setPhase("names"), 2200);
    const t3 = setTimeout(() => setPhase("full"), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #0F0A00 50%, #120800 100%)" }}
    >
      {/* Gold particles */}
      <AnimatePresence>
        {phase !== "black" && particles.map((p) => (
          <motion.div
            key={p.id}
            className="particle"
            initial={{ opacity: 0 }}
            animate={{ opacity: p.opacity }}
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, #E8D5A3, #C9A84C)`,
              boxShadow: `0 0 ${p.size * 2}px rgba(201,168,76,0.6)`,
              animation: `particle-drift ${p.duration}s ${p.delay}s linear infinite`,
              bottom: -20,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)" }}
      />

      {/* Telugu mandala corners + diyas */}
      {phase === "full" && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
            className="absolute top-0 left-0 pointer-events-none">
            <MandalaCorner size={140} color="#C9A84C" opacity={0.3} />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}
            className="absolute top-0 right-0 pointer-events-none" style={{ transform: "scaleX(-1)" }}>
            <MandalaCorner size={140} color="#C9A84C" opacity={0.3} />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-0 left-0 pointer-events-none" style={{ transform: "scaleY(-1)" }}>
            <MandalaCorner size={140} color="#C9A84C" opacity={0.3} />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 1 }}
            className="absolute bottom-0 right-0 pointer-events-none" style={{ transform: "scale(-1,-1)" }}>
            <MandalaCorner size={140} color="#C9A84C" opacity={0.3} />
          </motion.div>
          {/* Mangalam symbol */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <MangalamSymbol size={50} color="#C9A84C" opacity={0.4} />
          </motion.div>
          {/* Ornamental top line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
          />
          {/* Lotus divider near bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <LotusDivider color="#C9A84C" width={200} opacity={0.4} />
          </motion.div>
        </>
      )}

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Telugu blessing */}
        {phase === "full" && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="tracking-[0.2em] mb-5"
            style={{ color: "#C9A84C", fontFamily: "'Cinzel', serif", fontWeight: 400, fontSize: "clamp(1.2rem, 3.5vw, 2rem)" }}
          >
            ॐ · శ్రీరస్తు శుభమస్తు · ॐ
          </motion.p>
        )}

        {/* Names */}
        {(phase === "names" || phase === "full") && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="gold-text leading-none"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(2.1rem, 7.5vw, 5rem)",
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
            >
              Harshini Reddy Salla
            </h1>
            <p
              className="gold-text"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(0.85rem, 2.4vw, 1.1rem)",
                fontStyle: "italic",
                fontWeight: 300,
                letterSpacing: "0.04em",
                marginTop: "0.5rem",
              }}
            >
              Daughter of Jeevan Reddy Salla &amp; Padma
            </p>
            <div className="my-2 text-4xl" style={{ color: "#C9A84C" }}>♾</div>
            <h1
              className="gold-text leading-none"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(2.1rem, 7.5vw, 5rem)",
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
            >
              Rahul Reddy Velpur
            </h1>
            <p
              className="gold-text"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(0.85rem, 2.4vw, 1.1rem)",
                fontStyle: "italic",
                fontWeight: 300,
                letterSpacing: "0.04em",
                marginTop: "0.5rem",
              }}
            >
              Son of Ravindhar Reddy Velpur &amp; Sathemma
            </p>
          </motion.div>
        )}

        {/* Tagline + CTA */}
        {phase === "full" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p
              className="mt-8 italic"
              style={{
                color: "#E8D5A3",
                fontSize: "clamp(1rem, 3vw, 1.5rem)",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                letterSpacing: "0.1em",
              }}
            >
              Two hearts, one forever — and Noah. 🐶
            </p>

            <div className="section-divider mt-6 mb-6" />

            <p
              className="tracking-[0.25em] text-sm"
              style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
            >
              NOVEMBER 2026
            </p>

            <motion.a
              href="#events"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block mt-10 px-8 py-3 text-sm tracking-[0.2em] cursor-pointer"
              style={{
                border: "1px solid #C9A84C",
                color: "#C9A84C",
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                textDecoration: "none",
                transition: "all 0.3s ease",
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
              ENTER OUR CELEBRATION
            </motion.a>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      {phase === "full" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p
            className="text-xs tracking-[0.3em]"
            style={{ color: "rgba(201,168,76,0.5)", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
          >
            SCROLL
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-8"
            style={{ background: "linear-gradient(180deg, #C9A84C, transparent)" }}
          />
        </motion.div>
      )}

      {/* Bottom border */}
      {phase === "full" && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
        />
      )}
    </section>
  );
}
