---
name: piga-wordpress-cms
description: How the PiGA Next.js site gets its content from headless WordPress, covering the content model (post types and fields), the typed content layer with a local-seed fallback, caching and on-demand revalidation, previews, images and forms. Use when adding or changing any content type, wiring a page to data, touching lib/content, content/, app/api, or planning the WordPress setup.
---

# PiGA headless WordPress

**Architecture:** WordPress is the editing back office only. The Next.js site renders everything. Pages never call WordPress directly. They call a typed content layer that has two interchangeable sources:

```
app/*/page.tsx  →  lib/content/index.ts (typed getters)
                        ├─ source "seed"  → content/*.ts   (today; also the fallback)
                        └─ source "wp"    → lib/wp/client.ts (WPGraphQL)
```

The source is picked by env: if `WORDPRESS_GRAPHQL_URL` is set, use `wp`. Otherwise use `seed`. That lets the design ship and be reviewed **before** WordPress exists, and migrating means moving data rather than rewriting pages.

## 1. WordPress setup (target)

- **Host:** self-hosted or WordPress.com Business+ (plugins are required). Put it on a subdomain such as `cms.pineapplegrowersgh.org`, and make the front end the public `pineapplegrowersgh.org`.
- **Plugins:** WPGraphQL · WPGraphQL for ACF · ACF PRO *or* Secure Custom Fields (needs repeaters and options pages, so confirm the chosen plugin provides both) · a headless redirect, so the WordPress front end 301s to the Next site.
- **Roles mirror checklist 10.5:** content editors use the *Contributor* or *Author* role and submit with "Pending review". **Kobby** holds *Editor* and is the only person who publishes.
- **Publication gates** (from `piga-content`) are real fields, not conventions: `confirmed` on gated blocks, `consent_confirmed` on partners. The front end filters on them, so a draft fact can sit in WordPress without leaking.

The full field list is in `references/content-model.md`. Keep it, the TS types in `lib/content/types.ts` and the seed files in sync. **Change all three in the same commit.**

## 2. Content layer contract

`lib/content/types.ts` holds the single source of TS types (`SiteSettings`, `HomePage`, `Person`, `Partner`, `Variety`, `EventItem`, `Post`, `LegalPage`, `MembershipPage`).

`lib/content/index.ts` exposes only async getters:
```ts
getSiteSettings(): Promise<SiteSettings>
getHomePage(): Promise<HomePage>
getAboutPage(): Promise<AboutPage>
getPeople(group?: PersonGroup): Promise<Person[]>     // ordered by menuOrder
getPartners(): Promise<Partner[]>                      // already filtered: consentConfirmed === true
getVarieties(): Promise<Variety[]>
getMembershipPage(): Promise<MembershipPage>           // benefits omitted unless confirmed
getEvents(): Promise<EventItem[]>
getPosts(opts?): Promise<Post[]>
getLegalPage(slug: "privacy" | "cookies" | "terms"): Promise<LegalPage | null>
```
Rules:
- **The gates are applied inside the getters**, never in components. A component can't render what it never receives.
- Getters return plain serialisable objects. WordPress shapes (`node`, `edges`, ACF field names) never leave `lib/wp/`.
- Map WordPress data to the types in `lib/wp/mappers.ts`. If WordPress is unreachable at build time, log the error and fall back to seed data for that getter, so the site never builds blank.
- Optional fields stay optional (`headshot?: Image`). The UI renders design-system fallbacks (see `piga-design-system` §4).

## 3. Fetching and caching (Next 16)

```ts
// lib/wp/client.ts
export async function wpQuery<T>(query: string, variables: Record<string, unknown>, tags: string[]): Promise<T> {
  const res = await fetch(process.env.WORDPRESS_GRAPHQL_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { tags: ["wp", ...tags], revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`WP ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
}
```
- Tag every query by type (`wp:people`, `wp:partners`, `wp:settings`, `wp:page:home`), plus `wp:post:<slug>` for single posts.
- **On-demand revalidation:** `app/api/revalidate/route.ts` takes a POST with header `x-revalidate-secret` matching `WORDPRESS_REVALIDATE_SECRET` and a body `{ tags: string[] }`, then calls `revalidateTag(tag, "max")`. In Next 16 the second argument is required. Reject a missing or wrong secret with 401.
- WordPress side: a small must-use plugin hooks `save_post`, `deleted_post` and the ACF options save, maps the post type to a tag, and `wp_remote_post`s it to the endpoint. Keep the snippet in `docs/wordpress/mu-revalidate.php` when it's written.
- Keep the hourly `revalidate` as a safety net in case a webhook is missed.

## 4. Previews
`app/api/preview/route.ts` checks a secret, then calls `(await draftMode()).enable()` (async in Next 16) and redirects to the page. When draft mode is on, getters pass `asPreview: true` and an application-password `Authorization` header so WPGraphQL returns drafts. Point WordPress's preview link at this route. This is how Kobby reviews content before publishing.

## 5. Images
- Add `next.config.ts` with `images.remotePatterns` for the WordPress uploads host. Always render through `next/image` with WordPress `width` and `height` and the alt text (make alt required in ACF).
- Logos for partners and the brand go in `public/brand/` and `public/partners/` while on seed, and move to WordPress media later.

## 6. Forms (checklist 3.4 membership, 9.1 contact)
Forms post to **server actions** in Next. They aren't WordPress forms, so validation and spam control stay in one place. Validate with zod and add a honeypot plus rate limiting.
- **The destination is undecided (9.5).** Put delivery behind `lib/forms/deliver.ts` with one implementation chosen by env: email (Resend or SMTP to info@pineapplegrowersgh.org), a WordPress CPT `submission` created via an application password, or a webhook. Don't hard-code a choice before the client answers.
- The membership form needs a repeatable crop table and an optional GPS field (a "use my location" button that fills lat/lng). Ghana Card is personal data, so mention it in the Privacy page and never log it.

## 7. Env vars (`.env.local`, document in `.env.example`)
```
WORDPRESS_GRAPHQL_URL=           # unset = seed mode
WORDPRESS_REVALIDATE_SECRET=
WORDPRESS_PREVIEW_SECRET=
WORDPRESS_APP_USER=              # for preview/drafts
WORDPRESS_APP_PASSWORD=
FORMS_DELIVERY=email             # email | wordpress | webhook (pending 9.5)
```

## Migration order
1. Seed mode: build the types, seeds and getters, and move every page off hard-coded JSX. *No WordPress needed.*
2. Stand up WordPress, register the CPTs and fields from `references/content-model.md`, and import the seeds.
3. Write `lib/wp/` queries and mappers per getter, then flip the env var. Pages don't change.
4. Add revalidation, previews and media, then switch forms to the chosen destination.

## Done checklist for any content change
- [ ] Type, seed and content-model doc updated together
- [ ] Gates enforced in the getter
- [ ] Renders with the field empty or the list empty
- [ ] New query tagged, and the WordPress webhook maps the post type to that tag
