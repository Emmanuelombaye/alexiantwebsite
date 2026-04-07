import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { siteContent } from "@/data/site-content";
import { PageTransition, AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";
import { SecureContact } from "@/components/secure-contact";

export const metadata: Metadata = {
  title: "Contact Alexiant Real Estate | Diani Beach Office Kenya",
  description: "Contact our Diani Beach office for property viewings, investment consultations, or management inquiries. Call +254 759 636 615 or visit New Beach Road, Diani.",
  keywords: ["contact alexiant real estate", "diani real estate office", "property inquiry diani", "real estate agent diani beach", "kenya coast property contact"],
  alternates: { canonical: "https://alexiantrealestate.co.ke/contact" },
  openGraph: {
    title: "Contact Alexiant Real Estate | Diani Beach Office",
    description: "Reach our Diani Beach office for property viewings and investment consultations. +254 759 636 615.",
    url: "https://alexiantrealestate.co.ke/contact",
    type: "website",
    images: [{ url: "https://alexiantrealestate.co.ke/og-image.svg", width: 1200, height: 630, alt: "Contact Alexiant Real Estate Diani" }],
  },
  twitter: { card: "summary_large_image", title: "Contact Alexiant Real Estate", description: "Diani Beach office. Call +254 759 636 615.", images: ["/og-image.svg"] },
};

export default function ContactPage() {
  const baseUrl = getSiteUrl();
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: `${baseUrl}/` },
    { name: "Contact", url: `${baseUrl}/contact` },
  ]);
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Alexiant Real Estate",
    url: `${baseUrl}/contact`,
    isPartOf: { "@type": "WebSite", name: "Alexiant Real Estate", url: baseUrl },
  };
  return (
    <PageTransition className="pb-20 overflow-hidden bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(contactSchema)} />
      {/* --- HERO --- */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-slate-50 text-slate-900">
        {/* Luxury architectural texture with sophisticated mask */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-5 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent h-40" />
        
        {/* Sophisticated ambient elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#D4AF37]/10 blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#058C42]/5 blur-[130px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <AnimatedSection direction="up" className="max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-5 py-2 text-[0.6rem] font-bold uppercase tracking-[0.4em] text-[#D4AF37] backdrop-blur-md mb-10">
              ✦ Concierge & Advisory
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.12] mb-8 italic">
              Begin your coastal <br />
              <span className="font-script text-[#D4AF37] text-5xl md:text-7xl not-italic tracking-normal">
                journey
              </span>{" "}
              with us.
            </h1>
            
            <div className="mx-auto w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mb-10" />
            
            <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto italic">
              Our bespoke advisory team is ready to assist you in securing <span className="text-[#046A38] font-bold not-italic underline decoration-[#D4AF37]/30 underline-offset-8">extraordinary</span> coastal assets across the South Coast of Kenya.
            </p>

            {/* Floating Luxury Badges */}
            <div className="mt-16 flex flex-wrap justify-center gap-10 opacity-70">
               <div className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                  <span className="text-[0.55rem] font-bold uppercase tracking-[0.4em] text-slate-500">Private Search</span>
               </div>
               <div className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                  <span className="text-[0.55rem] font-bold uppercase tracking-[0.4em] text-slate-500">Estate Management</span>
               </div>
               <div className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                  <span className="text-[0.55rem] font-bold uppercase tracking-[0.4em] text-slate-500">Investment Intelligence</span>
               </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Executive decorative bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* --- CONTACT FORM & INFO --- */}
      <section className="section-shell py-16 sm:py-24">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[0.8fr_1.2fr] items-start">
          <StaggerContainer className="space-y-10 w-full">
            <StaggerItem>
               <div className="space-y-6 text-center lg:text-left">
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                     <div className="h-[1px] w-6 bg-[#D4AF37]" />
                     <p className="section-kicker !mb-0">Headquarters</p>
                  </div>
                  
                  <h2 className="font-display text-3xl md:text-4xl font-semibold italic tracking-tight text-slate-900 leading-tight">
                     Diani Beach <span className="not-italic font-black text-[#046A38]">Office</span>
                  </h2>
                  
                  <div className="h-[1px] w-12 bg-[#D4AF37]/50 mx-auto lg:mx-0" />
                  
                  <p className="text-[1rem] text-slate-500 leading-[1.8] font-light max-w-xs mx-auto lg:mx-0">
                    Centrally located on New Beach Road, our office is the heart of our operations across the South Coast.
                  </p>
               </div>
            </StaggerItem>

            <StaggerItem>
               <div className="grid gap-8">
                  <div className="flex gap-6 group">
                     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-[#D4AF37] group-hover:bg-[#046A38] group-hover:text-white transition-colors">
                        <span className="text-xl">📍</span>
                     </div>
                     <div>
                        <p className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-400 mb-1">Office Location</p>
                        <p className="text-lg font-bold text-slate-900 leading-tight">{siteContent.office}</p>
                     </div>
                  </div>

                  <div className="flex gap-6 group">
                     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-[#D4AF37] group-hover:bg-[#046A38] group-hover:text-white transition-colors">
                        <span className="text-xl">📞</span>
                     </div>
                     <div>
                        <p className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-400 mb-1">Direct Line</p>
                        <SecureContact type="phone" value={siteContent.phone} className="text-lg font-bold text-slate-900 leading-tight" />
                     </div>
                  </div>

                  <div className="flex gap-6 group">
                     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-[#D4AF37] group-hover:bg-[#046A38] group-hover:text-white transition-colors">
                        <span className="text-xl">✉️</span>
                     </div>
                     <div>
                        <p className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-400 mb-1">Email Advisory</p>
                        <SecureContact type="email" value={siteContent.email} className="text-lg font-bold text-slate-900 leading-tight" />
                     </div>
                  </div>
               </div>
            </StaggerItem>

            <StaggerItem>
               <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Availability</p>
                  <div className="space-y-3">
                     {siteContent.hours.map(h => (
                       <p key={h} className="text-sm font-medium text-slate-700">{h}</p>
                     ))}
                  </div>
               </div>
            </StaggerItem>

            <StaggerItem>
               <a href={siteContent.whatsappHref} className="flex items-center justify-center gap-4 rounded-[2rem] bg-[#25D366] p-6 text-white text-xl font-bold transition hover:opacity-90 shadow-xl shadow-green-500/10">
                  <span>Chat on WhatsApp</span>
               </a>
            </StaggerItem>
          </StaggerContainer>

          <AnimatedSection direction="none" className="w-full lg:sticky lg:top-32">
             <div className="relative overflow-hidden rounded-[2.5rem] bg-[linear-gradient(145deg,#0f0f12_0%,#1a1a1f_50%,#0f0f12_100%)] border border-[#D4AF37]/25 shadow-[0_30px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/5">
                
                {/* Ambient Glow Elements */}
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#6B21A8]/10 blur-[70px] pointer-events-none" />
                
                {/* Top gold accent bar */}
                <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
                
                <div className="relative z-10 p-8 pb-0">
                   {/* Kicker */}
                   <div className="flex items-center gap-3 mb-5">
                      <span className="text-[#D4AF37] text-[1.4rem] leading-none">✦</span>
                      <span className="text-[0.55rem] font-black uppercase tracking-[0.45em] text-[#D4AF37]/70">Private Inquiry</span>
                   </div>
                   
                   <h2 className="font-display text-2xl font-semibold italic tracking-tight text-white mb-2">
                      Send an <span className="not-italic font-black text-[#D4AF37]">Inquiry</span>
                   </h2>
                   <p className="text-[0.85rem] text-white/40 mb-6 font-light leading-relaxed">
                     Our senior advisors typically respond within 30 minutes during office hours.
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

      {/* --- LOCATION MAP & LOCAL SEO --- */}
      <section className="section-shell pb-24 border-t border-slate-100 pt-24 text-center">
         <p className="section-kicker mb-10">Our Coastal Office</p>
         <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl h-[400px] bg-slate-50">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31835.632205566373!2d39.55938565!3d-4.2882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18404ee531eec4ff%3A0xc6cb51197c0c1b0c!2sDiani%20Beach!5e0!3m2!1sen!2ske!4v1715000000000!5m2!1sen!2ske" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              title="Alexiant Real Estate Office Location Map in Diani Beach"
              referrerPolicy="no-referrer-when-downgrade"
            />
         </div>
      </section>
      <section className="section-shell relative pb-32 border-t border-slate-100 pt-24 text-center overflow-hidden">
         {/* Background Texturing for Luxury */}
         <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-[0.02] pointer-events-none" />
         
         <div className="relative z-10">
            <div className="flex flex-col items-center mb-16">
               <span className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-[#D4AF37] mb-4">Market Presence</span>
               <h2 className="font-display text-4xl font-semibold italic tracking-tight text-slate-900">
                  Regional <span className="not-italic font-black text-[#046A38]">Focus</span>
               </h2>
               <div className="mt-6 flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-[#D4AF37]/30" />
                  <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  <div className="h-[1px] w-12 bg-[#D4AF37]/30" />
               </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
               {siteContent.coverage.map((area, idx) => (
                 <div 
                   key={area} 
                   className="group relative px-8 py-4 rounded-2xl bg-[#0f0f12] border border-[#D4AF37]/20 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] hover:-translate-y-1.5 transition-all duration-500 cursor-default overflow-hidden"
                 >
                    {/* Interior Shimmer */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent transition-transform duration-[1200ms] group-hover:translate-x-full" />
                    
                    <div className="flex items-center gap-3 relative z-10">
                       <span className="text-[0.6rem] font-black text-[#D4AF37]/40 font-display italic group-hover:text-[#D4AF37] transition-colors">
                          {(idx + 1).toString().padStart(2, '0')}
                       </span>
                       <span className="h-3 w-[1px] bg-white/10 group-hover:bg-[#D4AF37]/30 transition-colors" />
                       <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/80 group-hover:text-white transition-colors">
                          {area}
                       </span>
                    </div>

                    {/* Ambient Glow */}
                    <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-[#D4AF37]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
               ))}
            </div>

            <p className="mt-16 text-[0.7rem] font-medium tracking-[0.2em] uppercase text-slate-400 max-w-lg mx-auto leading-relaxed">
               Providing bespoke real estate advisory and strategic <br />
               <span className="text-[#D4AF37]">asset acquisition</span> across Kenya&apos;s coastal frontier.
            </p>
         </div>
      </section>
    </PageTransition>
  );
}