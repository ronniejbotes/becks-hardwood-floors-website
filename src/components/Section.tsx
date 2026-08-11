import type { ReactNode } from 'react'

/**
 * Section shell with a warm-light or dark-espresso tone.
 *
 * Alternating these is what gives the page rhythm without needing decoration.
 * Floor photography reads best against the light tone, so dark sections are
 * used for copy-led blocks rather than for imagery.
 */
export function Section({
  children,
  tone = 'paper',
  className = '',
  id,
  rounded = false,
}: {
  children: ReactNode
  tone?: 'paper' | 'sand' | 'dark'
  className?: string
  id?: string
  rounded?: boolean
}) {
  const tones = {
    paper: 'bg-paper text-ink',
    sand: 'bg-sand text-ink',
    dark: 'bg-espresso text-paper',
  }

  return (
    <section
      id={id}
      className={`${tones[tone]} ${
        rounded ? 'rounded-t-[36px] sm:rounded-t-[48px]' : ''
      } ${className}`}
    >
      {children}
    </section>
  )
}

/** Small uppercase label that sits above a section heading. */
export function Kicker({
  children,
  invert = false,
}: {
  children: ReactNode
  invert?: boolean
}) {
  return (
    <p
      className={`mb-4 text-[0.7rem] font-bold uppercase tracking-[0.2em] ${
        invert ? 'text-oak-soft' : 'text-oak'
      }`}
    >
      {children}
    </p>
  )
}

/** Fluid section heading. */
export function SectionHeading({
  children,
  className = '',
  as: Tag = 'h2',
}: {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <Tag
      className={`h-section ${className}`}
      style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3.4rem)' }}
    >
      {children}
    </Tag>
  )
}
