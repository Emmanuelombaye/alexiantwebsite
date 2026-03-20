import { NextResponse } from "next/server";
import { getAdminCookieName } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const password = typeof (body as any)?.password === "string" ? ((body as any).password as string) : "";
  const expected = process.env.ADMIN_PORTAL_PASSWORD;

  if (!expected) {
    return NextResponse.json({ message: "Admin password is not configured." }, { status: 503 });
  }

  if (!password || password !== expected) {
    return NextResponse.json({ message: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(getAdminCookieName(), "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 hours
  });
  return response;
}

