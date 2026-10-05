---
name: piga-design-system
description: PiGA's visual system, a premium, modern, mint-fresh look for the Pineapple Growers Association site. Use whenever building or restyling any page, section, or component in this repo, choosing colours, type, spacing, imagery, or motion, or when a section has no photography yet.
---

# PiGA design system: "mint premium"

**Feel:** cool mint air, deep forest ink, one warm hit of pineapple gold. Calm, generous and confident. Agricultural without being rustic, institutional without being corporate. Use Stripe or Linear-level polish, applied to a farmers' association.

**Three rules that decide most calls:**
1. **Mint is the canvas, forest is the voice, gold is the spark.** Gold appears at most once or twice per viewport: a CTA, a number, a highlight word.
2. **Whitespace over decoration.** If a section feels empty, enlarge the type before adding ornament.
3. **Premium without photos.** Photography doesn't exist yet (checklist 8.1–8.7). Every component must look finished with none.

## 1. Tokens: paste into `app/globals.css`

The brand colours are sampled from the official PiGA logo in checklist v3.8 (8.8). `app/globals.css` is the live source, so if a vector file with different values arrives, change it there.

```css
@import "tailwindcss";

@theme {
  /* Mint: canvas and surfaces */
  --color-mint-25:  #F7FCF9;
  --color-mint-50:  #EFFAF4;
  --color-mint-100: #DDF4E7;
  --color-mint-200: #BDE9D2;
  --color-mint-300: #8FD9B4;
  --color-mint-400: #5CC493;
  --color-mint-500: #34A874;

  /* Forest: text, dark sections */
  --color-forest-600: #1F6B47;
  --color-forest-700: #155438;
  --color-forest-800: #0F3F2B;
  --color-forest-900: #0A2E1F;
  --color-forest-950: #061D13;

  /* Brand: from the logo */
  --color-leaf: #68A030;       /* logo wordmark green */
  --color-crown: #A8E028;      /* logo crown highlight */
  --color-gold: #FF9018;       /* logo fruit orange, the spark */
  --color-gold-soft: #FFE6C7;

  /* Neutrals with a green undertone */
  --color-ink: #0E1F17;
  --color-muted: #5B6F64;
  --color-line: #DCEBE2;
  --color-paper: #FFFFFF;

  --font-display: var(--font-bricolage), ui-sans-serif, system-ui;
  --font-sans: var(--font-inter), ui-sans-serif, system-ui;

  --radius-card: 1.75rem;
  --radius-pill: 999px;

  --shadow-soft: 0 1px 2px rgb(10 46 31 / .04), 0 8px 24px -8px rgb(10 46 31 / .08);
  --shadow-lift: 0 2px 4px rgb(10 46 31 / .05), 0 24px 48px -16px rgb(10 46 31 / .18);

  --ease-out-soft: cubic-bezier(.22, 1, .36, 1);
}

@layer base {
  html { scroll-behavior: smooth; }
  body { @apply bg-mint-25 text-ink font-sans antialiased; }
  h1, h2, h3 { @apply font-display text-forest-900; letter-spacing: -0.035em; text-wrap: balance; }
  p { text-wrap: pretty; }
  ::selection { @apply bg-mint-200 text-forest-900; }
}

@utility container-site { width: min(1200px, calc(100% - 2.5rem)); margin-inline: auto; }
```

Use the generated utilities (`bg-mint-50`, `text-forest-800`, `rounded-card`, `shadow-soft`) and **never** arbitrary `[var(--x)]` or raw hex in JSX.

**Fonts.** Load them in `app/layout.tsx` with `next/font/google`, both free:
```ts
import { Bricolage_Grotesque, Inter } from "next/font/google";
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", weight: ["500","600","700","800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// <html className={`${bricolage.variable} ${inter.variable}`}>
```

## 2. Type scale

| Role | Classes |
|---|---|
| Display (hero) | `font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-bold leading-[.95]` |
| H2 section | `text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.02]` |
| H3 card | `text-xl sm:text-2xl font-semibold leading-tight` |
| Eyebrow | `text-xs font-semibold uppercase tracking-[.18em] text-forest-600`, preceded by a 6px `bg-gold` dot |
| Lead | `text-lg sm:text-xl leading-8 text-muted max-w-2xl` |
| Body | `text-base leading-7 text-muted` |

Weights: the display font goes to 800 at most. Avoid `font-black`, which reads as shouting rather than premium. Highlight one phrase per headline with `text-forest-600` or a gold underline (`decoration-gold decoration-4 underline-offset-8`), never both.

## 3. Surfaces and rhythm

Alternate section backgrounds in this order and don't put two identical ones next to each other:
`mint-25` (default) → `paper` (white) → `mint-50` → `forest-900` (one per page, maximum two) → `mint-25`.

- Section padding is `py-24 sm:py-32`. The hero gets `pt-36 pb-24`.
- Grid gaps are `gap-4` for card grids and `gap-12 lg:gap-20` for two-column splits.
- Cards: `rounded-card bg-paper border border-line shadow-soft`. On hover use `shadow-lift -translate-y-0.5`, with transitions at 300 ms and `ease-out-soft`.
- Glass (only on mint or forest backgrounds): `bg-white/60 backdrop-blur-xl border border-white/70`.
- On forest sections, text is `text-mint-50`, secondary text is `text-mint-100/60` and borders are `border-white/10`.

## 4. Premium with no photography (the default until the photoshoot)

