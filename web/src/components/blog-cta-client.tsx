"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/lib/i18n/context";

type BlogCtaClientProps = {
  phone: string;
  phoneHref: string;
};

export function BlogCtaClient({ phone, phoneHref }: BlogCtaClientProps) {
  const { t } = useLang();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-[#011611] rounded-[3.5rem] p-12 md:p-16 lg:p-24 text-center overflow-hidden border border-[#D4AF37]/15 shadow-[0_40px_80px_rgba(1,22,17,0.4)] max-w-5xl mx-auto"
    >
      {/* Cinematic Perspective Animation (Enhanced Ken Burns) */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-br from-[#022c22] via-[#011611] to-black opacity-85 z-10" />
         <motion.div 
           animate={{ 
             scale: [1.1, 1.25, 1.1],
             x: [-10, 10, -10],
             y: [-5, 5, -5]
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-30 mix-blend-overlay"
         />
      </div>

      {/* DRifting Luminous Orbs (Luxury Depth) */}
      <motion.div 
        animate={{ 
          x: [-20, 20, -20],
          y: [-10, 10, -10],
          scale: [0.8, 1.2, 0.8],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-[#D4AF37] blur-[100px] z-0"
      />
      <motion.div 
        animate={{ 
          x: [20, -20, 20],
          y: [10, -10, 10],
          scale: [1.2, 0.8, 1.2],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-emerald-500 blur-[100px] z-0"
      />
      
      <div className="relative z-10 space-y-10">
         <motion.div
           initial={{ opacity: 0, y: 15 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2, duration: 0.6 }}
         >
           <span className="inline-flex items-center gap-3 backdrop-blur-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-6 py-2.5 rounded-full text-[#D4AF37] text-[0.65rem] font-black uppercase tracking-[0.45em] shadow-[0_10px_30px_rgba(212,175,55,0.1)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              Strategic Access
           </span>
         </motion.div>

         <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4, duration: 0.6 }}
           className="font-display text-4xl md:text-6xl font-medium text-white italic leading-[1.05] tracking-tight"
         >
            Secure Your Place in <br />
            <span className="text-[#D4AF37] not-italic font-black tracking-tighter drop-shadow-2xl">Coastal History.</span>
         </motion.h2>

         <motion.p 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6, duration: 0.6 }}
           className="max-w-2xl mx-auto text-white/50 text-base md:text-lg font-medium italic leading-relaxed opacity-80"
         >
            The most exclusive opportunities are rarely published. Engage our advisors for a private consultation on the current state of the market.
         </motion.p>

         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.8, duration: 0.6 }}
           className="flex flex-col sm:flex-row justify-center gap-6 pt-6"
         >
            <Link href="/contact" className="group/btn h-16 flex items-center justify-center rounded-full bg-[#046A38] px-12 text-[0.7rem] font-black uppercase tracking-[0.3em] text-white shadow-2xl hover:-translate-y-1.5 transition-all duration-500 border border-emerald-400/30 relative overflow-hidden">
            <span className="relative z-10 text-white">{t("blog_consult")}</span>
               <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-[#046A38] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </Link>
            <a href={phoneHref} className="h-16 flex items-center justify-center rounded-full border border-white/80 bg-white px-12 text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#046A38] hover:bg-[#046A38] hover:text-white hover:border-[#046A38] transition-all duration-500 hover:-translate-y-1.5 shadow-[0_8px_30px_rgba(255,255,255,0.15)]">
               Call: {phone}
            </a>
         </motion.div>
      </div>

      {/* Glassmorphic Shimmer (Executive Modern) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
         <motion.div 
           animate={{ 
             left: ["-100%", "200%"]
           }}
           transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
           className="absolute top-0 bottom-0 w-64 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
         />
      </div>
    </motion.div>
  );
}
