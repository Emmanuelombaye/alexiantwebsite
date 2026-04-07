import { Metadata } from "next";
import { listProperties } from "@/lib/properties/service";
import { PropertyCard } from "@/components/property-card";
import { PageTransition, AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import Link from "next/link";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";

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
    </PageTransition>
  );
}
