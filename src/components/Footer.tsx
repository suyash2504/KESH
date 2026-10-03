import { LinkButton } from './Button'
import { Logo } from './Logo'
import { navLinks } from './Nav'
import { Social } from './Social'

export function Footer() {
  return (
    <footer className="bg-ink pt-20 text-sand [--logo-bg:var(--color-ink)] md:pt-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-10 border-b border-sand/15 pb-16">
          <h2 className="max-w-3xl font-serif text-[clamp(40px,6vw,92px)] leading-[1.02]">
            Ready for a <em>good hair day?</em>
          </h2>
          <LinkButton href="#book" variant="light">
            Book an appointment
          </LinkButton>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="text-[32px]" />
            <p className="mt-3 max-w-xs text-sm text-sand/60">A unisex studio for hair, skin and grooming. Every head welcome.</p>
          </div>
          <div>
            <p className="eyebrow mb-4 !text-sand/50">Explore</p>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="text-sand/80 transition hover:text-sand">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4 !text-sand/50">Policies</p>
            <ul className="space-y-2.5 text-sm text-sand/80">
              <li>Free cancellation up to 2 hours before</li>
              <li>Patch tests for all colour services</li>
              <li>Gift cards available at the desk</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4 !text-sand/50">Follow</p>
            <Social />
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-sand/15 py-7 text-xs text-sand/50">
          <span>© {new Date().getFullYear()} KESH Studio. A concept project, not a real business.</span>
          <span>
            Designed &amp; built by{' '}
            <a href="https://s7-labs.netlify.app" className="underline-offset-4 hover:text-sand hover:underline">
              S7 Labs
            </a>{' '}
            · Photos via Unsplash
          </span>
        </div>
      </div>
    </footer>
  )
}
