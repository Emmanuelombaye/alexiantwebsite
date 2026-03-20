import { Metadata } from "next";
import { listProperties } from "@/lib/properties/service";
import { PropertyCard } from "@/components/property-card";
import { PageTransition, AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import Link from "next/link";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Beachfront Properties for Sale in Diani | Luxury Coastal Real Estate",
  description: "Exclusive collection of beachfront villas, plots and resorts for sale in Diani Beach and Galu. Premium oceanfront real estate with direct beach access in Kenya's South Coast.",
  keywords: ["beachfront property diani", "oceanfront villas diani", "diani beachfront plots", "luxury coastal real estate kenya", "galu beachfront property"],
};

export default async function BeachfrontDianiPage() {
  const properties = await listProperties();
  const beachfront = properties.filter(p => 
    p.category === 'sale' && 
    (p.title.toLowerCase().includes('beachfront') || p.summary.toLowerCase().includes('beachfront') || p.title.toLowerCase().includes('oceanfront'))
  );
  const baseUrl = getSiteUrl();
  const canonical = `${baseUrl}/beachfront-property-diani`;
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: `${baseUrl}/` },
    { name: "Properties", url: `${baseUrl}/properties` },
    { name: "Beachfront Diani", url: canonical },
  ]);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Beachfront properties in Diani",
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
            <span className="eyebrow-chip mb-6">Elite Collection</span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
               Beachfront Property Diani
            </h1>
            <p className="mt-8 text-xl text-slate-600 leading-relaxed max-w-2xl">
              The ultimate coastal asset. Rare opportunities to own freehold land and villas with direct private access to the world-famous white sands of Diani Beach.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-shell py-12">
        {beachfront.length > 0 ? (
          <StaggerContainer className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {beachfront.map((property) => (
              <StaggerItem key={property.id}>
                <PropertyCard property={property} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="py-20 text-center bg-slate-50 rounded-[3rem]">
             <h3 className="text-2xl font-bold text-slate-900 mb-4">No beachfront properties currently listed</h3>
             <p className="text-slate-500 mb-10">Beachfront inventory is often held off-market for privacy. Contact us for our private signature collection.</p>
             <Link href="/contact" className="nav-cta-gold !inline-flex">Request Private Viewings</Link>
          </div>
        )}
      </section>

      <section className="section-shell py-24 bg-[#111827] text-white rounded-[3.5rem] my-20">
         <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">Investing in Coastline Real Estate</h2>
            <div className="space-y-6 text-white/70 leading-relaxed text-lg">
               <p>Acquiring beachfront real estate along Galu Beach and Diani Beach offers unparalleled lifestyle advantages and high-tier capital appreciation. As coastal land becomes extremely rare, true oceanfront property maintains powerful high-yield appeal for both short-term luxury rentals and long-term asset equity.</p>
               <ul className="list-disc pl-6 space-y-4 font-medium mt-6">
                  <li><strong>Shoreline Regulations:</strong> Understand Riparian zones, High Water Marks (HWM), and strict building setback regulations implemented by the physical planning authorities.</li>
                  <li><strong>Title Integrity Protection:</strong> Exclusively verify clear freehold and leasehold titles to ensure total isolation from historical shoreline settlement disputes.</li>
                  <li><strong>Hospitality Commercialization:</strong> Execute highly-profitable boutique villa and eco-resort strategies drawing international travelers to Kenya&#39;s South Coast year-round.</li>
               </ul>
            </div>
         </div>
      </section>
    </PageTransition>
  );
}
