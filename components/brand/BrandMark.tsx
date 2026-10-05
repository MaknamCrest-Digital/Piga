import Image from "next/image";
import { getSiteSettings } from "@/lib/content";
import { LogoMark } from "./LogoMark";

// The PiGA pineapple from the official logo, used decoratively (watermarks,
// hero visual). Size it with height classes, e.g. "h-48 w-auto".
export async function BrandMark({ className = "" }: { className?: string }) {
  const { logos } = await getSiteSettings();
  if (!logos) return <LogoMark className={className} />;
  const m = logos.mark;
  return <Image src={m.src} alt="" aria-hidden width={m.width} height={m.height} className={`select-none ${className}`} />;
}
