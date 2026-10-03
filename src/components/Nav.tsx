import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { LinkButton } from './Button'
import { Logo } from './Logo'

export const navLinks = [
  ['Services', '#services'],
  ['Stylists', '#stylists'],
  ['Gallery', '#gallery'],
  ['Offers', '#offers'],
  ['Reviews', '#reviews'],
  ['Visit', '#visit'],
] as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${
          scrolled ? 'bg-sand/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md' : ''
        }`}
      >
        <nav className="wrap flex h-[76px] items-center justify-between gap-6">
          <a href="#top" aria-label="KESH, back to top">
            <Logo className="text-[28px]" />
          </a>

          <ul className="hidden items-center gap-8 text-[13.5px] lg:flex">
            {navLinks.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="border-b-[1.5px] border-transparent pb-1 transition hover:border-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href="tel:+910000000000" aria-label="Call the salon" className="hidden rounded-full p-2 transition hover:bg-ink/5 sm:block">
              <Phone size={18} strokeWidth={1.8} />
            </a>
            <LinkButton href="#book" size="sm">
              Book now
            </LinkButton>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="-mr-2 rounded-full p-2 lg:hidden"
            >
              <Menu size={22} strokeWidth={1.8} />
            </button>
          </div>
        </nav>
      </header>

      {/* Outside the header: its backdrop-filter would trap a fixed overlay inside it. */}
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink text-sand [--logo-bg:var(--color-ink)]"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="wrap flex h-[76px] items-center justify-between">
              <Logo className="text-[28px]" />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="-mr-2 rounded-full p-2">
                <X size={24} strokeWidth={1.6} />
              </button>
            </div>
            <ul className="wrap mt-8 flex flex-col gap-2">
              {navLinks.map(([label, href], i) => (
                <m.li
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <a href={href} onClick={() => setOpen(false)} className="block py-2 font-serif text-[42px] leading-tight">
                    {label}
                  </a>
                </m.li>
              ))}
            </ul>
            <div className="wrap mt-auto pb-10">
              <LinkButton href="#book" variant="light" className="w-full" onClick={() => setOpen(false)}>
                Book an appointment
              </LinkButton>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
