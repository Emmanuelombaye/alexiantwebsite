"use client";

import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "nl", label: "Dutch",   flag: "🇳🇱" },
  { code: "fr", label: "French",  flag: "🇫🇷" },
  { code: "it", label: "Italian", flag: "🇮🇹" },
  { code: "de", label: "German",  flag: "🇩🇪" },
];

type LanguageToggleProps = { scrolled?: boolean };

export function LanguageToggle({ scrolled = false }: LanguageToggleProps) {
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
    if (lang.code === "en") {
      // Remove translation — go back to original
      const url = new URL(window.location.href);
      url.searchParams.delete("_x_tr_sl");
      url.searchParams.delete("_x_tr_tl");
      url.searchParams.delete("_x_tr_hl");
      window.location.href = url.toString();
    } else {
      // Use Google Translate redirect — no scripts needed
      const current = encodeURIComponent(window.location.href);
      window.location.href = `https://translate.google.com/translate?sl=en&tl=${lang.code}&u=${current}`;
    }
  }

  const btnBase = "flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] transition-all duration-300";
  const btnStyle = scrolled
    ? `${btnBase} border-slate-200 bg-white text-slate-700 hover:border-[#D4AF37] hover:text-[#046A38]`
    : `${btnBase} border-[#D4AF37]/40 bg-[#022c22]/80 text-white hover:border-[#D4AF37] hover:bg-[#022c22]`;

  return (
    <div ref={ref} className="relative z-50">
      <button onClick={() => setOpen(!open)} className={btnStyle}>
        <span>{active.flag}</span>
        <span className="hidden sm:inline">{active.label}</span>
        <svg className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl border border-[#D4AF37]/20 bg-[#022c22] shadow-2xl overflow-hidden">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => select(lang)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[0.65rem] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-[#D4AF37]/10 ${
                active.code === lang.code ? "text-[#D4AF37] bg-[#D4AF37]/5" : "text-white/70"
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.label}</span>
              {active.code === lang.code && <span className="ml-auto text-[#D4AF37]">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
