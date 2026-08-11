import { motion } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'
import { useMemo } from 'react'

type FadeInProps = {
  children: ReactNode
  /** Seconds to wait before animating. Used to stagger sibling elements. */
  delay?: number
  duration?: number
  /** Starting offset. Positive y enters from below. */
  x?: number
  y?: number
  as?: ElementType
  className?: string
}

/**
 * Scroll-triggered entrance animation.
 *
 * `once: true` means content never re-animates on scroll-back, which is both
 * calmer to read and cheaper. `amount: 0` fires as soon as any part of the
 * element crosses the viewport margin, so nothing pops in late.
 *
 * The `data-fade` attribute is the no-JS escape hatch: index.html carries a
 * <noscript> rule that forces these elements visible, so the prerendered HTML
 * is still readable if the bundle fails to load.
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className = '',
}: FadeInProps) {
  const MotionTag = useMemo(() => motion.create(as as ElementType), [as])

  return (
    <MotionTag
      data-fade=""
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  )
}
