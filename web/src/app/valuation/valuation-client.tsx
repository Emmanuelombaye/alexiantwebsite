"use client";

import { useRef, useState, useEffect } from "react";
import { siteContent } from "@/data/site-content";
import { LeadForm } from "@/components/lead-form";
import { AnimatedSection, StaggerContainer, StaggerItem, PageTransition } from "@/components/animated-section";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";
import { useInView, motion } from "framer-motion";

function MethodologyItem({ item }: { item: { title: string, body: string, icon: string } }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6, once: false });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isFlipped = isMobile ? isInView : undefined;

  return (
    <StaggerItem>
      <div 
        ref={ref}
        className="group relative flex gap-6 sm:gap-8 p-8 sm:p-10 rounded-[2.5rem] border border-[#D4AF37]/20 bg-white hover:bg-[#022c22] shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_40px_80px_rgba(2,44,34,0.3)] transition-all duration-1000 overflow-hidden cursor-default"
      >
        {/* Subtle luxury glow effect inside */}
        <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/3 rounded-full bg-[#D4AF37]/10 blur-[80px] opacity-0 transition-opacity duration-1000 group-hover:opacity-100 pointer-events-none" />

        {/* Metric Icon Block: 3D Flip */}
        <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center [perspective:1000px]">
            <motion.div 
              className="relative h-full w-full transition-transform duration-1000 [transform-style:preserve-3d]"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              initial={false}
              variants={{
                hover: { rotateY: 180 }
              }}
              whileHover={!isMobile ? "hover" : ""}
            >
              {/* Front */}
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-50 text-[#022c22] border border-slate-100 [backface-visibility:hidden] shadow-inner font-display text-2xl italic font-bold">
                  {item.icon}
              </div>
              {/* Back */}
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#E5C158] text-[#011611] [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_10px_20px_rgba(212,175,55,0.3)] font-display text-3xl italic font-black">
                  ✦
              </div>
            </motion.div>
        </div>
        
        {/* Text Content with Slide Animation */}
        <div className="relative z-10 flex-1 transform transition-transform duration-1000 group-hover:translate-x-3">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#022c22] mb-3 group-hover:text-white transition-colors duration-1000">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium text-[0.95rem] group-hover:text-white/80 transition-colors duration-1000">{item.body}</p>
            
            {/* Animated Underline */}
            <div className="mt-6 h-[1.5px] w-0 bg-gradient-to-r from-[#D4AF37] to-transparent transition-all duration-1000 ease-in-out group-hover:w-full" />
        </div>
      </div>
    </StaggerItem>
  );
}

export function ValuationClient() {
  const baseUrl = getSiteUrl();
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: `${baseUrl}/` },
    { name: "Valuation", url: `${baseUrl}/valuation` },
  ]);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Property valuation in Diani & Kenya Coast",
    provider: { "@type": "RealEstateAgent", name: "Alexiant Real Estate", url: baseUrl },
    url: `${baseUrl}/valuation`,
  };

  const methodologyItems = [
    {
      title: "Data-Driven Precision",
      body: "Moving beyond anecdotal estimates to a proprietary database of verified coastal transactions, mapping real market performance.",
      icon: "01"
    },
    {
      title: "Infrastructure & Zoning Intelligence",
      body: "Expert assessment of future gazetted developments, bypass routes, and zoning shifts that dictate long-term asset appreciation.",
      icon: "02"
    },
    {
      title: "Fiduciary Discretion",
      body: "Our reports serve as the definitive benchmark for private family offices, institutional funds, and off-market strategic exits.",
      icon: "03"
    }
  ];

  return (
    <PageTransition className="pb-20 overflow-hidden bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(serviceSchema)} />
      {/* ─── EXECUTIVE APPRAISAL HERO ─── */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <AnimatedSection direction="up" className="max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-5 py-2 text-[0.55rem] font-bold uppercase tracking-[0.45em] text-[#D4AF37] backdrop-blur-md mb-12">
              ✦ Strategic Advisory
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-[#022c22] leading-[1.08] mb-10 italic">
              Precise <span className="not-italic text-[#D4AF37]">Asset Appraisal</span> <br />
              for the Discerning.
            </h1>
            
            <div className="mx-auto w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mb-12" />
            
            <p className="mt-8 text-lg md:text-xl text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto italic opacity-80">
              In a dynamic coastal corridor, real-time intelligence is the ultimate luxury. We deliver data-backed market analysis for high-value estates and investment assets.
            </p>

            {/* Performance Indicators */}
            <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-40">
               <div className="flex flex-col items-center gap-2">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-[#D4AF37]">Data Velocity</span>
                  <div className="h-0.5 w-8 bg-[#D4AF37]/30" />
               </div>
               <div className="flex flex-col items-center gap-2">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-[#D4AF37]">Transaction Depth</span>
                  <div className="h-0.5 w-8 bg-[#D4AF37]/30" />
               </div>
               <div className="flex flex-col items-center gap-2">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-[#D4AF37]">Discrete Audit</span>
                  <div className="h-0.5 w-8 bg-[#D4AF37]/30" />
               </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom Fade to Content */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ─── APPRAISAL METHODOLOGY ─── */}
      <section className="section-shell py-24 sm:py-32 relative z-10 -mt-20">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <StaggerContainer className="space-y-20">
            <div className="space-y-12">
              <StaggerItem>
                <div className="max-w-xl">
                    <p className="section-kicker mb-4">Methodology</p>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#022c22] italic tracking-tight">The Alexiant Appraisal Standard</h2>
                </div>
              </StaggerItem>
              
              <div className="grid gap-8">
                  {methodologyItems.map((item) => (
                    <MethodologyItem key={item.title} item={item} />
                  ))}
              </div>
            </div>

            <StaggerItem>
               <div className="rounded-[3.5rem] bg-gradient-to-br from-[#022c22] to-[#011611] text-white p-12 md:p-16 relative overflow-hidden shadow-3xl">
                  <div className="absolute inset-0 soft-grid opacity-[0.05]" />
                  <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#D4AF37]/5 blur-[80px]" />
                  
                  <span className="inline-block px-4 py-1.5 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37] text-[0.55rem] font-bold uppercase tracking-widest mb-8">Executive Exit</span>
                  <h3 className="font-display text-3xl md:text-4xl font-light mb-8 italic">Contemplating a <br /><span className="text-[#D4AF37] not-italic font-semibold tracking-tight">Strategic Exit?</span></h3>
                  <p className="text-white/60 leading-relaxed mb-10 text-lg font-medium italic">
                    A precise appraisal is the foundation of a record-breaking transaction. We provide the intelligence required to navigate complex high-value acquisitions with absolute confidence.
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <a href={siteContent.whatsappHref} className="h-14 flex items-center justify-center rounded-full bg-[#046A38] px-8 text-[0.7rem] font-black uppercase tracking-[0.2em] text-white shadow-[0_12px_24px_rgba(4,106,56,0.25)] hover:-translate-y-1 transition-all">
                      Consult an Advisor
                    </a>
                  </div>
               </div>
            </StaggerItem>
          </StaggerContainer>

          <AnimatedSection direction="left" className="sticky top-40">
            <div className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(145deg,#0f0f12_0%,#1a1a1f_50%,#0f0f12_100%)] border border-[#D4AF37]/25 shadow-[0_40px_100px_rgba(0,0,0,0.4)] ring-1 ring-white/5">
               
               {/* Ambient Glow Elements */}
               <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#046A38]/10 blur-[80px] pointer-events-none" />
               <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#D4AF37]/10 blur-[70px] pointer-events-none" />
               
               {/* Top gold accent bar */}
               <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
               
               <div className="relative z-10 p-10 pb-0">
                  <div className="flex items-center gap-3 mb-5">
                     <span className="text-[#D4AF37] text-[1.4rem] leading-none">✦</span>
                     <span className="text-[0.6rem] font-black uppercase tracking-[0.45em] text-[#D4AF37]/70">Confidential Request</span>
                  </div>
                  
                  <h2 className="font-display text-2xl font-semibold italic tracking-tight text-white mb-3">
                     Initiate <span className="not-italic font-black text-[#D4AF37]">Appraisal</span>
                  </h2>
                  <p className="text-[0.9rem] text-white/40 mb-8 font-light leading-relaxed">
                    Our senior appraisals team will handle your request with the highest level of discretion.
                  </p>
               </div>
               
               <div className="relative z-10">
                  <LeadForm heading="" />
               </div>

               {/* Bottom gold accent bar */}
               <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
}
