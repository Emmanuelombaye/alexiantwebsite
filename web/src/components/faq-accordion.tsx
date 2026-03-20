"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="max-w-3xl mx-auto grid gap-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={faq.q}
            className={`group relative overflow-hidden rounded-[1.5rem] border backdrop-blur-md transition-all duration-500 ${
              isOpen
                ? "bg-white/[0.1] border-[#D4AF37]/30 shadow-[0_16px_50px_rgba(212,175,55,0.1)]"
                : "bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.07] hover:border-[#D4AF37]/20"
            }`}
          >
            {/* Top gold shimmer */}
            <div
              className={`absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent transition-opacity duration-500 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Question button */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center gap-5 p-7 md:p-9 text-left cursor-pointer"
            >
              {/* Gold numbered circle */}
              <div
                className={`flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full border bg-gradient-to-br from-[#D4AF37]/15 to-[#D4AF37]/5 transition-all duration-500 ${
                  isOpen
                    ? "border-[#D4AF37]/60 shadow-[0_0_16px_rgba(212,175,55,0.15)]"
                    : "border-[#D4AF37]/30"
                }`}
              >
                <span className="text-sm font-extrabold text-[#D4AF37]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Question text */}
              <h3
                className={`flex-1 text-lg font-bold transition-colors duration-300 ${
                  isOpen ? "text-[#D4AF37]" : "text-white"
                }`}
              >
                {faq.q}
              </h3>

              {/* Plus / Minus toggle */}
              <div
                className={`flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 ${
                  isOpen
                    ? "border-[#D4AF37]/50 bg-[#D4AF37]/20 rotate-45"
                    : "border-white/20 bg-white/5 rotate-0"
                }`}
              >
                <svg
                  className={`h-4 w-4 transition-colors duration-300 ${
                    isOpen ? "text-[#D4AF37]" : "text-white/60"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </button>

            {/* Answer — collapsible */}
            <div
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight: isOpen ? "500px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="px-7 md:px-9 pb-8 pl-[5.25rem] md:pl-[6.25rem]">
                <div className="h-[1px] w-12 rounded-full bg-gradient-to-r from-[#D4AF37]/40 to-transparent mb-4" />
                <p className="text-white/60 leading-relaxed">{faq.a}</p>
              </div>
            </div>

            {/* Corner glow */}
            <div
              className={`absolute -bottom-4 -right-4 h-14 w-14 rounded-full bg-[#D4AF37]/[0.04] blur-xl transition-opacity duration-700 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}
