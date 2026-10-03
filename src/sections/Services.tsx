import { useMemo, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Check, Plus } from 'lucide-react'
import { SectionHead } from '../components/SectionHead'
import { useBooking } from '../booking'
import { categories, duration, inr, services, type Audience, type Category } from '../data/services'

const audiences: [Audience, string][] = [
  ['all', 'Everyone'],
  ['her', 'Her'],
  ['him', 'Him'],
]

export function Services() {
  const [cat, setCat] = useState<Category>('Hair')
  const [who, setWho] = useState<Audience>('all')
  const { serviceIds, toggleService } = useBooking()

  const list = useMemo(
    () => services.filter(s => s.category === cat && (who === 'all' || s.audience === 'all' || s.audience === who)),
    [cat, who],
  )

  return (
    <section id="services" className="py-24 md:py-36">
      <div className="wrap">
        <SectionHead
          eyebrow="Services & prices"
          title={
            <>
              The menu, <em>no surprises.</em>
            </>
          }
          intro="Prices include wash and finish. Anything marked “from” depends on length and density; your stylist confirms before starting."
          aside={
            <div className="flex rounded-full border border-line p-1" role="radiogroup" aria-label="Show services for">
              {audiences.map(([key, label]) => (
                <button
                  key={key}
                  role="radio"
                  aria-checked={who === key}
                  onClick={() => setWho(key)}
                  className={`rounded-full px-5 py-2 text-[13px] font-medium transition ${
                    who === key ? 'bg-ink text-white' : 'text-mute hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          }
        />

        <div className="grid gap-10 md:grid-cols-[220px_1fr] md:gap-16">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-col md:gap-0 md:overflow-visible md:px-0" role="tablist">
            {categories.map(c => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm transition md:rounded-none md:border-0 md:border-b md:border-line md:px-0 md:py-4 md:text-left md:font-serif md:text-[26px] ${
                  cat === c
                    ? 'border-ink bg-ink text-white md:bg-transparent md:text-ink md:italic'
                    : 'border-line text-mute hover:text-ink'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div role="tabpanel" aria-label={cat}>
            <AnimatePresence mode="wait">
              <m.ul
                key={cat + who}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {list.map(s => {
                  const picked = serviceIds.includes(s.id)
                  return (
                    <li key={s.id} className="group flex items-center gap-5 border-b border-line py-6 first:pt-2 md:gap-8">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          <h3 className="font-serif text-[22px] md:text-[26px]">{s.name}</h3>
                          {s.audience !== 'all' && (
                            <span className="rounded-full border border-ink/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-mute">
                              {s.audience === 'her' ? 'Her' : 'Him'}
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-[15px] text-mute">
                          {s.blurb} <span className="whitespace-nowrap">· {duration(s.minutes)}</span>
                        </p>
                      </div>
                      <div className="text-right font-serif text-[20px] md:text-[24px]">
                        {s.from && <span className="mr-1 font-sans text-xs text-mute">from</span>}
                        {inr(s.price)}
                      </div>
                      <button
                        onClick={() => toggleService(s.id)}
                        aria-pressed={picked}
                        aria-label={picked ? `Remove ${s.name} from booking` : `Add ${s.name} to booking`}
                        className={`grid size-10 shrink-0 place-items-center rounded-full border transition ${
                          picked ? 'border-ink bg-ink text-white' : 'border-ink/30 hover:border-ink hover:bg-ink hover:text-white'
                        }`}
                      >
                        {picked ? <Check size={18} /> : <Plus size={18} />}
                      </button>
                    </li>
                  )
                })}
                {list.length === 0 && <li className="py-10 text-mute">Nothing in this category for that filter.</li>}
              </m.ul>
            </AnimatePresence>

            <AnimatePresence>
              {serviceIds.length > 0 && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-md bg-ink px-6 py-4 text-sand"
                >
                  <span className="text-sm">
                    {serviceIds.length} service{serviceIds.length > 1 ? 's' : ''} added to your booking
                  </span>
                  <a href="#book" className="text-sm font-semibold underline-offset-4 hover:underline">
                    Pick a time →
                  </a>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
