"use client";

import { usePathname } from "next/navigation";

export function ClientLayoutWrapper({
  children,
  splashLoader,
  siteHeader,
  siteFooter,
  whatsappFab,
}: {
  children: React.ReactNode;
  splashLoader: React.ReactNode;
  siteHeader: React.ReactNode;
  siteFooter: React.ReactNode;
  whatsappFab: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && splashLoader}
      {!isAdminRoute && siteHeader}
      <main>{children}</main>
      {!isAdminRoute && siteFooter}
      {!isAdminRoute && whatsappFab}
    </>
  );
}
