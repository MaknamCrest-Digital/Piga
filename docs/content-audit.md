# PiGA content audit: checklist v3.8 vs repo

Compared on 4 October 2026 against *PiGA Website Content Checklist v3.8* (agency numbering kept).
Repo state: Next 16.3.8, Tailwind 4.3.3, homepage built, seven inner pages are stubs.

Legend: ✅ matches · ⚠️ present but wrong or incomplete · ❌ missing · 🚫 must not appear · ⏸ blocked on the client

## Site-wide issues (fix before any page work)

| # | Issue | Where |
|---|---|---|
| S1 | No shared header and footer. The homepage has a full nav. Inner pages have a "← Home" bar with no nav. | `app/page.tsx`, every `app/*/page.tsx` |
| S2 | The mobile menu button does nothing. | `app/page.tsx` header |
| S3 | The footer links to `/leadership`, which doesn't exist (404). | `app/page.tsx` footer |
| S4 | A Lucide `Leaf` icon stands in for the logo. No logo files are in the repo (1.2 says they exist). | header, all pages |
| S5 | The font is Arial. There's no type scale and no `@theme` tokens, and colours are hard-coded as `[var(--x)]`. | `app/globals.css` |
| S6 | All imagery is hot-linked Unsplash stock. 8.9 says images are "owned or cleared", but stock isn't PiGA's, and some shots may not be pineapples. | `globals.css .hero`, homepage |
| S7 | All content is hard-coded in JSX. There's no content layer for WordPress to plug into. | everywhere |
| S8 | The contact form has no `action` or handler. 9.5 (form destination) is outstanding. | `app/contact/page.tsx` |
| S9 | No `next.config.ts` (needed for `images.remotePatterns` once WordPress media is used). `"lint": "next lint"` no longer exists in Next 16. | root |
| S10 | No privacy, cookies or terms pages (10.1, 10.2). | — |
| S11 | Stub pages show the visitor-facing text "Content is ready for the WordPress CMS". | 5 inner pages |

## Item by item

### 1. Organization profile
| Ref | Checklist | Repo | State |
|---|---|---|---|
| 1.1 | PiGA, Pineapple Growers Association | Used correctly | ✅ |
| 1.2 | Logo PNG, light and dark, mark and lockup | Leaf icon placeholder | ❌ get files into `public/brand/` |
| 1.3 | Est. 2026 plus history paragraph | About shows one paraphrased sentence | ⚠️ use the approved paragraph |
| 1.4 | Vision, mission, six objectives | The homepage paraphrases all three. Objectives are softened ("Work toward…", "Advocate for…") and the mission is rewritten. | ⚠️ use verbatim |
| 1.5 | Four-paragraph "Who we are" | One paraphrased paragraph. The sister associations and the board paragraph are missing. | ⚠️ |
| 1.6 | Address, phone, email | Footer and contact are correct | ✅ |
| 1.7 | Social accounts | Not shown | ⏸ keep hidden, render only when the field has a value |
| 1.8 | "PiGA is a non-governmental organisation." | Implied | ⚠️ add to the footer or About |
| 1.9 | National, office in Akyem Oda, Eastern Region | Strip says "NATIONAL" | ✅ |

### 2. Leadership and governance
| Ref | Checklist | Repo | State |
|---|---|---|---|
| 2.1 | 6 board, 5 management, 3 regional (14 people, Nana Yaw Baffour Frimpong in two groups) | Homepage shows 6 people. The board, the regional coordinators and the leadership page are all missing. | ⚠️ |
| 2.2 | Headshots exist on the OGA site. Artem Bezukh still needs one. | Icon placeholders | ⏸ need a fallback for any missing headshot |
| 2.3 | Biographies | — | 🚫 dropped. Don't build bio fields or bio UI. |
| 2.4 | Three tiers plus the "same board as OGA" paragraph | Missing | ❌ |
| 2.5 | Eastern, Central, Ashanti coordinators | Missing | ❌ |
| 2.6 | Advisers | — | ⏸ TBC, don't render |

### 3. Membership
| Ref | Checklist | Repo | State |
|---|---|---|---|
| 3.1 | Eligibility text, including aspiring farmers | Paraphrased | ⚠️ |
| 3.2 | Individual, Cooperative, Commercial, all free | Present. All three cards share one generic sentence. | ⚠️ |
| 3.3 | Six benefits, **TBC** | The cards hint at benefits | ⏸ show only behind a `confirmed` flag. "Same day payment" is not yet approved for publication. |
| 3.4 | Membership form fields, including the crop table | No form. "Start application" goes to /contact. | ❌ |
| 3.5 | Free, no joining fee, no dues | "Join for free" | ✅ |
| 3.6 | **Three** steps (contact, submit documents, approval), member ID within 48 h | The UI shows **four** steps on both pages and no 48 h promise | ⚠️ |
| 3.7 | Renewal | — | ⏸ |
| 3.8 | info@ email | Not on the membership page | ⚠️ |

