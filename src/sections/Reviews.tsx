import { useRef } from 'react'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { SectionHead } from '../components/SectionHead'
import { reviews } from '../data/content'

const arrow = 'grid size-12 place-items-center rounded-full border border-ink/30 transition hover:bg-ink hover:text-white'

export function Reviews() {
  const track = useRef<HTMLUListElement>(null)
  const scroll = (d: number) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector('li')
    el.scrollBy({ left: d * ((card?.clientWidth ?? 360) + 16), behavior: 'smooth' })
  }

  return (
    <section id="reviews" className="overflow-hidden py-24 md:py-36">
      <div className="wrap">
        <SectionHead
          eyebrow="Reviews"
          title={
            <>
              4.9 stars, <em>1,200+ heads.</em>
            </>
          }
          aside={
            <div className="flex gap-2">
              <button onClick={() => scroll(-1)} aria-label="Previous reviews" className={arrow}>
                <ArrowLeft size={18} />
              </button>
              <button onClick={() => scroll(1)} aria-label="Next reviews" className={arrow}>
                <ArrowRight size={18} />
              </button>
            </div>
          }
        />

        <ul
          ref={track}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:mr-[calc(50%-50vw)] md:scroll-px-0 md:px-0 md:pr-[clamp(16px,4vw,56px)]"
        >
          {reviews.map(r => (
            <li
              key={r.name}
              className="flex w-[85%] shrink-0 snap-start flex-col rounded-md bg-shell p-8 sm:w-[360px] md:p-10"
            >
              <div className="flex gap-1 text-ink" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-6 flex-1 font-serif text-[21px] leading-snug">“{r.text}”</blockquote>
              <div className="mt-8 flex items-center justify-between border-t border-line pt-5 text-sm">
                <span className="font-semibold">{r.name}</span>
                <span className="text-mute">{r.service}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
