"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, X } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English",    native: "English",     flag: "GB", wa: "Hello, I am interested in your coastal properties in Diani." },
  { code: "nl", label: "Dutch",      native: "Nederlands",  flag: "NL", wa: "Hallo, ik spreek Nederlands en heb interesse in uw vastgoed in Diani." },
  { code: "fr", label: "French",     native: "Francais",    flag: "FR", wa: "Bonjour, je parle francais et je suis interesse par vos proprietes a Diani." },
  { code: "it", label: "Italian",    native: "Italiano",    flag: "IT", wa: "Buongiorno, parlo italiano e sono interessato alle vostre proprieta a Diani." },
  { code: "de", label: "German",     native: "Deutsch",     flag: "DE", wa: "Hallo, ich spreche Deutsch und interessiere mich fuer Ihre Immobilien in Diani." },
];

const FLAG_EMOJIS: Record<string, string> = {
  GB: String.fromCodePoint(0x1F1EC, 0x1F1E7),
  NL: String.fromCodePoint(0x1F1F3, 0x1F1F1),
  FR: String.fromCodePoint(0x1F1EB, 0x1F1F7),
  IT: String.fromCodePoint(0x1F1EE, 0x1F1F9),
  DE: String.fromCodePoint(0x1F1E9, 0x1F1EA),
};

const WA_BASE = "https://wa.me/254759636615?text=";

type Props = { scrolled?: boolean };

export function LanguageToggle({ scrolled = false }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const btnStyle = scrolled
    ? "flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-600 hover:border-[#D4AF37] hover:text-[#046A38] transition-all duration-200"
    : "flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#022c22]/80 px-3 py-1.5 text-white hover:border-[#D4AF37] hover:bg-[#022c22] transition-all duration-200";

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[48] bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div ref={ref} className="relative z-[49]">
        <button
          onClick={() => setOpen(v => !v)}
          className={btnStyle}
          aria-label="Language options"
          aria-expanded={open}
        >
          <Globe className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] hidden sm:inline">Lang</span>
          <svg
            className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="
            absolute right-0 top-full mt-2 w-56
            rounded-2xl border border-[#D4AF37]/20 bg-[#011611]
            shadow-[0_20px_60px_rgba(0,0,0,0.5)]
            overflow-hidden
            max-h-[80vh] overflow-y-auto
          ">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <p className="text-[0.5rem] font-black uppercase tracking-widest text-[#D4AF37]/60">
                Contact us in your language
              </p>
              <button
                onClick={() => setOpen(false)}
                className="text-white/30 hover:text-white transition-colors ml-2"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Language list */}
            {LANGUAGES.map((lang) => (
              <a
                key={lang.code}
                href={`${WA_BASE}${encodeURIComponent(lang.wa)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-[#D4AF37]/10 transition-colors duration-150 group border-b border-white/[0.03] last:border-0"
              >
                <span className="text-xl leading-none w-7 text-center flex-shrink-0">
                  {FLAG_EMOJIS[lang.flag]}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[0.7rem] font-bold text-white group-hover:text-[#D4AF37] transition-colors tracking-wide">
                    {lang.label}
                  </span>
                  <span className="text-[0.55rem] text-white/30 font-medium">
                    {lang.native}
                  </span>
                </div>
                <span className="ml-auto text-[0.5rem] text-white/20 group-hover:text-[#D4AF37]/50 transition-colors flex-shrink-0">
                  WhatsApp
                </span>
              </a>
            ))}

            {/* Footer note */}
            <div className="px-4 py-2.5 bg-[#D4AF37]/5 border-t border-[#D4AF37]/10">
              <p className="text-[0.45rem] text-white/30 leading-relaxed text-center">
                Our advisors reply in your language within 30 min
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
