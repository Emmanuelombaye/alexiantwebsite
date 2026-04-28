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

          {/* Logo with Circular Loader */}
          <div className="relative flex items-center justify-center mb-10 mt-4">
            {/* Spinning Circle Ring */}
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{ 
                opacity: { delay: 0.2, duration: 0.8 },
                rotate: { duration: 2, ease: "linear", repeat: Infinity } 
              }}
              className="absolute -inset-6 w-[calc(100%+3rem)] h-[calc(100%+3rem)] text-[#D4AF37]"
              viewBox="0 0 100 100"
            >
              {/* Subtle background ring */}
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-20"
              />
              {/* Animated drawing ring */}
              <motion.circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="301.59"
                initial={{ strokeDashoffset: 301.59 }}
                animate={{ strokeDashoffset: 60 }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.svg>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-32 w-32 sm:h-40 sm:w-40"
            >
              <Image
                src="/logo.svg"
                alt="Alexiant Real Estate"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="font-script text-[2rem] sm:text-[2.4rem] text-[#046A38] leading-none tracking-wide">
              Excellence in Every Acre.
            </p>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0.5 }}
              className="mt-4 mx-auto h-[1px] w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
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
