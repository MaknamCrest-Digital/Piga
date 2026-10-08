import "server-only";
import { cache } from "react";
import { siteSettings } from "@/content/site";
import { aboutPage, homePage } from "@/content/pages";
import { membershipPage } from "@/content/membership";
import { knowledgeTopics, varieties } from "@/content/knowledge";
import { people } from "@/content/team";
import { listPartnersPendingConsent, partners } from "@/content/partners";
import { events, legalPages, posts } from "@/content/catalogue";
import { wp, wpEnabled } from "@/lib/wp";
import type {
  AboutPage, EventItem, HomePage, KnowledgeTopic, LegalPage, LegalSlug,
  MembershipPage, Partner, Person, PersonGroup, Post, SiteSettings, Variety,
} from "./types";

// Content layer. Pages read only from here. With WORDPRESS_GRAPHQL_URL unset every
// getter reads the local seeds in content/; when set, it reads WordPress (lib/wp) and
// falls back to the seed if WordPress fails, so the site never builds blank.
// Publication gates from the client checklist are enforced here, never in components.

/** CONTENT_PREVIEW=1 shows gated items with a "pending" marker, for internal review only. */
const preview = process.env.CONTENT_PREVIEW === "1";
const showPlaceholders = preview || process.env.NODE_ENV !== "production";

async function load<T>(name: string, seed: T, fromWp: () => Promise<T>): Promise<T> {
  if (!wpEnabled()) return seed;
  try {
    return await fromWp();
  } catch (err) {
    console.error(`[content] ${name}: WordPress unavailable, using seed.`, err instanceof Error ? err.message : err);
    return seed;
  }
}

// One WordPress round trip per source per request, however many components ask.
const settingsSource = cache(() => load("settings", siteSettings, () => wp.settings(siteSettings)));
const allPeople = cache(() => load("people", people, wp.people));
const legalSource = cache(() => load("legal", legalPages, wp.legal));

// 1.7: a social link without a URL is a placeholder. Production drops it.
export async function getSiteSettings(): Promise<SiteSettings> {
  const s = await settingsSource();
  const socials = s.socials.flatMap((so) => (so.url ? [so] : showPlaceholders ? [{ ...so, pending: true }] : []));
  return { ...s, socials };
}

export async function getHomePage(): Promise<HomePage> {
  return load("home", homePage, wp.home);
}

export async function getAboutPage(): Promise<AboutPage> {
  return load("about", aboutPage, wp.about);
}

export async function getPeople(group?: PersonGroup): Promise<Person[]> {
  const list = await allPeople();
  return group ? list.filter((p) => p.groups.includes(group)) : list;
}

export async function getPeopleByIds(ids: string[]): Promise<Person[]> {
  const list = await allPeople();
  return ids.map((id) => list.find((p) => p.id === id)).filter((p): p is Person => !!p);
}

// 6.3: private partners need consent to be named for PiGA. The policy flag in
// content/partners.ts can list them before consent is recorded.
export async function getPartners(): Promise<Partner[]> {
  const list = await load("partners", partners, wp.partners);
  if (preview) return list.map((p) => ({ ...p, pending: !p.consentConfirmed }));
  if (listPartnersPendingConsent) return list;
  return list.filter((p) => p.consentConfirmed);
}

export async function getVarieties(): Promise<Variety[]> {
  return load("varieties", varieties, wp.varieties);
}

// 3.3 is TBC: benefits are withheld until benefitsConfirmed.
export async function getMembershipPage(): Promise<MembershipPage> {
  const page = await load("membership", membershipPage, wp.membership);
  if (page.benefitsConfirmed) return page;
  if (preview) return { ...page, benefits: page.benefits.map((b) => ({ ...b, pending: true })) };
  return { ...page, benefits: [] };
}

// Knowledge topics stay in the seed until the `resource` CPT is built (content model).
export async function getKnowledgeTopics(): Promise<KnowledgeTopic[]> {
  return knowledgeTopics;
}

export async function getEvents(): Promise<EventItem[]> {
  return load("events", events, wp.events);
}

export async function getPosts(): Promise<Post[]> {
  return load("posts", posts, wp.posts);
}

export async function getLegalPages(): Promise<LegalPage[]> {
  return legalSource();
}

export async function getLegalPage(slug: LegalSlug): Promise<LegalPage | null> {
  return (await getLegalPages()).find((p) => p.slug === slug) ?? null;
}
