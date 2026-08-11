import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { site } from '../site.config'

const base =
  'inline-flex items-center justify-center gap-2 rounded-pill font-semibold tracking-wide transition-all duration-200 ease-smooth active:scale-[0.98] whitespace-nowrap'

const sizes = {
  md: 'px-6 py-3 text-[0.9rem] sm:px-7 sm:py-3.5 sm:text-[0.95rem]',
  lg: 'px-7 py-3.5 text-[0.95rem] sm:px-9 sm:py-4 sm:text-base',
}

/** Solid oak accent. One per screen — the single most important action. */
export function PrimaryButton({
  to,
  href,
  children,
  size = 'md',
  className = '',
  onClick,
}: {
  to?: string
  href?: string
  children: ReactNode
  size?: keyof typeof sizes
  className?: string
  onClick?: () => void
}) {
  const cls = `${base} ${sizes[size]} bg-oak text-white shadow-lift hover:bg-oak-deep hover:shadow-lift-lg hover:-translate-y-0.5 ${className}`
  if (to) return <Link to={to} className={cls} onClick={onClick}>{children}</Link>
  return <a href={href} className={cls} onClick={onClick}>{children}</a>
}

/** Outline button for secondary actions. `invert` for use on dark sections. */
export function GhostButton({
  to,
  href,
  children,
  size = 'md',
  invert = false,
  className = '',
}: {
  to?: string
  href?: string
  children: ReactNode
  size?: keyof typeof sizes
  invert?: boolean
  className?: string
}) {
  const tone = invert
    ? 'border-paper/35 text-paper hover:bg-paper/10 hover:border-paper/60'
    : 'border-ink/20 text-ink hover:bg-ink/5 hover:border-ink/40'
  const cls = `${base} ${sizes[size]} border-2 ${tone} ${className}`
  if (to) return <Link to={to} className={cls}>{children}</Link>
  return <a href={href} className={cls}>{children}</a>
}

/**
 * Tappable phone number.
 *
 * For a trades business the phone call IS the conversion — most visitors on a
 * $5–15k job want to hear a voice before they type anything. This gets equal
 * billing with the form everywhere it appears.
 */
export function CallButton({
  size = 'md',
  invert = false,
  className = '',
  label,
}: {
  size?: keyof typeof sizes
  invert?: boolean
  className?: string
  label?: string
}) {
  const tone = invert
    ? 'border-paper/35 text-paper hover:bg-paper/10 hover:border-paper/60'
    : 'border-ink/20 text-ink hover:bg-ink/5 hover:border-ink/40'
  return (
    <a
      href={`tel:${site.phone.e164}`}
      className={`${base} ${sizes[size]} border-2 ${tone} ${className}`}
      data-cta="call"
    >
      <Phone size={17} strokeWidth={2.4} aria-hidden="true" />
      <span>{label ?? site.phone.display}</span>
    </a>
  )
}
