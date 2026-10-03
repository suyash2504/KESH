import { m, type HTMLMotionProps } from 'framer-motion'

/** Fades and lifts its children in once they scroll into view. */
export function Reveal({ delay = 0, y = 24, ...rest }: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    />
  )
}
