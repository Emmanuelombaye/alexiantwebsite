import { NextResponse } from "next/server";
import { createProperty, listProperties } from "@/lib/properties/service";
import { validatePropertyPayload } from "@/lib/properties/validation";
import { isAdminRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ message: "Authentication required." }, { status: 401 });

  return NextResponse.json({ properties: await listProperties() });
}

export async function POST(request: Request) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ message: "Authentication required." }, { status: 401 });

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