import type { ReactNode } from "react";
import { Lattice } from "@/components/brand/Lattice";

export function EmptyState({ title, body, action }: { title: string; body?: string; action?: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-card border border-line bg-mint-field px-8 py-14 text-center sm:px-14">
      <Lattice className="absolute inset-0" />
      <div className="relative mx-auto max-w-xl">
        <h3 className="text-2xl font-semibold sm:text-3xl">{title}</h3>
        {body && <p className="mt-3 leading-7 text-muted">{body}</p>}
        {action && <div className="mt-7 flex flex-wrap justify-center gap-3">{action}</div>}
      </div>
    </div>
  );
}