### 4. Programmes (all outstanding)
The `/programmes` page has no approved content. Most of section 4 was cleared as internal.
**Decision needed:** drop Programmes from the nav at launch, or keep it with a "programme launches with PiGA in November 2026" empty state driven by the CMS.

### 5. Knowledge
| Ref | Checklist | Repo | State |
|---|---|---|---|
| 5.1 | SL, MD2, SC with full descriptions, plus Queen Victoria as a minor variety | Three cards with short descriptors. No Queen Victoria, no input-saving facts. | ⚠️ |
| 5.2 | Whole country, aim to be the largest association | Not stated | ⚠️ |
| 5.3–5.9 | Outstanding | Stub page | ⏸ the hub launches with varieties only |

### 6. Partners
| Ref | Checklist | Repo | State |
|---|---|---|---|
| 6.1 | **13** partners with logos and descriptions (Appendix A) | Homepage shows 8, text only. The partnerships page is a stub. | ⚠️ |
| 6.2 | GIZ. Logo is greyscale and the colour original must be requested. | — | ⏸ |
| 6.3 | 10 private partners, each must consent to being named for PiGA | All shown as if confirmed | ⚠️ gate each one on a `consent_confirmed` flag |
| 6.4–6.7 | Partnership types, benefits, process, stories | — | 🚫 dropped. Keep the "Become a Partner" CTA (9.7) pointing at the contact form. |

### 7. News and events
| Ref | Checklist | Repo | State |
|---|---|---|---|
| 7.1 | No news at launch | Stub | ✅ need an elegant empty state |
| 7.2 | Launch Nov 2026, details TBC | Stated | ✅ build as an event entry with `date_tbc` |
| 7.3 | Past events archive | — | 🚫 |
| 7.4–7.6 | Future | — | ⏸ |

### 8. Photos and brand
8.1–8.7 wait on a photoshoot. **The UI must look premium with no photography.** Use mint surfaces, the logo mark, pattern and type. See `piga-design-system`.
8.8: use the logo colours. Exact values come from the vector file (palette in the skill is sampled, verify it).
8.9: cleared. This applies to PiGA's own assets, not to Unsplash.

### 9. Enquiries and CTAs
9.1–9.4 ✅. 9.5 ⏸ (form destination). 9.6: do **not** show working hours ✅.
9.7: CTAs are exactly **Join the Association**, **Become a Partner** and **Contact Us**. The repo also uses "Join PiGA", "Apply for Membership", "Start application" and "Send enquiry". Pick from the approved three for primary CTAs.

### 10. Legal
10.1 and 10.2 ❌ Privacy, Cookies and Terms pages (adapt the OGA versions). 10.3 ✅. 10.4 ⏸. 10.5: Kobby approves before anything publishes. Mirror this in the WordPress roles.

## Open questions for the client
1. Logo source files (PNG and vector) and exact brand hex values (1.2, 8.8).
2. Programmes page at launch: hide, or keep an empty state? (4.x)
3. Where form submissions go (9.5): email inbox, WordPress, or CRM?
4. Confirmation of the membership benefits, especially "same day payment" (3.3).
5. Partner consent status per partner, and the GIZ colour logo (6.2, 6.3).
6. Social handles, if any (1.7).
7. WordPress host: WordPress.com (Business plan or above, for plugins) or self-hosted?

## Progress: phase 1 (seed mode), 5 Oct 2026
Done: S1–S5, S7, S9, S11 · 1.3, 1.4, 1.5, 1.8 verbatim · 2.1/2.4/2.5 on `/leadership` (initials avatars in place of missing headshots) · 3.1, 3.2, 3.5, 3.6 (three steps, 48 h) · 3.4 membership form · 5.1 incl. Queen Victoria · 6.1–6.3 with consent gate (only OGA, MaGA and GIZ show until consents are recorded) · 7.2 launch event · 9.7 CTAs · `/programmes` out of nav, `noindex`.
Still open: S6 (no stock remains; photography still pending) · S8 / 9.5 (forms validate, but delivery is unconfigured; production shows an email/WhatsApp fallback) · S10 (legal pages: the route exists and the footer links appear once content is added to `content/catalogue.ts`).

