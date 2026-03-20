import { addLeadInquiry, getLeadInquiries } from "@/data/lead-inquiries";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { sendLeadNotification } from "@/lib/notifications/service";
import type { LeadPayload, LeadRecord, LeadSource, LeadStatus } from "@/types/lead";

type SupabaseLeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  intent: LeadRecord["intent"];
  property_slug: string | null;
  message: string;
  status: LeadStatus;
  source: LeadSource;
  received_at: string;
};

function mapLeadRow(row: SupabaseLeadRow): LeadRecord {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    intent: row.intent,
    propertySlug: row.property_slug || undefined,
    message: row.message,
    status: row.status,
    source: row.source,
    receivedAt: row.received_at,
  };
}

function toLeadInsert(payload: LeadPayload): {
  name: string;
  email: string;
  phone: string;
  intent: LeadPayload["intent"];
  property_slug: string | null;
  message: string;
  status: LeadStatus;
  source: LeadSource;
} {
  return {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    intent: payload.intent,
    property_slug: payload.propertySlug ?? null,
    message: payload.message,
    status: "new",
    source: payload.propertySlug ? "property-page" : "homepage",
  };
}

export async function listLeadInquiries() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return getLeadInquiries();
  }

  const { data, error } = await supabase
    .from("leads")
    .select("id, name, email, phone, intent, property_slug, message, status, source, received_at")
    .order("received_at", { ascending: false });

  if (error || !data) {
    return getLeadInquiries();
  }

  return data.map((row) => mapLeadRow(row as SupabaseLeadRow));
}

export async function createLeadInquiry(payload: LeadPayload) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    const lead = addLeadInquiry(payload);
    // Send notification in background
    sendLeadNotification(lead).catch(console.error);
    return lead;
  }

  const insert = toLeadInsert(payload);

  const { data, error } = await supabase
    .from("leads")
    .insert(insert)
    .select("id, name, email, phone, intent, property_slug, message, status, source, received_at")
    .single();

  if (error || !data) {
    const lead = addLeadInquiry(payload);
    sendLeadNotification(lead).catch(console.error);
    return lead;
  }

  const lead = mapLeadRow(data as SupabaseLeadRow);
  // Send notification in background
  sendLeadNotification(lead).catch(console.error);
  return lead;
}