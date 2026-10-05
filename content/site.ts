import type { SiteSettings } from "@/lib/content/types";

// Checklist 1.1, 1.6, 1.7, 1.8, 9.1–9.4, 9.7
export const siteSettings: SiteSettings = {
  orgName: "Pineapple Growers Association",
  acronym: "PiGA",
  statusLine: "PiGA is a non-governmental organisation.",
  address: ["No 7, Concord Link", "Akyem Oda, Eastern Region", "Ghana"],
  phoneDisplay: "059 159 8095",
  phoneE164: "+233591598095",
  whatsappE164: "233591598095",
  email: "info@pineapplegrowersgh.org",
  socials: [], // 1.7 outstanding
  // 1.2: extracted from the client checklist (v3.8). Only the full lockup is in the
  // document; light, compact and mark are cut from it pixel for pixel. Originals: assets/source/brand/.
  logos: {
    full: { src: "/brand/piga-logo.png", alt: "PiGA, Pineapple Growers Association", width: 1047, height: 878 },
    fullLight: { src: "/brand/piga-logo-light.png", alt: "PiGA, Pineapple Growers Association", width: 1047, height: 878 },
    compact: { src: "/brand/piga-logo-compact.png", alt: "PiGA, Pineapple Growers Association", width: 1012, height: 630 },
    mark: { src: "/brand/piga-mark.png", alt: "", width: 387, height: 629 },
  },
  ctas: {
    join: { label: "Join the Association", href: "/membership#apply" },
    partner: { label: "Become a Partner", href: "/contact?topic=partnership" },
    contact: { label: "Contact Us", href: "/contact" },
  },
  launchBanner: { enabled: true, text: "PiGA launches in November 2026", href: "/news" }, // 7.2
};
