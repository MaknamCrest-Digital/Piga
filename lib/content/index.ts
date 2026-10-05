import { siteSettings } from "@/content/site";
import { aboutPage, homePage } from "@/content/pages";
import { membershipPage } from "@/content/membership";
import { knowledgeTopics, varieties } from "@/content/knowledge";
import { people } from "@/content/team";
import { listPartnersPendingConsent, partners } from "@/content/partners";
import { events, legalPages, posts } from "@/content/catalogue";
import type {
  AboutPage, EventItem, HomePage, KnowledgeTopic, LegalPage, LegalSlug,
  MembershipPage, Partner, Person, PersonGroup, Post, SiteSettings, Variety,
} from "./types";

// Content layer. Pages read only from here. Today every getter reads the
// local seeds in content/; when WORDPRESS_GRAPHQL_URL is set they will read
// WordPress instead (see piga-wordpress-cms skill). Publication gates from the
// client checklist are enforced here, never in components.

/** CONTENT_PREVIEW=1 shows gated items with a "pending" marker, for internal review only. */
const preview = process.env.CONTENT_PREVIEW === "1";

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}

export async function getHomePage(): Promise<HomePage> {
  return homePage;
}

export async function getAboutPage(): Promise<AboutPage> {
  return aboutPage;
}

export async function getPeople(group?: PersonGroup): Promise<Person[]> {
  return group ? people.filter((p) => p.groups.includes(group)) : people;
}

export async function getPeopleByIds(ids: string[]): Promise<Person[]> {
  return ids.map((id) => people.find((p) => p.id === id)).filter((p): p is Person => !!p);
}

// 6.3: private partners need consent to be named for PiGA. The policy flag in
// content/partners.ts can list them before consent is recorded.
export async function getPartners(): Promise<Partner[]> {
  if (preview) return partners.map((p) => ({ ...p, pending: !p.consentConfirmed }));
  if (listPartnersPendingConsent) return partners;
  return partners.filter((p) => p.consentConfirmed);
}

export async function getVarieties(): Promise<Variety[]> {
  return varieties;
}

// 3.3 is TBC: benefits are withheld until benefitsConfirmed.
export async function getMembershipPage(): Promise<MembershipPage> {
  const page = membershipPage;
  if (page.benefitsConfirmed) return page;
  if (preview) return { ...page, benefits: page.benefits.map((b) => ({ ...b, pending: true })) };
  return { ...page, benefits: [] };
}

export async function getKnowledgeTopics(): Promise<KnowledgeTopic[]> {
  return knowledgeTopics;
}

export async function getEvents(): Promise<EventItem[]> {
  return events;
}

export async function getPosts(): Promise<Post[]> {
  return posts;
}

export async function getLegalPages(): Promise<LegalPage[]> {
  return legalPages;
}

export async function getLegalPage(slug: LegalSlug): Promise<LegalPage | null> {
  return legalPages.find((p) => p.slug === slug) ?? null;
}
