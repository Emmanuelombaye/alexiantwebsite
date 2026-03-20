export type NavItem = {
  label: string;
  href: string;
};

const mobileNavRevealClasses = [
  "reveal-up reveal-delay-1",
  "reveal-up reveal-delay-2",
  "reveal-up reveal-delay-3",
  "reveal-up reveal-delay-4",
];

export function isActiveNavPath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getActiveNavLabel(navItems: NavItem[], pathname: string) {
  return navItems.find((item) => isActiveNavPath(pathname, item.href))?.label ?? "Home";
}

export function getMobileNavRevealClass(index: number) {
  return mobileNavRevealClasses[index] ?? "reveal-up";
}