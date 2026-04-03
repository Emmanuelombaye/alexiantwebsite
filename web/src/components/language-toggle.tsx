"use client";

import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  { code: "en",  label: "English",  flag: "🇬🇧", native: "English" },
  { code: "nl",  label: "Dutch",    flag: "🇳🇱", native: "Nederlands" },
  { code: "fr",  label: "French",   flag: "🇫🇷", native: "Français" },
  { code: "it",  label: "Italian",  flag: "🇮🇹", native: "Italiano" },
  { code: "de",  label: "German",   flag: "🇩🇪", native: "Deutsch" },
];

// Set the googtrans cookie that Google Translate widget reads
// Format: /en/fr — tells GT to translate from English to target
function setGoogTransCookie(langCode: string) {
  const value = langCode === "en" ? "" : `/en/${langCode}`;
  // Set on current domain and root path
  document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname}`;
  document.cookie = `googtrans=${value}; path=/`;
}

type LanguageToggleProps = { scrolled?: boolean };

export function LanguageToggle({ scrolled = false }: LanguageToggleProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(LANGUAGES[0]);
  const ref = useRef<HTMLDivElement>(null);

  // Read current cookie on mount to sync active state
  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/([a-z]+)/);
    if (match) {
      const found = LANGUAGES.find(l => l.code === match[1]);
      if (found) setActive(found);
    }
  }, []);

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
    setGoogTransCookie(lang.code);
    // Reload page — Google Translate widget picks up the cookie and translates
    window.location.reload();
  }

  const btnBase = "flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer";
  const btnStyle = scrolled
    ? `${btnBase} border-slate-200 bg-white text-slate-700 hover:border-[#D4AF37] hover:text-[#046A38]`
    : `${btnBase} border-[#D4AF37]/40 bg-[#022c22]/80 text-white hover:border-[#D4AF37] hover:bg-[#022c22]`;

  return (
    <div ref={ref} className="relative z-50">
      <button onClick={() => setOpen(!open)} className={btnStyle}>
        <span>{active.flag}</span>
        <span className="hidden sm:inline">{active.label}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-[#D4AF37]/20 bg-[#022c22] shadow-2xl overflow-hidden">
          <div className="px-4 py-2 border-b border-white/5">
            <p className="text-[0.5rem] font-bold uppercase tracking-widest text-white/30">Select Language</p>
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => select(lang)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-[0.65rem] font-bold transition-all hover:bg-[#D4AF37]/10 ${
                active.code === lang.code
                  ? "text-[#D4AF37] bg-[#D4AF37]/5"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <span className="text-base leading-none">{lang.flag}</span>
              <div className="flex flex-col items-start leading-tight">
                <span className="uppercase tracking-[0.12em] text-[0.6rem]">{lang.label}</span>
                <span className="text-[0.5rem] text-white/30 normal-case">{lang.native}</span>
              </div>
              {active.code === lang.code && (
                <span className="ml-auto text-[#D4AF37] text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
