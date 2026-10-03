import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'
import { useBooking } from '../booking'
import { stylists } from '../data/content'
import { unsplash } from '../data/photos'

export function Stylists() {
  const { bookWith } = useBooking()

  return (
    <section id="stylists" className="bg-cream py-24 md:py-36">
      <div className="wrap">
        <SectionHead
          eyebrow="The team"
          title={
            <>
              Hands you can <em>trust.</em>
            </>
          }
          intro="Twelve stylists, barbers and artists. Here are the leads. Book one by name, or let us match you."
        />

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {stylists.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-clay/30">
                <img
                  src={unsplash(p.photo, 700)}
                  alt={`${p.name}, ${p.role}`}
                  loading="lazy"
                  style={{ objectPosition: p.focus ?? '50% 30%' }}
                  className="size-full object-cover saturate-[.85] sepia-[.12] transition duration-700 group-hover:scale-[1.04] group-hover:saturate-100 group-hover:sepia-0"
                />
                <button
                  onClick={() => bookWith({ stylistId: p.id })}
                  className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-[4px] bg-shell/95 px-4 py-3 text-[13px] font-semibold backdrop-blur transition duration-300 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus:translate-y-0 md:focus:opacity-100"
                >
                  Book with {p.name.split(' ')[0]}
                  <ArrowUpRight size={16} />
                </button>
              </div>
              <h3 className="mt-5 font-serif text-[22px] md:text-[26px]">{p.name}</h3>
              <p className="mt-1 text-sm text-mute">
                {p.role} · {p.years} yrs
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {p.specialties.map(s => (
                  <li key={s} className="rounded-full border border-line px-3 py-1 text-xs text-mute">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
