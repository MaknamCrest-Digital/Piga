import Image from "next/image";
import type { Person, PersonGroup } from "@/lib/content/types";

function initials(name: string) {
  return name
    .replace(/^(Mrs|Mr|Prof|Dr|Nana)\s+/i, "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// No bio, by design (checklist 2.3 is blacked out).
export function PersonCard({ person, group }: { person: Person; group: PersonGroup }) {
  const role = person.roles[group] ?? Object.values(person.roles)[0];
  return (
    <article className="group rounded-card border border-line bg-paper p-4 shadow-soft transition duration-300 ease-out-soft hover:-translate-y-0.5 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mint-100">
        {person.headshot ? (
          <Image src={person.headshot.src} alt={person.headshot.alt} fill sizes="(min-width:1024px) 280px, 50vw" className="object-cover" />
        ) : (
          <div aria-hidden className="flex h-full items-center justify-center bg-mint-field">
            <span className="font-display text-5xl font-bold tracking-tight text-forest-700/80">{initials(person.name)}</span>
          </div>
        )}
        {person.region && (
          <span className="absolute left-3 top-3 rounded-pill bg-white/80 px-3 py-1 text-xs font-semibold text-forest-700 backdrop-blur">
            {person.region}
          </span>
        )}
      </div>
      <div className="px-2 pb-2 pt-5">
        <h3 className="text-lg font-semibold leading-snug">{person.name}</h3>
        <p className="mt-1 text-sm text-muted">{role}</p>
      </div>
    </article>
  );
}
