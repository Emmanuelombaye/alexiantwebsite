import type { Metadata } from "next";
import Link from "next/link";
import { siteContent } from "@/data/site-content";
import { PageTransition, AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "Premium Property Services in Diani & South Coast | Alexiant",
  description:
    "Explore our full suite of real estate services: luxury sales, professional rentals, market valuations, and investment advisory in Diani Beach, Galu and Kwale.",
  keywords: [
    "Diani real estate services",
    "buy sell property Kenya coast",
    "property valuation Diani",
    "luxury rentals South Coast",
    "investment advisory Kwale",
    "market intelligence Diani",
  ],
  openGraph: {
    title: "Real Estate Services in Diani | Alexiant Real Estate",
    description: "Premium sales, luxury rentals, and data-driven market valuations for the Kenya South Coast.",
    url: "https://alexiantrealestate.co.ke/services",
    type: "website",
  },
  alternates: {
    canonical: "https://alexiantrealestate.co.ke/services",
  },
};

export default function ServicesPage() {
  const baseUrl = getSiteUrl();
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: `${baseUrl}/` },
    { name: "Services", url: `${baseUrl}/services` },
  ]);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Real estate services in Diani & Kenya Coast",
    provider: { "@type": "RealEstateAgent", name: "Alexiant Real Estate", url: baseUrl },
    areaServed: ["Diani Beach", "Ukunda", "Kwale County", "Kenya Coast"],
    url: `${baseUrl}/services`,
  };
  return (
    <PageTransition className="pb-20 overflow-hidden bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(serviceSchema)} />
      {/* --- HERO --- */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 soft-grid hero-ambient opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl mx-auto">
          <AnimatedSection direction="up">
            <span className="eyebrow-chip mb-6">Our Expertise</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Refined solutions for signature properties.
            </h1>
            <p className="mt-8 text-xl text-slate-600 leading-relaxed">
              We bridge the gap between local coastal heritage and international service standards. Whether you are acquiring your first beachfront villa or managing a multi-unit investment portfolio, our services are tailored to the sophisticated client.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* --- SERVICE GRID --- */}
      <section className="section-shell py-24 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-2">
          {siteContent.services.map((service, index) => (
            <AnimatedSection key={service.title} direction={index % 2 === 0 ? "right" : "left"}>
              <div className="group flex flex-col h-full bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:border-[#D4AF37]/20 transition-all hover:shadow-2xl hover:shadow-slate-200">
                 <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#111827] text-[#D4AF37] text-2xl font-bold">
                    {index + 1}
                 </div>
                 <h2 className="text-3xl font-bold text-slate-900 mb-6 group-hover:text-[#046A38] transition-colors">
                    {service.title}
                 </h2>
                 <p className="text-lg text-slate-600 leading-relaxed mb-10 flex-1">
                    {service.body}
                 </p>
                 <div className="pt-8 border-t border-slate-50">
                    <Link href="/contact" className="inline-flex items-center gap-2 font-bold text-slate-900 group/link">
                       Inquire about this service <span className="transition-transform group-hover/link:translate-x-1">→</span>
                    </Link>
                 </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* --- PROCESS / STRATEGY --- */}
      <section className="bg-[#111827] text-white py-24 sm:py-32 overflow-hidden relative">
         <div className="absolute inset-0 soft-grid opacity-10" />
         <div className="section-shell relative z-10">
            <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] items-center">
               <div>
                  <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-6">Strategic Framework</p>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">How we deliver excellence.</h2>
                  <p className="text-white/70 text-lg leading-relaxed mb-10">
                    Our process is designed for clarity, speed, and discretion. From the initial discovery call to the final closing, every step is managed by a senior advisor who has deep accountability for your property goals.
                  </p>
                  <Link href="/about" className="h-14 inline-flex items-center justify-center rounded-full bg-[#046A38] px-8 text-sm font-bold uppercase tracking-widest text-white hover:opacity-90 transition-all">
                    The Alexiant Way
                  </Link>
               </div>
               
               <StaggerContainer className="grid gap-6">
                  {siteContent.process.map((step, idx) => (
                    <StaggerItem key={step.title}>
                       <div className="flex gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-slate-900 font-bold text-lg">
                             0{idx + 1}
                          </div>
                          <div>
                             <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                             <p className="text-white/60 text-sm leading-relaxed">{step.body}</p>
                          </div>
                       </div>
                    </StaggerItem>
                  ))}
               </StaggerContainer>
            </div>
         </div>
      </section>

      {/* --- MARKET SEGMENTS --- */}
      <section className="section-shell py-24 sm:py-32">
         <div className="text-center mb-16">
            <p className="section-kicker">Market Specialization</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-slate-900">Focused on what has value.</h2>
         </div>
         <div className="grid gap-8 md:grid-cols-3">
            {siteContent.markets.map((market) => (
              <div key={market.title} className="card-surface p-10 text-center">
                 <h3 className="text-xl font-bold text-slate-900 mb-4">{market.title}</h3>
                 <p className="text-sm text-slate-600 leading-relaxed">{market.body}</p>
              </div>
            ))}
         </div>
      </section>
    </PageTransition>
  );
}