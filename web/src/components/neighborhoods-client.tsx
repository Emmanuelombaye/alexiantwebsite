"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteContent } from "@/data/site-content";
import { AnimatedSection, PageTransition } from "@/components/animated-section";

const coastalAreas = [
  {
    name: "Diani Beach",
    tagline: "The Crown Jewel",
    description: "World-class beachfront living with unparalleled white sands. The supreme location for high-roi holiday villas.",
    features: ["Resort Lifestyle", "Pristine Beaches", "High ROI"],
    images: ["/demo-media/neighborhoodImages/diani-1.png", "/demo-media/neighborhoodImages/diani-2.png"]
  },
  {
    name: "Galu Kinondo",
    tagline: "The Elite Coastline",
    description: "Exclusive, quiet and highly sought-after stretch directly south of Diani. Absolute prime real estate.",
    features: ["Private Villas", "Kitesurfing Hub", "Seclusion"],
    images: ["/demo-media/neighborhoodImages/galu-1.png", "/demo-media/neighborhoodImages/galu-2.png"]
  },
  {
    name: "Tiwi",
    tagline: "Untamed Beauty",
    description: "Dramatic coral cliffs, hidden coves, and large individual plots prioritizing absolute privacy.",
    features: ["Wild Coastal Nature", "Cliff-top Views", "Low Density"],
    images: ["/demo-media/neighborhoodImages/tiwi-1.png", "/demo-media/neighborhoodImages/tiwi-2.png"]
  },
  {
    name: "Msambweni",
    tagline: "The Southern Sanctuary",
    description: "An emerging luxury destination offering pristine, large-scale investment land away from the bustle.",
    features: ["Investment Hotspot", "Large Land Banks", "Unspoiled"],
    images: ["/demo-media/neighborhoodImages/msambweni-1.png", "/demo-media/neighborhoodImages/msambweni-2.png"]
  },
  {
    name: "Gazi",
    tagline: "Historical Mangroves",
    description: "Rich in history and surrounded by beautifully protected mangrove forests and tranquil waters.",
    features: ["Eco-tourism", "Historical Charm", "Estuary Access"],
    images: ["/demo-media/neighborhoodImages/gazi-1.png", "/demo-media/neighborhoodImages/gazi-2.png"]
  },
  {
    name: "Shimoni",
    tagline: "Gateway to the Marine Park",
    description: "Famous for sport fishing and incredibly close proximity to the Kisite-Mpunguti marine park.",
    features: ["Deep Sea Fishing", "Marine Ecosystems", "Raw Potential"],
    images: ["/demo-media/neighborhoodImages/shimoni-1.png", "/demo-media/neighborhoodImages/shimoni-2.png"]
  },
  {
    name: "Wasini Island",
    tagline: "Island Tranquility",
    description: "A completely car-free island offering authentic coastal serenity and eco-lifestyle.",
    features: ["Car-free Zone", "Coral Gardens", "Eco-lodges"],
    images: ["/demo-media/neighborhoodImages/wasini-1.png", "/demo-media/neighborhoodImages/wasini-2.png"]
  },
  {
    name: "Funzi Island",
    tagline: "Mangrove Sanctuary",
    description: "Exclusive tropical island living accessible only by boat, highly private and secluded.",
    features: ["Absolute Privacy", "Mangrove Channels", "Turtle Hatching"],
    images: ["/demo-media/neighborhoodImages/funzi-1.png", "/demo-media/neighborhoodImages/funzi-2.png"]
  },
  {
    name: "Kwale Town",
    tagline: "The Highland Hub",
    description: "The county headquarters elevated on the lush coastal highlands, offering a cooler microclimate.",
    features: ["Cooler Climate", "Administrative center", "Forest Reserves"],
    images: ["/demo-media/neighborhoodImages/kwale-1.png", "/demo-media/neighborhoodImages/kwale-2.png"]
  },
  {
    name: "Shimba Hills",
    tagline: "Elevated Wilderness",
    description: "Stunning escarpment views looking down onto the Indian Ocean, mixing wildlife with luxury.",
    features: ["Wildlife Estate", "Cool Breezes", "Ocean Vistas"],
    images: ["/demo-media/neighborhoodImages/shimba-hills-1.png", "/demo-media/neighborhoodImages/shimba-hills-2.png"]
  },
  {
    name: "Ukunda",
    tagline: "The Commercial Heartbeat",
    description: "The bustling mainland gateway to the South Coast beaches, ideal for commercial real estate.",
    features: ["High Tenant Demand", "Commercial Hub", "Airstrip Access"],
    images: ["/demo-media/neighborhoodImages/ukunda-1.png", "/demo-media/neighborhoodImages/ukunda-2.png"]
  },
  {
    name: "Likoni",
    tagline: "The Mainland Bridge",
    description: "The connecting channel to Mombasa island currently undergoing a massive infrastructure boom.",
    features: ["Infrastructure Boom", "High Density", "Port Access"],
    images: ["/demo-media/neighborhoodImages/likoni-1.png", "/demo-media/neighborhoodImages/likoni-2.png"]
  },
  {
    name: "Nyali",
    tagline: "The Northern Gateway",
    description: "Mombasa's premium suburb leading into the North Coast featuring urban luxury and convenience.",
    features: ["Urban Luxury", "Established Hub", "Premium Amenities"],
    images: ["/demo-media/neighborhoodImages/nyali-1.png", "/demo-media/neighborhoodImages/nyali-2.png"]
  },
  {
    name: "Vipingo",
    tagline: "The Ridge to the Ocean",
    description: "Home to the famous PGA Baobab golf course and massive master-planned sisal estates.",
    features: ["Golf Estates", "Airstrip", "Master-planned"],
    images: ["/demo-media/neighborhoodImages/vipingo-1.png", "/demo-media/neighborhoodImages/vipingo-2.png"]
  },
  {
    name: "Kilifi",
    tagline: "The Creative Creek",
    description: "A deep-water creek highly sought after by yacht owners, creatives, and luxury developers.",
    features: ["Deep Water Marina", "Bofa Beach", "Yachting"],
    images: ["/demo-media/neighborhoodImages/kilifi-1.png", "/demo-media/neighborhoodImages/kilifi-2.png"]
  },
  {
    name: "Watamu",
    tagline: "The Marine Wonderland",
    description: "Powder white sands wrapped elegantly around marine national parks and turtle sanctuaries.",
    features: ["Marine Reserve", "Italian Heritage", "Luxury Resorts"],
    images: ["/demo-media/neighborhoodImages/watamu-1.png", "/demo-media/neighborhoodImages/watamu-2.png"]
  },
  {
    name: "Malindi",
    tagline: "The Golden Era",
    description: "Historic coastal town with immense charm, Italian influence, and incredibly long beaches.",
    features: ["Historical Heritage", "Airport Access", "Golden Sands"],
    images: ["/demo-media/neighborhoodImages/malindi-1.png", "/demo-media/neighborhoodImages/malindi-2.png"]
  }
];

