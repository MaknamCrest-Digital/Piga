import "server-only";
import sanitizeHtml from "sanitize-html";
import type {
  AboutPage, EventItem, HomePage, Image, LegalPage, LegalSlug, MembershipPage, Partner,
  PartnerType, Person, PersonGroup, Post, SiteSettings, SocialNetwork, Variety,
} from "@/lib/content/types";

// WordPress shapes (nodes, ACF names) end here; everything returned matches lib/content/types.
// A mapper throws when a required field is missing, so the getter falls back to the seed.

type Raw = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

function req<T>(value: T | null | undefined, field: string): T {
  if (value === null || value === undefined || value === "") throw new Error(`WordPress field missing: ${field}`);
  return value;
}

const opt = <T>(value: T | null | undefined) => (value === null || value === "" ? undefined : (value ?? undefined));

export function image(edge: Raw | null | undefined, fallbackAlt = ""): Image | undefined {
  const n = edge?.node;
  if (!n?.sourceUrl) return undefined;
  return { src: n.sourceUrl, alt: n.altText || fallbackAlt, width: opt(n.mediaDetails?.width), height: opt(n.mediaDetails?.height) };
}

/** Allow-list for editor HTML (legal pages, post bodies). */
export function clean(html: string | null | undefined) {
  return sanitizeHtml(html ?? "", {
    allowedTags: ["p", "h2", "h3", "h4", "ul", "ol", "li", "a", "strong", "em", "b", "i", "br", "blockquote", "table", "thead", "tbody", "tr", "th", "td"],
    allowedAttributes: { a: ["href", "title", "target", "rel"] },
    allowedSchemes: ["https", "mailto", "tel"],
    transformTags: { a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }) },
  });
}

