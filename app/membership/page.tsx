import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getMembershipPage, getSiteSettings } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Steps } from "@/components/ui/Steps";
import { Reveal } from "@/components/ui/Reveal";
import { MembershipForm } from "./MembershipForm";

export const metadata: Metadata = { title: "Membership", description: "Join the Pineapple Growers Association. Membership is free for individual farmers, cooperatives and commercial operations." };

export default async function MembershipPage() {
  const [s, m] = await Promise.all([getSiteSettings(), getMembershipPage()]);

  return (
    <>
      <PageHero eyebrow="Membership" title={<>Join PiGA. <span className="text-forest-600">Membership is free.</span></>} lead={m.eligibility.join(" ")}>
        <ButtonLink href="#apply" variant="accent">{s.ctas.join.label}</ButtonLink>
      </PageHero>

      <Section className="bg-paper">
        <SectionHeading eyebrow="Categories" title="Three ways to join. None of them cost anything." lead={m.feeStatement} />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {m.categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 60} className="relative h-full overflow-hidden rounded-card border border-line bg-mint-25 p-8">
              <span aria-hidden className="absolute -right-2 -top-8 font-display text-[9rem] font-bold leading-none text-mint-100">{i + 1}</span>
              <div className="relative">
                <h3 className="text-2xl font-semibold">{c.name}</h3>
                <p className="mt-3 leading-7 text-muted">{c.summary}</p>
                <p className="mt-8 inline-flex items-center gap-1.5 rounded-pill bg-paper px-3 py-1 text-sm font-semibold text-forest-800 ring-1 ring-line">
                  <Check size={15} aria-hidden className="text-mint-500" /> Free
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {m.benefits.length > 0 && (
        <Section className="bg-mint-50">
          <SectionHeading eyebrow="Benefits" title="What membership brings." />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {m.benefits.map((b) => (
              <li key={b.title} className="flex gap-4 rounded-card border border-line bg-paper p-6">
                <Check aria-hidden className="mt-0.5 shrink-0 text-mint-500" />
                <div>
                  <p className="leading-7 text-forest-900">{b.title}</p>
                  {b.pending && <span className="mt-3 inline-block rounded-pill bg-gold-soft px-3 py-1 text-xs font-semibold text-forest-900">Preview: awaiting confirmation</span>}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section id="apply" className="bg-mint-field">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl">Your member ID in {m.memberIdTurnaround}.</h2>
            <p className="mt-5 leading-7 text-muted">Fill in the form and receive a member ID within {m.memberIdTurnaround}. There is no payment step, since membership is free.</p>
            <div className="mt-8"><Steps steps={m.steps} /></div>
            <p className="mt-8 text-sm text-muted">
              Questions about membership? <a className="font-semibold text-forest-700 underline decoration-mint-300 underline-offset-4" href={`mailto:${m.enquiriesEmail}`}>{m.enquiriesEmail}</a>
            </p>
          </div>
          <MembershipForm />
        </div>
      </Section>
    </>
  );
}
