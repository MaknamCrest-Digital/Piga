import type { Metadata } from "next";
import { getPartners, getSiteSettings } from "@/lib/content";
import type { Partner } from "@/lib/content/types";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PartnerWall } from "@/components/ui/PartnerWall";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Partners", description: "The associations, development partners and businesses PiGA works with." };

const groups: { type: Partner["type"]; title: string }[] = [
  { type: "sister-association", title: "Sister associations" },
  { type: "development", title: "Development partners" },
  { type: "private", title: "Private sector" },
];

export default async function PartnershipsPage() {
  const [s, partners] = await Promise.all([getSiteSettings(), getPartners()]);

  return (
    <>
      <PageHero eyebrow="Partners" title="Stronger value chains are built together." lead="PiGA works beside its sister associations, development partners and businesses across the fruit value chain.">
        <ButtonLink href={s.ctas.partner.href} variant="primary">{s.ctas.partner.label}</ButtonLink>
      </PageHero>

      {groups.map((g, i) => {
        const list = partners.filter((p) => p.type === g.type);
        if (!list.length) return null;
        return (
          <Section key={g.type} className={i % 2 ? "bg-mint-50" : "bg-paper"}>
            <SectionHeading title={g.title} />
            <div className="mt-10"><PartnerWall partners={list} showDescriptions /></div>
          </Section>
        );
      })}
    </>
  );
}
