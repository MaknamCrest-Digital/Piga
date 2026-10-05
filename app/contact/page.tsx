import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getSiteSettings } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Lattice } from "@/components/brand/Lattice";
import { buttonClass } from "@/components/ui/Button";
import { ContactForm } from "./ContactForm";
import { TOPICS } from "./topics";

export const metadata: Metadata = { title: "Contact", description: "Contact the Pineapple Growers Association in Akyem Oda, by phone, WhatsApp or email." };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const [s, { topic }] = await Promise.all([getSiteSettings(), searchParams]);
  const defaultTopic = TOPICS.find((t) => t.toLowerCase() === topic?.toLowerCase()) ?? TOPICS[0];

  const channels = [
    { icon: Phone, label: "Telephone", value: s.phoneDisplay, href: `tel:${s.phoneE164}` },
    { icon: Mail, label: "Email", value: s.email, href: `mailto:${s.email}` },
    { icon: MapPin, label: "Office", value: s.address.slice(0, 2).join(", ") },
  ];

  return (
    <>
      <PageHero eyebrow="Contact PiGA" title="Let’s grow Ghana’s pineapple industry together." lead="For membership, partnerships or anything else, get in touch. Membership and partnership enquiries go to the same team." />
      <Section className="bg-mint-50">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.5fr]">
          <div className="relative overflow-hidden rounded-card bg-forest-field p-8 sm:p-10">
            <Lattice tone="light" className="absolute inset-0" />
            <div className="relative">
              <h2 className="text-2xl font-semibold text-mint-50">PiGA office</h2>
              <ul className="mt-8 space-y-6">
                {channels.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-mint-200"><Icon size={18} aria-hidden /></span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[.16em] text-mint-200/70">{label}</p>
                      {href ? <a href={href} className="mt-1 block text-mint-50 hover:underline">{value.includes("@") ? <>{value.split("@")[0]}@<wbr />{value.split("@")[1]}</> : value}</a> : <p className="mt-1 text-mint-50">{value}</p>}
                    </div>
                  </li>
                ))}
              </ul>
              {s.whatsappE164 && (
                <a href={`https://wa.me/${s.whatsappE164}`} className={buttonClass("accent", "mt-10")}>
                  <MessageCircle size={18} aria-hidden /> WhatsApp PiGA
                </a>
              )}
            </div>
          </div>
          <ContactForm defaultTopic={defaultTopic} />
        </div>
      </Section>
    </>
  );
}
