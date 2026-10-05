import type { Variety } from "@/lib/content/types";
import { BrandMark } from "@/components/brand/BrandMark";

export function VarietyCard({ variety, compact = false }: { variety: Variety; compact?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-paper shadow-soft transition duration-300 ease-out-soft hover:-translate-y-0.5 hover:shadow-lift">
      <div className="relative flex h-44 items-end justify-between overflow-hidden bg-mint-field p-6">
        <span className="font-display text-7xl font-bold leading-none tracking-tight text-forest-800/90">{variety.code ?? variety.name.slice(0, 2)}</span>
        <BrandMark className="absolute -bottom-12 right-2 h-48 w-auto rotate-12 opacity-25 transition-transform duration-500 ease-out-soft group-hover:-translate-y-1 group-hover:rotate-[16deg]" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-semibold">{variety.name}</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {variety.attributes.map((a) => (
            <li key={a} className="rounded-pill bg-mint-50 px-3 py-1 text-xs font-semibold text-forest-700 ring-1 ring-mint-200">{a}</li>
          ))}
        </ul>
        {!compact && <p className="mt-5 leading-7 text-muted">{variety.summary}</p>}
      </div>
    </article>
  );
}
