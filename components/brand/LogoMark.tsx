// Interim pineapple mark in the logo's colours. Replaced by the real logo once
// siteSettings.logo is set (checklist 1.2). Decorative unless a title is given.
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 48 64" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <path d="M24 22 C20 14 14 10 8 9 C14 13 17 17 19 23 Z" fill="var(--color-leaf)" />
      <path d="M24 22 C28 14 34 10 40 9 C34 13 31 17 29 23 Z" fill="var(--color-leaf)" />
      <path d="M24 23 C22 14 23 6 24 1 C25 6 26 14 24 23 Z" fill="var(--color-mint-500)" />
      <ellipse cx="24" cy="43" rx="15" ry="19" fill="var(--color-gold)" />
      <clipPath id="piga-fruit"><ellipse cx="24" cy="43" rx="15" ry="19" /></clipPath>
      <g clipPath="url(#piga-fruit)" stroke="var(--color-forest-900)" strokeOpacity=".22" strokeWidth="1.4" fill="none">
        {[-24, -14, -4, 6, 16, 26].map((o) => (
          <g key={o}>
            <line x1={o} y1="24" x2={o + 40} y2="64" />
            <line x1={o + 24} y1="24" x2={o - 16} y2="64" />
          </g>
        ))}
      </g>
    </svg>
  );
}