export function NeighborhoodsClient() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate the horizontal translate value. We map the total vertical scroll 
  // (0 to 1) into a horizontal translation. -93% is perfect for keeping the last item on screen.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-93%"]);

  return (
    <PageTransition className="pb-0 bg-slate-950">
      {/* --- LUXURY LOOKBOOK HERO --- */}
      <section className="relative pt-28 pb-0 bg-slate-950 overflow-hidden">

        {/* ── TOP EDITORIAL TEXT ── */}
        <div className="relative z-10 px-6 md:px-16 text-center mb-10">
          <AnimatedSection direction="up">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-[1px] w-16 bg-[#D4AF37]/60" />
              <span className="text-[0.5rem] font-black uppercase tracking-[0.6em] text-[#D4AF37]">
                Alexiant · Kenya Coast · 2026
              </span>
              <span className="h-[1px] w-16 bg-[#D4AF37]/60" />
            </div>

            <h1 className="font-black text-white tracking-tighter leading-[1] mb-0">
              <span className="block text-[clamp(2.8rem,8vw,7rem)]">Discover Your</span>
              <span className="block text-[clamp(2.8rem,8vw,7rem)] text-[#D4AF37] italic">Perfect Enclave</span>
            </h1>
          </AnimatedSection>
        </div>

        {/* ── INFINITE PHOTO TICKER STRIP ── */}
        <div className="relative w-full overflow-hidden my-0 py-0">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

          {/* Row 1 — scrolls left */}
          <div className="flex mb-3" style={{ animation: "marquee-left 40s linear infinite" }}>
            {[
              "diani-1","galu-1","tiwi-1","kilifi-1","watamu-1","malindi-1","vipingo-1","nyali-1",
              "diani-1","galu-1","tiwi-1","kilifi-1","watamu-1","malindi-1","vipingo-1","nyali-1",
            ].map((name, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] h-[170px] mx-2 rounded-2xl overflow-hidden border border-white/5">
                <img
                  src={`/demo-media/neighborhoodImages/${name}.png`}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Row 2 — scrolls right (reverse) */}
          <div className="flex" style={{ animation: "marquee-right 50s linear infinite" }}>
            {[
              "msambweni-1","gazi-1","shimoni-1","wasini-1","funzi-1","kwale-1","shimba-hills-1","ukunda-1","likoni-1",
              "msambweni-1","gazi-1","shimoni-1","wasini-1","funzi-1","kwale-1","shimba-hills-1","ukunda-1","likoni-1",
            ].map((name, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] h-[170px] mx-2 rounded-2xl overflow-hidden border border-white/5">
                <img
                  src={`/demo-media/neighborhoodImages/${name}.png`}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM TEXT + SCROLL CUE ── */}
        <div className="relative z-10 px-6 md:px-16 text-center pt-10 pb-8">
          <AnimatedSection direction="up" delay={0.2}>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8 font-medium">
              17 premium coastal enclaves — from the island sanctuaries of Wasini to the yacht marinas of Kilifi Creek. Scroll down to explore each one.
            </p>

            {/* Area name ticker row */}
            <div className="flex items-center justify-center gap-2 flex-wrap max-w-2xl mx-auto mb-8">
              {["Diani","Galu","Tiwi","Msambweni","Kilifi","Watamu","Malindi","Vipingo","Nyali","Ukunda","Shimoni","Wasini"].map((n, i) => (
                <span key={n} className="flex items-center gap-2 text-[0.55rem] font-black uppercase tracking-widest text-slate-500">
                  {n}
                  {i < 11 && <span className="text-[#D4AF37]/40">·</span>}
                </span>
              ))}
              <span className="text-[0.55rem] font-black uppercase tracking-widest text-[#D4AF37]">+5 more</span>
            </div>

            {/* Scroll cue */}
            <div className="flex justify-center">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2"
              >
                <div className="h-10 w-[1px] bg-gradient-to-b from-transparent to-[#D4AF37]/60" />
                <svg className="h-4 w-4 text-[#D4AF37]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>

        {/* Injected keyframes for marquee */}
        <style>{`
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </section>

      {/* --- HORIZONTAL SCROLL MASTERPIECE --- */}
      <section ref={targetRef} className="relative h-[800vh] bg-slate-950">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 px-10 md:px-20 w-max pb-10">
            {coastalAreas.map((area, index) => (
              <ScrollCard area={area} index={index + 1} total={coastalAreas.length} key={area.name} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- MASTERPIECE CTA --- */}
      <section className="section-shell py-24 bg-slate-950 text-white">
        <div className="relative overflow-hidden rounded-[4rem] bg-[#111827] p-12 md:p-32 text-center shadow-3xl border border-white/5">
          {/* Ambient Background Glow */}
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-[100px]" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
              Where will you <span className="text-[#D4AF37]">invest?</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-12 font-medium opacity-80 leading-relaxed">
              Our advisors monitor the pulse of the entire coast. Request the Coastal Heatmap Report for specific intelligence on current land valuations and ROI zones.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="/contact" className="h-16 flex items-center justify-center rounded-full bg-[#046A38] px-12 text-[0.75rem] font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(4,106,56,0.22)] hover:-translate-y-1 transition-all">
                Consult an Advisor
              </a>
              <a href={siteContent.phoneHref} className="h-16 flex items-center justify-center rounded-full border-2 border-white/10 bg-white/5 backdrop-blur-md px-12 text-[0.75rem] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
                Call: {siteContent.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

const ScrollCard = ({ area, index, total }: { area: typeof coastalAreas[number], index: number, total: number }) => {
  return (
    <div className="group relative h-[70vh] w-[85vw] md:w-[60vw] lg:w-[45vw] overflow-hidden rounded-[3.5rem] bg-slate-900 flex-shrink-0 border border-white/5 shadow-2xl">
      {/* Fallback background */}
      <div className="absolute inset-0 bg-slate-800" />

      {/* Primary image — fills entire card */}
      <img
        src={area.images[0]}
        alt={`${area.name} - Overview`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 z-10"
        onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
      />
      {/* Secondary image crossfades on hover */}
      {area.images[1] && (
        <img
          src={area.images[1]}
          alt={`${area.name} - Extra Vistas`}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100 z-[11]"
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
        />
      )}

      {/* Narrow gradient — only bottom 35% */}
      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-black/90 to-transparent z-20 pointer-events-none transition-all duration-500 group-hover:h-[55%]" />

      {/* Tagline chip — top left */}
      <div className="absolute top-5 left-5 z-30">
        <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[0.5rem] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
          {area.tagline}
        </span>
      </div>

      {/* Bottom content strip */}
      <div className="absolute inset-x-0 bottom-0 z-30 px-7 pb-7 md:px-8 md:pb-8">
        {/* Name — compact */}
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none mb-1.5">
          {area.name}
        </h2>
        <div className="h-[2px] w-8 bg-[#D4AF37] mb-3 transition-all duration-300 group-hover:w-14" />

        {/* Details revealed on hover only */}
        <div className="grid transition-all duration-500 [grid-template-rows:0fr] group-hover:[grid-template-rows:1fr]">
          <div className="overflow-hidden">
            <p className="text-slate-200 text-xs leading-relaxed mb-3 line-clamp-2 pr-2 pt-0.5">
              {area.description}
            </p>
            <div className="flex gap-2 mb-4 flex-wrap">
              {area.features.slice(0, 2).map((f: string) => (
                <span key={f} className="text-[0.55rem] font-black uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/40 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Explore button — always visible, compact */}
        <a
          href={`/properties?location=${area.name.split(' ')[0]}`}
          className="inline-flex items-center gap-2.5 text-[0.6rem] font-black uppercase tracking-[0.18em] text-white bg-white/10 border border-white/20 backdrop-blur-md pl-4 pr-1.5 py-1.5 rounded-full hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#1F2937] transition-all duration-300 group/btn"
        >
          Explore
          <div className="h-7 w-7 rounded-full bg-[#111827]/80 border border-white/10 flex items-center justify-center">
            <svg className="h-3 w-3 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </a>
      </div>
    </div>
  );
};

