import type { Metadata } from "next";
import { Geist, Pinyon_Script, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { SplashLoader } from "@/components/splash-loader";
import { ClientLayoutWrapper } from "@/components/client-layout-wrapper";
import { getSiteUrl } from "@/lib/seo/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const pinyonScript = Pinyon_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Plots & Homes for Sale in Diani Beach | Alexiant Real Estate Kenya",
    template: "%s | Alexiant Real Estate",
  },
  description:
    "Discover prime land and property for sale in Diani Beach and Ukunda, Kwale County. We offer affordable plots, beachfront villas, residential homes, and commercial land across the South Coast of Kenya.",
  keywords: [
    "land for sale in diani beach",
    "plots for sale in ukunda",
    "beach plots for sale diani",
    "cheap land for sale south coast kenya",
    "residential plots diani beach",
    "commercial land for sale ukunda",
    "kwale county land for sale",
    "freehold land diani beach",
    "houses for sale in diani beach",
    "villas for sale diani kenya",
    "beachfront property diani",
    "apartments for sale ukunda",
    "holiday homes diani beach",
    "real estate agent diani beach",
    "property listings ukunda",
    "land for sale kwale county",
    "Diani Beach property",
    "Ukunda real estate",
    "Kwale County land",
    "South Coast Kenya property",
    "beachfront property Diani"
  ],
  authors: [{ name: "Alexiant Real Estate", url: "https://alexiantrealestate.co.ke" }],
  creator: "Alexiant Real Estate",
  publisher: "Alexiant Real Estate",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://alexiantrealestate.co.ke",
    siteName: "Alexiant Real Estate",
    title: "Plots & Homes for Sale in Diani Beach | Affordable South Coast Land",
    description:
      "Premium property, beachfront villas, and affordable plots for sale in Diani, Ukunda and Msambweni. Expert coastal real estate advisory.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Alexiant Real Estate — Diani & Kenya Coast Property",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plots for Sale in Diani Beach | Real Estate South Coast Kenya",
    description:
      "Searching for land or houses in Diani? Alexiant offers the best beachfront property and investment plots in Kwale County.",
    images: ["/og-image.svg"],
    creator: "@alexiantrealestate",
  },
  alternates: {
    canonical: getSiteUrl(),
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" }
    ],
    apple: "/logo.png",
  },
  category: "real estate",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getSiteUrl();

  const localBusinessSchema = {
    // ... kept as is for brevity
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "RealEstateAgent"],
    name: "Alexiant Real Estate – Diani Beach & Ukunda",
    description:
      "Discover prime land, beachfront villas and affordable plots for sale in Diani Beach and Ukunda, Kwale County. Your trusted South Coast Kenya property listings partner.",
    url: getSiteUrl(),
    telephone: "+254759636615",
    email: "info@alexiantrealestate.co.ke",
    image: `${getSiteUrl()}/og-image.svg`,
    logo: `${getSiteUrl()}/logo.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "New Beach Road",
      addressLocality: "Diani",
      addressRegion: "Kwale County",
      postalCode: "80401",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -4.2818,
      longitude: 39.5913,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "14:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "On Request",
        closes: "On Request",
      },
    ],
    areaServed: [
      { "@type": "Place", name: "Diani Beach" },
      { "@type": "Place", name: "Galu Beach" },
      { "@type": "Place", name: "Tiwi, Kenya" },
      { "@type": "Place", name: "Ukunda" },
      { "@type": "Place", name: "Msambweni" },
      { "@type": "Place", name: "Kwale County" },
      { "@type": "Place", name: "Kenya South Coast" },
      { "@type": "Place", name: "Shimoni" },
    ],
    sameAs: [
      "https://wa.me/254759636615",
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Alexiant Real Estate",
              url: siteUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/properties?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${playfairDisplay.variable} ${pinyonScript.variable} antialiased`}>
        <div className="min-h-screen bg-[var(--page-background)] text-[var(--text-primary)]">
          <ClientLayoutWrapper
            splashLoader={<SplashLoader />}
            siteHeader={<SiteHeader />}
            siteFooter={<SiteFooter />}
            whatsappFab={<WhatsappFab />}
          >
            {children}
          </ClientLayoutWrapper>
        </div>
      </body>
    </html>
  );
}

