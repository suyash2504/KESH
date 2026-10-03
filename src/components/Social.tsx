// Lucide dropped brand icons, so the four we need are drawn here.
const icons = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4.5V11H7v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1Z" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20Z" />
    </svg>
  ),
}

export function Social({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-5 ${className}`}>
      {Object.entries(icons).map(([name, icon]) => (
        <a key={name} href="#" aria-label={name} className="size-[17px] opacity-60 transition hover:opacity-100">
          {icon}
        </a>
      ))}
    </div>
  )
}
