"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

function SplashLoaderContent() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          {/* Subtle ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#046A38]/5 blur-[100px] pointer-events-none" />

          {/* Logo — original fade+scale animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-36 w-36 mb-8"
          >
            <Image
              src="/logo.svg"
              alt="Alexiant Real Estate"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <p className="font-script text-[2rem] sm:text-[2.4rem] text-[#046A38] leading-none tracking-wide">
              Excellence in Every Acre.
            </p>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0.5 }}
              className="mt-3 mx-auto h-[1px] w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
            />
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="relative w-48 sm:w-56 h-[2px] rounded-full bg-slate-100 overflow-hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                delay: 0.9,
                duration: 1.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SplashLoader() {
  return (
    <Suspense fallback={null}>
      <SplashLoaderContent />
    </Suspense>
  );
}
