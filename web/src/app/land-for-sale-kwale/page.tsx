import { Metadata } from "next";
import { listProperties } from "@/lib/properties/service";
import { PropertyCard } from "@/components/property-card";
import { PageTransition, AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import Link from "next/link";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Land for Sale in Kwale County | South Coast Kenya Plot Listings",
  description: "Explore broadacre land, residential plots and commercial sites for sale across Kwale County. From Shimba Hills to the South Coast beaches of Msambweni and Diani Beach.",
  keywords: ["land for sale kwale county", "kwale plots for sale", "land south coast kenya", "large land parcels kwale", "agricultural land kwale", "msambweni land for sale", "shimba hills land"],
  alternates: { canonical: "https://alexiantrealestate.co.ke/land-for-sale-kwale" },
  openGraph: {
    title: "Land for Sale in Kwale County | Alexiant Real Estate",
    description: "Broadacre land, residential plots and commercial sites across Kwale County, South Coast Kenya.",
    url: "https://alexiantrealestate.co.ke/land-for-sale-kwale",
    type: "website",
    images: [{ url: "https://alexiantrealestate.co.ke/og-image.svg", width: 1200, height: 630, alt: "Land for Sale Kwale County Kenya" }],
  },
  twitter: { card: "summary_large_image", title: "Land for Sale in Kwale County", description: "Plots and land across Kwale County, South Coast Kenya.", images: ["/og-image.svg"] },
};

export default async function KwaleLandPage() {
  const properties = await listProperties();
  const land = properties.filter(p => 
    p.category === 'sale' && 
    (p.title.toLowerCase().includes('plot') || p.title.toLowerCase().includes('land') || p.title.toLowerCase().includes('acre'))
  );
  const baseUrl = getSiteUrl();
  const canonical = `${baseUrl}/land-for-sale-kwale`;
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: `${baseUrl}/` },
    { name: "Properties", url: `${baseUrl}/properties` },
    { name: "Land for Sale in Kwale", url: canonical },
  ]);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Land for sale in Kwale County",
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
            <span className="eyebrow-chip mb-6">County-wide Listings</span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
               Land for Sale in Kwale
            </h1>
            <p className="mt-8 text-xl text-slate-600 leading-relaxed max-w-2xl">
              Searching for expansive land or strategic development sites in Kwale County? We manage a diverse portfolio of land across the South Coast.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-shell py-12">
        {land.length > 0 ? (
          <StaggerContainer className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {land.map((property) => (
              <StaggerItem key={property.id}>
                <PropertyCard property={property} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="py-20 text-center bg-slate-50 rounded-[3rem]">
             <h3 className="text-2xl font-bold text-slate-900 mb-4">No specific land parcels listed</h3>
             <p className="text-slate-500 mb-10">We handle many off-market land deals for development and agriculture. Contact our land desk.</p>
             <Link href="/contact" className="nav-cta-gold !inline-flex">Enquire About Land</Link>
          </div>
        )}
      </section>

      <section className="section-shell py-24 bg-slate-50 rounded-[3.5rem] my-20 border border-slate-100">
         <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 text-slate-900">Kwale County Real Estate Directory</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
               <p>Spanning from the lush Shimba Hills National Reserve to the expansive Indian Ocean shoreline, Kwale County presents incredibly diverse zoning and physical planning opportunities. Whether acquiring large broadacre agricultural acreages or strategic multi-unit development parcels, executing deep-level due diligence with a local asset manager is paramount.</p>
               <ul className="list-disc pl-6 space-y-3 font-medium">
                  <li><strong>Subdivision & Processing:</strong> Verify acreage viability against the county zoning boundaries for both residential housing and commercial hospitality.</li>
                  <li><strong>Multi-Dwelling Regulations:</strong> Ensure all physical planning proposals smoothly navigate Kwale County approvals for high-density constructions.</li>
                  <li><strong>Infrastructure Upgrades:</strong> Map your property boundaries to track favorable capital appreciation from new routing developments like the Dongo Kundu bypass.</li>
               </ul>
            </div>
         </div>
      </section>
    </PageTransition>
  );
}
