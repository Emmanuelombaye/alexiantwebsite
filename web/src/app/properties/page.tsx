import type { Metadata } from "next";
import Link from "next/link";
import { PropertyFilters } from "@/components/property-filters";
import { PropertyCard } from "@/components/property-card";
import { siteContent } from "@/data/site-content";
import { countActivePropertyFilters, getPropertyFilterBadges } from "@/lib/property-filters";
import { listProperties } from "@/lib/properties/service";
import { PageTransition, AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { getSiteUrl } from "@/lib/seo/site-url";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: PropertiesPageProps): Promise<Metadata> {
  const params = await searchParams;
  const baseUrl = getSiteUrl();
  const canonical = `${baseUrl}/properties`;

  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const rawCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const rawStatus = Array.isArray(params.status) ? params.status[0] : params.status;

  const hasParams = Boolean(rawQuery || rawCategory || rawStatus);

  return {
    title: "Modern Coastal Portfolio | Real Estate Listings Diani",
    description:
      "Explore our signature collection of villas, plots, and luxury rentals in Diani and the South Coast. Filtered search for buyers and investors.",
    keywords: [
      "Diani real estate listings",
      "buy property Kenya coast",
      "Galu Beach rentals",
      "luxury villas Diani",
    ],
    alternates: { canonical },
    // Avoid duplicate indexing for filter/query combinations. Core landing pages are already covered by dedicated routes.
    robots: hasParams ? { index: false, follow: true } : undefined,
  };
}

type PropertiesPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    status?: string;
    type?: string;
  }>;
};

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;
  const properties = await listProperties();
  const baseUrl = getSiteUrl();
  const canonical = `${baseUrl}/properties`;
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: `${baseUrl}/` },
    { name: "Properties", url: canonical },
  ]);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Properties",
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "Alexiant Real Estate", url: baseUrl },
  };
  
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const rawCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const rawStatus = Array.isArray(params.status) ? params.status[0] : params.status;
  const rawType = Array.isArray(params.type) ? params.type[0] : params.type;

  const query = (rawQuery || "").trim().toLowerCase();
  const category = rawCategory === "sale" || rawCategory === "rent" ? rawCategory : "";
  const status =
    rawStatus === "available" || rawStatus === "sold" || rawStatus === "rented"
      ? rawStatus
      : "";
  const type = (rawType || "").trim().toLowerCase();

  const filteredProperties = properties.filter((property) => {
    const matchesQuery =
      !query ||
      [property.title, property.location, property.summary, property.agent.name]
        .join(" ")
        .toLowerCase()
        .includes(query);
    const matchesCategory = !category || property.category === category;
    const matchesStatus = !status || property.status === status;
    const matchesType = !type || property.features.some(f => f.label.toLowerCase() === 'type' && f.value.toLowerCase() === type);

    return matchesQuery && matchesCategory && matchesStatus && matchesType;
  });

  const saleCount = properties.filter((p) => p.category === "sale").length;
  const rentCount = properties.filter((p) => p.category === "rent").length;
  const activeFilterBadges = getPropertyFilterBadges({ query: params.q || "", category, status });

  return (
    <PageTransition className="pb-20 overflow-hidden bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(collectionSchema)} />
      
      {/* ─── FILTERS ─── */}
      <div className="section-shell pt-24 pb-10">
         <div className="rounded-[2.5rem] bg-white p-3 shadow-3xl shadow-slate-200/50 ring-1 ring-slate-100">
            <PropertyFilters
              defaultQuery={query}
              defaultCategory={category}
              defaultStatus={status}
              defaultType={type}
              resultCount={filteredProperties.length}
              totalCount={properties.length}
              saleCount={saleCount}
              rentCount={rentCount}
              availableCount={properties.filter(p => p.status === 'available').length}
              featuredCount={properties.filter(p => p.featured).length}
            />
         </div>
      </div>

      {/* ─── RESULTS ─── */}
      <section className="section-shell pb-10 sm:pb-16 pt-10">
        
        {filteredProperties.length > 0 ? (
          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <StaggerItem key={property.id}>
                <PropertyCard property={property} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <AnimatedSection direction="up" className="py-24 text-center rounded-[3rem] border border-dashed border-[#D4AF37]/30 bg-slate-50/50 backdrop-blur-sm">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#D4AF37] mx-auto mb-8 shadow-xl shadow-[#D4AF37]/10">
               <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </div>
            <h3 className="font-display text-2xl font-semibold text-slate-900 mb-4 tracking-tight">No artifacts match your inquiry</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-10 text-[0.95rem] leading-relaxed">The most exclusive opportunities are often kept off-market. Consider refining your search or contact an advisor for a private portfolio reveal.</p>
            <Link href="/properties" className="inline-flex h-12 items-center px-8 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#011611] text-[0.6rem] font-black uppercase tracking-[0.3em] hover:scale-[1.03] transition-all shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)]">
               Reset Inquiry
            </Link>
          </AnimatedSection>
        )}
      </section>

      {/* ─── COLLECTION METRICS ─── */}
      <section className="section-shell pb-16 sm:pb-24">
         <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#D4AF37]/20 bg-[linear-gradient(110deg,#011611,#022c22_40%,#011611)] shadow-[0_20px_40px_rgba(2,44,34,0.15)] relative backdrop-blur-md hover:shadow-[0_20px_50px_rgba(212,175,55,0.1)] transition-all duration-700">
            {/* Elegant Backgrounds */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-[0.03] mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#011611]/80" />
            <div className="absolute inset-0 soft-grid opacity-10" />
            <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-[80px]" />
            <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-[#046A38]/20 blur-[80px]" />
            
            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-[#D4AF37]/10">
               {[
                 { label: 'Asset Portfolio', val: saleCount, suffix: 'Listings' },
                 { label: 'Yield Potential', val: 'High', suffix: 'ROI' },
                 { label: 'Provenance', val: '100%', suffix: 'Verified' },
                 { label: 'Strategic Reach', val: siteContent.coverage.length, suffix: 'Regions' }
               ].map((s) => (
                 <div key={s.label} className="group flex flex-col items-center justify-center p-8 sm:p-10 text-center transition-all duration-500 hover:bg-[#D4AF37]/[0.02]">
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-[#D4AF37]/60 mb-4 group-hover:text-[#D4AF37] transition-colors duration-500">{s.label}</p>
                    <div className="flex items-baseline justify-center gap-2">
                      <p className="font-display text-4xl font-bold tracking-tight text-white drop-shadow-sm group-hover:scale-105 transition-transform duration-500">{s.val}</p>
                      <span className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-[#D4AF37]/80">{s.suffix}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </PageTransition>
  );
}