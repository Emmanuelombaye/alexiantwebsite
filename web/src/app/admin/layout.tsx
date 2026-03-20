import type { ReactNode } from "react";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { AdminNav } from "@/components/admin-nav";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { getSupabaseUser } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-snippet": 0,
      "max-image-preview": "none",
      "max-video-preview": 0,
    },
  },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authEnabled = hasSupabaseEnv();
  const user = authEnabled ? await getSupabaseUser() : null;

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#D4AF37]/20">
      {/* Premium Independent Portal Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111827] py-4 shadow-xl">
        <div className="mx-auto max-w-[90rem] px-6">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <Link href="/admin">
                <img 
                  src="/logo.svg" 
                  alt="Alexiant Admin" 
                  className="h-10 w-auto brightness-0 invert contrast-125"
                />
              </Link>
              <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
              <div className="hidden md:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Executive Workspace</p>
                <p className="text-sm font-medium text-white/60">Alexiant Control Room</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden lg:block text-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1 leading-none">Senior Advisor</p>
                <p className="text-xs font-semibold text-white">{user?.email || "Administrator"}</p>
              </div>
              <AdminLogoutButton authEnabled={true} />
            </div>
          </div>
        </div>
      </header>

      {/* Independent Navigation Tab Bar */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-[73px] z-40">
        <div className="mx-auto max-w-[90rem] px-6">
          <AdminNav />
        </div>
      </div>

      {/* Independent Content Area */}
      <main className="mx-auto max-w-[90rem] p-6 lg:p-10">
        {children}
      </main>
    </div>
  );
}