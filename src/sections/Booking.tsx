import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { CalendarCheck, Check, X } from 'lucide-react'
import { Button } from '../components/Button'
import { SectionHead } from '../components/SectionHead'
import { useBooking } from '../booking'
import { stylists } from '../data/content'
import { categories, duration, inr, services, type Category } from '../data/services'
import { offers } from '../data/content'
import { unsplash } from '../data/photos'

const DAYS = 14

const dayKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

function upcomingDays() {
  const today = new Date()
  return Array.from({ length: DAYS }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
    return { key: dayKey(d), date: d, isToday: i === 0 }
  })
}

/** Half-hour slots from opening until an hour before close. Sundays close early. */
function slotsFor(date: Date) {
  const sunday = date.getDay() === 0
  const open = date.getDay() === 6 ? 9 : 10
  const close = sunday ? 19 : 21
  const now = new Date()
  const out: { label: string; value: string; taken: boolean }[] = []
  for (let t = open * 60; t <= (close - 1) * 60; t += 30) {
    const h = Math.floor(t / 60)
    const mins = t % 60
    const value = `${String(h).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
    const label = `${((h + 11) % 12) + 1}:${String(mins).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`
    const slot = new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, mins)
    // Deterministic "already booked" pattern so the grid looks lived-in.
    const busy = (date.getDate() * 7 + t / 30) % 5 === 0
    out.push({ label, value, taken: busy || slot.getTime() < now.getTime() + 30 * 60_000 })
  }
  return out
}

function Step({ n, title, done, children }: { n: number; title: string; done: boolean; children: ReactNode }) {
  return (
    <div className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <h3 className="mb-5 flex items-center gap-3 font-serif text-[24px]">
        <span
          className={`grid size-8 place-items-center rounded-full font-sans text-[13px] font-semibold transition ${
            done ? 'bg-ink text-white' : 'border border-ink/30 text-mute'
          }`}
        >
          {done ? <Check size={15} /> : n}
        </span>
        {title}
      </h3>
      {children}
    </div>
  )
}

const chip = (on: boolean) =>
  `rounded-full border px-4 py-2 text-sm transition ${on ? 'border-ink bg-ink text-white' : 'border-ink/20 hover:border-ink'}`

export function Booking() {
  const b = useBooking()
  const [cat, setCat] = useState<Category>('Hair')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [offer, setOffer] = useState('')
  const [tried, setTried] = useState(false)
  const [confirmed, setConfirmed] = useState<string | null>(null)

  const days = useMemo(upcomingDays, [])
  const day = days.find(d => d.key === b.date)
  const slots = useMemo(() => (day ? slotsFor(day.date) : []), [day])

  const picked = services.filter(s => b.serviceIds.includes(s.id))
  const total = picked.reduce((a, s) => a + s.price, 0)
  const minutes = picked.reduce((a, s) => a + s.minutes, 0)
  const stylist = stylists.find(s => s.id === b.stylistId)

  const phoneOk = /^[6-9]\d{9}$/.test(phone.replace(/\D/g, '').slice(-10))
  const errors = {
    services: picked.length === 0 && 'Pick at least one service.',
    time: !b.time && 'Choose a date and time.',
    name: name.trim().length < 2 && 'Tell us your name.',
    phone: !phoneOk && 'Enter a 10-digit mobile number.',
  }
  const valid = !Object.values(errors).some(Boolean)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (!valid) return
    setConfirmed('KSH-' + Math.random().toString(36).slice(2, 7).toUpperCase())
    // The confirmation card is much shorter than the form; bring it into view.
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
  }

  const startOver = () => {
    b.reset()
    setName('')
    setPhone('')
    setNotes('')
    setOffer('')
    setTried(false)
    setConfirmed(null)
  }

  const when = day && b.time
    ? `${day.date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}, ${slots.find(s => s.value === b.time)?.label}`
    : null

  const err = (msg: string | false) =>
    tried && msg ? <p className="mt-3 text-sm font-medium text-[#a23b2a]">{msg}</p> : null

  return (
    <section id="book" className="bg-cream py-24 md:py-36">
      <div className="wrap">
        <SectionHead
          eyebrow="Book an appointment"
          title={
            <>
              Your chair, <em>reserved.</em>
            </>
          }
          intro="Four quick steps. We confirm on WhatsApp within ten minutes during opening hours."
        />

        <AnimatePresence mode="wait">
          {confirmed ? (
            <m.div
              key="done"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-xl rounded-md bg-shell p-8 text-center md:p-12"
              role="status"
            >
              <CalendarCheck className="mx-auto" size={40} strokeWidth={1.4} />
              <h3 className="mt-6 font-serif text-[36px] leading-tight">See you soon, {name.trim().split(' ')[0]}.</h3>
              <p className="mt-3 text-mute">
                Request <b className="text-ink">{confirmed}</b> is in. We will confirm on WhatsApp at +91 {phone.replace(/\D/g, '').slice(-10)}.
              </p>
              <dl className="mt-8 space-y-2 border-y border-line py-6 text-left text-[15px]">
                <div className="flex justify-between gap-4"><dt className="text-mute">When</dt><dd>{when}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-mute">With</dt><dd>{stylist?.name ?? 'First available stylist'}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-mute">Services</dt><dd className="text-right">{picked.map(s => s.name).join(', ')}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-mute">Estimate</dt><dd>{inr(total)}</dd></div>
              </dl>
              <p className="mt-6 text-xs text-mute">Concept demo: nothing was actually sent.</p>
              <Button variant="line" className="mt-6" onClick={startOver}>Book another</Button>
            </m.div>
          ) : (
            <m.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="grid items-start gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
              <div className="min-w-0">
                <Step n={1} title="Choose services" done={picked.length > 0}>
                  <div className="no-scrollbar -mx-4 mb-4 flex gap-5 overflow-x-auto px-4 text-sm md:mx-0 md:px-0">
                    {categories.map(c => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setCat(c)}
                        className={`shrink-0 border-b-[1.5px] pb-1 transition ${cat === c ? 'border-ink font-semibold' : 'border-transparent text-mute hover:text-ink'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {services.filter(s => s.category === cat).map(s => (
                      <button type="button" key={s.id} onClick={() => b.toggleService(s.id)} aria-pressed={b.serviceIds.includes(s.id)} className={chip(b.serviceIds.includes(s.id))}>
                        {s.name} <span className="opacity-60">· {inr(s.price)}</span>
                      </button>
                    ))}
                  </div>
                  {err(errors.services)}
                </Step>

                <Step n={2} title="Pick a stylist" done>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
                    <button type="button" onClick={() => b.setStylist('any')} aria-pressed={b.stylistId === 'any'} className={`flex items-center gap-3 rounded-md border p-3 text-left text-sm transition ${b.stylistId === 'any' ? 'border-ink bg-shell' : 'border-ink/15 hover:border-ink'}`}>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sand font-serif text-lg">✦</span>
                      <span><b className="block font-semibold">Anyone</b><span className="text-xs text-mute">First available</span></span>
                    </button>
                    {stylists.map(p => (
                      <button type="button" key={p.id} onClick={() => b.setStylist(p.id)} aria-pressed={b.stylistId === p.id} className={`flex items-center gap-3 rounded-md border p-3 text-left text-sm transition ${b.stylistId === p.id ? 'border-ink bg-shell' : 'border-ink/15 hover:border-ink'}`}>
                        <img src={unsplash(p.photo, 120)} alt="" style={{ objectPosition: p.focus ?? '50% 30%' }} className="size-10 shrink-0 rounded-full object-cover" />
                        <span className="min-w-0"><b className="block truncate font-semibold">{p.name.split(' ')[0]}</b><span className="block truncate text-xs text-mute">{p.specialties[0]}</span></span>
                      </button>
                    ))}
                  </div>
                </Step>

                <Step n={3} title="Date & time" done={!!b.time}>
                  <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
                    {days.map(d => (
                      <button
                        type="button"
                        key={d.key}
                        onClick={() => b.setDate(d.key)}
                        aria-pressed={b.date === d.key}
                        className={`flex w-[62px] shrink-0 flex-col items-center rounded-md border py-3 transition ${b.date === d.key ? 'border-ink bg-ink text-white' : 'border-ink/15 hover:border-ink'}`}
                      >
                        <span className="text-[11px] uppercase tracking-wider opacity-70">{d.isToday ? 'Today' : d.date.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                        <span className="mt-1 font-serif text-[22px] leading-none">{d.date.getDate()}</span>
                        <span className="mt-1 text-[11px] opacity-70">{d.date.toLocaleDateString('en-IN', { month: 'short' })}</span>
                      </button>
                    ))}
                  </div>
                  {day ? (
                    slots.some(s => !s.taken) ? (
                      <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-6">
                        {slots.map(s => (
                          <button
                            type="button"
                            key={s.value}
                            disabled={s.taken}
                            onClick={() => b.setTime(s.value)}
                            aria-pressed={b.time === s.value}
                            className={`rounded-[4px] border py-2.5 text-[13px] transition disabled:cursor-not-allowed disabled:border-transparent disabled:text-mute/50 disabled:line-through ${b.time === s.value ? 'border-ink bg-ink text-white' : 'border-ink/15 hover:border-ink'}`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-5 text-mute">We are fully booked for the rest of today. Try tomorrow?</p>
                    )
                  ) : (
                    <p className="mt-5 text-sm text-mute">Pick a day to see open slots.</p>
                  )}
                  {err(errors.time)}
                </Step>

                <Step n={4} title="Your details" done={!errors.name && !errors.phone}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium">Name</span>
                      <input value={name} onChange={e => setName(e.target.value)} autoComplete="name" className="w-full rounded-[4px] border border-ink/20 bg-shell px-4 py-3.5 outline-none transition focus:border-ink" />
                      {err(errors.name)}
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium">WhatsApp number</span>
                      <div className="flex rounded-[4px] border border-ink/20 bg-shell transition focus-within:border-ink">
                        <span className="grid place-items-center border-r border-ink/10 px-3 text-sm text-mute">+91</span>
                        <input value={phone} onChange={e => setPhone(e.target.value)} inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210" className="w-full bg-transparent px-4 py-3.5 outline-none" />
                      </div>
                      {err(errors.phone)}
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium">Offer <span className="font-normal text-mute">(optional)</span></span>
                      <select value={offer} onChange={e => setOffer(e.target.value)} className="w-full rounded-[4px] border border-ink/20 bg-shell px-4 py-3.5 outline-none transition focus:border-ink">
                        <option value="">No offer</option>
                        {offers.map(o => <option key={o.title}>{o.title}</option>)}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium">Notes <span className="font-normal text-mute">(optional)</span></span>
                      <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Reference photo, allergies…" className="w-full rounded-[4px] border border-ink/20 bg-shell px-4 py-3.5 outline-none transition focus:border-ink" />
                    </label>
                  </div>
                </Step>
              </div>

              <aside className="rounded-md bg-ink p-7 text-sand lg:sticky lg:top-24 md:p-8">
                <p className="eyebrow !text-sand/60">Your booking</p>
                {picked.length ? (
                  <ul className="mt-5 space-y-3">
                    {picked.map(s => (
                      <li key={s.id} className="flex items-start justify-between gap-3 text-[15px]">
                        <span>
                          {s.name}
                          <span className="block text-xs text-sand/50">{duration(s.minutes)}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          {inr(s.price)}
                          <button type="button" onClick={() => b.toggleService(s.id)} aria-label={`Remove ${s.name}`} className="rounded-full p-1 text-sand/50 transition hover:text-sand">
                            <X size={14} />
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5 text-sm text-sand/60">No services yet. Add some from step 1 or the menu above.</p>
                )}
                <dl className="mt-6 space-y-2 border-t border-sand/15 pt-5 text-sm">
                  <div className="flex justify-between"><dt className="text-sand/60">Stylist</dt><dd>{stylist?.name ?? 'First available'}</dd></div>
                  <div className="flex justify-between"><dt className="text-sand/60">When</dt><dd>{when ?? '—'}</dd></div>
                  {minutes > 0 && <div className="flex justify-between"><dt className="text-sand/60">Time in chair</dt><dd>{duration(minutes)}</dd></div>}
                  {offer && <div className="flex justify-between"><dt className="text-sand/60">Offer</dt><dd>{offer}</dd></div>}
                </dl>
                <div className="mt-6 flex items-baseline justify-between border-t border-sand/15 pt-5">
                  <span className="text-sm text-sand/60">Estimate</span>
                  <span className="font-serif text-[34px]">{inr(total)}</span>
                </div>
                <Button type="submit" variant="light" className="mt-6 w-full">
                  Request booking
                </Button>
                <p className="mt-4 text-center text-xs text-sand/50">Pay at the salon. Free to cancel up to 2 hours before.</p>
              </aside>
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
