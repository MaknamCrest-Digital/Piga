"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { BrandLogos, SiteSettings } from "@/lib/content/types";
import { Logo } from "@/components/brand/Logo";
import { buttonClass } from "@/components/ui/Button";

export const navItems = [
  { label: "About", href: "/about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Membership", href: "/membership" },
  { label: "Knowledge", href: "/knowledge" },
  { label: "Partners", href: "/partnerships" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export function Header({ logos, join, banner }: { logos?: BrandLogos; join: SiteSettings["ctas"]["join"]; banner?: SiteSettings["launchBanner"] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {banner?.enabled && (
        <div className={`overflow-hidden bg-forest-900 text-center text-[13px] font-medium text-mint-100 transition-all duration-300 ${scrolled ? "max-h-0" : "max-h-10"}`}>
          <Link href={banner.href ?? "/news"} className="block px-4 py-2 hover:text-white">
            <span aria-hidden className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle" />
            {banner.text}
          </Link>
        </div>
      )}
      <div className={`transition-colors duration-300 ${scrolled ? "border-b border-line bg-mint-25/80 backdrop-blur-xl" : "border-b border-transparent"}`}>
        <div className="container-site flex h-20 items-center justify-between gap-6">
          <Link href="/" aria-label="PiGA home" className="shrink-0">
            <Logo logos={logos} />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-pill px-3.5 py-2 text-[14.5px] font-medium transition-colors ${
                  isActive(item.href) ? "bg-mint-100 text-forest-900" : "text-forest-800/80 hover:bg-mint-50 hover:text-forest-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <Link href={join.href} className={buttonClass("accent")}>
                Join PiGA
              </Link>
            </span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-forest-900 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-50 flex flex-col bg-forest-950 transition-[opacity,visibility] duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="container-site flex h-20 items-center justify-between">
          <Logo logos={logos} tone="light" />
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-mint-50">
            <X size={20} />
          </button>
        </div>
        <nav aria-label="Mobile" className="container-site mt-6 flex flex-1 flex-col overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="border-b border-white/10 py-4 font-display text-3xl font-semibold tracking-tight text-mint-50">
              {item.label}
            </Link>
          ))}
          <Link href={join.href} className={buttonClass("accent", "mb-10 mt-8 w-full")}>
            {join.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
