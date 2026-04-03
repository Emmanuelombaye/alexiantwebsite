"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PhoneCall } from "lucide-react";
import { useLang } from "@/lib/i18n/context";

export function RequestCallBackModal() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      interest: fd.get("interest"),
      message: fd.get("message") || "Request for call back.",
    };
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit.");
      setStatus("success");
      setMessage("Thank you! An advisor will call you back shortly.");
      setTimeout(() => { setOpen(false); setStatus("idle"); setMessage(""); }, 3000);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or call us directly.");
    }
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="group relative overflow-hidden rounded-full border border-[#D4AF37] px-6 py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-[#011611] flex items-center justify-center gap-3 w-fit shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
      >
        <PhoneCall className="w-4 h-4" />
        <span className="relative z-10">{t("footer_callback")}</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-4 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[61] w-full sm:max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] bg-[#011611] border border-[#D4AF37]/20 shadow-2xl overflow-hidden"
            >
              {/* Gold top bar */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <span className="text-[0.5rem] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60 block mb-2">Private Advisory</span>
                    <h2 className="font-display text-2xl font-semibold italic text-white leading-tight">
                      Request a <span className="not-italic font-black text-[#D4AF37]">Call Back</span>
                    </h2>
                    <p className="text-white/40 text-xs mt-2 font-light">We respond within 30 minutes during office hours.</p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {status === "success" ? (
                  <div className="py-10 text-center">
                    <div className="text-4xl mb-4">✅</div>
                    <p className="text-white font-bold text-lg">{message}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[0.55rem] font-black uppercase tracking-widest text-[#D4AF37]/60 block mb-1.5">Full Name *</label>
                        <input name="name" required placeholder="Your name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="text-[0.55rem] font-black uppercase tracking-widest text-[#D4AF37]/60 block mb-1.5">Phone *</label>
                        <input name="phone" required type="tel" placeholder="+254 7XX XXX XXX" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[0.55rem] font-black uppercase tracking-widest text-[#D4AF37]/60 block mb-1.5">Email</label>
                      <input name="email" type="email" placeholder="your@email.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="text-[0.55rem] font-black uppercase tracking-widest text-[#D4AF37]/60 block mb-1.5">I&apos;m interested in</label>
                      <select name="interest" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D4AF37]/50 focus:outline-none transition-colors">
                        <option value="Buying property" className="bg-[#022c22]">Buying property</option>
                        <option value="Selling property" className="bg-[#022c22]">Selling property</option>
                        <option value="Renting" className="bg-[#022c22]">Renting</option>
                        <option value="Investment advice" className="bg-[#022c22]">Investment advice</option>
                        <option value="Property valuation" className="bg-[#022c22]">Property valuation</option>
                      </select>
                    </div>
                    {status === "error" && (
                      <p className="text-rose-400 text-xs font-bold">{message}</p>
                    )}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full h-14 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#011611] text-[0.7rem] font-black uppercase tracking-[0.25em] shadow-xl hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] transition-all hover:scale-[1.02] disabled:opacity-60 mt-2"
                    >
                      {status === "submitting" ? t("lead_sending") : t("request_callback")}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
