import { Mail, MapPin, Phone } from 'lucide-react'
import { LinkButton } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'
import { contact, hours } from '../data/content'

export function Visit() {
  const today = (new Date().getDay() + 6) % 7 // Mon = 0
  const row = today < 5 ? 0 : today === 5 ? 1 : 2
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`

  return (
    <section id="visit" className="py-24 md:py-36">
      <div className="wrap">
        <SectionHead
          eyebrow="Visit"
          title={
            <>
              Find us in <em>Indiranagar.</em>
            </>
          }
        />

        <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="flex flex-col gap-10 rounded-md bg-shell p-8 md:p-10">
            <ul className="space-y-5 text-[16px]">
              <li className="flex gap-4">
                <MapPin size={20} strokeWidth={1.6} className="mt-0.5 shrink-0" />
                <span>
                  {contact.address[0]}
                  <br />
                  {contact.address[1]}
                </span>
              </li>
              <li className="flex gap-4">
                <Phone size={20} strokeWidth={1.6} className="mt-0.5 shrink-0" />
                <span>{contact.phone}</span>
              </li>
              <li className="flex gap-4">
                <Mail size={20} strokeWidth={1.6} className="mt-0.5 shrink-0" />
                <span>{contact.email}</span>
              </li>
            </ul>

            <div>
              <p className="eyebrow mb-4">Opening hours</p>
              <dl className="divide-y divide-line border-y border-line">
                {hours.map(([d, h], i) => (
                  <div key={d} className={`flex justify-between py-3.5 text-[15px] ${i === row ? 'font-semibold' : 'text-mute'}`}>
                    <dt>
                      {d}
                      {i === row && <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-[10px] uppercase tracking-wider text-white">Today</span>}
                    </dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-auto flex flex-wrap gap-3">
              <LinkButton href={mapsUrl} target="_blank" rel="noreferrer">
                Get directions
              </LinkButton>
              <LinkButton href="#book" variant="line">
                Book a visit
              </LinkButton>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-h-[360px] overflow-hidden rounded-md bg-clay/30">
            <iframe
              title="Map showing the KESH salon location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full min-h-[360px] border-0 grayscale-[.6] sepia-[.25]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
