import type { Metadata } from "next";
import Link from "next/link";
import { siteContent } from "@/data/site-content";
import { PageTransition, AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { MasterpieceTestimonials } from "@/components/masterpiece-testimonials";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "The Gold Standard for Coastal Property | About Alexiant",
  description:
    "Learn about Alexiant Real Estate's heritage, methodology, and commitment to excellence in the Diani and Kenya South Coast markets. Where local knowledge meets international standards.",
  keywords: [
    "Alexiant Real Estate history",
    "boutique real estate agency Diani",
    "premium property advisors Kenya",
    "Diani real estate market experts",
  ],
};

export default function AboutPage() {
  const baseUrl = getSiteUrl();
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: `${baseUrl}/` },
    { name: "About", url: `${baseUrl}/about` },
  ]);
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Alexiant Real Estate",
    url: `${baseUrl}/about`,
    isPartOf: { "@type": "WebSite", name: "Alexiant Real Estate", url: baseUrl },
  };
  return (
    <PageTransition className="pb-20 overflow-hidden bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(aboutSchema)} />
      {/* --- HERO --- */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 soft-grid hero-ambient opacity-30" />
        <div className="section-shell relative z-10 grid gap-16 lg:grid-cols-2 lg:items-center">
          <AnimatedSection direction="up">
            <span className="eyebrow-chip mb-6">Our Heritage</span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.15]">
              <span className="font-display">{siteContent.story.title}</span>
            </h1>
            <p className="mt-8 text-xl text-slate-600 leading-relaxed">
              {siteContent.story.body}
            </p>
          </AnimatedSection>
          
          <AnimatedSection direction="left" className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
             <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2070" alt="Diani Coastline - Prime Beachfront Real Estate Location in Kenya" title="Diani Beach Coastline" className="absolute inset-0 h-full w-full object-cover" />
             <div className="absolute inset-x-8 bottom-8 rounded-[2rem] bg-white/90 p-8 backdrop-blur-xl">
                <p className="text-3xl font-extrabold text-[#046A38] tracking-tight">KES 2.4Bn+</p>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 mt-1">Portfolio Under Advisory</p>
             </div>
          </AnimatedSection>
        </div>
      </section>

      {/* --- PHILOSOPHY --- */}
      <section className="section-shell py-24 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.4fr] items-start">
           <div className="space-y-16">
              <AnimatedSection direction="up" className="mb-8">
                 <div className="mb-12">
                   <span className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-3 block">Core Principles</span>
                   <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#022c22] tracking-tight">The Alexiant <span className="italic">Methodology</span></h2>
                 </div>
                 
                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                    {siteContent.story.points.map((point, idx) => (
                      <div key={idx} className="group relative rounded-[2rem] bg-slate-50 border border-slate-100 p-8 sm:p-10 hover:bg-[#022c22] hover:border-[#022c22] transition-colors duration-700 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(2,44,34,0.15)] flex flex-col justify-center">
                         {/* Subtle corner glow */}
                         <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#D4AF37]/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                         
                         {/* Step Indicator */}
                         <div className="mb-6 flex items-center gap-4">
                            <span className="font-display text-4xl italic font-black text-[#D4AF37]/20 group-hover:text-[#D4AF37] transition-colors duration-700">
                               {(idx + 1).toString().padStart(2, '0')}.
                            </span>
                            <div className="h-[1px] w-full bg-gradient-to-r from-slate-200 to-transparent group-hover:from-[#D4AF37]/40 transition-colors duration-700" />
                         </div>
                         
                         <p className="text-lg font-medium text-slate-800 group-hover:text-white transition-colors duration-700 leading-relaxed z-10 relative">
                            {point}
                         </p>
                      </div>
                    ))}
                 </div>
              </AnimatedSection>

              <AnimatedSection direction="up">
                 <div className="group relative overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,#011611_0%,#022c22_45%,#033820_100%)] p-10 md:p-14 border border-[#D4AF37]/20 shadow-[0_30px_60px_rgba(2,44,34,0.35)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(212,175,55,0.12)]">
                    
                    {/* Ambient corner glow */}
                    <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-[80px] group-hover:bg-[#D4AF37]/20 transition-colors duration-1000 pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#046A38]/20 blur-[80px] pointer-events-none" />
                    
                    {/* Subtle property watermark */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-[0.03] mix-blend-luminosity pointer-events-none" />
                    
                    {/* Top accent line */}
                    <div className="relative z-10 mb-10 flex items-center gap-4">
                       <div className="h-[1px] w-10 bg-[#D4AF37]/60" />
                       <span className="text-[0.55rem] font-black uppercase tracking-[0.45em] text-[#D4AF37]">Our Commitment</span>
                    </div>
                    
                    <h3 className="relative z-10 font-display text-3xl md:text-4xl font-semibold italic tracking-tight text-white mb-6">
                       Guided by <span className="not-italic font-black text-[#D4AF37]">Integrity</span>
                    </h3>
                    
                    <p className="relative z-10 text-white/70 text-[1rem] leading-[1.8] mb-10 font-light">
                      We believe that real estate on the Kenya Coast is one of the most exciting investment frontiers globally. However, it requires a partner who is brutally honest about site logistics, legal verification, and realistic rental yields. <span className="text-white font-medium">We are that partner.</span>
                    </p>
                    
                    <div className="relative z-10 flex flex-wrap gap-4">
                       <Link href="/contact" className="inline-flex h-12 items-center gap-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] px-8 text-[0.6rem] font-black uppercase tracking-[0.3em] text-[#011611] shadow-[0_10px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_14px_28px_rgba(212,175,55,0.4)] hover:scale-[1.03] transition-all duration-300">
                          Consult with us
                          <span className="text-[#011611]/60">✦</span>
                       </Link>
                    </div>
                    
                    {/* Shimmer sweep */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#D4AF37]/[0.04] to-transparent transition-transform duration-[1400ms] group-hover:translate-x-full pointer-events-none" />
                 </div>
              </AnimatedSection>
           </div>

           <StaggerContainer className="sticky top-32 space-y-6">
              {[
                { title: 'Locations Served', val: `${siteContent.coverage.length}+`, emoji: '🌍' },
                { title: 'Senior Advisors', val: siteContent.team.length, emoji: '🥂' },
                { title: 'Verified Listings', val: '100%', emoji: '🛡️' }
              ].map((stat, i) => (
                <StaggerItem key={i}>
                   <div className="group relative overflow-hidden rounded-[2.5rem] bg-[linear-gradient(110deg,#011611,#022c22_40%,#011611)] p-8 border border-[#D4AF37]/20 shadow-[0_20px_40px_rgba(2,44,34,0.15)] hover:shadow-[0_30px_60px_rgba(212,175,55,0.15)] hover:-translate-y-2 transition-all duration-700">
                      
                      {/* Ambient Elements */}
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-[0.04] mix-blend-luminosity pointer-events-none" />
                      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#D4AF37]/10 blur-[50px] group-hover:bg-[#D4AF37]/25 transition-colors duration-700 pointer-events-none" />
                      <div className="absolute -bottom-6 -left-6 text-8xl opacity-[0.02] blur-[2px] group-hover:rotate-12 group-hover:scale-110 transition-transform duration-1000 pointer-events-none select-none">
                         {stat.emoji}
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex items-center justify-between">
                         <div className="flex flex-col">
                           <p className="font-display text-5xl font-black tracking-tighter text-white drop-shadow-md group-hover:scale-105 transition-transform duration-700 origin-left italic">{stat.val}</p>
                           <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-[#D4AF37]/70 mt-3 group-hover:text-[#D4AF37] transition-colors duration-500">{stat.title}</p>
                         </div>
                         
                         {/* 3D Emoji Badge */}
                         <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-3xl backdrop-blur-md shadow-inner [perspective:1000px] cursor-default">
                            <div className="relative h-full w-full transition-transform duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                               <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]">
                                 {stat.emoji}
                               </div>
                               <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#D4AF37] to-[#E5C158] rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                                 <span className="text-[#011611] font-display font-black text-3xl">✦</span>
                               </div>
                            </div>
                         </div>
                      </div>
                      
                      {/* Luxury sweep overlay */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#D4AF37]/[0.05] to-transparent transition-transform duration-[1200ms] group-hover:translate-x-full pointer-events-none" />
                   </div>
                </StaggerItem>
              ))}
           </StaggerContainer>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="bg-slate-50 py-12 overflow-hidden">
        <div className="text-center mb-10 px-4">
          <p className="section-kicker mb-3">Endorsements</p>
          <h2 className="font-display text-2xl md:text-4xl font-semibold italic tracking-tight text-[#022c22]">
            Trusted by the <span className="not-italic font-script text-[#D4AF37] text-3xl md:text-5xl">discerning.</span>
          </h2>
        </div>
        
        <MasterpieceTestimonials />

        <div className="mt-10 text-center">
          <Link href="/contact" className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[0.6rem] font-black uppercase tracking-widest text-slate-900 border border-slate-200 shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all">
            Chat with an Advisor
            <span className="h-7 w-7 rounded-full bg-[#046A38] flex items-center justify-center text-white">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.827-1.24L3 20l1.326-3.954A8.969 8.969 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}