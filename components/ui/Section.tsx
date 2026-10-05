import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p className={`flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[.18em] ${tone === "dark" ? "text-forest-600" : "text-mint-200"}`}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow, title, lead, link, tone = "dark", className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  link?: { label: string; href: string };
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-3xl">
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <h2 className={`mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl ${tone === "light" ? "text-mint-50" : ""}`}>{title}</h2>
        {lead && <p className={`mt-5 max-w-2xl text-lg leading-8 ${tone === "light" ? "text-mint-100/70" : "text-muted"}`}>{lead}</p>}
      </div>
      {link && (
        <Link href={link.href} className={`group inline-flex shrink-0 items-center gap-2 font-semibold ${tone === "light" ? "text-mint-200" : "text-forest-700"}`}>
          {link.label}
          <ArrowRight aria-hidden size={17} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-24 sm:py-32 ${className}`}>
      <div className="container-site">{children}</div>
    </section>
  );
}
