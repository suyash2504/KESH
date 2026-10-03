import { Reveal } from '../components/Reveal'
import { TornImage } from '../components/TornImage'
import { photos, unsplash } from '../data/photos'

const words = ['Precision cuts', 'Balayage', 'Skin fades', 'Keratin', 'Beard sculpts', 'Hydra facials', 'Bridal', 'Curly cuts']

const stats = [
  ['12', 'stylists & barbers'],
  ['4.9', 'average on Google'],
  ['18k', 'chairs filled since 2019'],
]

export function Studio() {
  return (
    <>
      <div className="overflow-hidden border-y border-line bg-cream py-5" aria-hidden="true">
        <div className="flex w-max animate-marquee">
          {[0, 1].map(k => (
            <div key={k} className="flex shrink-0 items-center">
              {words.map(w => (
                <span key={w} className="flex items-center font-serif text-[26px] italic md:text-[32px]">
                  <span className="px-8">{w}</span>
                  <span className="text-clay">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="relative overflow-hidden bg-cream py-24 md:py-36">
        <div className="wrap grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <Reveal className="relative order-2 aspect-[4/5] md:order-1 md:-ml-[clamp(16px,4vw,56px)]">
            <TornImage
              src={unsplash(photos.studio, 1400)}
              edge="right"
              wash="#e8d2bd"
              streak="#d8b99d"
              offsetX={60}
              className="size-full"
            />
          </Reveal>

          <div className="order-1 md:order-2">
            <Reveal>
              <p className="eyebrow mb-5">The studio</p>
              <h2 className="font-serif text-[clamp(38px,4.6vw,68px)] leading-[1.05]">
                One chair.
                <br />
                <em>Every</em> kind of head.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-mute">
                KESH means hair, and that is what we obsess over. Skin fades and soft balayage, beard work and bridal
                buns, all under one roof, priced the same no matter who is sitting in the chair.
              </p>
              <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-mute">
                Every visit starts with a real consultation, not a menu. We tell you what will work, what will not, and
                how to look after it at home.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {stats.map(([n, label]) => (
                <div key={label}>
                  <div className="font-serif text-[clamp(34px,3.6vw,52px)] leading-none">{n}</div>
                  <div className="mt-2 text-[13px] text-mute">{label}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
