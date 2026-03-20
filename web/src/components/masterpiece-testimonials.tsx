"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/data/site-content";

export function MasterpieceTestimonials() {
  const testimonials = siteContent.testimonials;
  
  // Create a doubled array for infinity loop
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden py-16">
      {/* Luxury Fade Edges */}
      <div className="absolute inset-y-0 left-0 z-10 w-48 bg-gradient-to-r from-[#fafafa] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 z-10 w-48 bg-gradient-to-l from-[#fafafa] to-transparent pointer-events-none" />

      {/* Moving Marquee Container */}
      <div className="flex w-fit">
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 70, // Slightly slower for more prestige
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-8 px-6"
        >
          {doubledTestimonials.map((t: any, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 w-[400px] h-[370px] relative group"
            >
              {/* The Luxury Card — Gold foil border + deep emerald core */}
              <div className="h-full w-full rounded-[3rem] p-[1.5px] bg-gradient-to-br from-[#D4AF37] via-[#B8952F]/50 to-[#D4AF37]/30 shadow-[0_15px_50px_rgba(2,44,34,0.25)] transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(212,175,55,0.18)] group-hover:-translate-y-2">
                <div className="relative h-full w-full rounded-[2.95rem] bg-[linear-gradient(145deg,#011611_0%,#022c22_50%,#011e15_100%)] p-8 flex flex-col justify-between overflow-hidden">
                  
                  {/* Ambient corner glow */}
                  <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#D4AF37]/10 blur-[60px] group-hover:bg-[#D4AF37]/20 transition-colors duration-1000 pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#046A38]/20 blur-[50px] pointer-events-none" />
                  
                  {/* Elegant Shimmer sweep */}
                  <motion.div 
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/[0.04] to-transparent skew-x-12 pointer-events-none"
                  />
                  
                  <div className="relative z-10">
                    {/* Quote Head */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-[#D4AF37] text-5xl font-serif leading-none h-8 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">"</span>
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
                      <span className="text-[0.5rem] font-bold uppercase tracking-[0.4em] text-[#D4AF37]/50">Client Voice</span>
                    </div>
                    
                    {/* Main Quote */}
                    <p className="text-[1rem] text-white/85 leading-[1.75] font-light italic tracking-wide">
                      {t.quote}
                    </p>
                  </div>

                  {/* Identification Section */}
                  <div className="relative z-10 mt-4 pt-4 border-t border-[#D4AF37]/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar Circle */}
                      <div className="relative h-12 w-12">
                        {/* Rotating Gold Ring */}
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-[-3px] rounded-full border-t border-[#D4AF37]/70 opacity-60"
                        />
                        
                        <div className="relative h-full w-full rounded-full border border-[#D4AF37]/40 overflow-hidden bg-[#011611] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                          {t.img ? (
                            <img 
                              src={t.img} 
                              alt={`${t.name} - ${t.role} Review for Alexiant Real Estate in Diani Kenya`} 
                              title={`${t.name} Testimonial`}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-[#D4AF37] font-black text-lg">
                              {t.name.charAt(0)}
                            </div>
                          )}
                        </div>

                        {/* Verification Mark */}
                        <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#D4AF37] flex items-center justify-center border-2 border-[#011611]">
                           <svg className="h-2 w-2 text-[#011611]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M5 13l4 4L19 7" />
                           </svg>
                        </div>
                      </div>
                      
                      <div className="flex flex-col">
                        <h4 className="font-display font-bold text-white text-[0.95rem] tracking-tight leading-none italic">{t.name}</h4>
                        <div className="flex items-center gap-2 mt-1.5">
                          <p className="text-[0.55rem] font-black text-[#D4AF37] uppercase tracking-[0.25em]">{t.role}</p>
                          <span className="h-[2px] w-[2px] rounded-full bg-[#D4AF37]/30" />
                          <span className="text-[0.55rem] font-bold text-white/30 uppercase tracking-widest">Verified</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mini Seal */}
                    <div className="h-7 w-7 flex items-center justify-center opacity-20 group-hover:opacity-70 transition-opacity duration-700">
                       <svg className="h-full w-full text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                       </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-black text-[#D4AF37]/[0.025] select-none pointer-events-none uppercase tracking-[0.25em] whitespace-nowrap">
        The Alexiant Standard
      </div>
    </div>
  );
}
