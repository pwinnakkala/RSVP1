"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 200px 0px" }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center"
    >
      <div
        className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center gold-border"
        style={{
          background: "rgba(201,168,76,0.05)",
        }}
      >
        {/* Corner accents */}
        <span className="absolute top-1 left-1 w-2 h-2 border-t border-l" style={{ borderColor: "#C9A84C" }} />
        <span className="absolute top-1 right-1 w-2 h-2 border-t border-r" style={{ borderColor: "#C9A84C" }} />
        <span className="absolute bottom-1 left-1 w-2 h-2 border-b border-l" style={{ borderColor: "#C9A84C" }} />
        <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r" style={{ borderColor: "#C9A84C" }} />

        <motion.span
          key={value}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="gold-text"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            fontWeight: 500,
          }}
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </div>
      <p
        className="mt-3 tracking-[0.25em] text-xs"
        style={{
          color: "#C9A84C",
          fontFamily: "'Lato', sans-serif",
          fontWeight: 300,
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}

export default function CountdownSection() {
  // Wedding date: November 15, 2026 — Noon
  const weddingDate = new Date("2026-11-15T12:00:00");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(weddingDate));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(weddingDate));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="countdown"
      className="py-16 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #0F0800 100%)" }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, #C9A84C 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px 200px 0px" }}
          className="tracking-[0.3em] mb-4"
          style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "clamp(0.9rem, 2.5vw, 1.4rem)" }}
        >
          THE CELEBRATION BEGINS IN
        </motion.p>

        <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
          <CountUnit value={timeLeft.days} label="DAYS" />

          <span className="gold-text text-4xl mb-6 font-light">·</span>

          <CountUnit value={timeLeft.hours} label="HOURS" />

          <span className="gold-text text-4xl mb-6 font-light">·</span>

          <CountUnit value={timeLeft.minutes} label="MINUTES" />

          <span className="gold-text text-4xl mb-6 font-light">·</span>

          <CountUnit value={timeLeft.seconds} label="SECONDS" />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px 200px 0px" }}
          transition={{ delay: 0.3 }}
          className="mt-8 tracking-[0.15em]"
          style={{
            color: "#C9A84C",
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
            fontWeight: 400,
          }}
        >
          November 12–15, 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "0px 0px 200px 0px" }}
          transition={{ duration: 1, delay: 0.4 }}
          className="section-divider mt-12"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px 200px 0px" }}
          transition={{ delay: 0.6 }}
          className="mt-6 italic"
          style={{
            color: "#E8D5A3",
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)",
          }}
        >
          Save the date and join us!
        </motion.p>
      </div>
    </section>
  );
}
