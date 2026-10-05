"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { Partner } from "@/lib/content/types";

const typeLabel: Record<Partner["type"], string> = {
  "sister-association": "Sister association",
  development: "Development partner",
  private: "Private sector",
};

export function PartnerWall({ partners, showDescriptions = false }: { partners: Partner[]; showDescriptions?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Partner | null>(null);

  const open = (p: Partner) => {
    setActive(p);
    dialog.current?.showModal();
  };

  return (
    <>
      <ul className={`grid gap-4 ${showDescriptions ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 md:grid-cols-3"}`}>
        {partners.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => open(p)}
              className="group flex h-full w-full flex-col rounded-card border border-line bg-paper p-6 text-left shadow-soft transition duration-300 ease-out-soft hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className={`flex h-32 w-full items-center justify-center rounded-2xl p-4 sm:h-36 ${p.logo ? "bg-white ring-1 ring-line" : "bg-mint-50"}`}>
                {p.logo ? (
                  <Image
                    src={p.logo.src}
                    alt={p.logo.alt}
                    width={p.logo.width ?? 240}
                    height={p.logo.height ?? 120}
                    sizes="240px"
                    className="h-auto max-h-full w-auto max-w-[85%] object-contain transition-transform duration-300 ease-out-soft group-hover:scale-[1.03]"
                  />
                ) : (
                  <span className="text-center font-display text-xl font-bold tracking-tight text-forest-800 sm:text-2xl">{p.shortName ?? p.name}</span>
                )}
              </div>
              <div className="mt-5 flex w-full items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-forest-600">{typeLabel[p.type]}</p>
                  <h3 className="mt-1 text-lg font-semibold leading-snug">{p.name}</h3>
                </div>
                <ArrowUpRight aria-hidden size={18} className="mt-1 shrink-0 text-muted transition group-hover:text-forest-700" />
              </div>
              {showDescriptions && <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{p.description}</p>}
              {p.pending && <span className="mt-4 inline-block rounded-pill bg-gold-soft px-3 py-1 text-xs font-semibold text-forest-900">Preview: consent pending</span>}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto w-[min(560px,calc(100%-2rem))] rounded-card border border-line bg-paper p-0 shadow-lift backdrop:bg-forest-950/50 backdrop:backdrop-blur-sm"
      >
        {active && (
          <div className="p-8">
            {active.logo && (
              <div className="mb-6 flex h-36 items-center justify-center rounded-2xl bg-white p-4 ring-1 ring-line">
                <Image src={active.logo.src} alt={active.logo.alt} width={active.logo.width ?? 240} height={active.logo.height ?? 120} sizes="320px" className="h-auto max-h-full w-auto max-w-full object-contain" />
              </div>
            )}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-forest-600">{typeLabel[active.type]}</p>
                <h3 className="mt-1 text-2xl font-semibold">{active.name}</h3>
              </div>
              <button type="button" onClick={() => dialog.current?.close()} aria-label="Close" autoFocus className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line">
                <X size={18} />
              </button>
            </div>
            <p className="mt-5 leading-7 text-muted">{active.description}</p>
            {active.website && (
              <a href={active.website} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-forest-700">
                Visit website <ArrowUpRight size={16} aria-hidden />
              </a>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
