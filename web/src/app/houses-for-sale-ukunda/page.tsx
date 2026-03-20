import { Metadata } from "next";
import { listProperties } from "@/lib/properties/service";
import { PropertyCard } from "@/components/property-card";
import { PageTransition, AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import Link from "next/link";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Houses & Apartments for Sale in Ukunda | Property Kwale County",
  description: "Discover homes, residential apartments and holiday houses for sale in Ukunda, Kwale County. Affordable real estate options near Diani Beach with high ROI potential.",
  keywords: ["houses for sale ukunda", "apartments for sale ukunda", "property ukunda kwale", "buy home ukunda", "ukunda residential property"],
};

export default async function UkundaHousesPage() {
  const properties = await listProperties();
  const houses = properties.filter(p => 
    p.category === 'sale' && 
    (p.title.toLowerCase().includes('house') || p.title.toLowerCase().includes('villa') || p.title.toLowerCase().includes('apartment')) &&
    p.location.toLowerCase().includes('ukunda')
  );
  const baseUrl = getSiteUrl();
  const canonical = `${baseUrl}/houses-for-sale-ukunda`;
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: `${baseUrl}/` },
    { name: "Properties", url: `${baseUrl}/properties` },
    { name: "Houses for Sale in Ukunda", url: canonical },
  ]);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Houses for sale in Ukunda",
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
            <span className="eyebrow-chip mb-6">Residential Listings</span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
               Houses for Sale in Ukunda
            </h1>
            <p className="mt-8 text-xl text-slate-600 leading-relaxed max-w-2xl">
              From family homes to investment apartments, Ukunda offers some of the most accessible and high-growth property in the Kwale region.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-shell py-12">
        {houses.length > 0 ? (
          <StaggerContainer className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {houses.map((property) => (
              <StaggerItem key={property.id}>
                <PropertyCard property={property} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="py-20 text-center bg-slate-50 rounded-[3rem]">
             <h3 className="text-2xl font-bold text-slate-900 mb-4">No houses currently listed in Ukunda</h3>
             <p className="text-slate-500 mb-10">Searching for something specific? Contact our desk for new off-market residential deals.</p>
             <Link href="/contact" className="nav-cta-gold !inline-flex">Contact Advisor</Link>
          </div>
        )}
      </section>

      <section className="section-shell py-24 bg-slate-50 rounded-[3.5rem] my-20 border border-slate-100">
         <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 text-slate-900">Why Buy a House in Ukunda?</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
               <p>Ukunda serves as the commercial gateway to Diani Beach. Purchasing residential houses and apartments here provides excellent entry points and high-rental demand from professionals and expatriates working along the South Coast.</p>
               <ul className="list-disc pl-6 space-y-3 font-medium">
                  <li><strong>Long-term Rental Yields:</strong> Enjoy stronger tenant stability compared to seasonal Diani holiday rentals.</li>
                  <li><strong>Affordable Coastal Living:</strong> Lower entry-capital relative to beachfront Diani villas while still holding significant capital appreciation value.</li>
                  <li><strong>Prime Proximity:</strong> Located near the Ukunda airstrip, local hospitals, and top-tier shopping malls, maximizing daily convenience.</li>
               </ul>
            </div>
         </div>
      </section>
    </PageTransition>
  );
}
