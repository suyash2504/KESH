import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type Props = { words: string[]; run: boolean; delay?: number; every?: number }

/**
 * Swaps one word for the next with a vertical slide, easing the width so the
 * surrounding line never jumps. Screen readers only ever hear the first word.
 */
export function WordCycle({ words, run, delay = 1200, every = 2400 }: Props) {
  const [i, setI] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [widths, setWidths] = useState<number[]>([])
  const els = useRef<(HTMLElement | null)[]>([])

  useLayoutEffect(() => {
    const measure = () => setWidths(els.current.map(el => el?.getBoundingClientRect().width ?? 0))
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [words])

  useEffect(() => {
    if (!run) return
    let timer = window.setTimeout(function tick() {
      setI(cur => {
        setPrev(cur)
        return (cur + 1) % words.length
      })
      timer = window.setTimeout(tick, every)
    }, delay)
    return () => window.clearTimeout(timer)
  }, [run, delay, every, words.length])

  return (
    <>
      <span className="sr-only">{words[0]}</span>
      <span
        aria-hidden="true"
        className="inline-grid overflow-hidden pb-[0.08em] align-bottom transition-[width] duration-[600ms] ease-[cubic-bezier(.6,0,.2,1)]"
        style={widths[i] ? { width: widths[i] } : undefined}
      >
        {words.map((w, k) => {
          const state = k === i ? 'in' : k === prev ? 'out' : 'wait'
          return (
            <em
              key={w}
              ref={el => {
                els.current[k] = el
              }}
              className={`col-start-1 row-start-1 justify-self-start whitespace-nowrap ${
                state === 'in'
                  ? 'translate-y-0 opacity-100 transition duration-700 ease-[cubic-bezier(.7,0,.2,1)]'
                  : state === 'out'
                    ? '-translate-y-[105%] opacity-0 transition duration-700 ease-[cubic-bezier(.7,0,.2,1)]'
                    : 'translate-y-[105%] opacity-0'
              }`}
            >
              {w}
            </em>
          )
        })}
      </span>
    </>
  )
}
