import { NextResponse } from "next/server";
import { createProperty, listProperties } from "@/lib/properties/service";
import { validatePropertyPayload } from "@/lib/properties/validation";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { getSupabaseUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function ensureAdminAccess() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const user = await getSupabaseUser();

  if (!user) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  return null;
}

export async function GET() {
  const unauthorized = await ensureAdminAccess();

  if (unauthorized) {
    return unauthorized;
  }

  return NextResponse.json({ properties: await listProperties() });
}

export async function POST(request: Request) {
  const unauthorized = await ensureAdminAccess();

  if (unauthorized) {
    return unauthorized;
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const validation = validatePropertyPayload(body);

  if (!validation.ok) {
    return NextResponse.json({ message: validation.message }, { status: 400 });
  }

  const property = await createProperty(validation.data);

  return NextResponse.json(
    {
      message: `${property.title} has been created.`,
      property,
    },
    { status: 201 },
  );
}