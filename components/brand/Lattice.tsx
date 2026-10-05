import { useId } from "react";

// Signature texture: the diamond scale of a pineapple's skin.
export function Lattice({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const id = useId();
  const stroke = tone === "dark" ? "var(--color-forest-600)" : "var(--color-mint-100)";
  return (
    <svg className={className} aria-hidden="true" width="100%" height="100%">
      <defs>
        <pattern id={id} width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="36" height="36" fill="none" stroke={stroke} strokeOpacity={tone === "dark" ? 0.09 : 0.07} strokeWidth="1.2" />
          <circle cx="18" cy="18" r="1.4" fill={stroke} fillOpacity={tone === "dark" ? 0.12 : 0.1} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
