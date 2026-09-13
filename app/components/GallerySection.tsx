"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Real photos live in /public/gallery.
const galleryItems = [
  { id: 1, alt: "Harshini & Rahul with Noah", src: "/gallery/couple-noah-1-new.jpg", placeholder: false, aspect: "portrait" },
  { id: 2, alt: "Harshini & Rahul relaxing with Noah", src: "/gallery/couple-noah-2.jpg", placeholder: false, aspect: "landscape" },
  { id: 3, alt: "Harshini & Rahul at the Grand Canyon", src: "/gallery/couple-grandcanyon.jpg", placeholder: false, aspect: "portrait" },
  { id: 4, alt: "Harshini & Rahul — Halloween pumpkins", src: "/gallery/couple-halloween.jpg", placeholder: false, aspect: "portrait" },
  { id: 5, alt: "Harshini & Rahul lounging with Noah", src: "/gallery/couple-noah-5.jpg", placeholder: false, aspect: "landscape" },
  { id: 6, alt: "Harshini & Rahul holding Noah outdoors", src: "/gallery/couple-noah-4.jpg", placeholder: false, aspect: "portrait" },
  { id: 7, alt: "Harshini & Rahul laughing with Noah", src: "/gallery/couple-noah-6.jpg", placeholder: false, aspect: "landscape" },
];

const gradients = [
  "linear-gradient(135deg, #1B4332, #2D6A4F)",
  "linear-gradient(135deg, #7C2D12, #EA580C)",
  "linear-gradient(135deg, #1A0A00, #3D2314)",
  "linear-gradient(135deg, #020014, #1A1040)",
  "linear-gradient(135deg, #2D1B69, #7C3AED)",
  "linear-gradient(135deg, #0C1A2E, #1E3A5F)",
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="py-16 px-6 relative overflow-hidden"
      style={{ background: "var(--ivory)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
      />

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
            OUR MOMENTS
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
            Gallery
          </h2>
          <div className="section-divider mt-6 mb-6" />
          <p
            className="italic text-lg"
            style={{ color: "#5C4A2A", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            A few of our favourite moments — with more to come.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px 200px 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setLightbox(i)}
              className="relative cursor-pointer overflow-hidden group"
              style={{
                aspectRatio: item.aspect === "portrait" ? "3/4" : "4/3",
                background: gradients[i % gradients.length],
              }}
            >
              {/* Real image or placeholder */}
              {!item.placeholder && item.src ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div
                    className="text-4xl mb-3 opacity-30"
                    style={{ color: "#C9A84C" }}
                  >
                    ♾
                  </div>
                  <p
                    className="text-xs tracking-[0.15em] opacity-30 text-center px-4"
                    style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                  >
                    PHOTO COMING SOON
                  </p>
                </div>
              )}

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(201,168,76,0.15)" }}
              >
                <span
                  className="text-2xl"
                  style={{ color: "#C9A84C" }}
                >
                  ↗
                </span>
              </div>

              {/* Corner accents */}
              <span className="absolute top-2 left-2 w-3 h-3 border-t border-l opacity-40" style={{ borderColor: "#C9A84C" }} />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r opacity-40" style={{ borderColor: "#C9A84C" }} />
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: "rgba(0,0,0,0.92)" }}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full"
                style={{
                  aspectRatio: galleryItems[lightbox].aspect === "portrait" ? "3/4" : "4/3",
                  background: gradients[lightbox % gradients.length],
                  maxHeight: "80vh",
                }}
              >
                {!galleryItems[lightbox].placeholder && galleryItems[lightbox].src ? (
                  <img
                    src={galleryItems[lightbox].src}
                    alt={galleryItems[lightbox].alt}
                    className="absolute inset-0 w-full h-full object-contain"
                    style={{ background: "#0A0A0A" }}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-6xl mb-4" style={{ color: "#C9A84C", opacity: 0.3 }}>♾</div>
                    <p
                      className="text-sm tracking-[0.2em] opacity-30"
                      style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif" }}
                    >
                      PHOTO COMING SOON
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center"
                  style={{
                    background: "rgba(201,168,76,0.2)",
                    border: "1px solid #C9A84C",
                    color: "#C9A84C",
                    cursor: "pointer",
                    fontFamily: "'Lato', sans-serif",
                  }}
                  aria-label="Close lightbox"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
