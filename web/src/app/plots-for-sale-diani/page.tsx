import { Metadata } from "next";
import { listProperties } from "@/lib/properties/service";
import { PropertyCard } from "@/components/property-card";
import { PageTransition, AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import Link from "next/link";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";
import { FaqAccordion } from "@/components/faq-accordion";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Plots for Sale in Diani Beach | Verified Land South Coast Kenya",
  description: "Browse verified freehold plots and land for sale in Diani Beach, Galu, Kinondo and Tiwi. Title deed verified. Expert guidance on land buying in Kwale County, Kenya.",
  keywords: ["plots for sale diani beach", "land for sale diani", "buy plot diani kenya", "freehold land diani beach", "galu kinondo plots", "tiwi land for sale", "kwale county plots"],
  alternates: { canonical: "https://alexiantrealestate.co.ke/plots-for-sale-diani" },
  openGraph: {
    title: "Plots for Sale in Diani Beach | Alexiant Real Estate",
    description: "Verified freehold plots in Diani Beach, Galu and Tiwi. Title deed verified land with expert advisory.",
    url: "https://alexiantrealestate.co.ke/plots-for-sale-diani",
    type: "website",
    images: [{ url: "https://alexiantrealestate.co.ke/og-image.svg", width: 1200, height: 630, alt: "Plots for Sale Diani Beach Kenya" }],
  },
  twitter: { card: "summary_large_image", title: "Plots for Sale in Diani Beach", description: "Verified freehold plots in Diani Beach, Galu and Tiwi.", images: ["/og-image.svg"] },
};

export default async function DianiPlotsPage() {
  const properties = await listProperties();
  const plots = properties.filter(p => 
    p.category === 'sale' && 
    (p.title.toLowerCase().includes('plot') || p.title.toLowerCase().includes('land')) &&
    p.location.toLowerCase().includes('diani')
  );
  const baseUrl = getSiteUrl();
  const canonical = `${baseUrl}/plots-for-sale-diani`;
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: `${baseUrl}/` },
    { name: "Properties", url: `${baseUrl}/properties` },
    { name: "Plots for Sale in Diani", url: canonical },
  ]);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Plots for sale in Diani",
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "Alexiant Real Estate", url: baseUrl },
  };

  return (
    <PageTransition className="pb-20 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(collectionSchema)} />
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 soft-grid hero-ambient opacity-20" />
        <div className="section-shell relative z-10">
          <AnimatedSection direction="up" className="max-w-4xl">
            <span className="eyebrow-chip mb-6">Verified Land Listings</span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
               Plots for Sale in Diani Beach
            </h1>
            <p className="mt-8 text-xl text-slate-600 leading-relaxed max-w-2xl">
              Searching for the perfect spot to build your dream villa? Explore our curated selection of verified plots in Diani, Kwale County.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-shell py-12">
        {plots.length > 0 ? (
          <StaggerContainer className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {plots.map((property) => (
              <StaggerItem key={property.id}>
                <PropertyCard property={property} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="py-20 text-center bg-slate-50 rounded-[3rem]">
             <h3 className="text-2xl font-bold text-slate-900 mb-4">No current plots listed in Diani</h3>
             <p className="text-slate-500 mb-10">We have more off-market options. Consult our advisors for private land banks.</p>
             <Link href="/contact" className="nav-cta-gold !inline-flex">Inquire Privately</Link>
          </div>
        )}
      </section>

      <section className="section-shell py-24 bg-[#111827] text-white rounded-[3.5rem] my-20">
         <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">Land Buying Guide: Diani Beach</h2>
            <div className="space-y-6 text-white/70">
               <p>Buying land in Diani requires careful verification of title deeds, zoning regulations, and shoreline set-backs. Our senior advisors specialize in technical land due diligence in Kwale County.</p>
               <ul className="list-disc pl-6 space-y-3">
                  <li>Always verify the Land Registry search.</li>
                  <li>Check for KPLC and water connectivity.</li>
                  <li>Understand the difference between Beachfront and 2nd Row plots.</li>
               </ul>
            </div>
         </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#011611] via-[#022c22] to-[#011611] rounded-[3.5rem] mx-4 mb-20">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-[100px] pointer-events-none" />
        <div className="section-shell relative z-10">
          <AnimatedSection direction="up" className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-5 py-2 text-[0.55rem] font-bold uppercase tracking-[0.45em] text-[#D4AF37] mb-6">
              ✦ Buyer Questions
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold italic text-white">
              Plots for Sale in Diani — <span className="not-italic font-black text-[#D4AF37]">FAQ</span>
            </h2>
          </AnimatedSection>
          <FaqAccordion faqs={[
            { q: "What is the average price of a plot in Diani Beach?", a: "Plot prices in Diani Beach range from KES 6M for inland residential plots to KES 80M+ for prime beachfront parcels. Central Diani plots near the beach road average KES 15M–30M. Galu Kinondo plots range KES 12M–45M. Prices vary significantly based on proximity to the beach, size, and title type." },
            { q: "Are plots in Diani freehold or leasehold?", a: "Most plots in Diani Beach are available as freehold (absolute ownership) or leasehold (99-year government lease). Freehold is preferred for long-term investment. Our advisors verify the exact title type for every listing before presenting it to buyers." },
            { q: "How do I verify a plot title deed in Diani?", a: "Title verification involves an official Land Registry search at the Kwale County Land Registry office. This confirms ownership, any encumbrances, and the exact parcel boundaries. Alexiant conducts this search as part of our standard due diligence for every listing." },
            { q: "Can I build immediately after buying a plot in Diani?", a: "You need to obtain a development permit from the Kwale County Government before construction. This requires architectural plans, a structural engineer's report, and compliance with physical planning regulations including setback requirements. Our team can recommend approved architects familiar with Kwale County requirements." },
          ]} />
        </div>
      </section>
    </PageTransition>
  );
}
