import type { Metadata } from "next";
import { getAboutPage, getHomePage, getSiteSettings } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "About", description: "PiGA is a non-governmental organisation established in 2026 to strengthen Ghana’s pineapple-growing sector." };

export default async function AboutPage() {
  const [s, about, home] = await Promise.all([getSiteSettings(), getAboutPage(), getHomePage()]);
  const tiers = [
    { name: "Board of Directors", body: "Sets direction and oversees the Association." },
    { name: "Management Team", body: "Runs the Association day to day, reporting to the Board." },
    { name: "Regional Coordinators", body: "Work with growers in the field, region by region." },
  ];

  return (
    <>
      <PageHero eyebrow="About PiGA" title="A dedicated voice for Ghana’s pineapple growers." lead={home.vision}>
        <ButtonLink href={s.ctas.join.href} variant="accent">{s.ctas.join.label}</ButtonLink>
      </PageHero>

      <Section className="bg-paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <p className="mt-6 font-display text-[7rem] font-bold leading-none tracking-tighter text-mint-200 sm:text-[9rem]">{about.establishedYear}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[.16em] text-forest-700">Established</p>
          </div>
          <div className="space-y-6 text-lg leading-8 text-muted">
            {about.history.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            <p className="rounded-2xl border border-line bg-mint-50 px-6 py-5 text-base leading-7 text-forest-900">{s.statusLine}</p>
          </div>
        </div>
      </Section>

      <Section className="bg-mint-50">
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="rounded-card border border-line bg-paper p-9 shadow-soft">
            <Eyebrow>Vision</Eyebrow>
            <p className="mt-5 font-display text-2xl font-semibold leading-snug tracking-tight text-forest-900 sm:text-3xl">{home.vision}</p>
          </Reveal>
          <Reveal delay={80} className="rounded-card bg-forest-900 p-9">
            <Eyebrow tone="light">Mission</Eyebrow>
            <p className="mt-5 font-display text-2xl font-semibold leading-snug tracking-tight text-mint-50 sm:text-3xl">{home.mission}</p>
          </Reveal>
        </div>
        <ol className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {home.objectives.map((o, i) => (
            <li key={o.title} className="rounded-card border border-line bg-paper p-7">
              <span className="font-display text-sm font-bold text-forest-600">0{i + 1}</span>
              <p className="mt-4 leading-7 text-forest-900">{o.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading eyebrow="How we are organised" title="Three tiers, one association." link={{ label: "Meet the leadership", href: "/leadership" }} />
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-5 text-lg leading-8 text-muted">
            {about.structureIntro.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
          <ol className="space-y-3">
            {tiers.map((t, i) => (
              <li key={t.name} className="flex items-center gap-5 rounded-2xl border border-line bg-paper p-5 shadow-soft" style={{ marginLeft: `${i * 1.25}rem` }}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint-100 font-display font-bold text-forest-800">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  <p className="text-sm text-muted">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="bg-paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Eyebrow>Where we work</Eyebrow>
            <h2 className="mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl">All of Ghana.</h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-muted">{about.coverage}</p>
            <p className="mt-6 text-sm text-muted">Registered office: {s.address.slice(0, 2).join(", ")}.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
