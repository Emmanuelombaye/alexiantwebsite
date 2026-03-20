"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    image: "/demo-media/bannerimages/visionary-leader-inspiration-trust.png",
    title: "Executive Visionary",
    subtitle: "The Alexiant Standard",
    description: "Built on trust, local mastery, and a personal commitment to securing your coastal legacy.",
    type: "authority"
  },
  {
    image: "/demo-media/bannerimages/handshake-of-success-exclusivity-partnership.png",
    title: "Elite Partnership",
    subtitle: "Why Choose Us",
    description: "We don't just sell property; we orchestrate successful investments with absolute professional integrity.",
    type: "authority"
  },
  {
    image: "/demo-media/bannerimages/master-of-the-coast-local-knowledge.png",
    title: "Coastal Mastery",
    subtitle: "Absolute Expertise",
    description: "Unmatched deep-root knowledge of every plot and villa in the Coastal Kenya landscape.",
    type: "authority"
  },
  {
    image: "/demo-media/bannerimages/crown-jewel-diani-sunset.png",
    title: "The Crown Jewel",
    subtitle: "Diani Beachfront",
    description: "Experience ultra-luxury living where the turquoise ocean meets golden sunsets.",
    type: "villa"
  },
  {
    image: "/demo-media/bannerimages/strategic-acreage-drone-masterpiece.png",
    title: "Strategic Acreage",
    subtitle: "Kwale Investment",
    description: "Prime 10-acre fertile shamba with professional boundaries and massive potential.",
    type: "plot"
  },
  {
    image: "/demo-media/bannerimages/swahili-masterpiece.png",
    title: "Swahili Masterpiece",
    subtitle: "Watamu Coast",
    description: "Modern minimalism blended with traditional coastal architecture and coral stone.",
    type: "villa"
  },
  {
    image: "/demo-media/bannerimages/beachfront-gold-marked-plot.png",
    title: "Beachfront Gold",
    subtitle: "Galu Beach",
    description: "Pristine ocean-view plots with perfectly marked boundaries for your dream build.",
    type: "plot"
  },
  {
    image: "/demo-media/bannerimages/infinity-horizon.png",
    title: "Infinity Horizon",
    subtitle: "Kilifi Penthouse",
    description: "Penthouse views where your private pool merges seamlessly with the Indian Ocean.",
    type: "villa"
  },
  {
    image: "/demo-media/bannerimages/residential-horizon-gated-community-plot.png",
    title: "Residential Horizon",
    subtitle: "Luxury Gated Community",
    description: "Secure, manicured plots in the most sought-after coastal residential zones.",
    type: "plot"
  },
  {
    image: "/demo-media/bannerimages/night-view-atmospheric.png",
    title: "The Night View",
    subtitle: "Nyali Contemporary",
    description: "Sleek architectural lighting meets the deep blue tropical night sky.",
    type: "villa"
  },
  {
    image: "/demo-media/bannerimages/plantation-estate-agri-investment.png",
    title: "Plantation Estate",
    subtitle: "Kilifi Agriculture",
    description: "Commercial-grade coconut and mango plantations for high-end agri-investment.",
    type: "plot"
  },
  {
    image: "/demo-media/bannerimages/dream-lifestyle.png",
    title: "The Dream Lifestyle",
    subtitle: "Signature Diani Villa",
    description: "Billionaire-style pool decks and pristine architecture in the heart of Diani.",
    type: "villa"
  },
  {
    image: "/demo-media/bannerimages/ocean-view-ridge-marked-boundaries.png",
    title: "Ocean-View Ridge",
    subtitle: "Coastal Investment",
    description: "Marked ridge parcels with panoramic ocean views and elevation advantage.",
    type: "plot"
  }
];

