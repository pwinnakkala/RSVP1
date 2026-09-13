"use client";

import { motion } from "framer-motion";

// Gift-card options. Replace `href` with your real registry / gift links.
const giftOptions = [
  {
    icon: "🎁",
    name: "Amazon Gift Card",
    note: "Help us build our new home together.",
    href: "https://www.amazon.com/gift-cards",
  },
  {
    icon: "💳",
    name: "Visa Gift Card",
    note: "Your choice — for anything we may need.",
    href: "https://www.giftcards.com/visa-gift-cards",
  },
];

export default function RegistrySection() {
  return (
    <section
      id="registry"
      className="py-16 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0F0800 0%, #0A0A0A 100%)" }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #C9A84C 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 200px 0px" }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p
            className="tracking-[0.3em] text-xs mb-4"
            style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
          >
            WITH LOVE &amp; GRATITUDE
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
            Find the Perfect Gift
          </h2>
          <div className="section-divider mt-6 mb-6" />
          <p
            className="italic mx-auto"
            style={{
              color: "#E8D5A3",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(1.05rem, 2.6vw, 1.35rem)",
              maxWidth: "640px",
              lineHeight: 1.7,
            }}
          >
            Your presence at our celebration is the greatest gift of all. But if you
            wish to bless us with something more, a gift card toward our new life
            together would be warmly appreciated.
          </p>
        </motion.div>

        {/* Gift cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {giftOptions.map((gift, i) => (
            <motion.a
              key={gift.name}
              href={gift.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 200px 0px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-8 relative block"
              style={{
                background: "rgba(201,168,76,0.05)",
                border: "1px solid rgba(201,168,76,0.25)",
                textDecoration: "none",
              }}
            >
              <span className="absolute top-2 left-2 w-3 h-3 border-t border-l" style={{ borderColor: "#C9A84C" }} />
              <span className="absolute top-2 right-2 w-3 h-3 border-t border-r" style={{ borderColor: "#C9A84C" }} />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l" style={{ borderColor: "#C9A84C" }} />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r" style={{ borderColor: "#C9A84C" }} />

              <div className="text-4xl mb-4">{gift.icon}</div>
              <h3
                className="mb-3"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "1.05rem",
                  color: "#E8D5A3",
                  fontWeight: 400,
                }}
              >
                {gift.name}
              </h3>
              <p
                className="text-sm italic mb-5"
                style={{ color: "#B0A080", fontFamily: "'Cormorant Garamond', serif" }}
              >
                {gift.note}
              </p>
              <span
                className="inline-block text-xs tracking-[0.15em] px-4 py-2"
                style={{
                  border: "1px solid rgba(201,168,76,0.4)",
                  color: "#C9A84C",
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                }}
              >
                SHOP GIFT CARD →
              </span>
            </motion.a>
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px 200px 0px" }}
          transition={{ delay: 0.4 }}
          className="mt-12 italic"
          style={{ color: "rgba(201,168,76,0.6)", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        >
          Thank you for your love. 🐶
        </motion.p>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
      />
    </section>
  );
}
