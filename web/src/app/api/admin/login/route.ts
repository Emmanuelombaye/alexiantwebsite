import { NextResponse } from "next/server";
import { getAdminCookieName, signSession } from "@/lib/admin-auth";
import { checkLoginRateLimit } from "@/lib/security/rate-limiter";
import { getClientIp } from "@/lib/security/bot-detection";

export const dynamic = "force-dynamic";

/**
 * Standard timing-safe comparison.
 * Works across both Node.js and Edge Runtime.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function POST(request: Request) {
  const ip = getClientIp(request.headers as unknown as Headers);
  const limit = checkLoginRateLimit(ip);
  if (!limit.allowed) {
    const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000);
    return NextResponse.json(
      { message: "Too many login attempts. Please wait before trying again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-Robots-Tag": "noindex",
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const password =
    typeof (body as Record<string, unknown>)?.password === "string"
      ? ((body as Record<string, unknown>).password as string)
      : "";

  const expected = process.env.ADMIN_PORTAL_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { message: "Admin password is not configured." },
      { status: 503 },
    );
  }

  // Use the safe comparison
  const isCorrect = timingSafeEqual(password, expected);

  if (!password || !isCorrect) {
    // Artificial delay to deter brute-force
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 300));
    return NextResponse.json({ message: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  const signedSession = await signSession("admin");
  
  response.cookies.set(getAdminCookieName(), signedSession, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 hours
  });
  
  return response;
}
