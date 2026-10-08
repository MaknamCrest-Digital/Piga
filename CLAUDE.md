# PiGA website (Next.js front end, headless WordPress planned)

Marketing site for the Pineapple Growers Association, Ghana. Stack: Next 16 App Router, React 19, Tailwind v4 (CSS-first `@theme`), TypeScript, lucide-react.

## Source of truth
- **Content:** *PiGA Website Content Checklist v3.8*. Approved copy is transcribed in `.claude/skills/piga-content/references/approved-copy.md`. Never paraphrase or invent organisational claims.
- **Gap list:** `docs/content-audit.md`. Read it before touching a page.
- **Assets:** brand in `public/brand/`, partner logos in `public/partners/`, untouched originals in `assets/source/`. All come from the checklist document. Never substitute stock imagery.

## Skills (load the relevant one before working)
- `piga-design-system`: the mint-premium look, tokens, type, components, and how to look premium with no photos.
- `piga-content`: publication rules by checklist status (Held, Partial, TBC, Outstanding, Blacked out), CTA wording, tone.
- `piga-wordpress-cms`: the headless WordPress content model, fetch layer, revalidation, and the local-seed fallback.

## Conventions
- Shared chrome lives in `components/site/` (Header, which includes the mobile menu, and Footer). Pages never define their own header.
- Content is read through `lib/content/*` and never hard-coded in JSX. It reads `content/*.ts` seeds (`site`, `pages`, `team`, `membership`, `knowledge`, `partners`, `catalogue`) unless `WORDPRESS_GRAPHQL_URL` is set, then WordPress via `lib/wp/*` (client, queries, mappers) with a per-getter seed fallback. WordPress-side setup: `docs/wordpress/setup.md` and `docs/wordpress/mu-revalidate.php`. Routes: `app/api/revalidate`, `app/api/preview`, `app/api/preview/exit`.
- Social links (1.7) live in `siteSettings.socials`; an empty `url` is a placeholder shown only in dev or with `CONTENT_PREVIEW=1`.
- Run `npm run lint` (ESLint flat config) and `npm run typecheck` before handing over.
- Next 16 specifics: `next lint` is gone (use `eslint` directly), `middleware.ts` is now `proxy.ts`, and `revalidateTag(tag, 'max')` takes a cache profile as its second argument.
- No stock imagery in production. Placeholders must be design-system surfaces, not Unsplash.
- Visitor-facing text never mentions the CMS, placeholders or "coming soon" lorem.
