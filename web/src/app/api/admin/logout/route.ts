import { NextResponse } from "next/server";
import { getAdminCookieName } from "@/lib/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  
  // Clear the admin auth cookie
  response.cookies.delete(getAdminCookieName());
  
  // Also try to sign out from Supabase if active
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  
  return response;
}