/** WYSIWYG → plain paragraphs (the site renders its own <p> tags). */
export function paragraphs(html: string | null | undefined): string[] {
  return sanitizeHtml(html ?? "", { allowedTags: ["p"], allowedAttributes: {} })
    .split(/<\/p>/i)
    .map((p) => p.replace(/<p>/i, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").trim())
    .filter(Boolean);
}

const slugs = (conn: Raw | null | undefined): string[] => (conn?.nodes ?? []).map((n: Raw) => n.slug);

const NETWORKS: SocialNetwork[] = ["facebook", "instagram", "linkedin"];

export function mapSettings(data: Raw, seed: SiteSettings): SiteSettings {
  const f = req(data.siteSettings?.siteSettingsFields, "siteSettings");
  const logos = {
    full: image(f.logoFull, "PiGA, Pineapple Growers Association"),
    fullLight: image(f.logoFullLight, "PiGA, Pineapple Growers Association"),
    compact: image(f.logoCompact, "PiGA, Pineapple Growers Association"),
    mark: image(f.logoMark),
  };
  return {
    orgName: req(f.orgName, "orgName"),
    acronym: req(f.acronym, "acronym"),
    statusLine: req(f.statusLine, "statusLine"),
    address: String(req(f.address, "address")).split(/\r?\n/).map((l) => l.trim()).filter(Boolean),
    phoneDisplay: req(f.phoneDisplay, "phoneDisplay"),
    phoneE164: req(f.phoneE164, "phoneE164"),
    whatsappE164: opt(f.whatsappE164),
    email: req(f.email, "email"),
    socials: (f.socials ?? [])
      .filter((s: Raw) => NETWORKS.includes(s.network))
      .map((s: Raw) => ({ network: s.network as SocialNetwork, url: s.url ?? "" })),
    // Until every logo is uploaded, keep the bundled set rather than mixing sources.
    logos: logos.full && logos.fullLight && logos.compact && logos.mark ? { ...logos, mark: { ...logos.mark, alt: "" } } as SiteSettings["logos"] : seed.logos,
    // 9.7: the CTA set and targets are fixed; only labels are editable.
    ctas: {
      join: { ...seed.ctas.join, label: f.ctaJoinLabel || seed.ctas.join.label },
      partner: { ...seed.ctas.partner, label: f.ctaPartnerLabel || seed.ctas.partner.label },
      contact: { ...seed.ctas.contact, label: f.ctaContactLabel || seed.ctas.contact.label },
    },
    launchBanner: f.launchBanner ? { enabled: Boolean(f.launchBanner.enabled), text: f.launchBanner.text ?? "", href: opt(f.launchBanner.link) } : undefined,
  };
}

export function mapHome(data: Raw): HomePage {
  const f = req(data.page?.homeFields, "page(home).homeFields");
  return {
    hero: { eyebrow: req(f.heroEyebrow, "heroEyebrow"), title: req(f.heroTitle, "heroTitle"), highlight: f.heroHighlight ?? "", lead: req(f.heroLead, "heroLead") },
    stats: (f.stats ?? []).slice(0, 4),
    whoWeAre: paragraphs(f.whoWeAre),
    vision: req(f.vision, "vision"),
    mission: req(f.mission, "mission"),
    objectives: f.objectives ?? [],
    featuredPeopleIds: slugs(f.featuredPeople),
    gap: { title: f.gapTitle ?? "", highlight: f.gapHighlight ?? "", supportedSectors: (f.gapSupportedSectors ?? []).map((s: Raw) => s.name) },
    family: {
      title: f.familyTitle ?? "",
      highlight: f.familyHighlight ?? "",
      lead: f.familyLead ?? "",
      associations: (f.familyAssociations ?? []).map((a: Raw) => ({
        id: req(a.slug, "familyAssociations.slug"),
        name: req(a.name, "familyAssociations.name"),
        crop: a.crop ?? "",
        since: opt(a.since),
        facts: (a.facts ?? []).map((x: Raw) => x.text),
        partnerId: slugs(a.partner)[0],
        isSelf: Boolean(a.isSelf),
      })),
    },
    reach: { title: f.reachTitle ?? "", highlight: f.reachHighlight ?? "" },
  };
}

export function mapAbout(data: Raw): AboutPage {
  const f = req(data.page?.aboutFields, "page(about).aboutFields");
  return {
    establishedYear: Number(req(f.establishedYear, "establishedYear")),
    history: paragraphs(f.history),
    coverage: req(f.coverage, "coverage"),
    structureIntro: paragraphs(f.structureIntro),
  };
}

export function mapMembership(data: Raw): MembershipPage {
  const f = req(data.page?.membershipFields, "page(membership).membershipFields");
  return {
    eligibility: paragraphs(f.eligibility),
    categories: f.categories ?? [],
    benefits: (f.benefits ?? []).map((b: Raw) => ({ title: b.title })),
    benefitsConfirmed: Boolean(f.benefitsConfirmed),
    feeStatement: req(f.feeStatement, "feeStatement"),
    steps: f.steps ?? [],
    memberIdTurnaround: f.memberIdTurnaround ?? "",
    enquiriesEmail: req(f.enquiriesEmail, "enquiriesEmail"),
  };
}

const GROUPS: PersonGroup[] = ["board", "management", "regional"];

export function mapPeople(data: Raw): Person[] {
  return (data.people?.nodes ?? []).map((n: Raw): Person => {
    const f = n.personFields ?? {};
    const groups = slugs(n.personGroups).filter((g): g is PersonGroup => GROUPS.includes(g as PersonGroup));
    const name = req(n.title, "person.title");
    return {
      id: req(n.slug, "person.slug"),
      name,
      groups,
      roles: Object.fromEntries(groups.map((g) => [g, f[`${g}Role`] || (g === "regional" ? "Regional Coordinator" : "Board member")])),
      region: opt(f.region),
      headshot: image(f.headshot, `Portrait of ${name}`),
    };
  });
}

const PARTNER_TYPES: PartnerType[] = ["sister-association", "development", "private"];

export function mapPartners(data: Raw): Partner[] {
  return (data.partners?.nodes ?? []).map((n: Raw): Partner => {
    const f = n.partnerFields ?? {};
    const type = slugs(n.partnerTypes).find((t): t is PartnerType => PARTNER_TYPES.includes(t as PartnerType));
    const name = req(n.title, "partner.title");
    return {
      id: req(n.slug, "partner.slug"),
      name,
      shortName: opt(f.shortName),
      type: type ?? "private",
      description: req(f.description, "partner.description"),
      logo: image(f.logo, `${name} logo`),
      logoIsGreyscale: Boolean(f.logoIsGreyscale),
      website: opt(f.website),
      consentConfirmed: f.consentConfirmed === true, // 6.3: default closed
    };
  });
}

export function mapVarieties(data: Raw): Variety[] {
  return (data.varieties?.nodes ?? []).map((n: Raw): Variety => {
    const f = n.varietyFields ?? {};
    return {
      id: req(n.slug, "variety.slug"),
      name: req(n.title, "variety.title"),
      code: opt(f.code),
      summary: req(f.summary, "variety.summary"),
      attributes: (f.attributes ?? []).map((a: Raw) => a.label),
      isMinor: Boolean(f.isMinor),
      image: image(f.image, n.title),
    };
  });
}

export function mapEvents(data: Raw): EventItem[] {
  return (data.events?.nodes ?? []).map((n: Raw): EventItem => {
    const f = n.eventFields ?? {};
    return {
      id: req(n.slug, "event.slug"),
      title: req(n.title, "event.title"),
      monthLabel: req(f.monthLabel, "event.monthLabel"),
      startDate: f.dateTbc ? undefined : opt(f.startDate),
      dateTbc: Boolean(f.dateTbc),
      venue: f.venueTbc ? undefined : opt(f.venue),
      venueTbc: Boolean(f.venueTbc),
      summary: f.summary ?? "",
    };
  });
}

export function mapPosts(data: Raw): Post[] {
  return (data.posts?.nodes ?? []).map((n: Raw): Post => ({
    slug: req(n.slug, "post.slug"),
    title: req(n.title, "post.title"),
    date: req(n.date, "post.date"),
    excerpt: sanitizeHtml(n.excerpt ?? "", { allowedTags: [], allowedAttributes: {} }).trim(),
  }));
}

const LEGAL_SLUGS: LegalSlug[] = ["privacy", "cookies", "terms"];

export function mapLegal(data: Raw): LegalPage[] {
  return (data.pages?.nodes ?? [])
    .filter((n: Raw) => LEGAL_SLUGS.includes(n.slug))
    .map((n: Raw): LegalPage => ({
      slug: n.slug as LegalSlug,
      title: req(n.title, "legal.title"),
      updated: new Date(req(n.modified, "legal.modified")).toLocaleDateString("en-GH", { day: "numeric", month: "long", year: "numeric" }),
      html: clean(n.content),
    }));
}
