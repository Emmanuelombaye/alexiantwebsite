"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { siteContent } from "@/data/site-content";
import { getActiveNavLabel, isActiveNavPath } from "@/lib/navigation";
import { SecureContact } from "@/components/secure-contact";
import { LanguageToggle } from "@/components/language-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const currentPath = pathname ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 20);
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // activeNavLabel is calculated but not used in current layout
    // const activeNavLabel = getActiveNavLabel(siteContent.nav, currentPath);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden && !menuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen || pathname?.includes('/blog/') || pathname?.includes('/properties/') || pathname === '/neighborhoods' || pathname === '/contact' || pathname === '/mortgage'
            ? "nav-bar scrolled"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 py-3 lg:py-2">
            <Link href="/" className="relative z-10 flex flex-shrink-0 items-center" onClick={() => setMenuOpen(false)}>
              {mounted ? (
                <img 
                  src="/logo.svg" 
                  alt="Alexiant Real Estate Logo - Diani Beach Property and Plots for Sale"
                  title="Alexiant Real Estate Kenya"
                  className="h-12 w-auto md:h-14 object-contain transition-all duration-300"
                />
              ) : (
                <div className="h-10 w-32 md:h-12" />
              )}
            </Link>

            {/* Mobile Handwriting Signature */}
            <div className="flex-1 flex justify-center items-center lg:hidden pl-1 pr-2 mt-1">
              <span className="font-script text-[1.4rem] tracking-wider text-[#046A38] opacity-95 line-clamp-1 whitespace-nowrap">
                Alexiant Real Estate
              </span>
            </div>

            <nav className="hidden items-center gap-4 lg:flex">
              {siteContent.nav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative py-1 text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
                      isActive
                        ? scrolled || menuOpen || pathname === '/contact' || pathname === '/neighborhoods' || pathname === '/mortgage' || pathname?.includes('/blog/') || pathname?.includes('/properties/')
                          ? "text-[#046A38]"
                          : "text-white"
                        : scrolled || menuOpen || pathname === '/contact' || pathname === '/neighborhoods' || pathname === '/mortgage' || pathname?.includes('/blog/') || pathname?.includes('/properties/')
                          ? "text-slate-400 hover:text-slate-900"
                          : "text-white/40 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {/* Emerald active indicator line */}
                    <span className={`absolute -bottom-1.5 left-1/2 h-[2px] -translate-x-1/2 bg-[#046A38] transition-all duration-700 ${isActive ? "w-full" : "w-0 group-hover:w-1/3 group-hover:bg-[#D4AF37] group-hover:opacity-50"}`} />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 flex-shrink-0">
              <LanguageToggle />
              <div
                className={`hidden whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold md:inline-flex ${
                  scrolled || menuOpen
                    ? "border-slate-200 text-slate-900"
                    : "border-white/30 text-white bg-white/5"
                }`}
              >
                <SecureContact type="phone" value={siteContent.phone} />
              </div>
              <Link href="/valuation" className="nav-cta-gold hidden lg:inline-flex !px-4 !py-2 !text-xs">
                Free Valuation
              </Link>
              
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full transition lg:hidden ${
                  menuOpen ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                <div className="relative h-4 w-5">
                  <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all ${menuOpen ? "top-2 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 top-2 h-0.5 w-5 rounded-full bg-current transition-all ${menuOpen ? "opacity-0" : "opacity-100"}`} />
                  <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all ${menuOpen ? "top-2 -rotate-45" : "top-4"}`} />
                </div>
              </button>
            </div>
          </div>
        </div>


      </motion.header>

      {/* Mobile Menu Overlay - EXECUTIVE OBSIDIAN */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[45] bg-white p-4 pt-16 lg:hidden flex flex-col h-full border-l border-slate-100 shadow-2xl"
          >
            {/* Background Texture - Clean & Professional */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full overflow-y-auto hide-scrollbar">
              <div className="mb-4 text-center">
                 <span className="text-[0.5rem] font-bold uppercase tracking-[0.5em] text-[#046A38]/50">The Alexiant Registry</span>
              </div>

              <nav className="flex flex-col gap-2">
                {siteContent.nav.map((item, idx) => {
                  const isActive = isActiveNavPath(currentPath, item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-5 py-3.5 text-lg font-display font-medium italic transition overflow-hidden group/item ${
                          isActive
                            ? "bg-[#046A38] text-white shadow-lg shadow-emerald-500/10"
                            : "bg-slate-50 text-[#046A38] hover:bg-slate-100 border border-slate-100"
                        }`}
                      >
                        <span className="text-[1rem] leading-tight">{item.label}</span>
                        <span className={`text-[#D4AF37] ${isActive ? "opacity-100" : "opacity-30"} group-hover/item:translate-x-1 transition-transform`}>→</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-8 grid grid-cols-2 gap-3 pb-6">
                <div className="flex flex-col gap-0.5 rounded-xl bg-slate-50 p-4 border border-slate-100 transition hover:bg-slate-100">
                  <span className="text-[0.45rem] font-black uppercase tracking-widest text-[#D4AF37]">Direct Call</span>
                  <SecureContact type="phone" value={siteContent.phone} className="text-[0.7rem] font-bold text-[#046A38] italic" />
                </div>
                <div className="flex flex-col gap-0.5 rounded-xl bg-slate-50 p-4 border border-slate-100 transition hover:bg-slate-100">
                  <span className="text-[0.45rem] font-black uppercase tracking-widest text-[#D4AF37]">Advisory Email</span>
                  <SecureContact type="email" value={siteContent.email} className="text-[0.55rem] font-bold text-[#046A38] break-all italic" />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="pb-10"
              >
                <Link 
                  href="/valuation" 
                  onClick={() => setMenuOpen(false)} 
                  className="flex items-center justify-center rounded-full bg-[#046A38] p-4 text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#D4AF37] shadow-xl hover:bg-[#035930] transition-all border border-[#D4AF37]/30"
                >
                  Free Valuation
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-[40] bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setMenuOpen(false)} />
      )}


    </>
  );
}
