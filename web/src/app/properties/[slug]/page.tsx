import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/lead-form";
import { PropertyCard } from "@/components/property-card";
import { PropertyGallery } from "@/components/property-gallery";
import { formatPropertyPrice, titleCase } from "@/lib/format";
import { getPropertyBySlug, listProperties } from "@/lib/properties/service";
import { getImageUrl, getImageAlt } from "@/lib/properties/utils";
import { PageTransition, AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";

export const dynamic = "force-dynamic";

type PropertyDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return { title: "Property Not Found" };
  }

  const canonicalUrl = `https://alexiantrealestate.co.ke/properties/${property.slug}`;
  const locationShort = property.location.split(",")[0].trim();
  const categoryLabel = property.category === "sale" ? "for Sale" : "for Rent";
  const priceLabel =
    property.category === "sale"
      ? `KES ${Number(property.price).toLocaleString()}`
      : `KES ${Number(property.price).toLocaleString()}${property.priceSuffix ? " " + property.priceSuffix : ""}`;

  return {
    title: `${property.title} — ${locationShort} | ${categoryLabel} at ${priceLabel}`,
    description: `${property.summary} Located in ${property.location}. Listed by Alexiant Real Estate — Diani & Kenya South Coast property specialists.`,
    keywords: [
      property.title,
      `property ${categoryLabel.toLowerCase()} ${locationShort}`,
      `${locationShort} real estate`,
      "Diani property",
      "Kenya coast property",
      "South Coast Kenya",
      "Alexiant Real Estate",
      `${property.category === "sale" ? "buy" : "rent"} property ${locationShort}`,
      "Kwale County real estate",
    ],
    openGraph: {
      title: `${property.title} | Alexiant Real Estate`,
      description: property.summary,
      url: canonicalUrl,
      type: "website",
      images: property.images.length > 0
        ? [{ url: getImageUrl(property.images[0]), width: 1200, height: 800, alt: getImageAlt(property.images[0], property.title) }]
        : [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Alexiant Real Estate" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${property.title} | Alexiant`,
      description: property.summary,
      images: property.images.length > 0 ? [getImageUrl(property.images[0])] : ["/og-image.svg"],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}


export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return notFound();
  }

  const properties = await listProperties();
  const relatedProperties = properties
    .filter((item) => item.slug !== property.slug)
    .filter((item) => item.category === property.category || item.featured)
    .slice(0, 3);

  const baseUrl = getSiteUrl();
  const canonicalUrl = `${baseUrl}/properties/${property.slug}`;
  const locationShort = property.location.split(",")[0].trim();
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: `${baseUrl}/` },
    { name: "Properties", url: `${baseUrl}/properties` },
    { name: property.title, url: canonicalUrl },
  ]);
  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: property.summary,
    category: property.category === "sale" ? "Real estate for sale" : "Real estate for rent",
    brand: {
      "@type": "Organization",
      name: "Alexiant Real Estate",
    },
    image: property.images.map((img) => {
      const url = getImageUrl(img);
      return url.startsWith("http") ? url : `${baseUrl}${url}`;
    }),
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "KES",
      price: Number(property.price),
      availability: property.status === "available" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "RealEstateAgent",
        name: "Alexiant Real Estate",
        url: baseUrl,
        telephone: "+254759636615",
      },
    },
    areaServed: {
      "@type": "Place",
      name: locationShort,
    },
  };

  const mapHref = `https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}`;
  const photoCount = property.images.length;

  return (
    <PageTransition className="section-shell pt-32 lg:pt-40 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(listingSchema)} />
      <AnimatedSection direction="left" className="mb-8">
        <Link 
          href="/properties" 
          className="group inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/50 px-6 py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#046A38] backdrop-blur-md transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-white hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] hover:-translate-y-0.5"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 transition-colors duration-300 group-hover:bg-[#D4AF37] group-hover:text-white">
            <svg className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </span>
          Back to Collection
        </Link>
      </AnimatedSection>

      <section className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <StaggerContainer>
          <StaggerItem>
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-[color:var(--brand)]">{titleCase(property.category)}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">{titleCase(property.status)}</span>
              {property.featured ? (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">Featured</span>
              ) : null}
            </div>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              {property.title}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 text-lg text-slate-600">{property.location}</p>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 text-2xl font-semibold text-slate-950">
              {formatPropertyPrice(property.price, property.priceSuffix)}
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">{property.summary}</p>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-5 max-w-3xl leading-8 text-slate-600">{property.description}</p>
          </StaggerItem>
        </StaggerContainer>

        <AnimatedSection direction="right" className="card-surface bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,248,255,0.98))] p-6">
          <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Quick facts</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.4rem] bg-[var(--surface-muted)] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Category</p>
              <p className="mt-2 font-semibold text-slate-950">{titleCase(property.category)}</p>
            </div>
            <div className="rounded-[1.4rem] bg-[var(--surface-muted)] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Status</p>
              <p className="mt-2 font-semibold text-slate-950">{titleCase(property.status)}</p>
            </div>
            <div className="rounded-[1.4rem] bg-[var(--surface-muted)] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Photos</p>
              <p className="mt-2 font-semibold text-slate-950">{photoCount}</p>
            </div>
          </div>
          <div className="mt-6 rounded-[1.6rem] border border-blue-100 bg-white p-5 shadow-[0_18px_40px_rgba(15,76,201,0.08)]">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Assigned advisor</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">{property.agent.name}</p>
            <p className="mt-2 text-slate-500">{property.agent.role}</p>
            <a href={`tel:${property.agent.phone.replace(/\s+/g, "")}`} className="mt-6 block font-medium text-slate-950 hover:text-[color:var(--brand)]">
              {property.agent.phone}
            </a>
            <a href={`mailto:${property.agent.email}`} className="mt-2 block text-slate-600 hover:text-slate-950">
              {property.agent.email}
            </a>
          </div>
          <div className="mt-6 rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(239,246,255,0.9),rgba(255,255,255,0.98))] p-5 text-slate-600">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Location</p>
            <p className="mt-3 leading-7">{property.location}</p>
            <a
              href={mapHref}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-full border border-blue-200 px-4 py-2 font-medium text-[color:var(--brand)] transition hover:border-[color:var(--brand)] hover:bg-blue-50"
            >
              Open map location
            </a>
          </div>
        </AnimatedSection>
      </section>

      {property.images.length > 0 ? (
        <AnimatedSection direction="up" className="mt-10">
          <PropertyGallery title={property.title} images={property.images} />
        </AnimatedSection>
      ) : null}

      <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <StaggerContainer className="card-surface p-8">
          <StaggerItem>
            <p className="section-kicker">Property highlights</p>
          </StaggerItem>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {property.features.map((feature) => (
              <StaggerItem key={feature.label}>
                <div className="rounded-3xl bg-[linear-gradient(180deg,rgba(239,246,255,0.92),rgba(255,255,255,0.98))] p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{feature.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">{feature.value}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
          <div className="mt-8">
            <StaggerItem>
              <p className="text-lg font-semibold text-slate-950">Amenities</p>
            </StaggerItem>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {property.amenities.map((amenity) => (
                <StaggerItem key={amenity}>
                  <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-slate-600 shadow-[0_12px_24px_rgba(15,76,201,0.04)]">
                    {amenity}
                  </div>
                </StaggerItem>
              ))}
            </div>
          </div>
        </StaggerContainer>

        <AnimatedSection direction="up" className="space-y-6">
          <div className="card-surface bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,248,255,0.98))] p-6">
            <p className="section-kicker">Property snapshot</p>
            <div className="mt-5 space-y-4 text-slate-600">
              <p>
                <span className="font-semibold text-slate-950">Location:</span> {property.location}
              </p>
              <p>
                <span className="font-semibold text-slate-950">Advisor:</span> {property.agent.name}
              </p>
              <p>
                <span className="font-semibold text-slate-950">Price:</span> {formatPropertyPrice(property.price, property.priceSuffix)}
              </p>
            </div>
          </div>
          <LeadForm dark={false} propertySlug={property.slug} heading={`Inquire about ${property.title}`} />
        </AnimatedSection>
      </section>

      {relatedProperties.length > 0 ? (
        <section className="mt-12">
          <AnimatedSection direction="up" className="flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Related properties</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">Explore similar opportunities</h2>
            </div>
          </AnimatedSection>
          <StaggerContainer className="mt-8 grid gap-6 md:grid-cols-3">
            {relatedProperties.map((item) => (
              <StaggerItem key={item.id}>
                <PropertyCard property={item} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      ) : null}

      {/* JSON-LD Structured Data — RealEstateListing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            name: property.title,
            description: property.summary,
            url: `https://alexiantrealestate.co.ke/properties/${property.slug}`,
            image: property.images.map(img => getImageUrl(img)),
            datePosted: new Date().toISOString().split("T")[0],
            offers: {
              "@type": "Offer",
              price: property.price,
              priceCurrency: "KES",
              availability:
                property.status === "available"
                  ? "https://schema.org/InStock"
                  : "https://schema.org/SoldOut",
              businessFunction:
                property.category === "rent"
                  ? "https://purl.org/goodrelations/v1#LeaseOut"
                  : "https://purl.org/goodrelations/v1#Sell",
            },
            address: {
              "@type": "PostalAddress",
              streetAddress: property.location,
              addressLocality: "Diani",
              addressRegion: "Kwale County",
              addressCountry: "KE",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: property.coordinates.lat,
              longitude: property.coordinates.lng,
            },
            seller: {
              "@type": "RealEstateAgent",
              name: "Alexiant Real Estate",
              url: "https://alexiantrealestate.co.ke",
              telephone: "+254759636615",
              email: "info@alexiantrealestate.co.ke",
              address: {
                "@type": "PostalAddress",
                streetAddress: "New Beach Road",
                addressLocality: "Diani",
                addressRegion: "Kwale County",
                addressCountry: "KE",
              },
            },
          }),
        }}
      />
    </PageTransition>
  );
}