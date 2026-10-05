import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

type Variant = "primary" | "accent" | "secondary" | "ghost-dark";

const styles: Record<Variant, string> = {
  primary: "bg-forest-800 text-mint-50 hover:bg-forest-700",
  accent: "bg-gold text-forest-950 hover:brightness-105",
  secondary: "bg-paper text-forest-800 border border-line hover:border-mint-300 hover:bg-mint-50",
  "ghost-dark": "border border-white/20 text-mint-50 hover:bg-white/10",
};

export function buttonClass(variant: Variant = "primary", className = "") {
  return `group inline-flex h-12 items-center justify-center gap-2 rounded-pill px-6 text-[15px] font-semibold whitespace-nowrap transition duration-300 ease-out-soft ${styles[variant]} ${className}`;
}

function Arrow() {
  return <ArrowRight aria-hidden size={17} className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" />;
}

export function ButtonLink({
  variant = "primary", arrow = true, className, children, ...props
}: ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean }) {
  return (
    <Link className={buttonClass(variant, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({
  variant = "primary", arrow = false, className, children, ...props
}: ComponentProps<"button"> & { variant?: Variant; arrow?: boolean }) {
  return (
    <button className={buttonClass(variant, `disabled:opacity-60 ${className ?? ""}`)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
