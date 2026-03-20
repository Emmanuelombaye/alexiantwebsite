import { NextResponse } from "next/server";
import { createLeadInquiry, listLeadInquiries } from "@/lib/leads/service";
import { sendLeadNotification } from "@/lib/notifications/service";
import type { LeadIntent, LeadPayload } from "@/types/lead";

const allowedIntents: LeadIntent[] = ["buy", "rent", "sell", "invest"];

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ leads: await listLeadInquiries() });
}

export async function POST(request: Request) {
  let body: Partial<LeadPayload>;

  try {
    body = (await request.json()) as Partial<LeadPayload>;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const intent = body.intent;
  const propertySlug = body.propertySlug?.trim();
  const message = body.message?.trim();

  if (!name || !email || !phone || !message) {
    return NextResponse.json(
      { message: "Name, email, phone and message are required." },
      { status: 400 },
    );
  }

  if (!intent || !allowedIntents.includes(intent)) {
    return NextResponse.json({ message: "Please choose a valid inquiry type." }, { status: 400 });
  }

  const lead = await createLeadInquiry({
    name,
    email,
    phone,
    intent,
    propertySlug,
    message,
  });

  // Trigger the email workflow without blocking the response
  await sendLeadNotification(lead).catch(console.error);

  return NextResponse.json({
    message: `Thanks ${name}, your ${intent} inquiry${propertySlug ? ` for ${propertySlug}` : ""} has been received by Alexiant.`,
    lead,
  });
}