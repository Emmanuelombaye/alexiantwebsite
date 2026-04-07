"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="flex flex-col gap-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={false}
              animate={isOpen ? "open" : "closed"}
              className="relative"
            >
              {/* Card */}
              <motion.div
                variants={{
                  open: {
                    boxShadow: "0 20px 60px rgba(212,175,55,0.12), 0 4px 20px rgba(0,0,0,0.3)",
                  },
                  closed: {
                    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  },
                }}
                transition={{ duration: 0.4 }}
                className={`relative overflow-hidden rounded-2xl border transition-colors duration-500 ${
                  isOpen
                    ? "border-[#D4AF37]/40 bg-white/[0.07]"
                    : "border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12] hover:bg-white/[0.05]"
                }`}
              >
                {/* Gold top line — slides in when open */}
                <motion.div
                  variants={{ open: { scaleX: 1, opacity: 1 }, closed: { scaleX: 0, opacity: 0 } }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                  className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-transparent"
                />

                {/* Question button */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center gap-4 px-5 py-5 sm:px-7 sm:py-6 text-left select-none touch-manipulation"
                  aria-expanded={isOpen}
                >
                  {/* Number badge */}
                  <motion.div
                    variants={{
                      open: { backgroundColor: "rgba(212,175,55,0.2)", borderColor: "rgba(212,175,55,0.6)", scale: 1.05 },
                      closed: { backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", scale: 1 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border"
                  >
                    <motion.span
                      variants={{ open: { color: "#D4AF37" }, closed: { color: "rgba(255,255,255,0.3)" } }}
                      transition={{ duration: 0.3 }}
                      className="text-[0.65rem] font-black tracking-wider"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.span>
                  </motion.div>

                  {/* Question text */}
                  <motion.h3
                    variants={{ open: { color: "#D4AF37" }, closed: { color: "rgba(255,255,255,0.9)" } }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 text-[0.95rem] sm:text-[1.05rem] font-bold leading-snug pr-2"
                  >
                    {faq.q}
                  </motion.h3>

                  {/* Toggle icon */}
                  <motion.div
                    variants={{
                      open: { rotate: 45, backgroundColor: "rgba(212,175,55,0.15)", borderColor: "rgba(212,175,55,0.4)" },
                      closed: { rotate: 0, backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" },
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-shrink-0 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border"
                  >
                    <motion.svg
                      variants={{ open: { color: "#D4AF37" }, closed: { color: "rgba(255,255,255,0.4)" } }}
                      transition={{ duration: 0.3 }}
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </motion.svg>
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -8 }}
                        animate={{ y: 0 }}
                        exit={{ y: -8 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="px-5 pb-6 sm:px-7 sm:pb-7 pl-[3.75rem] sm:pl-[5.25rem]"
                      >
                        {/* Gold divider */}
                        <div className="h-[1px] w-10 rounded-full bg-gradient-to-r from-[#D4AF37]/50 to-transparent mb-4" />
                        <p className="text-white/55 text-[0.9rem] sm:text-[0.95rem] leading-[1.8] font-light">
                          {faq.a}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Ambient corner glow */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-[#D4AF37]/[0.06] blur-2xl pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
