import Image from "next/image";
import { Check, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getAboutPage, getEvents, getHomePage, getMembershipPage, getPartners, getPeopleByIds, getSiteSettings, getVarieties } from "@/lib/content";
import { Lattice } from "@/components/brand/Lattice";
import { BrandMark } from "@/components/brand/BrandMark";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { VarietyCard } from "@/components/ui/VarietyCard";
import { PersonCard } from "@/components/ui/PersonCard";
import { PartnerWall } from "@/components/ui/PartnerWall";
import { Steps } from "@/components/ui/Steps";

export default async function Home() {
  const [s, home, about, membership, varieties, partners, events] = await Promise.all([
    getSiteSettings(), getHomePage(), getAboutPage(), getMembershipPage(), getVarieties(), getPartners(), getEvents(),
  ]);
  const people = await getPeopleByIds(home.featuredPeopleIds);
  const mainVarieties = varieties.filter((v) => !v.isMinor);
  const launch = events.find((e) => e.id === "piga-launch");
  const logoFor = (partnerId?: string) => partners.find((p) => p.id === partnerId)?.logo;
  const contacts = [
    { icon: MapPin, label: "Office", value: s.address.join(", "), href: undefined },
    { icon: Phone, label: "Telephone", value: s.phoneDisplay, href: `tel:${s.phoneE164}` },
    ...(s.whatsappE164 ? [{ icon: MessageCircle, label: "WhatsApp", value: s.phoneDisplay, href: `https://wa.me/${s.whatsappE164}` }] : []),
    { icon: Mail, label: "Email", value: s.email, href: `mailto:${s.email}` },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mint-field pb-20 pt-40 sm:pb-28 sm:pt-48">
        <Lattice className="absolute inset-0 [mask-image:radial-gradient(80%_70%_at_70%_30%,black,transparent)]" />
        <div className="container-site relative grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <Eyebrow>{home.hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 text-5xl font-bold leading-[.95] sm:text-7xl lg:text-[5.5rem]">
              {home.hero.title}{" "}
              <span className="relative whitespace-nowrap text-forest-600">
                {home.hero.highlight}
                <svg aria-hidden viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full">
                  <path d="M2 9 C 50 2, 150 2, 198 8" stroke="var(--color-gold)" strokeWidth="5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-muted sm:text-xl">{home.hero.lead}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={s.ctas.join.href} variant="accent">{s.ctas.join.label}</ButtonLink>
              <ButtonLink href={s.ctas.partner.href} variant="secondary" arrow={false}>{s.ctas.partner.label}</ButtonLink>
            </div>
          </div>

          {/* Photo-free hero visual */}
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/70 bg-forest-field shadow-lift">
              <Lattice tone="light" className="absolute inset-0" />
              <div className="absolute inset-x-8 top-[40%] flex -translate-y-1/2 justify-center">
                <Logo logos={s.logos} decorative size="h-auto w-full max-w-[340px]" className="drop-shadow-[0_24px_36px_rgba(0,0,0,.35)]" />
              </div>
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-white/10 p-5 text-mint-50 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-mint-200">Membership</p>
                <p className="mt-1 font-display text-2xl font-semibold tracking-tight">Free in every category.</p>
              </div>
            </div>
            {launch && (
            <div className="absolute -left-4 top-10 hidden rounded-2xl border border-line bg-paper/90 px-5 py-4 shadow-soft backdrop-blur sm:block lg:-left-10">
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-forest-600">Launching</p>
              <p className="font-display text-2xl font-bold tracking-tight text-forest-800">{launch.monthLabel}</p>
            </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-y border-line bg-paper">
        <div className="container-site grid grid-cols-2 lg:grid-cols-4">
          {home.stats.map((st, i) => (
            <div key={st.label} className={`px-2 py-8 sm:px-6 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""} lg:border-l lg:first:border-l-0`}>
              <p className="font-display text-3xl font-bold tracking-tight text-forest-800 sm:text-4xl">{st.value}</p>
              <p className="mt-1 text-sm text-muted">{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who we are */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl">
              On their own, growers take the price they are offered. <span className="text-forest-600">Together they can do better.</span>
            </h2>
          </div>
          <div>
            <div className="space-y-5 text-lg leading-8 text-muted">
              {home.whoWeAre.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Reveal className="rounded-card border border-line bg-mint-50 p-7">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-forest-600">Vision</p>
                <p className="mt-3 leading-7 text-forest-900">{home.vision}</p>
              </Reveal>
              <Reveal delay={80} className="rounded-card bg-forest-900 p-7">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-gold">Mission</p>
                <p className="mt-3 leading-7 text-mint-100/80">{home.mission}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* Why PiGA */}
      <Section className="bg-paper">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>Why PiGA</Eyebrow>
            <h2 className="mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl">
              {home.gap.title} <span className="text-forest-600">{home.gap.highlight}</span>
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-muted">
              {about.history.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
          </div>
          <Reveal>
            <ul className="overflow-hidden rounded-card border border-line bg-mint-25 shadow-soft">
              {home.gap.supportedSectors.map((sector) => (
                <li key={sector} className="flex items-center justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
                  <span className="font-display text-xl font-semibold tracking-tight text-forest-900 sm:text-2xl">{sector}</span>
                  <span className="inline-flex items-center gap-2 rounded-pill bg-mint-100 px-3 py-1 text-sm font-medium text-forest-700">
                    <Check aria-hidden size={15} /> Already supported
                  </span>
                </li>
              ))}
              <li className="relative overflow-hidden bg-forest-900 px-6 py-7 sm:px-8">
                <Lattice tone="light" className="absolute inset-0" />
                <div className="relative flex items-center justify-between gap-4">
                  <span className="font-display text-2xl font-bold tracking-tight text-mint-50 sm:text-3xl">Pineapple</span>
                  <span className="rounded-pill bg-gold px-3.5 py-1.5 text-sm font-semibold text-forest-950">PiGA, est. {about.establishedYear}</span>
                </div>
              </li>
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Objectives */}
      <section className="relative overflow-hidden bg-forest-field py-24 sm:py-32">
        <Lattice tone="light" className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-site relative">
          <SectionHeading tone="light" eyebrow="What we stand for" title="Six commitments to every grower." link={{ label: "About PiGA", href: "/about" }} />
          <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {home.objectives.map((o, i) => (
              <li key={o.title}>
                <Reveal delay={i * 60} className="h-full rounded-card border border-white/10 bg-white/[.04] p-7 transition-colors duration-300 hover:bg-white/[.07]">
                  <span className="font-display text-sm font-bold text-gold">0{i + 1}</span>
                  <h3 className="mt-10 text-2xl font-semibold text-mint-50">{o.title}</h3>
                  <p className="mt-3 leading-7 text-mint-100/65">{o.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Varieties */}
      <Section className="bg-mint-25">
        <SectionHeading eyebrow="Pineapple knowledge" title="Know your pineapple." lead="The varieties grown by Ghana’s pineapple farmers, from the smallholder Sugar Loaf to the export MD2." link={{ label: "Knowledge hub", href: "/knowledge" }} />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {mainVarieties.map((v, i) => (
            <Reveal key={v.id} delay={i * 60}><VarietyCard variety={v} compact /></Reveal>
          ))}
        </div>
      </Section>

      {/* Membership */}
      <Section className="bg-paper">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Membership</Eyebrow>
            <h2 className="mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl">Join for free. <span className="text-forest-600">Grow with PiGA.</span></h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{membership.eligibility.join(" ")}</p>
            <p className="mt-4 max-w-xl leading-7 text-forest-800">{membership.feeStatement}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={s.ctas.join.href} variant="accent">{s.ctas.join.label}</ButtonLink>
              <ButtonLink href="/membership" variant="secondary" arrow={false}>How membership works</ButtonLink>
            </div>
          </div>
          <Reveal><Steps steps={membership.steps} /></Reveal>
        </div>
      </Section>

      {/* Leadership */}
      <Section className="bg-mint-50">
        <SectionHeading eyebrow="Leadership" title="Run by people who have done it before." lead="PiGA is led by the board that built the Orange Growers Association, joined by a small number of new appointments." link={{ label: "Full leadership", href: "/leadership" }} />
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {people.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 60}><PersonCard person={p} group={p.groups.includes("management") ? "management" : "board"} /></Reveal>
          ))}
        </div>
      </Section>

      {/* Sister associations */}
      <Section className="bg-paper">
        <SectionHeading eyebrow="A family of associations" title={<>{home.family.title} <span className="text-forest-600">{home.family.highlight}</span></>} lead={home.family.lead} />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {home.family.associations.map((a, i) => {
            const logo = a.isSelf ? s.logos?.compact : logoFor(a.partnerId);
            return (
              <Reveal key={a.id} delay={i * 60} className="h-full">
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-card p-7 transition duration-300 ease-out-soft hover:-translate-y-0.5 ${
                    a.isSelf ? "bg-forest-900 shadow-lift" : "border border-line bg-mint-25 shadow-soft hover:shadow-lift"
                  }`}
                >
                  {a.isSelf && <Lattice tone="light" className="absolute inset-0" />}
                  <div className="relative flex items-start justify-between gap-4">
                    <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl p-2.5 ${a.isSelf ? "bg-white/95" : "bg-paper border border-line"}`}>
                      {logo ? (
                        <Image src={logo.src} alt="" width={logo.width ?? 200} height={logo.height ?? 200} className="max-h-full w-auto object-contain" />
                      ) : (
                        <span className="font-display text-lg font-bold text-forest-700">{a.crop.slice(0, 2)}</span>
                      )}
                    </div>
                    {a.since && (
                      <span className={`rounded-pill px-3 py-1 text-xs font-semibold ${a.isSelf ? "bg-gold text-forest-950" : "bg-mint-100 text-forest-700"}`}>
                        Since {a.since}
                      </span>
                    )}
                  </div>
                  <p className={`relative mt-8 text-xs font-semibold uppercase tracking-[.16em] ${a.isSelf ? "text-mint-200" : "text-forest-600"}`}>{a.crop}</p>
                  <h3 className={`relative mt-2 text-2xl font-semibold leading-tight ${a.isSelf ? "text-mint-50" : ""}`}>{a.name}</h3>
                  <ul className={`relative mt-6 space-y-2.5 border-t pt-5 text-[15px] ${a.isSelf ? "border-white/10 text-mint-100/75" : "border-line text-muted"}`}>
                    {a.facts.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check aria-hidden size={16} className={`mt-0.5 shrink-0 ${a.isSelf ? "text-mint-300" : "text-forest-600"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Partners */}
      {partners.length > 0 && (
        <Section className="bg-mint-25">
          <SectionHeading eyebrow="Our network" title="Working together across the value chain." link={{ label: "All partners", href: "/partnerships" }} />
          <div className="mt-12"><PartnerWall partners={partners} /></div>
        </Section>
      )}

      {/* Where we work */}
      <Section className="relative overflow-hidden bg-paper">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="relative">
            <p aria-hidden className="pointer-events-none absolute -left-2 -top-16 select-none font-display text-[7rem] font-bold leading-none tracking-tighter text-mint-50 sm:text-[10rem]">
              Ghana
            </p>
            <div className="relative">
              <Eyebrow>Where we work</Eyebrow>
              <h2 className="mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl">
                {home.reach.title} <span className="text-forest-600">{home.reach.highlight}</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{about.coverage}</p>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {contacts.map(({ icon: Icon, label, value, href }, i) => {
              const body = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mint-100 text-forest-700">
                    <Icon aria-hidden size={19} />
                  </span>
                  <span className="mt-6 block text-xs font-semibold uppercase tracking-[.16em] text-forest-600">{label}</span>
                  <span className="mt-1.5 block break-words font-medium leading-snug text-forest-900">{value}</span>
                </>
              );
              const card = "block h-full rounded-card border border-line bg-mint-25 p-6 transition duration-300 ease-out-soft";
              return (
                <li key={label}>
                  <Reveal delay={i * 60} className="h-full">
                    {href ? (
                      <a href={href} className={`${card} hover:-translate-y-0.5 hover:bg-paper hover:shadow-lift`} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {body}
                      </a>
                    ) : (
                      <div className={card}>{body}</div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* CTA band */}
      <section className="px-4 pb-24 sm:pb-32">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[2.5rem] bg-forest-field px-8 py-16 sm:px-16 sm:py-20">
          <Lattice tone="light" className="absolute inset-0" />
          <BrandMark className="pointer-events-none absolute -bottom-16 -right-6 h-80 w-auto rotate-12 opacity-20" />
          <div className="relative max-w-2xl">
            <Eyebrow tone="light">Get involved</Eyebrow>
            <h2 className="mt-4 text-4xl font-bold leading-[1.02] text-mint-50 sm:text-6xl">Let’s grow stronger together.</h2>
            <p className="mt-5 text-lg leading-8 text-mint-100/70">Whether you grow pineapple, buy it, or work with the people who do, there is a place for you in the PiGA network.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={s.ctas.join.href} variant="accent">{s.ctas.join.label}</ButtonLink>
              <ButtonLink href={s.ctas.partner.href} variant="ghost-dark" arrow={false}>{s.ctas.partner.label}</ButtonLink>
              <ButtonLink href={s.ctas.contact.href} variant="ghost-dark" arrow={false}>{s.ctas.contact.label}</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
