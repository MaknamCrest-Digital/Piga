import type { ReactNode } from "react";
import { Lattice } from "@/components/brand/Lattice";
import { BrandMark } from "@/components/brand/BrandMark";
import { Eyebrow } from "./Section";

// Inner-page hero: mint field, lattice, oversized cropped mark. Photo-free by design.
export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-mint-field pb-20 pt-36 sm:pb-24 sm:pt-44">
      <Lattice className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <BrandMark className="pointer-events-none absolute -right-20 top-10 h-[440px] w-auto rotate-12 opacity-[.08] sm:right-4" />
      <div className="container-site relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[.98] sm:text-6xl lg:text-7xl">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">{lead}</p>}
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
