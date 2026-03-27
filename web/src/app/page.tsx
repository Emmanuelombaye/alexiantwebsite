import Link from "next/link";
import { HeroPropertyShowcase } from "@/components/hero-property-showcase";
import { LeadForm } from "@/components/lead-form";
import { PropertyCard } from "@/components/property-card";
import { siteContent } from "@/data/site-content";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { listProperties } from "@/lib/properties/service";
import { PropertyFilters } from "@/components/property-filters";
import { HeroMasterpieceSlider } from "@/components/hero-masterpiece-slider";
import { MasterpieceTestimonials } from "@/components/masterpiece-testimonials";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allProperties = await listProperties();
  const featuredProperties = allProperties.filter((p) => p.featured);
  const nonFeaturedProperties = allProperties.filter((p) => !p.featured);
  
  // Combine featured first, then fill up to 9 with non-featured
  const showcaseProperties = [...featuredProperties, ...nonFeaturedProperties].slice(0, 9);
  const saleCount = allProperties.filter((p) => p.category === "sale").length;
  const rentCount = allProperties.filter((p) => p.category === "rent").length;
  const totalCount = allProperties.length;
  const availableCount = allProperties.filter((p) => p.status === "available").length;
  const featuredCount = featuredProperties.length;
  const baseUrl = getSiteUrl();
  const breadcrumbSchema = buildBreadcrumbList([{ name: "Home", url: `${baseUrl}/` }]);
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Alexiant Real Estate",
    url: `${baseUrl}/`,
    isPartOf: { "@type": "WebSite", name: "Alexiant Real Estate", url: baseUrl },
  };

  return (
    <div className="overflow-hidden bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(homeSchema)} />
      {/* --- MASTERPIECE HERO SLIDER --- */}
      <section className="relative bg-white pt-16 overflow-hidden">
        <HeroMasterpieceSlider />
      </section>

      {/* --- SEARCH COMPONENT IMMEDIATELY BELOW SLIDER --- */}
      <section className="relative z-20 py-8 section-shell">
        <AnimatedSection direction="up" delay={0.1}>
          <div className="relative mx-auto max-w-5xl">
            <PropertyFilters 
              defaultQuery=""
              defaultCategory=""
              defaultStatus=""
              resultCount={totalCount}
              totalCount={totalCount}
              saleCount={saleCount}
              rentCount={rentCount}
              availableCount={availableCount}
              featuredCount={featuredCount}
            />
          </div>
        </AnimatedSection>
      </section>

      {/* --- HERO SHOWCASE --- */}
      <section className="relative z-20 pb-12 pt-4 section-shell">
        <AnimatedSection direction="up" delay={0.3}>
          <div className="relative mx-auto max-w-5xl flex justify-center">
            <HeroPropertyShowcase properties={showcaseProperties} totalCount={totalCount} availableCount={availableCount} />
          </div>
        </AnimatedSection>
      </section>

      {/* --- FEATURED COLLECTION --- */}
      <section className="bg-slate-50 py-10 sm:py-12">
        <div className="section-shell">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row mb-10">
            <div className="text-center md:text-left">
              <p className="section-kicker">Collection</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                The Signature Selection
              </h2>
            </div>
            <Link href="/properties" className="rounded-full border-2 border-[#046A38] bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-[#046A38] transition hover:bg-[#046A38] hover:text-white">
              View All Listings
            </Link>
          </div>

          <StaggerContainer className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 w-full hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth">
            {showcaseProperties.map((property) => (
              <StaggerItem key={property.id} className="min-w-[85vw] snap-center sm:min-w-[400px] md:min-w-0 md:w-auto flex-none">
                <PropertyCard property={property} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* --- SERVICES / EXPERTISE --- */}
      <section className="relative py-10 sm:py-12 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#046A38]/[0.03] blur-[100px]" />
        <div className="absolute inset-0 soft-grid opacity-[0.05]" />

        <div className="section-shell relative z-10">
          <div className="grid gap-10 lg:grid-cols-[0.38fr_1fr] items-start">
            <AnimatedSection direction="right" className="sticky top-24">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-5 py-2 text-[0.55rem] font-bold uppercase tracking-[0.4em] text-[#D4AF37] backdrop-blur-md">
                ✦ The Executive Standard
              </span>
              <h2 className="mt-8 font-display text-3xl md:text-4xl font-semibold text-[#022c22] tracking-tight leading-tight italic">
                Uncompromising <br /> 
                <span className="text-[#D4AF37] not-italic font-display uppercase tracking-widest text-2xl md:text-3xl">Excellence</span><br />
                at every touchpoint.
              </h2>
              <div className="mt-6 h-[1.5px] w-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-transparent" />
              
              <p className="mt-6 text-base text-slate-600 leading-relaxed font-medium italic opacity-75">
                Our advisory operates at the intersection of heritage and precision. We deliver bespoke real estate solutions for the world's most discerning private clients.
              </p>

              <div className="mt-10 group relative inline-flex items-center gap-4 p-4 rounded-[2rem] border border-[#D4AF37]/20 bg-white/40 backdrop-blur-xl shadow-2xl shadow-slate-200/50 hover:border-[#D4AF37]/50 transition-all duration-500">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#022c22] to-[#046A38] text-[#D4AF37] shadow-[0_4px_12px_rgba(2,44,34,0.3)]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.5rem] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Global Advisory</p>
                  <p className="text-[0.65rem] font-bold text-[#046A38] tracking-tight">The Gold Standard of Coastal Luxury</p>
                </div>
              </div>

              <Link href="/services" className="mt-10 inline-flex items-center gap-4 text-[0.65rem] font-bold text-[#046A38] group uppercase tracking-[0.25em]">
                <span className="relative">
                  Signature Services
                  <span className="absolute -bottom-1 left-0 h-[1px] w-full scale-x-0 bg-[#D4AF37] transition-transform group-hover:scale-x-100 origin-left" />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/20 group-hover:bg-[#022c22] group-hover:border-[#022c22] group-hover:text-[#D4AF37] transition-all duration-500">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </AnimatedSection>

            <StaggerContainer className="grid gap-6 md:grid-cols-2">
               {siteContent.services.map((service, index) => (
                 <StaggerItem key={service.title}>
                    <div className="group relative w-full h-[360px] [perspective:1500px]">
                       <div className="relative h-full w-full transition-transform duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-[2.5rem]">
                          <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] overflow-hidden rounded-[2.5rem] border border-[#D4AF37]/30 bg-[linear-gradient(145deg,#0a0a0c_0%,#15151a_50%,#0a0a0c_100%)] p-8 flex flex-col items-center justify-center text-center shadow-[0_30px_60px_rgba(0,0,0,0.4)] ring-1 ring-white/5">
                             <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#D4AF37]/10 blur-3xl" />
                             <div className="text-6xl mb-6 shadow-sm drop-shadow-xl saturate-150 transform transition duration-700 group-hover:scale-110">
                                {[ "💎", "🥂", "🏛️", "🗝️" ][index]}
                             </div>
                             <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6" />
                             <h3 className="font-display text-2xl font-bold text-white tracking-tight leading-snug lg:px-6 italic">
                                {service.title}
                             </h3>
                             <div className="absolute bottom-8 flex items-center gap-2 opacity-60">
                                <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#046A38]">Explore</span>
                                <span className="text-[#D4AF37]">→</span>
                             </div>
                          </div>
                          <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#022c22] to-[#011611] border border-[#D4AF37]/50 p-8 flex flex-col items-center justify-center text-center shadow-2xl">
                             <div className="absolute inset-4 rounded-[2rem] border border-[#D4AF37]/20 pointer-events-none" />
                             <h3 className="font-display text-lg font-semibold text-[#D4AF37] mb-4">{service.title}</h3>
                             <p className="text-[0.95rem] leading-relaxed text-white/90 font-medium z-10 px-2 sm:px-4">
                               {service.body}
                             </p>
                          </div>
                       </div>
                    </div>
                 </StaggerItem>
               ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* --- NEIGHBORHOODS TEASER --- */}
      <section className="section-shell py-8 sm:py-12">
         <div className="relative mx-auto max-w-5xl rounded-[2.5rem] overflow-hidden border border-[#D4AF37]/20 bg-gradient-to-br from-[#022c22] to-[#011611] shadow-2xl backdrop-blur-sm">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-5 mix-blend-luminosity" />
            <div className="relative z-10 flex flex-col items-center justify-center p-10 sm:p-14 text-center">
               <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-4 py-1.5 text-[0.55rem] font-bold uppercase tracking-[0.4em] text-[#D4AF37] backdrop-blur-md">
                 ✦ Heritage Locations
               </span>
               <h2 className="mt-8 font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug">
                 Discover the unique character <br className="hidden md:block" /> 
                 <span className="italic text-[#D4AF37] font-medium leading-snug">of Diani&apos;s most sought-after enclaves.</span>
               </h2>
               <div className="mt-10">
                  <Link href="/neighborhoods" className="group relative inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] px-8 py-4 text-[0.7rem] font-black uppercase tracking-[0.25em] text-[#011611] shadow-2xl transition-all hover:scale-[1.03]">
                    <span>Explore Neighborhoods</span>
                    <span>→</span>
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* --- MASTERPIECE TESTIMONIALS --- */}
      <section className="bg-slate-50 py-16 overflow-hidden">
        <div className="text-center mb-10 px-4">
          <p className="section-kicker">Endorsements</p>
          <h2 className="mt-4 text-3xl md:text-6xl font-black text-[#1F2937] tracking-tighter">
            Trusted by the <span className="text-[#D4AF37]">discerning.</span>
          </h2>
        </div>
        <MasterpieceTestimonials />
      </section>

      {/* --- LEAD SECTION --- */}
      <section className="section-shell py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
           <AnimatedSection direction="up">
              <div className="rounded-[3rem] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
                 {/* Subtle ambient light from gold */}
                 <div className="absolute top-0 right-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

                 <div className="bg-white rounded-[2.9rem] h-full w-full p-8 md:p-16 flex flex-col items-center text-center relative z-10">
                    
                    <div className="max-w-2xl mx-auto mb-14">
                       <div className="flex items-center justify-center gap-4 mb-8">
                          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                          <span className="text-[0.65rem] font-black uppercase tracking-[0.6em] text-[#D4AF37]">Private Client Advisory</span>
                          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                       </div>
                       <h2 className="font-display text-4xl md:text-6xl font-normal text-slate-900 tracking-tighter leading-[1.05] mb-8">
                         <span className="italic">{siteContent.leadSection.title}</span>
                       </h2>
                       <p className="text-slate-500 text-lg leading-relaxed font-light px-4">
                         {siteContent.leadSection.body}
                       </p>
                    </div>
                    
                    <div className="w-full max-w-xl relative">
                       {/* Subtle gold ambient glow behind the glass to make the blur effect pop */}
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#046A38]/5 blur-[60px] pointer-events-none rounded-full" />
                       
                       <div className="bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-[2px] border border-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative z-10 overflow-hidden ring-1 ring-black/[0.02] hover:shadow-[0_30px_80px_rgba(212,175,55,0.08)] transition-all duration-700">
                          {/* Inner glass reflection */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/10 to-white/30 pointer-events-none" />
                          <LeadForm dark={false} className="!p-6 md:!p-10 relative z-20" />
                       </div>
                    </div>
                    
                    <div className="mt-14 flex items-center justify-center gap-5">
                       <div className="flex -space-x-3">
                        {[
                          "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120&h=120",
                          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120",
                          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120"
                        ].map((src, i) => (
                           <div key={i} className="h-10 w-10 rounded-full border-[3px] border-white overflow-hidden shadow-md">
                              <img src={src} alt="Advisor" className="h-full w-full object-cover" />
                           </div>
                        ))}
                       </div>
                       <div className="text-left">
                          <p className="text-[0.6rem] font-black text-slate-900 uppercase tracking-widest">Available Advisors</p>
                          <p className="text-[0.55rem] text-[#D4AF37] font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1">
                             <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                             Typical response: instantly
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
           </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
