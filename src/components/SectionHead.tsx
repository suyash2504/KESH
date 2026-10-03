import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = { eyebrow: string; title: ReactNode; intro?: ReactNode; aside?: ReactNode; dark?: boolean }

export function SectionHead({ eyebrow, title, intro, aside, dark }: Props) {
  return (
    <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-8 md:mb-16">
      <div className="max-w-2xl">
        <p className={`eyebrow mb-5 ${dark ? '!text-sand/60' : ''}`}>{eyebrow}</p>
        <h2 className="font-serif text-[clamp(38px,4.6vw,68px)] leading-[1.05] tracking-[-0.01em]">{title}</h2>
        {intro && <p className={`mt-5 max-w-xl text-[17px] leading-relaxed ${dark ? 'text-sand/70' : 'text-mute'}`}>{intro}</p>}
      </div>
      {aside}
    </Reveal>
  )
}
