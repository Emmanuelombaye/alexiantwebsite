"use client";

import { usePathname } from "next/navigation";
import { LangProvider } from "@/lib/i18n/context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { SplashLoader } from "@/components/splash-loader";

export function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <LangProvider>
      {!isAdminRoute && <SplashLoader />}
      {!isAdminRoute && <SiteHeader />}
      <main>{children}</main>
      {!isAdminRoute && <SiteFooter />}
      {!isAdminRoute && <WhatsappFab />}
    </LangProvider>
  );
}
