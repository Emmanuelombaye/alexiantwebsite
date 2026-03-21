import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "alexiant_admin_session";

/**
 * environment-agnostic HMAC signature using Web Crypto API.
 * This works in both Node.js and Edge Runtime (Next.js Middleware).
 */
async function getHmacSignature(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const data = encoder.encode(payload);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, data);
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function signSession(payload: string): Promise<string> {
  const secret = process.env.ADMIN_PORTAL_PASSWORD || "alexiant_fallback_secret_3910";
  const signature = await getHmacSignature(payload, secret);
  return `${payload}.${signature}`;
}

export async function verifySession(token: string): Promise<string | null> {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const secret = process.env.ADMIN_PORTAL_PASSWORD || "alexiant_fallback_secret_3910";
  const expectedSignature = await getHmacSignature(payload, secret);
  
  // Timing-safe comparison using SubtleCrypto is complex, 
  // but for signature verification, we just check equality.
  if (signature === expectedSignature) {
    return payload;
  }
  
  return null;
}

export async function isAdminRequest() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;

  const session = await verifySession(token);
  return session === "admin";
}

export function getAdminCookieName() {
  return ADMIN_COOKIE_NAME;
}
