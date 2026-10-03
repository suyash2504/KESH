import { useRef } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { Clock, Droplet, Scissors } from 'lucide-react'
import { LinkButton } from '../components/Button'
import { Social } from '../components/Social'
import { TornImage, type TornParts } from '../components/TornImage'
import { WordCycle } from '../components/WordCycle'
import { photos, unsplash } from '../data/photos'
import { SWIPE_FROM, useHeroMotion } from './useHeroMotion'

const perks = [
  { icon: Scissors, text: 'Senior stylists with 8+ years on the chair' },
  { icon: Clock, text: 'Book in 30 seconds, confirmed on WhatsApp' },
  { icon: Droplet, text: 'Sulphate-free, salon-grade products only' },
]

const words = ['you.', 'bold.', 'fresh.', 'yours.']
const heroSrc = unsplash(photos.hero, 1600, 82)
const ease = [0.2, 0.7, 0.2, 1] as const

export function Hero() {
  const reduced = !!useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const parts = useRef<TornParts | null>(null)
  const ready = useHeroMotion({ section, copy, parts, src: heroSrc }, reduced)

  const show = ready ? 'show' : 'hide'
  // Headline lines rise out of a clipped row while the photo is still swiping in;
  // the rest of the copy follows once the swipe has mostly landed.
  const line = (i: number) => ({
    variants: { hide: { y: '110%' }, show: { y: 0 } },
    initial: 'hide',
    animate: show,
    transition: { duration: 1, delay: 0.15 + i * 0.14, ease },
  })
  const rise = (i: number) => ({
    variants: { hide: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } },
    initial: 'hide',
    animate: show,
    transition: { duration: 0.9, delay: 0.9 + i * 0.11, ease },
  })

  return (
    <section ref={section} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[76px] md:block">
      {/* Photo: bleeds off the right edge on desktop, sits on top on phones. */}
      <div className="relative h-[60svh] md:absolute md:inset-y-0 md:right-0 md:top-[76px] md:h-auto md:w-[58%]">
        <TornImage
          src={heroSrc}
          className="size-full"
          partsRef={parts}
          initialShift={reduced ? 0 : SWIPE_FROM}
        />
      </div>

      <div className="wrap relative z-10 flex md:min-h-[calc(100svh-76px)] md:items-center">
        <div ref={copy} className="max-w-[560px] pb-12 pt-6 will-change-transform md:py-16">
          <h1 className="font-serif text-[clamp(46px,5.6vw,86px)] leading-[1.06] tracking-[-0.01em]">
            <span className="block overflow-hidden pb-[0.06em]">
              <m.span {...line(0)} className="inline-block">
                Hair that feels
              </m.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <m.span {...line(1)} className="inline-block">
                like <WordCycle words={words} run={ready && !reduced} delay={3200} />
              </m.span>
            </span>
          </h1>
          <m.p {...rise(0)} className="mt-6 max-w-[470px] text-[clamp(16px,1.4vw,20px)] leading-normal text-ink-soft">
            Cuts, colour, skin and grooming for everyone. Expert stylists, honest pricing, and a chair that is ready when
            you are.
          </m.p>
          <m.div {...rise(1)} className="mt-10 flex flex-wrap gap-4">
            <LinkButton href="#book">Book an Appointment</LinkButton>
            <LinkButton href="#services" variant="line">
              View Price List
            </LinkButton>
          </m.div>

          <m.ul {...rise(2)} className="mt-16 grid max-w-[520px] grid-cols-3 gap-4 md:mt-20 md:gap-7">
            {perks.map(({ icon: Icon, text }) => (
              <li key={text} className="text-center text-[13px] leading-snug text-mute">
                <Icon className="mx-auto mb-3 text-ink" size={24} strokeWidth={1.5} />
                {text}
              </li>
            ))}
          </m.ul>

          <m.div {...rise(3)}>
            <Social className="mt-12 md:mt-14" />
          </m.div>
        </div>
      </div>

      <m.a
        href="#services"
        {...rise(4)}
        className="absolute right-4 top-[calc(60svh+76px-36px)] z-20 flex items-center gap-3.5 rounded-full bg-shell/90 py-2.5 pl-2.5 pr-5 shadow-[0_18px_40px_-20px_rgb(0_0_0/0.4)] backdrop-blur-md transition-shadow hover:shadow-[0_22px_44px_-18px_rgb(0_0_0/0.45)] md:bottom-10 md:right-[clamp(16px,3vw,40px)] md:top-auto"
      >
        <img
          src={unsplash(photos.heroInset, 160)}
          alt=""
          className="size-12 rounded-full object-cover object-[50%_20%] md:size-14"
        />
        <span>
          <b className="block font-serif text-base font-medium">For him, too</b>
          <span className="text-xs text-mute">Fades, beard sculpts &amp; hot-towel shaves</span>
        </span>
      </m.a>
    </section>
  )
}
