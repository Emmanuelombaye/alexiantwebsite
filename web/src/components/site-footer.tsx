"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteContent } from "@/data/site-content";

export function SiteFooter() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <footer className="relative z-10 overflow-hidden border-t border-[#D4AF37]/20 bg-gradient-to-br from-[#022c22] via-[#053a2f] to-[#011611] pt-12 md:pt-32 pb-8 text-white">
      <style>{`
        @keyframes footer-slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-footer-slide {
          animation: footer-slide 180s linear infinite;
        }
      `}</style>
      
      {/* Dynamic Luxury Background Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.14] mix-blend-luminosity">
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#022c22] via-transparent to-[#011611]" />
        <div className="animate-footer-slide flex h-full w-max">
           {[
             '/demo-media/neighborhoodImages/diani-1.png',
             '/demo-media/neighborhoodImages/galu-1.png',
             '/demo-media/neighborhoodImages/tiwi-1.png',
             '/demo-media/neighborhoodImages/watamu-1.png',
             '/demo-media/neighborhoodImages/diani-1.png',
             '/demo-media/neighborhoodImages/galu-1.png',
             '/demo-media/neighborhoodImages/tiwi-1.png',
             '/demo-media/neighborhoodImages/watamu-1.png',
           ].map((src, i) => (
             <div key={i} className="relative h-full w-[1200px] flex-shrink-0">
               <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
               <div className="absolute inset-y-0 right-0 z-10 w-[400px] bg-gradient-to-l from-[#022c22] to-transparent pointer-events-none" />
               <div className="absolute inset-y-0 left-0 z-10 w-[400px] bg-gradient-to-r from-[#022c22] to-transparent pointer-events-none" />
             </div>
           ))}
        </div>
      </div>

      {/* Decorative background element for executive feel */}
      <div className="absolute -top-48 -left-48 z-10 h-[600px] w-[600px] rounded-full bg-[#D4AF37]/10 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 -right-48 z-10 h-[400px] w-[400px] rounded-full bg-[#058C42]/20 blur-[130px] pointer-events-none" />

      <div className="section-shell relative z-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] lg:gap-x-12 lg:gap-y-20">
          <div className="col-span-2 space-y-6 md:col-span-3 lg:col-span-1 lg:space-y-10">
            <Link href="/" className="group relative inline-flex items-center">
              <div className="absolute inset-0 -m-6 rounded-3xl bg-[#D4AF37]/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
              {mounted ? (
                <div className="relative rounded-2xl bg-white/5 p-3 md:p-5 backdrop-blur-md ring-1 ring-[#D4AF37]/30 transition-transform group-hover:scale-[1.02]">
                  <img 
                    src="/logo.svg" 
                    alt="Alexiant Real Estate Logo - Diani Beach Property and Plots for Sale"
                    title="Coastal Real Estate Agency"
                    className="h-8 md:h-12 w-auto brightness-200 contrast-125 grayscale invert transition-all" 
                    style={{ minWidth: '100px' }}
                  />
                </div>
              ) : (
                <div className="h-12 w-32" />
              )}
            </Link>
            
            <p className="max-w-[340px] font-display text-[0.8rem] md:text-[1rem] italic leading-relaxed tracking-wide text-white opacity-60">
              Listing the coast with <span className="font-bold not-italic text-[#D4AF37]">The gold standard</span>
            </p>
            
            <div className="flex gap-4">
              <a href={siteContent.whatsappHref} className="group relative overflow-hidden rounded-full border border-[#046A38] px-6 md:px-10 py-2 md:py-4 text-[0.6rem] md:text-[0.75rem] font-bold uppercase tracking-[0.3em] text-[#046A38] transition-all hover:bg-[#046A38] hover:text-white hover:shadow-[0_0_20px_rgba(4,106,56,0.3)]">
                <span className="relative z-10">Consult Advisor</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="mb-3 md:mb-8 font-display text-[0.9rem] md:text-[1.1rem] font-bold tracking-wider text-[#D4AF37]">Portfolio</h4>
            <nav className="flex flex-col gap-2 md:gap-5 text-[0.7rem] md:text-[0.85rem] font-medium tracking-wide">
              <Link href="/properties?category=sale" className="transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37]">Signature Listings</Link>
              <Link href="/properties?category=rent" className="transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37]">Executive Rentals</Link>
              <Link href="/neighborhoods" className="transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37]">Urban Heritage</Link>
              <Link href="/valuation" className="transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37]">Asset Valuation</Link>
            </nav>
          </div>

          <div className="md:col-span-1">
            <h4 className="mb-3 md:mb-8 font-display text-[0.9rem] md:text-[1.1rem] font-bold tracking-wider text-[#D4AF37]">Curated</h4>
            <nav className="flex flex-col gap-2 md:gap-5 text-[0.7rem] md:text-[0.85rem] font-medium tracking-wide">
              <Link href="/plots-for-sale-diani" className="transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37]">Investment Land</Link>
              <Link href="/houses-for-sale-ukunda" className="transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37]">Developments</Link>
              <Link href="/beachfront-property-diani" className="transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37]">Oceanfront</Link>
              <Link href="/blog" className="transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37]">Intelligence</Link>
            </nav>
          </div>

          <div className="md:col-span-1">
            <h4 className="mb-3 md:mb-8 font-display text-[0.9rem] md:text-[1.1rem] font-bold tracking-wider text-[#D4AF37]">Agency</h4>
            <nav className="flex flex-col gap-2 md:gap-5 text-[0.7rem] md:text-[0.85rem] font-medium tracking-wide">
              <Link href="/about" className="transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37]">Our Heritage</Link>
              <Link href="/services" className="transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37]">Bespoke</Link>
              <Link href="/contact" className="transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37]">Offices</Link>
              <Link href="/admin" className="transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37]">Internal</Link>
            </nav>
          </div>

          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <h4 className="mb-3 md:mb-8 font-display text-[0.9rem] md:text-[1.1rem] font-bold tracking-wider text-[#D4AF37]">Inquiries</h4>
            <div className="space-y-3 md:space-y-6 text-[0.7rem] md:text-[0.85rem] font-medium tracking-wide">
              <div className="space-y-1 md:space-y-4">
                <a href={siteContent.phoneHref} className="block font-display text-[1rem] md:text-[1.2rem] font-semibold italic text-white transition-all hover:text-[#046A38]">{siteContent.phone}</a>
                <a href={`mailto:${siteContent.email}`} className="block truncate border-b border-white/10 pb-1 text-white transition-all hover:border-[#046A38] hover:text-[#046A38]">{siteContent.email}</a>
              </div>
              <div className="pt-1">
                <p className="text-[0.65rem] md:text-[0.8rem] italic leading-relaxed text-white opacity-40">
                  New Beach Road, Diani,<br />South Coast, Kenya
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-32 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:pt-16 text-[0.6rem] md:text-[0.75rem] font-medium tracking-[0.2em] text-white/20 md:flex-row">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Alexiant Group. <span className="mx-4 md:mx-6 hidden opacity-20 md:inline">|</span> <span className="italic uppercase text-[0.5rem] tracking-[0.4em]">Crafted For Excellence</span>
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <Link href="/privacy" className="transition-colors hover:text-[#D4AF37]">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-[#D4AF37]">Agreement</Link>
            <div className="flex items-center gap-2">
               <span className="block h-1 w-1 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,1)]" />
               <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#D4AF37]/40">Diani HQ</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}