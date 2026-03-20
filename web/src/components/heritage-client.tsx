"use client";

import { motion } from "framer-motion";
import { AnimatedSection, PageTransition, StaggerContainer, StaggerItem } from "@/components/animated-section";
import Link from "next/link";

const heritageSites = [
  {
    slug: "diani",
    title: "The Diani Coast",
    description: "A legendary stretch of infinite white sands, where the Indian Ocean meets the frontier of luxury living.",
    stat: "Elite Core",
  },
  {
    slug: "kilifi",
    title: "Kilifi Creek",
    description: "A sanctuary for the creative spirit and the deep-water voyager, defined by architectural innovation and serene seclusion.",
    stat: "Maritime Legacy",
  },
  {
    slug: "watamu",
    title: "Watamu Enclave",
    description: "A protected marine paradise where Italian artistry and coastal heritage blend into a timeless tapestry of prestige.",
    stat: "Natural Heritage",
  },
  {
    slug: "tiwi",
    title: "The Tiwi Cliffs",
    description: "Raw, untamed, and profoundly private. An escarpment of coral stone facing the eternity of the sea.",
    stat: "Sought-after Privacy",
  }
];

export function HeritageClient() {
  return (
    <PageTransition className="bg-slate-50 text-slate-900 selection:bg-[#D4AF37]/30">
      {/* ─── HERITAGE HERO ─── */}
      <section className="relative min-h-[30vh] flex flex-col items-center justify-center px-6 overflow-hidden pt-24 pb-6 bg-white">
        {/* Luxury Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
        
        {/* Subtle Textured Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
        
        {/* Soft Ambient Lighting */}
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-[#D4AF37]/[0.05] blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-[#046A38]/[0.1] blur-[150px]" />

        {/* Framing Elements */}
        <div className="absolute inset-12 border border-[#D4AF37]/10 pointer-events-none rounded-[3rem]" />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 h-16 w-[1px] bg-gradient-to-b from-transparent to-[#D4AF37]/30" />

        <div className="relative z-10 max-w-4xl w-full text-center">
          <AnimatedSection direction="up" delay={0.1}>
            <h1 className="font-display text-sm uppercase tracking-[0.5em] text-[#D4AF37]/80 mb-8">
              Heritage
            </h1>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.2}>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 leading-[1.1] italic mb-8">
              The Foundation of <br />
              <span className="not-italic text-[#D4AF37] opacity-90">Timeless Distinction.</span>
            </h2>
          </AnimatedSection>

          <div className="mx-auto w-12 h-[1px] bg-[#D4AF37]/40 mb-8" />

          <StaggerContainer className="grid gap-12 md:grid-cols-2 text-left max-w-3xl mx-auto">
            <StaggerItem>
              <p className="font-sans text-[0.95rem] font-light leading-relaxed tracking-wide text-slate-600 italic">
                Alexiant is built upon a legacy of absolute discretion and architectural reverence. We do not merely broker land; we curate the heritage of the Kenyan coastline for the next generation of visionaries.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="font-sans text-[0.95rem] font-light leading-relaxed tracking-wide text-slate-600">
                Our selection process is governed by its rarity and its potential to endure. Every estate within our portfolio is chosen for its unique story, its craftsmanship, and its place within the historic tapestry of Diani and beyond.
              </p>
            </StaggerItem>
          </StaggerContainer>

          <AnimatedSection direction="up" delay={0.5} className="mt-10">
             <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.3em] text-[#D4AF37]/60">
                Confidence · Legacy · Exclusivity
             </p>
          </AnimatedSection>
        </div>

        {/* Bottom Decorative Element */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
           <span className="h-[1px] w-8 bg-[#D4AF37]/20" />
           <div className="h-2 w-2 rounded-full border border-[#D4AF37]/40" />
           <span className="h-[1px] w-8 bg-[#D4AF37]/20" />
        </div>
      </section>

      {/* ─── THE COLLECTION GALLERY ─── */}
      <section className="relative pt-6 pb-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-12 text-center">
             <h3 className="font-display text-2xl md:text-3xl text-slate-900 italic tracking-tight">The Portfolio of Enclaves</h3>
             <div className="mt-6 mx-auto w-12 h-[1px] bg-[#D4AF37]/20" />
          </AnimatedSection>

          <div className="grid gap-1 px-4">
            {heritageSites.map((site, i) => (
              <AnimatedSection key={site.slug} direction={i % 2 === 0 ? "right" : "left"} delay={i * 0.1}>
                <Link href={`/properties?location=${site.slug}`} className="group relative block py-10 border-b border-[#D4AF37]/10 overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10 transition-transform duration-700 group-hover:translate-x-4">
                    <div className="max-w-xl">
                      <span className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-[#D4AF37]/50 mb-4 block">
                        {site.stat}
                      </span>
                      <h4 className="font-display text-3xl md:text-4xl text-slate-900 group-hover:text-[#D4AF37] transition-colors duration-500 italic">
                        {site.title}
                      </h4>
                      <p className="mt-4 font-sans text-sm font-light text-slate-500 leading-relaxed max-w-sm tracking-wide">
                        {site.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-display text-5xl text-slate-100 font-light group-hover:text-[#D4AF37]/10 transition-colors duration-700">0{i + 1}</span>
                      <div className="h-12 w-12 rounded-full border border-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#046A38] group-hover:border-[#046A38] transition-all duration-500">
                        <svg className="h-5 w-5 text-[#D4AF37] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Subtle Background Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection direction="up" className="mt-32 text-center">
            <Link href="/contact" className="inline-flex items-center gap-8 group">
              <span className="h-[1px] w-12 bg-[#D4AF37]/30 transition-all duration-500 group-hover:w-24" />
              <span className="font-display text-lg text-[#D4AF37] uppercase tracking-[0.3em] font-light">Secure Your Legacy</span>
              <span className="h-[1px] w-12 bg-[#D4AF37]/30 transition-all duration-500 group-hover:w-24" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── DECORATIVE FOOTER DIVIDER ─── */}
      <div className="h-32 bg-gradient-to-b from-[#011611] to-white" />
    </PageTransition>
  );
}
