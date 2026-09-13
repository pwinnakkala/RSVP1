"use client";

import { motion } from "framer-motion";

const hotels = [
  {
    name: "Hotel Block (TBD)",
    tier: "Official Room Block",
    distance: "~5 min to venue",
    price: "Room block rate — details coming",
    note: "We are securing a room block for guests. Code and booking link will be shared via email.",
    icon: "🏨",
  },
  {
    name: "Marriott / Hilton Properties",
    tier: "Recommended",
    distance: "10–15 min to venue",
    price: "Varies by date",
    note: "Several major hotel brands are within easy distance. Book early — November weekends fill up fast.",
    icon: "⭐",
  },
  {
    name: "Airbnb / VRBO",
    tier: "For Families & Groups",
    distance: "Varies",
    price: "Great for groups",
    note: "If you're travelling with family, renting a house together can be more comfortable and economical.",
    icon: "🏡",
  },
];

const airports = [
  {
    code: "DFW",
    name: "Dallas/Fort Worth International",
    note: "Largest hub — most international & domestic connections",
    icon: "✈️",
  },
  {
    code: "DAL",
    name: "Dallas Love Field",
    note: "Smaller, closer to city — Southwest Airlines hub",
    icon: "✈️",
  },
  {
    code: "AUS",
    name: "Austin-Bergstrom International",
    note: "Good option if staying in Austin area",
    icon: "✈️",
  },
];

export default function TravelSection() {
  return (
    <section
      id="travel"
      className="py-16 px-6 relative"
      style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #0F0800 100%)" }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #C9A84C 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
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
            GETTING HERE
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
            Travel &amp; Stay
          </h2>
          <div className="section-divider mt-6 mb-6" />
          <p
            className="italic text-lg"
            style={{ color: "#E8D5A3", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            We want you here — let us make it easy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Hotels */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px 200px 0px" }}
              className="mb-8 text-xs tracking-[0.25em]"
              style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
            >
              🏨 WHERE TO STAY
            </motion.h3>
            <div className="space-y-4">
              {hotels.map((hotel, i) => (
                <motion.div
                  key={hotel.name}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px 200px 0px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-5 relative"
                  style={{
                    border: "1px solid rgba(201,168,76,0.2)",
                    background: "rgba(201,168,76,0.04)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{hotel.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h4
                          style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: "0.95rem",
                            color: "#E8D5A3",
                            fontWeight: 400,
                          }}
                        >
                          {hotel.name}
                        </h4>
                        <span
                          className="text-xs px-2 py-1"
                          style={{
                            background: "rgba(201,168,76,0.15)",
                            color: "#C9A84C",
                            fontFamily: "'Lato', sans-serif",
                            fontWeight: 300,
                          }}
                        >
                          {hotel.tier}
                        </span>
                      </div>
                      <p
                        className="text-xs mt-1 mb-2"
                        style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                      >
                        {hotel.distance} · {hotel.price}
                      </p>
                      <p
                        className="text-sm italic"
                        style={{ color: "#B0A080", fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {hotel.note}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Airports + tips */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px 200px 0px" }}
              className="mb-8 text-xs tracking-[0.25em]"
              style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
            >
              ✈️ NEAREST AIRPORTS
            </motion.h3>
            <div className="space-y-4 mb-10">
              {airports.map((ap, i) => (
                <motion.div
                  key={ap.code}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px 200px 0px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-4 flex items-start gap-4"
                  style={{
                    border: "1px solid rgba(201,168,76,0.2)",
                    background: "rgba(201,168,76,0.04)",
                  }}
                >
                  <span
                    className="text-sm font-bold mt-1"
                    style={{
                      color: "#C9A84C",
                      fontFamily: "'Cinzel', serif",
                      minWidth: "2.5rem",
                    }}
                  >
                    {ap.code}
                  </span>
                  <div>
                    <p
                      style={{ color: "#E8D5A3", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
                    >
                      {ap.name}
                    </p>
                    <p
                      className="text-sm italic mt-1"
                      style={{ color: "#B0A080", fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {ap.note}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tips box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 200px 0px" }}
              className="p-6"
              style={{
                background: "rgba(201,168,76,0.06)",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              <p
                className="text-xs tracking-[0.2em] mb-4"
                style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
              >
                💡 TRAVEL TIPS
              </p>
              <ul className="space-y-2">
                {[
                  "Book flights & hotels as soon as possible — November is peak travel season",
                  "Rideshare (Uber/Lyft) widely available in the Dallas–Fort Worth area",
                  "We recommend arriving by Thursday, Nov 12 to enjoy all events comfortably — and if you can, come a day earlier on Wednesday, Nov 11 (Veterans Day). It's a holiday for many, so travelling that day may be easier and more relaxed.",
                  "Questions? Reach out via the contact on the RSVP form",
                ].map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "#B0A080", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem" }}
                  >
                    <span style={{ color: "#C9A84C", marginTop: "2px" }}>◆</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
