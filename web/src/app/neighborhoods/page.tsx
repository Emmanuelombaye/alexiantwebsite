import { Metadata } from "next";
import { HeritageClient } from "@/components/heritage-client";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "The Heritage Collection | Sustainable Coastal Legacies",
  description:
    "Explore the Heritage Collection by Alexiant. 17 prestigious enclaves across the Kenyan Coast, from the coral cliffs of Tiwi to the deep marinas of Kilifi. A portfolio defined by legacy, craftsmanship, and timeless value.",
  keywords: [
    "luxury real estate Kenya",
    "heritage property Diani",
    "signature estates Watamu",
    "coastal legacy investments",
    "private coastline Diani Beach",
    "Alexiant Heritage Collection",
    "premium land investment Kenya",
    "beachfront legacies",
  ],
  openGraph: {
    title: "The Heritage Collection | Alexiant Real Estate",
    description:
      "A curated portfolio of high-value coastal enclaves. From Diani Beach to Malindi — where legacy meets legacy.",
    url: "https://alexiantrealestate.co.ke/heritage",
    type: "website",
    images: [
      {
        url: "/demo-media/neighborhoodImages/diani-1.png",
        width: 1200,
        height: 630,
        alt: "The Alexiant Heritage Collection - Premier Coastal Enclaves",
      },
    ],
  },
  alternates: {
    canonical: "https://alexiantrealestate.co.ke/heritage",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What defines the Alexiant Heritage Collection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Heritage Collection is a curated portfolio of 17 exclusive coastal enclaves selected for their rarity, architectural potential, and long-term value. It includes premier locations like Diani Beach, Kilifi Creek, and Watamu, focusing on luxury, legacy, and private estate management.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I find the most exclusive beachfront legacy properties in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Galu Kinondo and the central corridors of Diani Beach offer the most prestigious beachfront estates. For those seeking absolute seclusion and dramatic natural architecture, the Tiwi Cliffs and Msambweni provide unspoiled sanctuaries with high-impact investment potential.",
      },
    },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The Heritage Collection — Signature Coastal Enclaves",
  description: "A comprehensive guide to 17 elite coastal enclaves for legacy real estate investment in Kenya.",
  url: "https://alexiantrealestate.co.ke/heritage",
  numberOfItems: 12,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "The Diani Coast", url: "https://alexiantrealestate.co.ke/properties?location=Diani" },
    { "@type": "ListItem", position: 2, name: "Galu Enclave", url: "https://alexiantrealestate.co.ke/properties?location=Galu" },
    { "@type": "ListItem", position: 3, name: "Kilifi Creek", url: "https://alexiantrealestate.co.ke/properties?location=Kilifi" },
    { "@type": "ListItem", position: 4, name: "Watamu Marine", url: "https://alexiantrealestate.co.ke/properties?location=Watamu" },
    { "@type": "ListItem", position: 5, name: "Tiwi Cliffs", url: "https://alexiantrealestate.co.ke/properties?location=Tiwi" },
    { "@type": "ListItem", position: 6, name: "Msambweni Sanctuary", url: "https://alexiantrealestate.co.ke/properties?location=Msambweni" },
  ],
};

export default function NeighborhoodsPage() {
  const baseUrl = getSiteUrl();
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: `${baseUrl}/` },
    { name: "Heritage", url: `${baseUrl}/heritage` },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(breadcrumbSchema)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <HeritageClient />
    </>
  );
}
