"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { useLang } from "@/lib/i18n/context";
import type { LangCode } from "@/lib/i18n/translations";

const LANGUAGES: { code: LangCode; label: string; native: string; flag: string }[] = [
  { code: "en", label: "English",  native: "English",    flag: String.fromCodePoint(0x1F1EC, 0x1F1E7) },
  { code: "nl", label: "Dutch",    native: "Nederlands", flag: String.fromCodePoint(0x1F1F3, 0x1F1F1) },
  { code: "fr", label: "French",   native: "Francais",   flag: String.fromCodePoint(0x1F1EB, 0x1F1F7) },
  { code: "it", label: "Italian",  native: "Italiano",   flag: String.fromCodePoint(0x1F1EE, 0x1F1F9) },
  { code: "de", label: "German",   native: "Deutsch",    flag: String.fromCodePoint(0x1F1E9, 0x1F1EA) },
];

type Props = { scrolled?: boolean };

export function LanguageToggle({ scrolled = false }: Props) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function select(code: LangCode) {
    setLang(code);
    setOpen(false);
  }

  const btnStyle = scrolled
    ? "flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-600 hover:border-[#D4AF37] hover:text-[#046A38] transition-all duration-200"
    : "flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#022c22]/80 px-3 py-1.5 text-white hover:border-[#D4AF37] hover:bg-[#022c22] transition-all duration-200";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[48] bg-black/20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div ref={ref} className="relative z-[49]">
        <button onClick={() => setOpen(v => !v)} className={btnStyle} aria-label="Select language">
          <Globe className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-sm leading-none">{active.flag}</span>
          <svg className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl border border-[#D4AF37]/20 bg-[#011611] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => select(l.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-150 border-b border-white/[0.04] last:border-0 ${
                  active.code === l.code
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "text-white/70 hover:bg-[#D4AF37]/5 hover:text-white"
                }`}
              >
                <span className="text-lg leading-none w-6 text-center">{l.flag}</span>
                <div className="flex flex-col items-start">
                  <span className="text-[0.65rem] font-bold uppercase tracking-wide">{l.label}</span>
                  <span className="text-[0.5rem] opacity-40">{l.native}</span>
                </div>
                {active.code === l.code && <span className="ml-auto text-[#D4AF37] text-xs">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
