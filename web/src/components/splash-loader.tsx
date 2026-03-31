"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

export function SplashLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative h-44 w-44 drop-shadow-[0_20px_40px_rgba(212,175,55,0.2)] mb-8"
          >
            <Image
              src="/logo.svg"
              alt="Alexiant Real Estate Signature Branding"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-center"
          >
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight italic mb-3">
              Alexiant <span className="text-[#D4AF37] not-italic uppercase tracking-widest text-xl ml-2 font-bold">Work</span>
            </h1>
            <p className="text-[0.65rem] uppercase tracking-[0.5em] font-bold text-slate-400">
              Discerning Coastal Luxury
            </p>
          </motion.div>
          
          <div className="absolute bottom-20 w-48 h-[2px] bg-slate-100 overflow-hidden rounded-full">
             <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
                className="w-full h-full bg-[#D4AF37]"
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
