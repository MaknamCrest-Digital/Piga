import Image from "next/image";
import type { BrandLogos } from "@/lib/content/types";
import { LogoMark } from "./LogoMark";

// "compact" (mark + wordmark) for the header and drawer; "full" lockup with
// strapline for the footer. tone picks the variant that holds contrast on the
// background: the light lockup recolours the black strapline for dark surfaces.
export function Logo({
  logos, variant = "compact", tone = "dark", className = "", size, decorative = false,
}: { logos?: BrandLogos; variant?: "compact" | "full"; tone?: "dark" | "light"; className?: string; size?: string; decorative?: boolean }) {
  if (logos) {
    const img = variant === "full" ? (tone === "light" ? logos.fullLight : logos.full) : logos.compact;
    const sizing = size ?? (variant === "full" ? "h-24 w-auto sm:h-28" : "h-12 w-auto sm:h-14");
    return <Image src={img.src} alt={decorative ? "" : img.alt} width={img.width} height={img.height} priority={variant === "compact"} className={`${sizing} ${className}`} />;
  }
  // Fallback if no logo is configured (e.g. a WordPress field left empty).
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-10 w-auto" />
      <span className={`font-display text-2xl font-bold tracking-tight ${tone === "dark" ? "text-forest-900" : "text-mint-50"}`}>PiGA</span>
    </span>
  );
}
