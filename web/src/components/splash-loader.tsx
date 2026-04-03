"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

function SplashLoaderContent() {
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-36 w-36"
          >
            <Image
              src="/logo.svg"
              alt="Alexiant Real Estate"
              fill
              className="object-contain"
              priority
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
