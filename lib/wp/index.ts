import "server-only";
import type { SiteSettings } from "@/lib/content/types";
import { tags, wpQuery } from "./client";
import * as m from "./mappers";
import * as q from "./queries";

// One fetcher per content-layer getter. Publication gates are NOT applied here;
// lib/content/index.ts applies them to WordPress and seed data alike.

export { wpEnabled } from "./client";

export const wp = {
  settings: async (seed: SiteSettings) => m.mapSettings(await wpQuery(q.SETTINGS, {}, [tags.settings]), seed),
  home: async () => m.mapHome(await wpQuery(q.HOME, {}, [tags.page("home"), tags.people])),
  about: async () => m.mapAbout(await wpQuery(q.ABOUT, {}, [tags.page("about")])),
  membership: async () => m.mapMembership(await wpQuery(q.MEMBERSHIP, {}, [tags.page("membership")])),
  people: async () => m.mapPeople(await wpQuery(q.PEOPLE, {}, [tags.people])),
  partners: async () => m.mapPartners(await wpQuery(q.PARTNERS, {}, [tags.partners])),
  varieties: async () => m.mapVarieties(await wpQuery(q.VARIETIES, {}, [tags.varieties])),
  events: async () => m.mapEvents(await wpQuery(q.EVENTS, {}, [tags.events])),
  posts: async () => m.mapPosts(await wpQuery(q.POSTS, {}, [tags.posts])),
  legal: async () => m.mapLegal(await wpQuery(q.LEGAL, {}, [tags.legal])),
};
