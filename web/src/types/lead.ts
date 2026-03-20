export type LeadIntent = "buy" | "rent" | "sell" | "invest";

export type LeadStatus = "new" | "contacted" | "qualified";

export type LeadSource = "homepage" | "property-page";

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  intent: LeadIntent;
  propertySlug?: string;
  message: string;
};

export type LeadRecord = LeadPayload & {
  id: string;
  status: LeadStatus;
  source: LeadSource;
  receivedAt: string;
};