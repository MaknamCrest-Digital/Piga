import { Facebook, Instagram, Linkedin, type LucideIcon } from "lucide-react";
import type { SocialLink, SocialNetwork } from "@/lib/content/types";

// Each network in its own brand colour (tokens in globals.css). Icons are white on
// the brand fill, which is how Meta and LinkedIn ask for their marks on dark grounds.
const networks: Record<SocialNetwork, { label: string; Icon: LucideIcon; fill: string }> = {
  facebook: { label: "Facebook", Icon: Facebook, fill: "bg-facebook" },
  instagram: {
    label: "Instagram",
    Icon: Instagram,
    fill: "bg-linear-to-tr from-instagram-yellow via-instagram-pink to-instagram-blue",
  },
  linkedin: { label: "LinkedIn", Icon: Linkedin, fill: "bg-linkedin" },
};

const tile = "flex h-11 w-11 items-center justify-center rounded-full text-white";

export function SocialLinks({ socials }: { socials: SocialLink[] }) {
  if (!socials.length) return null;
  return (
    <ul className="mt-7 flex gap-3" aria-label="PiGA on social media">
      {socials.map(({ network, url, pending }) => {
        const { label, Icon, fill } = networks[network];
        return (
          <li key={network}>
            {pending ? (
              // Placeholder: only rendered in dev/preview (the getter drops it in production).
              <span title={`${label}: profile URL not set yet`} className={`${tile} ${fill} opacity-50 outline-2 outline-offset-2 outline-dashed outline-white/40`}>
                <Icon aria-hidden size={19} strokeWidth={2} />
                <span className="sr-only">{label} (link pending)</span>
              </span>
            ) : (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`PiGA on ${label}`}
                className={`${tile} ${fill} shadow-soft transition duration-300 ease-out-soft hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-200`}
              >
                <Icon aria-hidden size={19} strokeWidth={2} />
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
