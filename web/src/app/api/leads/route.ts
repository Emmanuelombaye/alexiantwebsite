import { NextResponse } from "next/server";
import { createLeadInquiry, listLeadInquiries } from "@/lib/leads/service";
import { sendLeadNotification } from "@/lib/notifications/service";
import { isAdminRequest } from "@/lib/admin-auth";
import { checkLeadsRateLimit } from "@/lib/security/rate-limiter";
import { getClientIp } from "@/lib/security/bot-detection";
import {
  sanitizeText,
  sanitizeEmail,
  sanitizePhone,
  sanitizeSlug,
  hasSqlInjectionPattern,
  isHoneypotFilled,
} from "@/lib/security/sanitize";
import type { LeadIntent, LeadPayload } from "@/types/lead";

const allowedIntents: LeadIntent[] = ["buy", "rent", "sell", "invest"];

export const dynamic = "force-dynamic";

/** GET is admin-only */
export async function GET() {
  const isAdmin = await isAdminRequest();
  if (!isAdmin) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }
  return NextResponse.json({ leads: await listLeadInquiries() });
}

export async function POST(request: Request) {
  // ── Rate limiting ────────────────────────────────────────────────────────
  const ip = getClientIp(request.headers as unknown as Headers);
  const limit = checkLeadsRateLimit(ip);
  if (!limit.allowed) {
    const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000);
    return NextResponse.json(
      { message: "Too many submissions. Please wait a moment before trying again." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  // ── Parse body ───────────────────────────────────────────────────────────
  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  // ── Honeypot check (invisible field bots fill automatically) ─────────────
  if (isHoneypotFilled(raw._honey)) {
    // Return 200 to confuse bots — don't reveal detection
    return NextResponse.json({ message: "Your inquiry has been received." });
  }

  // ── Sanitise and validate inputs ─────────────────────────────────────────
  const name = sanitizeText(raw.name, 100);
  const email = sanitizeEmail(raw.email);
  const phone = sanitizePhone(raw.phone);
  const intent = raw.intent as LeadIntent | undefined;
  const propertySlug = sanitizeSlug(raw.propertySlug) ?? undefined;
  const message = sanitizeText(raw.message, 2000);

  if (!name || !email || !phone || !message) {
    return NextResponse.json(
      { message: "Name, email, phone and message are required." },
      { status: 400 },
    );
  }

  if (name.length < 2) {
    return NextResponse.json({ message: "Please enter your full name." }, { status: 400 });
  }

  if (!intent || !allowedIntents.includes(intent)) {
    return NextResponse.json(
      { message: "Please choose a valid inquiry type." },
      { status: 400 },
    );
  }

  // ── SQL injection guard ─────────────────────────────────────────────────
  const allFields = [name, email, phone, message, propertySlug ?? ""];
  if (allFields.some(hasSqlInjectionPattern)) {
    return NextResponse.json({ message: "Invalid characters detected." }, { status: 400 });
  }

  // ── Persist & notify ────────────────────────────────────────────────────
  const lead = await createLeadInquiry({
    name,
    email,
    phone,
    intent,
    propertySlug,
    message,
  } as LeadPayload);

  await sendLeadNotification(lead).catch(console.error);

  return NextResponse.json({
    message: `Thanks ${name}, your ${intent} inquiry${propertySlug ? ` for ${propertySlug}` : ""} has been received by Alexiant.`,
    lead,
  });
}