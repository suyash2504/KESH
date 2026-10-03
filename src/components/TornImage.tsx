import { memo, useEffect, useId, useRef, type RefObject } from 'react'

/** The SVG nodes a parent can drive directly (no React re-renders per frame). */
export type TornParts = {
  mask: SVGPathElement
  wash: SVGPathElement
  streak: SVGPathElement
  image: SVGImageElement
}

type Props = {
  src: string
  /** Which side of the photo gets the torn, smeared edge. */
  edge?: 'left' | 'right'
  /** Smear colours: the cream wash and the darker streak beneath it. */
  wash?: string
  streak?: string
  className?: string
  /** Shift the photo inside the frame, in viewBox units (800 × 1000). */
  offsetX?: number
  /** Start with the edge pushed this far right, so a parent can swipe it in. */
  initialShift?: number
  partsRef?: RefObject<TornParts | null>
}

// The torn edge is a mask path roughened by turbulence, with two smear bands
// drawn underneath it so the photo looks pressed onto the page. The mask runs
// well past the right edge so it can be slid left without opening a gap.
const MASK = 'M240 -40 C 180 120, 300 220, 210 360 C 140 470, 250 560, 190 690 C 150 790, 260 880, 230 1040 L 1660 1040 L 1660 -40 Z'
const WASH = 'M200 -40 C 140 120, 260 220, 170 360 C 100 470, 210 560, 150 690 C 110 790, 220 880, 190 1040 L 420 1040 L 420 -40 Z'
const STREAK = 'M180 -40 C 120 140, 240 230, 150 370 C 90 480, 190 570, 130 700 C 95 800, 200 890, 170 1040 L 260 1040 L 260 -40 Z'

export const TornImage = memo(function TornImage({
  src,
  edge = 'left',
  wash = '#f3e6d8',
  streak = '#d8b99d',
  className = '',
  offsetX = 80,
  initialShift = 0,
  partsRef,
}: Props) {
  const id = useId().replace(/:/g, '')
  const flip = edge === 'right' ? 'translate(800 0) scale(-1 1)' : undefined
  const shift = initialShift ? `translate(${initialShift} 0)` : undefined

  const maskEl = useRef<SVGPathElement>(null)
  const washEl = useRef<SVGPathElement>(null)
  const streakEl = useRef<SVGPathElement>(null)
  const imageEl = useRef<SVGImageElement>(null)

  useEffect(() => {
    if (!partsRef) return
    partsRef.current = { mask: maskEl.current!, wash: washEl.current!, streak: streakEl.current!, image: imageEl.current! }
    return () => {
      partsRef.current = null
    }
  }, [partsRef])

  return (
    <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <filter id={`rough-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency=".01 .022" numOctaves="3" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="70" />
        </filter>
        <filter id={`smear-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency=".014 .035" numOctaves="4" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="90" result="d" />
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 1  0 0 0 0 .95  0 0 0 0 .9  0 0 0 .35 0" result="g" />
          <feComposite in="g" in2="d" operator="in" result="gg" />
          <feMerge>
            <feMergeNode in="d" />
            <feMergeNode in="gg" />
          </feMerge>
        </filter>
        <mask id={`mask-${id}`}>
          <g transform={flip}>
            <path ref={maskEl} filter={`url(#rough-${id})`} fill="#fff" d={MASK} transform={shift} />
          </g>
        </mask>
      </defs>
      <g transform={flip}>
        <path ref={washEl} filter={`url(#smear-${id})`} fill={wash} d={WASH} transform={shift} />
        <path ref={streakEl} filter={`url(#smear-${id})`} fill={streak} opacity=".55" d={STREAK} transform={shift} />
      </g>
      <g mask={`url(#mask-${id})`}>
        <image
          ref={imageEl}
          href={src}
          x={edge === 'left' ? offsetX : -offsetX}
          y="-20"
          width="800"
          height="1060"
          preserveAspectRatio="xMidYMid slice"
          style={{ transformBox: 'fill-box', transformOrigin: '40% 45%' }}
        />
      </g>
    </svg>
  )
})
