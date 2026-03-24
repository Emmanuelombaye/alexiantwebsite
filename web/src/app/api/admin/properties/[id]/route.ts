import { NextResponse } from "next/server";
import { deleteProperty, getPropertyById, updateProperty } from "@/lib/properties/service";
import { validatePropertyPayload } from "@/lib/properties/validation";
import { isAdminRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

type PropertyRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_: Request, { params }: PropertyRouteContext) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ message: "Authentication required." }, { status: 401 });

  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    return NextResponse.json({ message: "Property not found." }, { status: 404 });
  }

  return NextResponse.json({ property });
}

export async function PATCH(request: Request, { params }: PropertyRouteContext) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ message: "Authentication required." }, { status: 401 });

  const { id } = await params;
  const existingProperty = await getPropertyById(id);

  if (!existingProperty) {
    return NextResponse.json({ message: "Property not found." }, { status: 404 });
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

  const property = await updateProperty(id, validation.data);

  if (!property) {
    return NextResponse.json({ message: "Property not found." }, { status: 404 });
  }

  return NextResponse.json({
    message: `${property.title} has been updated.`,
    property,
  });
}

export async function DELETE(_: Request, { params }: PropertyRouteContext) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ message: "Authentication required." }, { status: 401 });

  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    return NextResponse.json({ message: "Property not found." }, { status: 404 });
  }

  await deleteProperty(id);

  return NextResponse.json({
    message: `${property.title} has been deleted.`,
  });
}