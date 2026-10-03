import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

type Booking = {
  serviceIds: string[]
  stylistId: string
  date: string | null
  time: string | null
}

type BookingApi = Booking & {
  toggleService: (id: string) => void
  setStylist: (id: string) => void
  setDate: (d: string) => void
  setTime: (t: string | null) => void
  reset: () => void
  /** Pre-fill and jump to the booking section. */
  bookWith: (opts: { serviceId?: string; stylistId?: string }) => void
}

const empty: Booking = { serviceIds: [], stylistId: 'any', date: null, time: null }

const Ctx = createContext<BookingApi | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Booking>(empty)

  const toggleService = useCallback((id: string) => {
    setState(s => ({
      ...s,
      serviceIds: s.serviceIds.includes(id) ? s.serviceIds.filter(x => x !== id) : [...s.serviceIds, id],
    }))
  }, [])

  const bookWith = useCallback((opts: { serviceId?: string; stylistId?: string }) => {
    setState(s => ({
      ...s,
      serviceIds: opts.serviceId && !s.serviceIds.includes(opts.serviceId) ? [...s.serviceIds, opts.serviceId] : s.serviceIds,
      stylistId: opts.stylistId ?? s.stylistId,
    }))
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const api = useMemo<BookingApi>(
    () => ({
      ...state,
      toggleService,
      bookWith,
      setStylist: stylistId => setState(s => ({ ...s, stylistId })),
      setDate: date => setState(s => ({ ...s, date, time: null })),
      setTime: time => setState(s => ({ ...s, time })),
      reset: () => setState(empty),
    }),
    [state, toggleService, bookWith],
  )

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useBooking() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider')
  return ctx
}
