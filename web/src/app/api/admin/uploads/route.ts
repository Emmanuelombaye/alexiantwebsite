import { NextResponse } from "next/server";
import { createPropertySlug } from "@/lib/properties/validation";
import { getSupabaseStorageBucket, hasSupabaseEnv } from "@/lib/supabase/config";
import { createSupabaseServerClient, createSupabaseAdminClient, getSupabaseUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json(
      {
        message: "Configure Supabase env values before using direct uploads. You can still paste image URLs manually.",
      },
      { status: 503 },
    );
  }

  const user = await getSupabaseUser();

  if (!user) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const supabase = await createSupabaseAdminClient();


  if (!supabase) {
    return NextResponse.json({ message: "Supabase is not configured." }, { status: 503 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Image file is required." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ message: "Only image uploads are supported." }, { status: 400 });
  }

  const bucket = getSupabaseStorageBucket();
  const extension = file.name.includes(".") ? file.name.split(".").pop()?.toLowerCase() : "jpg";
  const baseName = file.name.replace(/\.[^.]+$/, "") || "property-image";
  const storagePath = `listings/${Date.now()}-${createPropertySlug(baseName)}.${extension || "jpg"}`;
  const arrayBuffer = await file.arrayBuffer();

  const { error } = await supabase.storage.from(bucket).upload(storagePath, arrayBuffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    console.error("Upload error:", error);
    
    // Provide a super-helpful error message for the common "bucket not found" issue
    if (error.message.toLowerCase().includes("not found") || error.message.toLowerCase().includes("bucket")) {
      return NextResponse.json({ 
        message: `Storage bucket "${bucket}" not found. Please create a public bucket named "${bucket}" in your Supabase project dashboard to enable uploads.` 
      }, { status: 500 });
    }

    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);

  return NextResponse.json({
    message: "Image uploaded successfully.",
    path: storagePath,
    url: data.publicUrl,
  });
}