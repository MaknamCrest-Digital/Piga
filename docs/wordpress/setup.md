# WordPress setup for the PiGA front end

The Next.js site already works without WordPress (seed mode, `content/*.ts`). These steps stand WordPress up as the editing back office, then switch the site over. The field reference is `.claude/skills/piga-wordpress-cms/references/content-model.md`; the GraphQL names below are what `lib/wp/queries.ts` expects.

## 1. Install
- Host on a subdomain, e.g. `cms.pineapplegrowersgh.org` (self-hosted or WordPress.com Business+, since plugins are needed).
- Plugins: **WPGraphQL**, **WPGraphQL for ACF**, **ACF PRO** (or Secure Custom Fields, as long as it has repeaters and options pages), and a headless redirect plugin so the WordPress front end forwards to the Next site.
- Copy `docs/wordpress/mu-revalidate.php` to `wp-content/mu-plugins/` and add the three constants to `wp-config.php` (see the file header).
- Users → create an **application password** for a read-only Editor account; this is used for previews only.
- Roles (checklist 10.5): content editors are Contributors or Authors. Kobby is the Editor and the only one who publishes.

## 2. Post types and taxonomies (show in GraphQL)
| Post type | GraphQL single / plural | Taxonomy (GraphQL plural) |
|---|---|---|
| `person` | `person` / `people` | `person_group` → `personGroups` (board, management, regional) |
| `partner` | `partner` / `partners` | `partner_type` → `partnerTypes` (sister-association, development, private) |
| `variety` | `variety` / `varieties` | — |
| `event` | `event` / `events` | — |

Enable *page-attributes* (menu order) on `person`, `partner` and `variety`. **The post slug is the ID**, so use the IDs from `content/*.ts` (e.g. `nimo-ahinkorah`, `oga`) when importing; the homepage's featured people and sister associations point at them.

## 3. ACF field groups (GraphQL field name in brackets)
- **Options page "Site Settings"** (`siteSettings`, group `siteSettingsFields`): `org_name`, `acronym`, `status_line`, `address` (textarea, one line per row), `phone_display`, `phone_e164`, `whatsapp_e164`, `email`, `socials` (repeater: `network` select facebook|instagram|linkedin, `url`; leave `url` empty until the profile exists), `logo_full`, `logo_full_light`, `logo_compact`, `logo_mark`, `cta_join_label`, `cta_partner_label`, `cta_contact_label`, `launch_banner` (group: `enabled`, `text`, `link`).
- **Page `home`** (`homeFields`): `hero_eyebrow`, `hero_title`, `hero_highlight`, `hero_lead`, `stats` (repeater, max 4: `value`, `label`), `who_we_are` (WYSIWYG), `vision`, `mission`, `objectives` (repeater: `title`, `body`), `featured_people` (relationship → person), `gap_title`, `gap_highlight`, `gap_supported_sectors` (repeater: `name`), `family_title`, `family_highlight`, `family_lead`, `family_associations` (repeater: `slug`, `name`, `crop`, `since`, `facts` (repeater: `text`), `partner` (relationship → partner, max 1), `is_self`), `reach_title`, `reach_highlight`.
- **Page `about`** (`aboutFields`): `established_year`, `history` (WYSIWYG), `coverage`, `structure_intro` (WYSIWYG).
- **Page `membership`** (`membershipFields`): `eligibility` (WYSIWYG), `categories` (repeater: `name`, `summary`), `benefits` (repeater: `title`), **`benefits_confirmed`** (true/false, default false), `fee_statement`, `steps` (repeater: `title`, `body`), `member_id_turnaround`, `enquiries_email`.
- **person** (`personFields`): `board_role`, `management_role`, `regional_role` (one per group, since one person can sit in two), `region`, `headshot` (image). No bio field (2.3).
- **partner** (`partnerFields`): `short_name`, `description`, `logo` (alt text required), `logo_is_greyscale`, `website`, **`consent_confirmed`** (default false).
- **variety** (`varietyFields`): `code`, `summary`, `attributes` (repeater: `label`), `is_minor`, `image`.
- **event** (`eventFields`): `month_label`, `start_date`, **`date_tbc`**, `venue`, **`venue_tbc`**, `summary`.
- **Legal**: ordinary pages with slugs `privacy`, `cookies`, `terms`. The front end sanitises their HTML.

## 4. Switch the site over
1. Import the seed content (people, partners, varieties, pages) and upload images with alt text.
2. Check the schema in GraphiQL (WordPress → GraphQL → GraphiQL IDE) against `lib/wp/queries.ts`. Rename in ACF or adjust the query; don't change pages.
3. Set in the Next.js environment (`.env.local` or the host's settings):
   ```
   WORDPRESS_GRAPHQL_URL=https://cms.pineapplegrowersgh.org/graphql
   WORDPRESS_MEDIA_HOST=cms.pineapplegrowersgh.org
   WORDPRESS_REVALIDATE_SECRET=<long random string>
   WORDPRESS_PREVIEW_SECRET=<long random string>
   WORDPRESS_APP_USER=<preview user>
   WORDPRESS_APP_PASSWORD=<application password>
   ```
4. Build. Any getter whose query fails logs `[content] <name>: WordPress unavailable, using seed.` and serves the seed, so watch the build log for those lines.

## 5. Verify
- Edit a partner and publish: the site updates within seconds (webhook), or within an hour at worst.
- Click **Preview** on a draft page: it opens the Next site in draft mode. Leave with `/api/preview/exit`.
- An unpublished fact, a partner without `consent_confirmed`, or benefits without `benefits_confirmed` never appear on the public site.