export function HeroMasterpieceSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 10000); // Extended time so the slide is visible between long DJ crossfades
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[75vh] md:h-[85vh] px-4 md:px-8 pt-4 pb-12">
      <div className="relative w-full h-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/10 bg-slate-950">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 3.5, ease: "easeInOut" } }}
            exit={{ opacity: 0, transition: { duration: 4.5, ease: "easeInOut" } }}
            className="absolute inset-0"
          >
            {/* Cinematic Alternating Zoom In & Out */}
            <motion.div 
              initial={{ scale: currentIndex % 2 === 0 ? 1.25 : 1.0 }}
              animate={{ 
                scale: currentIndex % 2 === 0 ? 1.0 : 1.25,
                transition: { duration: 15, ease: "easeOut" }
              }}
              className="absolute inset-0"
            >
              <Image
                src={slides[currentIndex].image}
                alt={`${slides[currentIndex].title} - ${slides[currentIndex].subtitle} | Alexiant Real Estate Kenya`}
                title={`${slides[currentIndex].title} - Premium Coastal Property`}
                priority={currentIndex === 0}
                fill
                className="object-cover transition-all"
              />
            </motion.div>
            
            {/* Overlay Gradient - TIGHTENED FOR MORE IMAGE VISIBILITY */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/20 to-transparent" />
            
            {/* Content Overlay - CORNER ALIGNED WITH MEDIUM WEIGHT */}
            <div className="absolute inset-0 flex items-end px-12 md:px-20 pb-20">
              <div className="max-w-md">
                <motion.div
                  initial={{ x: -25, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-[2px] w-8 bg-[#D4AF37]" />
                    <span className="text-[0.6rem] md:text-[0.7rem] font-black uppercase tracking-[0.5em] text-[#D4AF37]">
                      {slides[currentIndex].subtitle}
                    </span>
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-4 tracking-tighter">
                    {slides[currentIndex].title.split(' ').map((word, i) => (
                      <span key={i} className={i === slides[currentIndex].title.split(' ').length - 1 ? "text-[#D4AF37]" : ""}>
                        {word}{' '}
                      </span>
                    ))}
                  </h1>
                  
                  <p className="text-xs md:text-base text-slate-200/90 leading-relaxed font-medium mb-8 max-w-sm italic">
                    {slides[currentIndex].description}
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <button className="h-12 px-8 rounded-full bg-[#046A38] text-white font-black text-[0.65rem] uppercase tracking-widest shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all">
                      {slides[currentIndex].type === 'authority' ? 'Experience Excellence' : 'View details'}
                    </button>
                    <div className="flex flex-col">
                      <span className="text-[0.55rem] font-bold text-[#D4AF37] uppercase tracking-widest leading-none mb-1">
                        {slides[currentIndex].type === 'authority' ? 'Executive' : 'Property'}
                      </span>
                      <span className="text-white font-black text-[0.6rem] uppercase tracking-widest opacity-80">
                        {slides[currentIndex].type === 'authority' ? 'Founder & Expert' : 
                         slides[currentIndex].type === 'villa' ? 'Signature Villa' : 'Investment Plot'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Luxury Golden Logo Badge */}
            <div className="absolute top-1/2 -translate-y-1/2 right-12 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1,
                  transition: { duration: 1 }
                }}
                className="relative group"
              >
                {/* Ambient Outer Glow */}
                <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-3xl group-hover:bg-[#D4AF37]/30 transition-all duration-700" />
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.03, 1],
                    borderRadius: currentIndex % 5 === 0 ? "50%" : 
                                 currentIndex % 5 === 1 ? "30%" : 
                                 currentIndex % 5 === 2 ? "50% 50% 0 50%" : 
                                 currentIndex % 5 === 3 ? "20% 80% 20% 80% / 80% 20% 80% 20%" : 
                                 "85% 15% 85% 15% / 15% 85% 15% 85%",
                    transition: { duration: 1.5, ease: "easeInOut" }
                  }}
                  className="relative h-44 w-44 border-2 border-[#D4AF37]/50 flex items-center justify-center backdrop-blur-2xl bg-slate-950/50 shadow-[0_0_60px_rgba(212,175,55,0.35)] ring-1 ring-white/10"
                >
                  {/* Inner Masterpiece Shine */}
                  <motion.div 
                    animate={{ 
                      borderRadius: currentIndex % 5 === 0 ? "50%" : 
                                   currentIndex % 5 === 1 ? "30%" : 
                                   currentIndex % 5 === 2 ? "50% 50% 0 50%" : 
                                   currentIndex % 5 === 3 ? "20% 80% 20% 80% / 80% 20% 80% 20%" : 
                                   "85% 15% 85% 15% / 15% 85% 15% 85%",
                      rotate: 360 
                    }}
                    transition={{ 
                      borderRadius: { duration: 1.5 },
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" }
                    }}
                    className="absolute inset-[-4px] border-t-2 border-b-2 border-[#D4AF37] opacity-80"
                  />
                  
                  {/* Luxury Glow Core */}
                  <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-[#D4AF37]/20 to-transparent blur-xl" />
                  
                  <motion.img 
                    animate={{ 
                      opacity: [0.8, 1, 0.8],
                      scale: [1, 1.05, 1],
                      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    src="/logo.svg" 
                    alt="Alexiant Real Estate Logo - Diani Beach Premium Coastal Property Experts"
                    title="Alexiant Real Estate"
                    className="h-24 w-auto brightness-0 invert contrast-150 drop-shadow-[0_0_20px_rgba(212,175,55,0.55)] relative z-10" 
                  />
                </motion.div>

                {/* Corner Decorative Dots */}
                <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center backdrop-blur-md">
                   <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[3px] bg-white/20 w-full z-30">
          <motion.div 
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 10, ease: "linear" }}
            className="h-full bg-[#D4AF37]"
          />
        </div>
      </div>
    </div>
  );
}
