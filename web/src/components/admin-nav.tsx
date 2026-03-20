"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/properties", label: "Properties" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/leads", label: "Leads" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-6 flex flex-wrap gap-3">
      {links.map((link) => {
        const isActive =
          link.href === "/admin"
            ? pathname === link.href
            : pathname === link.href || pathname.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-[#046A38] text-white"
                : "border border-slate-300 bg-white text-slate-700 hover:border-slate-950 hover:text-slate-950"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}