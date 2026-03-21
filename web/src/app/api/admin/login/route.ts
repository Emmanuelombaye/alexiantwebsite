import { NextResponse } from "next/server";
import { getAdminCookieName, signSession } from "@/lib/admin-auth";
import { checkLoginRateLimit } from "@/lib/security/rate-limiter";
import { getClientIp } from "@/lib/security/bot-detection";

export const dynamic = "force-dynamic";

/**
 * Timing-safe string comparison – prevents timing attacks that could reveal
 * password length/content through response time differences.
 */
function timingSafeEqual(a: string, b: string): boolean {
  // Pad to same length so the comparison always takes the same time
  const bufA = Buffer.from(a.padEnd(72, "\0"));
  const bufB = Buffer.from(b.padEnd(72, "\0"));
  let diff = bufA.length ^ bufB.length;
  for (let i = 0; i < Math.min(bufA.length, bufB.length); i++) {
    diff |= bufA[i] ^ bufB[i];
  }
  return diff === 0;
}

export async function POST(request: Request) {
  // Rate-limit by IP (double-checked here in case middleware is bypassed)
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

  // Always run the comparison — even if password is empty — to prevent
  // early-exit timing attacks.
  const isCorrect = timingSafeEqual(password, expected);

  if (!password || !isCorrect) {
    // Add a small artificial delay to slow down brute-force even more
    await new Promise((r) => setTimeout(r, 300 + Math.random() * 200));
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
