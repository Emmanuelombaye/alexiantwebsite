"use client";

import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ar", label: "العربية", flag: "🇦🇪" },
];

export function LanguageToggle() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(LANGUAGES[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function select(lang: typeof LANGUAGES[0]) {
    setActive(lang);
    setOpen(false);
    // Google Translate integration
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      select.value = lang.code;
      select.dispatchEvent(new Event("change"));
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white/5 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
      >
        <span>{active.flag}</span>
        <span className="hidden sm:inline">{active.label}</span>
        <svg className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-2xl border border-[#D4AF37]/20 bg-[#022c22] shadow-2xl overflow-hidden z-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => select(lang)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[0.65rem] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-[#D4AF37]/10 ${
                active.code === lang.code ? "text-[#D4AF37]" : "text-white/70"
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.label}</span>
              {active.code === lang.code && <span className="ml-auto text-[#D4AF37]">✓</span>}
            </button>
          ))}
        </div>
      )}

      {/* Hidden Google Translate element */}
      <div id="google_translate_element" className="hidden" />
    </div>
  );
}
