"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface ServiceCardProps {
  title: string;
  body: string;
  index: number;
}

export function ServiceCard({ title, body, index }: ServiceCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const icons = ["💎", "🥂", "🏛️", "🗝️"];
  const icon = icons[index % icons.length];

  const isFlipped = isMobile ? (isInView || isClicked) : (isHovered || isClicked);

  return (
    <div 
      ref={ref}
      className="group relative w-full h-[360px] [perspective:1500px] cursor-pointer"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={() => isMobile && setIsClicked(!isClicked)}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d] rounded-[2.5rem]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        whileHover={!isFlipped && !isMobile ? { scale: 1.02 } : {}}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          type: "spring",
          damping: 20,
          stiffness: 100
        }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] overflow-hidden rounded-[2.5rem] border border-[#D4AF37]/30 bg-[linear-gradient(145deg,#0a0a0c_0%,#15151a_50%,#0a0a0c_100%)] p-8 flex flex-col items-center justify-center text-center shadow-[0_30px_60px_rgba(0,0,0,0.4)] ring-1 ring-white/5">
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#D4AF37]/10 blur-3xl opacity-50" />
          <div className="text-6xl mb-6 shadow-sm drop-shadow-xl saturate-150 transform transition duration-700">
            {icon}
          </div>
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6" />
          <h3 className="font-display text-2xl font-bold text-white tracking-tight leading-snug lg:px-6 italic">
            {title}
          </h3>
          <div className="absolute bottom-8 flex items-center gap-2 opacity-60">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#046A38]">
              {isFlipped ? "Back" : "Explore"}
            </span>
            <span className="text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#022c22] to-[#011611] border border-[#D4AF37]/50 p-8 flex flex-col items-center justify-center text-center shadow-2xl"
        >
          <div className="absolute inset-4 rounded-[2rem] border border-[#D4AF37]/20 pointer-events-none" />
          <h3 className="font-display text-lg font-semibold text-[#D4AF37] mb-4">{title}</h3>
          <p className="text-[0.95rem] leading-relaxed text-white/90 font-medium z-10 px-2 sm:px-4">
            {body}
          </p>
          <div className="absolute bottom-8 flex items-center gap-2 opacity-60">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Return</span>
            <span className="text-[#046A38]">←</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
