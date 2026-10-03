/**
 * The KESH wordmark: Playfair caps where the K is a pair of open shears
 * (stem + blades, pivot and finger rings). The K is drawn on a 100-unit cap
 * height to match Playfair's ~0.71em caps and sits on the text baseline.
 * The pivot is punched out with `--logo-bg`, so set it on dark surfaces.
 */
export function ScissorK({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="-26 0 108 100" className={className} fill="currentColor" aria-hidden="true">
      <rect x="0" y="0" width="17" height="100" />
      <path d="M17 51 L66 0 L76 0 L17 61 Z" />
      <path d="M23 44 L82 100 L62 100 L13 55 Z" />
      <path d="M8 50 L-6 39 M8 58 L-6 69" stroke="currentColor" strokeWidth="4" />
      <circle cx="-13" cy="32" r="9" fill="none" stroke="currentColor" strokeWidth="4.5" />
      <circle cx="-13" cy="76" r="9" fill="none" stroke="currentColor" strokeWidth="4.5" />
      <circle cx="18" cy="54" r="4.5" fill="var(--logo-bg, var(--color-sand))" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="KESH"
      className={`inline-flex items-baseline whitespace-nowrap font-serif font-medium leading-none tracking-[0.14em] ${className}`}
    >
      <ScissorK className="mr-[0.1em] ml-[-0.04em] h-[0.71em] w-auto" />
      <span aria-hidden="true">ESH</span>
    </span>
  )
}
