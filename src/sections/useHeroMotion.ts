import { useEffect, useState, type RefObject } from 'react'
import type { TornParts } from '../components/TornImage'

/** How far right (viewBox units) the torn edge starts before swiping in. */
export const SWIPE_FROM = 760

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4)

function tween(ms: number, delay: number, fn: (t: number) => void, alive: () => boolean) {
  return new Promise<void>(done => {
    const start = performance.now() + delay
    const frame = (now: number) => {
      if (!alive()) return done()
      const t = Math.min(1, Math.max(0, (now - start) / ms))
      fn(easeOut(t))
      if (t < 1) requestAnimationFrame(frame)
      else done()
    }
    requestAnimationFrame(frame)
  })
}

const shiftX = (el: SVGElement, x: number) => el.setAttribute('transform', `translate(${x} 0)`)

type Refs = {
  section: RefObject<HTMLElement | null>
  copy: RefObject<HTMLElement | null>
  parts: RefObject<TornParts | null>
  src: string
}

/**
 * The hero's motion, driven straight on the DOM so nothing re-renders per frame:
 * 1. once the photo is decoded (or 1.5s passes), the smear and photo swipe in;
 * 2. on fine pointers, photo and copy drift apart with the cursor;
 * 3. on scroll, the torn edge slides left, the photo grows and (on desktop) the copy lifts away.
 * Returns `ready`, which gates the text entrance. Reduced motion skips all of it.
 */
export function useHeroMotion({ section, copy, parts, src }: Refs, reduced: boolean) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    const isAlive = () => alive
    const cleanups: (() => void)[] = []

    const settle = () => {
      const p = parts.current
      if (!p) return
      for (const el of [p.mask, p.wash, p.streak]) shiftX(el, 0)
      p.image.style.transform = ''
    }

    if (reduced) {
      settle()
      setReady(true)
      return
    }

    const img = new Image()
    img.src = src
    const loaded = Promise.race([img.decode().catch(() => {}), new Promise(r => setTimeout(r, 1500))])

    loaded.then(async () => {
      const p = parts.current
      if (!alive || !p) return
      setReady(true)

      // 1. Swipe: streak leads, the cream wash follows, then the photo itself.
      await Promise.all([
        tween(1100, 0, t => shiftX(p.streak, SWIPE_FROM * (1 - t)), isAlive),
        tween(1200, 120, t => shiftX(p.wash, SWIPE_FROM * (1 - t)), isAlive),
        tween(1500, 260, t => {
          shiftX(p.mask, SWIPE_FROM * (1 - t))
          p.image.style.transform = `scale(${1.08 - 0.08 * t})`
        }, isAlive),
      ])
      if (!alive) return

      // 2. Pointer parallax, eased toward the target every frame.
      if (window.matchMedia('(pointer: fine)').matches) {
        const el = section.current!
        let mx = 0, my = 0, cx = 0, cy = 0, raf = 0
        const move = (e: PointerEvent) => {
          mx = (e.clientX / innerWidth) * 2 - 1
          my = (e.clientY / innerHeight) * 2 - 1
        }
        const leave = () => (mx = my = 0)
        const loop = () => {
          cx += (mx - cx) * 0.06
          cy += (my - cy) * 0.06
          p.image.setAttribute('x', String(80 - cx * 11))
          p.image.setAttribute('y', String(-20 - cy * 8))
          if (copy.current) copy.current.style.translate = `${cx * -5}px ${cy * -3}px`
          raf = requestAnimationFrame(loop)
        }
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        raf = requestAnimationFrame(loop)
        cleanups.push(() => {
          cancelAnimationFrame(raf)
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
        })
      }

      // 3. Scroll: open the edge up and let the copy drift off (desktop only;
      // on phones the copy sits below the photo and must stay readable).
      const wide = window.matchMedia('(min-width: 768px)')
      let ticking = false
      const onScroll = () => {
        if (ticking) return
        ticking = true
        requestAnimationFrame(() => {
          ticking = false
          const h = section.current?.offsetHeight ?? innerHeight
          const k = Math.min(1, Math.max(0, scrollY / (h * 0.8)))
          for (const el of [p.mask, p.wash, p.streak]) shiftX(el, -300 * k)
          p.image.style.transform = k ? `scale(${1 + 0.12 * k})` : ''
          const c = copy.current
          if (c) {
            c.style.transform = wide.matches && k ? `translateY(${-90 * k}px)` : ''
            c.style.opacity = wide.matches ? String(Math.max(0, 1 - k * 1.3)) : ''
          }
        })
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      cleanups.push(() => window.removeEventListener('scroll', onScroll))
    })

    return () => {
      alive = false
      cleanups.forEach(fn => fn())
    }
  }, [reduced, src, section, copy, parts])

  return ready
}
