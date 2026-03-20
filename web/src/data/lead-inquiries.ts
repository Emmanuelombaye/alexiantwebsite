import type { LeadPayload, LeadRecord } from "@/types/lead";

const leadInquiries: LeadRecord[] = [
  {
    id: "lead-001",
    name: "Faith Njeri",
    email: "faith@example.com",
    phone: "+254700123456",
    intent: "buy",
    propertySlug: "galu-ocean-view-villa",
    message: "I would like to schedule a viewing this weekend and confirm the title status.",
    status: "new",
    source: "property-page",
    receivedAt: "2026-03-10T09:30:00.000Z",
  },
  {
    id: "lead-002",
    name: "Michael Otieno",
    email: "michael@example.com",
    phone: "+254711222333",
    intent: "invest",
    message: "Please share current coastal plots with short-term hospitality potential.",
    status: "contacted",
    source: "homepage",
    receivedAt: "2026-03-09T13:15:00.000Z",
  },
];

export function getLeadInquiries() {
  return [...leadInquiries].sort(
    (left, right) => new Date(right.receivedAt).getTime() - new Date(left.receivedAt).getTime(),
  );
}

export function addLeadInquiry(payload: LeadPayload) {
  const lead: LeadRecord = {
    id: `lead-${Date.now()}`,
    ...payload,
    status: "new",
    source: payload.propertySlug ? "property-page" : "homepage",
    receivedAt: new Date().toISOString(),
  };

  leadInquiries.unshift(lead);
  return lead;
}