import type { ComponentProps } from 'react'

type Variant = 'dark' | 'line' | 'light' | 'lineLight'

const styles: Record<Variant, string> = {
  dark: 'bg-ink text-white hover:bg-ink-soft hover:-translate-y-0.5',
  line: 'border-[1.5px] border-ink text-ink hover:bg-ink hover:text-white',
  light: 'bg-sand text-ink hover:bg-white hover:-translate-y-0.5',
  lineLight: 'border-[1.5px] border-sand/70 text-sand hover:bg-sand hover:text-ink',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-[4px] font-semibold transition duration-300 disabled:pointer-events-none disabled:opacity-40'

const sizes = { md: 'px-6 py-4 text-sm', sm: 'px-5 py-2.5 text-[13px]' }

type Common = { variant?: Variant; size?: keyof typeof sizes }

export function Button({ variant = 'dark', size = 'md', className = '', ...rest }: Common & ComponentProps<'button'>) {
  return <button className={`${base} ${sizes[size]} ${styles[variant]} ${className}`} {...rest} />
}

export function LinkButton({ variant = 'dark', size = 'md', className = '', ...rest }: Common & ComponentProps<'a'>) {
  return <a className={`${base} ${sizes[size]} ${styles[variant]} ${className}`} {...rest} />
}
