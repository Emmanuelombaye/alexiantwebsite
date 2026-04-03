"use client";

import { FormEvent, useState } from "react";
import type { LeadIntent } from "@/types/lead";
import { useLang } from "@/lib/i18n/context";

type LeadFormProps = {
  propertySlug?: string;
  heading?: string;
  className?: string;
  dark?: boolean;
};

export function LeadForm({ propertySlug, heading = "Request a consultation", className = "", dark = true }: LeadFormProps) {
  const { t } = useLang();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      intent: String(formData.get("intent") || "buy") as LeadIntent,
      propertySlug,
      message: String(formData.get("message") || ""),
      // Honeypot — should always be empty for real humans
      _honey: String(formData.get("_honey") || ""),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "We could not submit your request.");
      }

      setStatus("success");
      setMessage(result.message || "Your request has been received.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  const textColor = dark ? "text-white" : "text-slate-900";
  const mutedTextColor = dark ? "text-white/40" : "text-slate-500";
  const inputBg = dark ? "bg-white/5" : "bg-white/60 backdrop-blur-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]";
  const inputBorder = dark ? "border-white/10" : "border-white/80";
  const placeholderColor = dark ? "placeholder:text-white/25" : "placeholder:text-slate-400";

  return (
    <div className={`relative overflow-hidden p-8 md:p-10 ${className}`}>
      <div className="relative z-10">
        {propertySlug ? (
          <div className={`mb-6 inline-flex items-center gap-2 rounded-[1rem] ${dark ? 'bg-white/5 border-[#D4AF37]/20' : 'bg-[#D4AF37]/5 border-[#D4AF37]/30'} border px-4 py-2`}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#D4AF37]/80">Reference: {propertySlug}</p>
          </div>
        ) : null}

        <p className={`mb-8 text-[0.9rem] leading-relaxed ${mutedTextColor} font-light`}>
          Share your requirements and Alexiant will respond with availability, viewing options and the next best properties to consider.
        </p>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          {/* Honeypot — invisible to real users, bots fill this automatically */}
          <input
            name="_honey"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }}
          />
          <input 
            name="name" 
            required 
            placeholder={t("lead_name")} 
            className={`w-full rounded-2xl border ${inputBorder} ${inputBg} px-5 py-4 ${textColor} text-[0.9rem] outline-none transition-all duration-300 ${placeholderColor} focus:border-[#D4AF37]/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.1)]`} 
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input 
              name="email" 
              type="email" 
              required 
              placeholder={t("lead_email")} 
              className={`w-full rounded-2xl border ${inputBorder} ${inputBg} px-5 py-4 ${textColor} text-[0.9rem] outline-none transition-all duration-300 ${placeholderColor} focus:border-[#D4AF37]/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.1)]`} 
            />
            <input 
              name="phone" 
              required 
              placeholder={t("lead_phone")} 
              className={`w-full rounded-2xl border ${inputBorder} ${inputBg} px-5 py-4 ${textColor} text-[0.9rem] outline-none transition-all duration-300 ${placeholderColor} focus:border-[#D4AF37]/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.1)]`} 
            />
          </div>

          <div className="relative">
            <select 
              name="intent" 
              className={`w-full appearance-none rounded-2xl border ${inputBorder} ${inputBg} px-5 py-4 ${dark ? 'text-white/70' : 'text-slate-600'} text-[0.9rem] outline-none transition-all duration-300 focus:border-[#D4AF37]/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.1)] cursor-pointer`}
            >
              <option value="buy" className={dark ? "bg-[#1a1a1f] text-white" : "text-slate-900"}>I want to buy</option>
              <option value="rent" className={dark ? "bg-[#1a1a1f] text-white" : "text-slate-900"}>I want to rent</option>
              <option value="sell" className={dark ? "bg-[#1a1a1f] text-white" : "text-slate-900"}>I want to sell</option>
              <option value="invest" className={dark ? "bg-[#1a1a1f] text-white" : "text-slate-900"}>I want to invest</option>
            </select>
            <div className={`pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 ${dark ? 'text-white/30' : 'text-slate-400'}`}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <textarea 
            name="message" 
            required 
            rows={3} 
            placeholder={t("lead_message")} 
            className={`w-full rounded-2xl border ${inputBorder} ${inputBg} px-5 py-4 ${textColor} text-[0.9rem] outline-none transition-all duration-300 ${placeholderColor} focus:border-[#D4AF37]/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.1)] resize-none`} 
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] px-8 py-4 text-[0.65rem] font-black uppercase tracking-[0.3em] text-[#0f0f12] shadow-[0_10px_30px_rgba(212,175,55,0.2)] transition-all duration-500 hover:shadow-[0_14px_40px_rgba(212,175,55,0.35)] hover:scale-[1.02] disabled:opacity-60 group"
            >
              {status === "loading" ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0f0f12]/30 border-t-[#0f0f12]" />
                  Processing...
                </>
              ) : (
                <>
                  {t("lead_submit")}
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0f0f12]/15 transition-transform group-hover:translate-x-1">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </>
              )}
            </button>
          </div>

          {message ? (
            <div className={`mt-2 rounded-2xl p-4 text-center text-[0.8rem] font-bold border ${
              status === "success" 
                ? "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20" 
                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
            }`}>
              {message}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}