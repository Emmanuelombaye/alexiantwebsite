import { Metadata } from "next";
import { ValuationClient } from "./valuation-client";

export const metadata: Metadata = {
  title: "Free Property Valuation Diani Beach | Market Appraisal Kenya Coast",
  description: "Get a free, data-driven market valuation for your coastal property in Diani, Galu, Tiwi or Msambweni. Expert insight based on actual transacted data from Alexiant Real Estate.",
  keywords: ["property valuation Diani", "house valuation Kenya Coast", "land appraisal Kwale", "free property valuation Kenya", "Diani property market value", "coastal property appraisal"],
  alternates: { canonical: "https://alexiantrealestate.co.ke/valuation" },
  openGraph: {
    title: "Free Property Valuation | Alexiant Real Estate Diani",
    description: "Data-driven market valuations for coastal properties in Diani, Galu, Tiwi and Msambweni.",
    url: "https://alexiantrealestate.co.ke/valuation",
    type: "website",
    images: [{ url: "https://alexiantrealestate.co.ke/og-image.svg", width: 1200, height: 630, alt: "Property Valuation Diani Beach Kenya" }],
  },
  twitter: { card: "summary_large_image", title: "Free Property Valuation Diani", description: "Expert coastal property valuations based on actual transacted data.", images: ["/og-image.svg"] },
};

export default function ValuationPage() {
  return <ValuationClient />;
}
