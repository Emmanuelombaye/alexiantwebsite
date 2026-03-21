"use client";

import { useEffect, useState } from "react";

interface SecureContactProps {
  type: "email" | "phone";
  value: string; // The encoded or plain value (we'll encode it here to demonstrate)
  className?: string;
}

/**
 * A component that masks contact information in the DOM until interaction.
 * Prevents simple regex scrapers from harvesting emails and phone numbers.
 * 
 * We use a simple "reverse string" encoding to hide it from most scrapers.
 */
export function SecureContact({ type, value, className = "" }: SecureContactProps) {
  const [revealed, setRevealed] = useState(false);
  const [displayValue, setDisplayValue] = useState("");

  // Simple reverse-and-obfuscate for the DOM
  const obfuscate = (str: string) => {
    return str.split("").reverse().join("").replace("@", "[at]");
  };

  const decode = (str: string) => {
    return str.replace("[at]", "@").split("").reverse().join("");
  };

  useEffect(() => {
    setDisplayValue(obfuscate(value));
  }, [value]);

  const handleReveal = () => {
    if (revealed) return;
    setRevealed(true);
    setDisplayValue(value);
  };

  const href = type === "email" ? `mailto:${value}` : `tel:${value.replace(/\s+/g, "")}`;

  if (!revealed) {
    return (
      <span
        onClick={handleReveal}
        onMouseEnter={handleReveal}
        className={`cursor-pointer underline decoration-dotted decoration-[#D4AF37]/40 hover:decoration-[#D4AF37] transition-all ${className}`}
        title={`Reveal ${type}`}
      >
        {displayValue}
      </span>
    );
  }

  return (
    <a href={href} className={`transition-all hover:text-[#D4AF37] ${className}`}>
      {value}
    </a>
  );
}

/**
 * Specifically for the footer or contact page where we want a "Click to show" experience
 */
export function RevealButton({ type, value, label }: { type: "email" | "phone", value: string, label: string }) {
  const [revealed, setRevealed] = useState(false);

  if (!revealed) {
    return (
      <button 
        onClick={() => setRevealed(true)}
        className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors border-b border-[#D4AF37]/20 pb-0.5"
      >
        {label}
      </button>
    );
  }

  return <SecureContact type={type} value={value} className="text-white font-bold" />;
}
