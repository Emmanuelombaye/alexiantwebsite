"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getVariants = () => {
    const offset = 40;
    // Map side directions to "up" on mobile for better visibility
    const effectiveDirection = isMobile && (direction === "left" || direction === "right") ? "up" : direction;

    switch (effectiveDirection) {
      case "up":
        return { hidden: { opacity: 0, y: offset, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1 } };
      case "down":
        return { hidden: { opacity: 0, y: -offset, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1 } };
      case "left":
        return { hidden: { opacity: 0, x: offset, scale: 0.98 }, visible: { opacity: 1, x: 0, scale: 1 } };
      case "right":
        return { hidden: { opacity: 0, x: -offset, scale: 0.98 }, visible: { opacity: 1, x: 0, scale: 1 } };
      case "none":
        return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      transition={{ 
        duration: 0.9, 
        delay, 
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  delayOffset = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  delayOffset?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: delayOffset,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, direction = "up" }: { children: React.ReactNode; className?: string; direction?: "up" | "down" | "left" | "right" }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getVariants = () => {
    const offset = 30;
    // Map side directions to "up" on mobile
    const effectiveDirection = isMobile && (direction === "left" || direction === "right") ? "up" : direction;

    switch (effectiveDirection) {
      case "up":
        return { hidden: { opacity: 0, y: offset, scale: 0.99 }, visible: { opacity: 1, y: 0, scale: 1 } };
      case "down":
        return { hidden: { opacity: 0, y: -offset, scale: 0.99 }, visible: { opacity: 1, y: 0, scale: 1 } };
      case "left":
        return { hidden: { opacity: 0, x: offset, scale: 0.99 }, visible: { opacity: 1, x: 0, scale: 1 } };
      case "right":
        return { hidden: { opacity: 0, x: -offset, scale: 0.99 }, visible: { opacity: 1, x: 0, scale: 1 } };
    }
  };

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      variants={getVariants()}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function PageTransition({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
