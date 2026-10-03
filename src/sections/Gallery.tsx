import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'
import { gallery } from '../data/content'
import { unsplash } from '../data/photos'

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  const step = (d: number) => setOpen(i => (i === null ? i : (i + d + gallery.length) % gallery.length))

  useEffect(() => {
    if (open === null) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <section id="gallery" className="py-24 md:py-36">
      <div className="wrap">
        <SectionHead
          eyebrow="Gallery"
          title={
            <>
              Fresh off <em>the chair.</em>
            </>
          }
          aside={
            <a href="#" className="text-sm font-semibold underline underline-offset-4">
              More on Instagram ↗
            </a>
          }
        />

        <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
          {gallery.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 0.06} className="mb-3 break-inside-avoid md:mb-4">
              <button
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-sm"
                aria-label={`Open photo: ${s.label}`}
              >
                <img
                  src={unsplash(s.id, 700)}
                  alt={s.label}
                  loading="lazy"
                  className={`w-full object-cover transition duration-700 group-hover:scale-[1.05] ${s.tall ? 'aspect-[3/4]' : 'aspect-square'}`}
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 pt-12 text-left text-[13px] text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  {s.label}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={gallery[open].label}
            onClick={() => setOpen(null)}
          >
            <m.figure
              key={open}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-h-full"
              onClick={e => e.stopPropagation()}
            >
              <img src={unsplash(gallery[open].id, 1600)} alt={gallery[open].label} className="max-h-[80svh] w-auto rounded-sm" />
              <figcaption className="mt-4 text-center text-sm text-sand/80">{gallery[open].label}</figcaption>
            </m.figure>
            <button onClick={() => setOpen(null)} aria-label="Close" className="absolute right-4 top-4 rounded-full p-2 text-sand">
              <X size={26} />
            </button>
            <button
              onClick={e => (e.stopPropagation(), step(-1))}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-3 text-sand md:left-6"
            >
              <ChevronLeft size={30} />
            </button>
            <button
              onClick={e => (e.stopPropagation(), step(1))}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-3 text-sand md:right-6"
            >
              <ChevronRight size={30} />
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  )
}
