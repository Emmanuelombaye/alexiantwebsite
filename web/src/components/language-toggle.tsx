"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English",    flag: "🇬🇧", wa: "" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱", wa: "Hallo, ik spreek Nederlands en heb interesse in uw vastgoed." },
  { code: "fr", label: "Français",   flag: "🇫🇷", wa: "Bonjour, je parle français et je suis intéressé par vos propriétés." },
  { code: "it", label: "Italiano",   flag: "🇮🇹", wa: "Buongiorno, parlo italiano e sono interessato alle vostre proprietà." },
  { code: "de", label: "Deutsch",    flag: "🇩🇪", wa: "Hallo, ich spreche Deutsch und interessiere mich für Ihre Immobilien." },
];

const WA_BASE = "https://wa.me/254759636615?text=";

type LanguageToggleProps = { scrolled?: boolean };

export function LanguageToggle({ scrolled = false }: LanguageToggleProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const btnStyle = scrolled
    ? "flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:border-[#D4AF37] hover:text-[#046A38] transition-all duration-300"
    : "flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#022c22]/80 px-3 py-1.5 text-white hover:border-[#D4AF37] hover:bg-[#022c22] transition-all duration-300";

  return (
    <div ref={ref} className="relative z-50">
      <button onClick={() => setOpen(v => !v)} className={btnStyle} aria-label="Language">
        <Globe className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] hidden sm:inline">Lang</span>
        <svg className={`w-3 h-3 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-[#D4AF37]/20 bg-[#022c22] shadow-2xl overflow-hidden">
          <div className="px-4 py-2.5 border-b border-white/5">
            <p className="text-[0.5rem] font-bold uppercase tracking-widest text-white/40">Speak to us in your language</p>
          </div>

          {LANGUAGES.map((lang) => {
            const href = lang.wa
              ? `${WA_BASE}${encodeURIComponent(lang.wa)}`
              : `${WA_BASE}${encodeURIComponent("Hello, I am interested in your properties.")}`;

            return (
              <a
                key={lang.code}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-[#D4AF37]/10 transition-all duration-200 group"
              >
                <span className="text-lg leading-none">{lang.flag}</span>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] group-hover:text-[#D4AF37] transition-colors">
                  {lang.label}
                </span>
                <span className="ml-auto text-[0.5rem] text-white/20 group-hover:text-[#D4AF37]/60 transition-colors">WhatsApp →</span>
              </a>
            );
          })}

          <div className="px-4 py-2.5 border-t border-white/5">
            <p className="text-[0.45rem] text-white/20 leading-relaxed">
              Our advisors respond in your language within 30 minutes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
