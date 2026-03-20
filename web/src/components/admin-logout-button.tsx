"use client";

import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type AdminLogoutButtonProps = {
  authEnabled: boolean;
};

export function AdminLogoutButton({ authEnabled }: AdminLogoutButtonProps) {
  const router = useRouter();

  if (!authEnabled) {
    return null;
  }

  async function handleLogout() {
    try {
      // 1. Clear server-side cookie
      await fetch("/api/admin/logout", { method: "POST" });
      
      // 2. Refresh and redirect
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#046A38] hover:text-white hover:border-[#046A38] shadow-lg"
    >
      Secure Sign out
    </button>
  );
}