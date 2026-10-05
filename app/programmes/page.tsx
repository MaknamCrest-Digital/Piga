import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";

// Checklist 4.x is outstanding and the client has not decided whether this page
// launches, so it is reachable by URL but kept out of the navigation.
export const metadata: Metadata = { title: "Programmes", robots: { index: false } };

export default async function ProgrammesPage() {
  const s = await getSiteSettings();
  return (
    <>
      <PageHero eyebrow="Programmes" title="Practical support for pineapple growers." />
      <Section className="bg-paper">
        <EmptyState
          title="Programmes will be announced with the launch."
          body="PiGA launches in November 2026. Programme details will be published here once confirmed."
          action={<ButtonLink href={s.ctas.join.href} variant="primary">{s.ctas.join.label}</ButtonLink>}
        />
      </Section>
    </>
  );
}
