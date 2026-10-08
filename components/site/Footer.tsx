import Link from "next/link";
import { getLegalPages, getSiteSettings } from "@/lib/content";
import { Logo } from "@/components/brand/Logo";
import { Lattice } from "@/components/brand/Lattice";
import { SocialLinks } from "./SocialLinks";

export async function Footer() {
  const [s, legal] = await Promise.all([getSiteSettings(), getLegalPages()]);
  const year = new Date().getFullYear();

  const columns = [
    { title: "Explore", links: [["About", "/about"], ["Leadership", "/leadership"], ["Knowledge", "/knowledge"], ["News and events", "/news"]] },
    { title: "Get involved", links: [[s.ctas.join.label, s.ctas.join.href], [s.ctas.partner.label, s.ctas.partner.href], [s.ctas.contact.label, s.ctas.contact.href]] },
  ];

  return (
    <footer className="relative overflow-hidden bg-forest-950 text-mint-100/70">
      <Lattice tone="light" className="absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_70%)]" />
      <div className="container-site relative grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo logos={s.logos} variant="full" tone="light" />
          <p className="mt-6 max-w-xs text-sm leading-7">Bringing Ghana’s pineapple growers together. {s.statusLine}</p>
          <SocialLinks socials={s.socials} />
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <h2 className="font-sans text-sm font-semibold tracking-normal text-mint-50">{c.title}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {c.links.map(([label, href]) => (
                <li key={href}><Link href={href} className="transition-colors hover:text-mint-50">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="font-sans text-sm font-semibold tracking-normal text-mint-50">Contact</h2>
          <address className="mt-5 space-y-3 text-sm not-italic leading-6">
            <p>{s.address.slice(0, 2).map((l) => <span key={l} className="block">{l}</span>)}</p>
            <p><a href={`tel:${s.phoneE164}`} className="hover:text-mint-50">{s.phoneDisplay}</a></p>
            {s.whatsappE164 && <p><a href={`https://wa.me/${s.whatsappE164}`} className="hover:text-mint-50">WhatsApp</a></p>}
            <p><a href={`mailto:${s.email}`} className="hover:text-mint-50">{s.email.split("@")[0]}@<wbr />{s.email.split("@")[1]}</a></p>
          </address>
        </div>
      </div>
      <div className="container-site relative flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-mint-100/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {s.orgName}.</p>
        {legal.length > 0 && (
          <ul className="flex gap-5">
            {legal.map((p) => <li key={p.slug}><Link href={`/${p.slug}`} className="hover:text-mint-50">{p.title}</Link></li>)}
          </ul>
        )}
      </div>
    </footer>
  );
}