Pick one of these per image slot. Never use stock.
1. **Mint field.** The `bg-mint-field` utility, with `<BrandMark>` (the pineapple cut from the real logo) at 8–25% opacity, oversized, rotated about 12° and cropped off one edge. Never show the cut mark large and at full opacity, because the fruit's hidden edge reads as sliced. For a large, fully opaque brand moment, use the compact lockup.
2. **Pineapple lattice.** An inline SVG pattern of the fruit's diamond scale (rotated squares at 45°, `stroke-forest-600/10`). This is the signature texture. Use it on the hero and on dark CTA bands. Put it in `components/brand/Lattice.tsx`.
3. **Big number or word.** A huge display numeral or word (`text-[12rem] text-mint-200 font-bold`) as the visual, e.g. "3" for three membership categories.
4. **Initials avatar** for people without headshots (2.2): `rounded-2xl bg-mint-100 text-forest-700 font-display` showing the initials, never a generic user icon.

Every image component takes `src?: string` and renders the fallback when it's missing. When the photos arrive, WordPress fills `src` and nothing else changes.

## 5. Logo usage (`components/brand/`)
Files come from `siteSettings.logos` and are never hard-coded:
- `compact` (mark + wordmark): header (`h-12 sm:h-14`), mobile menu, hero card. Works on light and dark.
- `full` / `fullLight` (with strapline): footer. Use `fullLight` on dark, where the black strapline would fail.
- `mark`: decorative only, through `<BrandMark>`, which renders with `alt=""`.
- Duplicate logo instances get `decorative` (empty alt). Only the header logo is announced.

## 6. Core components (`components/ui/` and `components/site/`)

- **Button.** Variants are `primary` (`bg-forest-800 text-mint-50 hover:bg-forest-700`), `accent` (`bg-gold text-forest-950`, **only for "Join the Association"**), `secondary` (`bg-white border-line text-forest-800`) and `ghost-on-dark`. All are `rounded-pill h-12 px-6 font-semibold`, with an arrow icon that nudges `translate-x-0.5` on hover.
- **Eyebrow, SectionHeading** (eyebrow, title, optional lead, optional right-aligned link).
- **Header.** Sticky. It's transparent over the hero, then switches to `bg-mint-25/80 backdrop-blur-xl border-b border-line` after 24 px of scroll. It holds the logo lockup, the nav and the "Join the Association" accent button. The mobile drawer is a full-height `bg-forest-950` panel with large display links, and it locks scroll.
- **Footer.** `bg-forest-950` with four columns: brand (with "PiGA is a non-governmental organisation."), Explore, Get involved, Contact (address, phone, WhatsApp, email). Below sits a legal row: Privacy · Cookies · Terms · © year. **No working hours** (9.6). Social links appear only when the CMS has them (1.7).
- **StatStrip.** Four cells with `divide-x divide-line`. The value goes in display type, coloured `text-forest-800`.
- **ObjectiveCard.** A gold numeral, a title, and body text. Six of them sit on forest in a 3-column grid.
- **PersonCard.** Headshot or initials avatar, then the name, then the role, then a region chip for coordinators. **No bio** (2.3 is blacked out).
- **PartnerLogoWall.** Real logos (`public/partners/`) at full colour on a white `h-32 sm:h-36` tile (fixed height, not aspect-ratio, so tall logos can't stretch it), `object-contain`, `max-h-full max-w-[85%]`. Use a text wordmark if no logo. Clicking opens a dialog with the logo and the Appendix A description.
- **VarietyCard.** Code chip (SL, MD2, SC), name, three attribute pills, description.
- **Steps.** A numbered vertical rail with a mint line and gold active dot. **Three steps for membership** (3.6).
- **EmptyState.** Mint surface with a lattice, one honest sentence and a CTA. Use it for News, Programmes and the Knowledge topics.
- **Form fields.** `h-12 rounded-xl bg-white border-line focus:border-mint-500 focus:ring-4 focus:ring-mint-200/60`, with labels above the field (never placeholder-only).

## 7. Motion

Subtle and purposeful. Fade and rise 12 px on scroll into view, staggered 60 ms, run once. Use CSS `@starting-style` or a tiny `IntersectionObserver` hook, not an animation library. Respect `prefers-reduced-motion: reduce` and disable it all. No parallax, no autoplay carousels.

## 8. Accessibility floor

- Body text on mint-25 must hit AA. `text-muted` (#5B6F64) passes, but anything lighter doesn't.
- Gold is never text on white. Use it as a fill only, with forest-950 text on top.
- Focus is visible everywhere: `focus-visible:outline-2 outline-offset-2 outline-forest-600`.
- Touch targets are at least 44 px. The nav and drawer work by keyboard. `lang="en-GH"`.

## 9. Anti-patterns (reject these in review)

- Unsplash or any stock imagery, or generic user icons standing in for people.
- `font-black` headlines, more than two gold elements in a viewport, or a lime-on-white low-contrast pairing.
- Per-page headers, hard-coded content in JSX, or arbitrary `[var(--…)]` classes.
- Lorem ipsum, "coming soon" filler, or any visitor-facing mention of the CMS.
- Sections that fall apart when a list from the CMS is empty or has one item.

## Done checklist for any UI change
- [ ] Uses tokens only, no hex or arbitrary vars
- [ ] Looks finished with no images and with missing optional fields
- [ ] Works at 360 px, with no horizontal scroll
- [ ] Shows focus states, and reduced motion is respected
- [ ] Copy comes from `lib/content`, checked against the `piga-content` rules
