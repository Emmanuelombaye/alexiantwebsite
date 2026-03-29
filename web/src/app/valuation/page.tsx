import { Metadata } from "next";
import { ValuationClient } from "./valuation-client";

export const metadata: Metadata = {
  title: "Professional Property Valuation | Alexiant Real Estate",
  description: "Get a data-driven market valuation for your coastal property in Diani, Galu, Tiwi or Msambweni. Expert insight based on actual transacted data.",
  keywords: ["property valuation Diani", "house valuation Kenya Coast", "land appraisal Kwale", "Alexiant Real Estate"],
};

export default function ValuationPage() {
  return <ValuationClient />;
}
