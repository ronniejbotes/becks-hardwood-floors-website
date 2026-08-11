import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type MagnetProps = {
  children: ReactNode
  /** How far outside the element's bounds the pull starts, in px. */
  padding?: number
  /** Higher = weaker pull. The offset is divided by this. */
  strength?: number
  className?: string
}

/**
 * Cursor-following magnetic hover.
 *
 * Deliberately restrained (default strength 4) and applied only to primary
 * CTAs — used everywhere it reads as a gimmick. Skipped entirely for touch
 * devices and for users who have asked for reduced motion.
 */
export default function Magnet({
  children,
  padding = 90,
  strength = 4,
  className = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    // A magnetic effect needs a cursor. Bail on touch-only and reduced-motion.
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return

    function handleMove(e: MouseEvent) {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = Math.abs(centerX - e.clientX)
      const distY = Math.abs(centerY - e.clientY)

      const withinReach =
        distX < rect.width / 2 + padding && distY < rect.height / 2 + padding

      if (withinReach) {
        setActive(true)
        setOffset({
          x: (e.clientX - centerX) / strength,
          y: (e.clientY - centerY) / strength,
        })
      } else if (active) {
        setActive(false)
        setOffset({ x: 0, y: 0 })
      }
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [padding, strength, active])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: active
          ? 'transform 0.3s ease-out'
          : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
