---
name: piga-content
description: Rules for what PiGA website copy may say and show, based on the client's content checklist v3.8. Use whenever writing or editing visitor-facing text, adding people, partners, varieties, events or CTAs, seeding content files or WordPress, or deciding whether a section should render at all.
---

# PiGA content rules

The client's checklist is the only source of organisational facts. The verbatim approved copy is in `references/approved-copy.md`. The gap list is in `docs/content-audit.md`.

## Publication gate by checklist status

| Status | On the site |
|---|---|
| **Held** | Publish. Use the approved wording. Light trimming for layout is fine; changing meaning is not. |
| **Partial** | Publish only the confirmed part (e.g. "Launch: November 2026", with date and venue to be announced). |
| **TBC** | **Don't publish** as fact. Build the UI behind a `confirmed: false` flag so it switches on later. (2.6 advisers, 3.3 benefits.) |
| **Outstanding** | Don't render the section. If the page must exist, use an honest `EmptyState`. Never write filler. |
| **Blacked out** | Never build it, not even as a hidden field. (2.3 bios, 6.4–6.7 partnership offer/process/stories, 7.3 past events.) |

When the client updates the checklist, update `references/approved-copy.md` first, then the seeds or WordPress.

## Hard rules
1. **Don't invent claims.** That covers member numbers, impact stats, dates, prices, testimonials, quotes, and "trusted by" lines. 5.8 (statistics) and 8.7 (testimonials) are outstanding.
2. **Don't soften commitments.** The objectives say "Make certain growers are paid on time", not "Advocate for timely payment". Keep the client's voice.
3. **CTAs (9.7)** are exactly **Join the Association**, **Become a Partner** and **Contact Us**. A short header button can say "Join PiGA". Form submit buttons may describe the action ("Send message", "Submit application").
4. **Membership is free (3.5).** Say it plainly wherever joining is mentioned. There are **three** steps (3.6).
5. **Partners (6.3).** `consentConfirmed` records consent per partner. On agency instruction (5 Oct 2026) all partners are listed via `listPartnersPendingConsent` in `content/partners.ts`. Keep `consentConfirmed` accurate anyway, and flip the flag off to list confirmed partners only.
6. **People.** Show name, role, group and region only. No bios. Nana Yaw Baffour Frimpong appears in both Board and Management. Show him in both groups.
7. **No working hours (9.6)** and no social icons until 1.7 is answered.
8. **Spelling:** British and Ghanaian English (organisation, programme, fertiliser). Write "Akyem Oda" for the office. Appendix A spells OGA's HQ "Akim Oda", so keep that inside OGA's own description only.
9. **Numbers:** write the phone as `059 159 8095` for display and `+233591598095` in `tel:` and `wa.me` links.
10. **Legal pages** adapt OGA's Privacy, Cookies and Terms pages (10.1, 10.2), replacing names, domain and email. Kobby approves before launch (10.5).

## Tone
Plain, warm and direct. The farmer is the subject ("You grow it. Together we get a fair price for it."). Short sentences, no NGO jargon ("leverage", "stakeholders", "empower"), and no exclamation marks. Headlines can be punchy, but the body copy stays factual.

Hero and section headlines are the one place for new marketing lines. They must restate an approved fact (the vision, an objective, free membership), never add one. The current hero line "Putting the farmer first." restates the vision and is fine.

## Page to checklist map
| Page | Draws on |
|---|---|
| Home | 1.5, 1.4, objectives, 5.1 (teaser), 3.5/3.6, 2.1 (teaser), 6.1, 9.7 |
| About | 1.3, 1.4, 1.8, 1.9, 2.4 |
| Leadership (`/leadership`) | 2.1, 2.2, 2.4, 2.5 |
| Membership | 3.1, 3.2, 3.3 (gated), 3.4 form, 3.5, 3.6, 3.8 |
| Knowledge | 5.1, 5.2, with topics 5.3–5.9 as empty states |
| Partners | 6.1–6.3, Appendix A |
| News and Events | 7.1 (empty), 7.2 launch event |
| Contact | 1.6, 9.1–9.4, form (9.5 pending) |
| Privacy, Cookies, Terms | 10.1, 10.2 |
| Programmes | 4.x, all outstanding. **Client decision pending** on whether to hide it at launch. |
