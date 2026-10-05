import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { getKnowledgeTopics, getSiteSettings, getVarieties } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { VarietyCard } from "@/components/ui/VarietyCard";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Knowledge", description: "Pineapple varieties grown in Ghana, and practical guidance for growers." };

export default async function KnowledgePage() {
  const [s, varieties, topics] = await Promise.all([getSiteSettings(), getVarieties(), getKnowledgeTopics()]);
  const main = varieties.filter((v) => !v.isMinor);
  const minor = varieties.filter((v) => v.isMinor);

  return (
    <>
      <PageHero eyebrow="Knowledge hub" title="Better knowledge. Stronger farms." lead="A growing resource for Ghana’s pineapple growers, starting with the varieties our members grow." />

      <Section className="bg-paper">
        <SectionHeading eyebrow="Varieties" title="What Ghana grows." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {main.map((v, i) => <Reveal key={v.id} delay={i * 60}><VarietyCard variety={v} /></Reveal>)}
        </div>
        {minor.length > 0 && (
          <p className="mt-8 max-w-2xl text-muted">
            {minor.map((v) => v.name).join(", ")} {minor.length === 1 ? "is" : "are"} also grown in Ghana, on a smaller scale.
          </p>
        )}
      </Section>

      <Section className="bg-mint-50">
        <SectionHeading eyebrow="Growing guides" title="Practical guidance, on the way." lead="PiGA is preparing guidance for growers on each of these topics." />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <li key={t.id} className="flex flex-col rounded-card border border-dashed border-mint-300 bg-mint-25/70 p-7">
              <BookOpen aria-hidden className="text-forest-600" size={22} />
              <h3 className="mt-6 text-xl font-semibold">{t.title}</h3>
              <p className="mt-2 flex-1 leading-7 text-muted">{t.blurb}</p>
              <span className="mt-6 w-fit rounded-pill bg-paper px-3 py-1 text-xs font-semibold text-forest-700 ring-1 ring-line">In preparation</span>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <ButtonLink href={s.ctas.join.href} variant="primary">{s.ctas.join.label}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
