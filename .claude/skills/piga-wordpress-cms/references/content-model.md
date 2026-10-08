# PiGA WordPress content model

Field names are snake_case in ACF and camelCase in TS. The `Ref` column points to checklist v3.8.
`*` = required. Gate fields are **bold**.

## Options page: Site Settings (`siteSettings`)
| Field | Type | Ref | Notes |
|---|---|---|---|
| org_name* | text | 1.1 | Pineapple Growers Association |
| acronym* | text | 1.1 | PiGA |
| status_line* | text | 1.8 | "PiGA is a non-governmental organisation." |
| address* | textarea | 1.6 | |
| phone_display* / phone_e164* | text | 1.6 | 059 159 8095 / +233591598095 |
| whatsapp_e164 | text | 9.4 | |
| email* | email | 1.6, 9.2, 9.3 | |
| socials | repeater {network: facebook\|instagram\|linkedin, url} | 1.7 | Rows seeded with empty `url`. Production hides rows without a URL; dev/preview shows them as placeholders |
| logo_full / logo_full_light / logo_compact / logo_mark | image | 1.2 | Maps to `siteSettings.logos` |
| cta_join_label / cta_partner_label / cta_contact_label | text | 9.7 | Labels are editable; the set and targets are fixed in code |
| launch_banner | group {enabled, text, link} | 7.2 | e.g. "PiGA launches November 2026" |

## Page: Home (ACF on the page with slug `home`)
| Field | Type | Ref |
|---|---|---|
| hero_eyebrow, hero_title, hero_highlight, hero_lead | text | (restates 1.4) |
| stats | repeater {value, label}, max 4 | 1.5, 1.9, 3.5 |
| who_we_are | wysiwyg (4 paragraphs) | 1.5 |
| vision*, mission* | textarea | 1.4 |
| objectives | repeater {title, body}, exactly 6 | 1.4 |
| featured_varieties | relationship → variety | 5.1 |
| featured_people | relationship → person | 2.1 |
| gap_title, gap_highlight, gap_supported_sectors (repeater {name}) | text | 1.3 |
| family_title, family_highlight, family_lead, family_associations (repeater {slug, name, crop, since, facts {text}, partner → partner, is_self}) | mixed | 1.5, App. A |
| reach_title, reach_highlight | text | 1.6, 1.9 |

## Page: About
`established_year` (number, 2026) · `history` (wysiwyg, 1.3) · `coverage` (textarea, 1.9) · `structure_intro` (wysiwyg, 2.4).
Vision, mission and objectives are read from Home. Don't duplicate them.

## Page: Membership
| Field | Type | Ref | Gate |
|---|---|---|---|
| eligibility | wysiwyg | 3.1 | |
| categories | repeater {name, summary} | 3.2 | |
| benefits | repeater {title, body} | 3.3 | **benefits_confirmed** (bool, default false) |
| fee_statement | textarea | 3.5 | |
| steps | repeater {title, body}, 3 rows | 3.6 | |
| member_id_turnaround | text ("48 hours") | 3.6 | |
| renewal | wysiwyg | 3.7 | **renewal_confirmed** |
| enquiries_email | email | 3.8 | |

## CPT `person`
| Field | Type | Ref |
|---|---|---|
| title (post title)* | name | 2.1 |
| board_role / management_role / regional_role | text | 2.1 | one per group the person sits in (Nana Yaw is Board member + President) |
| groups* | taxonomy `person_group` (multi): board, management, regional | 2.1, 2.4 |
| region | select: Eastern, Central, Ashanti, plus others added later | 2.5 |
| headshot | image | 2.2 |
| menu_order | number | ordering within a group (allow a different order per group if needed) |
**No bio field** (2.3 is blacked out).

## CPT `partner`
| Field | Type | Ref | Gate |
|---|---|---|---|
| title* | name | 6.1 | |
| short_name | text (OGA, MaGA) | | |
| partner_type* | taxonomy: sister-association, development, private | 6.2, 6.3 | |
| description* | textarea | App. A | |
| logo* | image (alt required) | 6.1 | |
| logo_is_greyscale | bool | 6.2 | flags GIZ until the colour file arrives |
| website | url | | |
| **consent_confirmed** | bool, default false | 6.3 | the front end shows only true |

## CPT `variety`
`title`* · `code` (SL, MD2, SC) · `summary`* (5.1 text) · `attributes` (repeater {label}, e.g. "White flesh") · `is_minor` (bool, true for Queen Victoria) · `image` (optional, 8.x) · `menu_order`.

## CPT `event`
`title`* · `month_label` · `start_date` (date, nullable) · **`date_tbc`** (bool) · `venue` (nullable) · `venue_tbc` (bool) · `summary` · `body`. The launch event is seeded with month = November 2026 and `date_tbc` set.

## Posts (news)
Native WordPress posts, with categories News and Announcements. None at launch (7.1). The UI shows an empty state.

## CPT `programme` (built, empty at launch)
`title` · `summary` · `body` · `status` (current or planned, 4.1/4.9) · `image`. Hidden from the nav until there's at least one published entry *and* the client decides on 4.x.

## CPT `resource` (Knowledge, later)
`title` · `topic` taxonomy: production, post-harvest, pests and disease, quality and certification, markets and export (5.3–5.7) · `body` · `file` (5.9) · `approved_by` (text). Topics with no entries render as empty states.

## Pages: Legal
Privacy, Cookies, Terms as standard pages with body in Gutenberg, adapted from OGA (10.1, 10.2). The front end renders sanitised HTML in a `prose` wrapper.

## Not modelled, on purpose
Bios (2.3), partnership offer, benefits, process and stories (6.4–6.7), past events gallery (7.3), office hours (9.6).

## GraphQL names
See `docs/wordpress/setup.md`. Queries live in `lib/wp/queries.ts`, mappers in `lib/wp/mappers.ts`.