## PDF Asset & Content Extraction (5 Oct 2026)

**Source:** `PiGA Website Content Checklist.pdf` (v3.8, 4 Oct 2026). Images were taken from the matching `.docx` export, which holds the same 14 embedded images at their original resolution and has the same v3.8 text. Untouched originals are in `assets/source/` (not public).

### Assets extracted
| Asset | Source size | Output | Notes |
|---|---|---|---|
| PiGA full lockup | 1065×895 PNG, transparent | `public/brand/piga-logo.png` | Footer on light surfaces. Not vector. |
| PiGA light lockup | derived | `public/brand/piga-logo-light.png` | Black strapline recoloured to mint-50 for dark surfaces. Brand colours untouched. |
| PiGA compact (mark + wordmark) | derived crop | `public/brand/piga-logo-compact.png` | Strapline cropped off. Header, mobile menu, hero card. |
| PiGA mark (pineapple only) | derived cut | `public/brand/piga-mark.png` | Cut along the edge of the "P", pixel for pixel. Faint watermarks and favicon only. |
| Favicon / Apple icon | from mark | `app/icon.png`, `app/apple-icon.png` | |
| 13 partner logos | Appendix A | `public/partners/<id>.png` | Trimmed, 4% padding, proportions kept |

**Brand colours (8.8)** were sampled from the logo and are now the site tokens: wordmark green `#68A030` (`leaf`), fruit orange `#FF9018` (`gold`, the accent), crown lime `#A8E028` (`crown`). Mint and forest stay as the surface and text system.

### Assets not available in the PDF
- **Vector/SVG logo, and the separate mark-only, strapline-only and dark/light files.** 1.2 says these exist, but the document embeds only the full PNG lockup. The variants above are derived from it. **Ask the client for the originals.**
- **Headshots: none in the PDF.** 2.2 says they are published on the OGA membership page.
- **Photography, video, testimonials:** none (8.1–8.7 wait on a photoshoot).
- **Typography:** no brand font specified (8.8 refers only to logo colours). The site keeps Bricolage Grotesque + Inter.

### Team (14 roles, 13 people)
- **With bios:** none. 2.3 is blacked out and the PDF contains no biographies. None were written.
- **Without bios:** all 13.
- **With headshots:** none. All use the initials fallback.
- Nana Yaw Baffour Frimpong appears in both Board and Management, which the PDF confirms.

### Partners
- **With logos (13/13):** OGA, MaGA, Sono Ghana, Cofrutos, Compass of the World, Frutina, OJ Global, Kobb and Cobb, Mr Pig, Ankaa Tropical Oranges, Eastfield Farms, EastField Foundation, GIZ.
- **Without logos:** none.
- **Low-quality sources, so request better files:** Mr Pig (356×289, visibly soft), Frutina (241×136, small). GIZ is greyscale (6.2: request the colour original).
- **Published in production:** all 13 (agency instruction, 5 Oct 2026, via `listPartnersPendingConsent` in `content/partners.ts`). Consent (6.3) is still outstanding for the 10 private partners and is tracked per partner in `consentConfirmed`. `CONTENT_PREVIEW=1` still shows "consent pending" badges for internal review.

### New approved information discovered
None beyond what was already transcribed in `approved-copy.md`. The PDF and DOCX text match v3.8. The new material is the logo files and the logo colours.

### Conflicts and inconsistencies (need client confirmation)
1. **2.2 headshots:** says headshots exist for "all fourteen", but there are 13 unique people, and the same item says Artem Bezukh still needs one.
2. **1.2 logo variants:** described as available, but not included in the document.
3. **3.3 vs 1.4:** the benefit "same day payment" is stronger than the objective "paid on time, on every delivery". Benefits stay hidden (TBC).
4. **Office spelling:** "Akyem Oda" (1.6) vs "Akim Oda" (OGA description, Appendix A). Each is kept where the client wrote it.
5. **Board roles:** only the Chairman has a title. Other board members show as "Board member". Confirm whether any hold named offices.

### Still requiring client confirmation
The logo source files and vector · headshots (permission to reuse the OGA set, plus a photo of Artem Bezukh) · consent from the 10 private partners · the GIZ colour logo · better Mr Pig and Frutina logos · benefits (3.3) · social accounts (1.7) · form destination (9.5) · legal pages (10.1, 10.2) · the Programmes decision (4.x).
