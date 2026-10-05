import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import { getEvents, getPosts, getSiteSettings } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "News and events", description: "News, announcements and events from the Pineapple Growers Association." };

export default async function NewsPage() {
  const [s, events, posts] = await Promise.all([getSiteSettings(), getEvents(), getPosts()]);

  return (
    <>
      <PageHero eyebrow="News and events" title="What’s happening at PiGA." />

      {events.length > 0 && (
        <Section className="bg-paper">
          <SectionHeading eyebrow="Upcoming" title="Events" />
          <ul className="mt-10 grid gap-4">
            {events.map((e) => (
              <li key={e.id} className="grid gap-6 rounded-card border border-line bg-mint-field p-8 sm:grid-cols-[auto_1fr] sm:items-center sm:p-10">
                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-2xl bg-forest-900 text-center">
                  <span className="text-xs font-semibold uppercase tracking-[.16em] text-gold">{e.monthLabel.split(" ")[0].slice(0, 3)}</span>
                  <span className="font-display text-3xl font-bold tracking-tight text-mint-50">{e.monthLabel.split(" ")[1]}</span>
                </div>
                <div>
                  <h3 className="text-3xl font-semibold">{e.title}</h3>
                  <p className="mt-2 max-w-2xl leading-7 text-muted">{e.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2 text-sm">
                    <li className="inline-flex items-center gap-1.5 rounded-pill bg-paper px-3 py-1.5 font-medium text-forest-800 ring-1 ring-line">
                      <CalendarDays aria-hidden size={15} /> {e.dateTbc ? `${e.monthLabel}, date to be announced` : e.startDate}
                    </li>
                    <li className="inline-flex items-center gap-1.5 rounded-pill bg-paper px-3 py-1.5 font-medium text-forest-800 ring-1 ring-line">
                      <MapPin aria-hidden size={15} /> {e.venueTbc ? "Venue to be announced" : e.venue}
                    </li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section className="bg-mint-25">
        <SectionHeading eyebrow="Latest" title="News" />
        <div className="mt-10">
          {posts.length ? (
            <ul className="grid gap-4 md:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug} className="rounded-card border border-line bg-paper p-7 shadow-soft">
                  <time className="text-xs font-semibold uppercase tracking-[.16em] text-forest-600">{p.date}</time>
                  <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 leading-7 text-muted">{p.excerpt}</p>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="News from PiGA will appear here."
              body="The first announcements will follow the launch."
              action={<ButtonLink href={s.ctas.join.href} variant="primary">{s.ctas.join.label}</ButtonLink>}
            />
          )}
        </div>
      </Section>
    </>
  );
}
