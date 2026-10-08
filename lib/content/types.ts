// Single source of content types. Seeds (content/*.ts) and the future
// WordPress mappers (lib/wp/mappers.ts) both produce these shapes.
// Field reference: .claude/skills/piga-wordpress-cms/references/content-model.md

export type Image = { src: string; alt: string; width?: number; height?: number };

export type Cta = { label: string; href: string };

/** Logo set (checklist 1.2). `full` is the lockup with strapline; `compact` drops the strapline. */
export type BrandLogos = {
  full: Image;
  fullLight: Image;
  compact: Image;
  mark: Image;
};

export type SiteSettings = {
  orgName: string;
  acronym: string;
  statusLine: string;
  address: string[];
  phoneDisplay: string;
  phoneE164: string;
  whatsappE164?: string;
  email: string;
  socials: SocialLink[];
  logos?: BrandLogos;
  ctas: { join: Cta; partner: Cta; contact: Cta };
  launchBanner?: { enabled: boolean; text: string; href?: string };
};

export type SocialNetwork = "facebook" | "instagram" | "linkedin";

/** 1.7. An empty `url` is a placeholder: hidden in production, shown as `pending` in dev or preview. */
export type SocialLink = { network: SocialNetwork; url: string; pending?: boolean };

export type HomePage = {
  hero: { eyebrow: string; title: string; highlight: string; lead: string };
  stats: { value: string; label: string }[];
  whoWeAre: string[];
  vision: string;
  mission: string;
  objectives: { title: string; body: string }[];
  featuredPeopleIds: string[];
  /** Why PiGA exists (1.3): the tree-crop sectors that already have support, versus pineapple. */
  gap: { title: string; highlight: string; supportedSectors: string[] };
  /** The sister associations (1.5, Appendix A). `partnerId` pulls the logo from partners. */
  family: { title: string; highlight: string; lead: string; associations: SisterAssociation[] };
  /** Coverage and office (1.6, 1.9). Body text comes from AboutPage.coverage; contact from SiteSettings. */
  reach: { title: string; highlight: string };
};

export type SisterAssociation = {
  id: string;
  name: string;
  crop: string;
  since?: string;
  facts: string[];
  partnerId?: string;
  isSelf?: boolean;
};

export type AboutPage = {
  establishedYear: number;
  history: string[];
  coverage: string;
  structureIntro: string[];
};

export type PersonGroup = "board" | "management" | "regional";

export type Person = {
  id: string;
  name: string;
  roles: Partial<Record<PersonGroup, string>>;
  groups: PersonGroup[];
  region?: string;
  headshot?: Image;
};

export type PartnerType = "sister-association" | "development" | "private";

export type Partner = {
  id: string;
  name: string;
  shortName?: string;
  type: PartnerType;
  description: string;
  logo?: Image;
  logoIsGreyscale?: boolean;
  website?: string;
  consentConfirmed: boolean;
  /** Set by the getter in preview mode for items that would otherwise be hidden. */
  pending?: boolean;
};

export type Variety = {
  id: string;
  name: string;
  code?: string;
  summary: string;
  attributes: string[];
  isMinor?: boolean;
  image?: Image;
};

export type MembershipPage = {
  eligibility: string[];
  categories: { name: string; summary: string }[];
  benefits: { title: string; pending?: boolean }[];
  benefitsConfirmed: boolean;
  feeStatement: string;
  steps: { title: string; body: string }[];
  memberIdTurnaround: string;
  enquiriesEmail: string;
};

export type EventItem = {
  id: string;
  title: string;
  monthLabel: string;
  startDate?: string;
  dateTbc: boolean;
  venue?: string;
  venueTbc: boolean;
  summary: string;
};

export type Post = { slug: string; title: string; date: string; excerpt: string };

export type KnowledgeTopic = { id: string; title: string; blurb: string };

export type LegalSlug = "privacy" | "cookies" | "terms";
export type LegalPage = { slug: LegalSlug; title: string; updated: string; html: string };
