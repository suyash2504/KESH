import { Check } from 'lucide-react'
import { LinkButton } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'
import { offers } from '../data/content'

export function Offers() {
  return (
    <section id="offers" className="bg-ink py-24 text-sand md:py-36">
      <div className="wrap">
        <SectionHead
          dark
          eyebrow="Offers & membership"
          title={
            <>
              A little <em>extra,</em> always.
            </>
          }
          intro="No fine print gymnastics. Mention the offer when you book, or pick it in the booking form."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {offers.map((o, i) => (
            <Reveal
              key={o.title}
              delay={i * 0.08}
              className={`flex flex-col rounded-md p-8 md:p-10 ${o.featured ? 'bg-sand text-ink md:-my-4' : 'border border-sand/15'}`}
            >
              <p className={`eyebrow ${o.featured ? '' : '!text-sand/60'}`}>{o.tag}</p>
              <h3 className="mt-6 font-serif text-[34px] leading-tight">{o.title}</h3>
              <p className="mt-2 font-serif text-[26px] italic">{o.price}</p>
              <p className={`mt-2 text-sm ${o.featured ? 'text-mute' : 'text-sand/60'}`}>{o.note}</p>
              <ul className="mt-8 flex-1 space-y-3 text-[15px]">
                {o.perks.map(p => (
                  <li key={p} className="flex gap-3">
                    <Check size={17} className="mt-0.5 shrink-0 text-clay" />
                    {p}
                  </li>
                ))}
              </ul>
              <LinkButton href="#book" variant={o.featured ? 'dark' : 'lineLight'} className="mt-10">
                {o.featured ? 'Join the Circle' : 'Claim offer'}
              </LinkButton>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
