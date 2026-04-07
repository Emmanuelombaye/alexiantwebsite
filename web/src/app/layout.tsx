import type { Metadata, Viewport } from "next";
import { Geist, Pinyon_Script, Playfair_Display } from "next/font/google";
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
    default: "Alexiant Real Estate | Luxury Homes & Land for Sale in Kenya",
    template: "%s | Alexiant Real Estate",
  },
  description:
    "Alexiant Real Estate - Kenya's Premier Property Solutions. Discover luxury homes, prime land, commercial properties, and exclusive real estate opportunities.",
  keywords: [
    "real estate Kenya",
    "land for sale Kenya",
    "houses for sale Kenya",
    "property investment Kenya",
    "luxury homes Kenya",
    "plots for sale Diani",
    "Diani Beach property",
    "beachfront property Kenya",
    "Kwale County land",
    "South Coast Kenya real estate",
    "Ukunda property",
    "Galu Beach plots",
    "Kenya coastal property",
    "buy land Diani",
    "luxury villas Kenya coast",
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
    title: "Alexiant Real Estate | Luxury Homes & Land for Sale in Kenya",
    description:
      "Alexiant Real Estate - Kenya's Premier Property Solutions. Discover luxury homes, prime land, commercial properties, and exclusive real estate opportunities.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Alexiant Real Estate — Kenya Property Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexiant Real Estate | Luxury Homes & Land for Sale in Kenya",
    description:
      "Alexiant Real Estate - Kenya's Premier Property Solutions. Discover luxury homes, prime land, commercial properties, and exclusive real estate opportunities.",
    images: ["/og-image.svg"],
    creator: "@alexiantrealestate",
  },
  alternates: {
    canonical: "https://alexiantrealestate.co.ke",
    languages: {
      "en": "https://alexiantrealestate.co.ke",
    },
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" }
    ],
    apple: "/logo.png",
  },
  category: "real estate",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getSiteUrl();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Alexiant Real Estate",
    description:
      "Alexiant Real Estate - Kenya's Premier Property Solutions. Discover luxury homes, prime land, commercial properties, and exclusive real estate opportunities.",
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
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "00:00",
        closes: "00:00",
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
      { "@type": "Place", name: "Kenya" },
    ],
    sameAs: [
      "https://wa.me/254759636615",
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://chdpzfeuxcphzpyahrlh.supabase.co" />
        <meta name="theme-color" content="#046A38" />
        <meta name="color-scheme" content="light" />
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
      <body suppressHydrationWarning className={`${geistSans.variable} ${playfairDisplay.variable} ${pinyonScript.variable} antialiased`}>
        <div suppressHydrationWarning className="min-h-screen bg-[var(--page-background)] text-[var(--text-primary)]">
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </div>
      </body>
    </html>
  );
}

