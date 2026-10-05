import type { Metadata } from "next";
import { getAboutPage, getPeople } from "@/lib/content";
import type { PersonGroup } from "@/lib/content/types";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PersonCard } from "@/components/ui/PersonCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Leadership", description: "The Board of Directors, Management Team and Regional Coordinators of the Pineapple Growers Association." };

const groups: { id: PersonGroup; title: string; lead: string; bg: string }[] = [
  { id: "board", title: "Board of Directors", lead: "Sets the direction of the Association.", bg: "bg-mint-25" },
  { id: "management", title: "Management Team", lead: "Runs the Association day to day, reporting to the Board.", bg: "bg-paper" },
  { id: "regional", title: "Regional Coordinators", lead: "PiGA’s people in the field.", bg: "bg-mint-50" },
];

export default async function LeadershipPage() {
  const [about, ...lists] = await Promise.all([getAboutPage(), ...groups.map((g) => getPeople(g.id))]);

  return (
    <>
      <PageHero eyebrow="Leadership" title="A leadership that has already done the job once." lead={about.structureIntro[1]} />
      {groups.map((g, gi) =>
        lists[gi].length ? (
          <Section key={g.id} className={g.bg}>
            <SectionHeading eyebrow={`Tier ${gi + 1}`} title={g.title} lead={g.lead} />
            <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {lists[gi].map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 60}><PersonCard person={p} group={g.id} /></Reveal>
              ))}
            </div>
          </Section>
        ) : null,
      )}
    </>
  );
}
