import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { site } from '../site.config'
import { services } from '../content/services'

const NAV = [
  { label: 'Gallery', to: '/gallery/' },
  { label: 'About', to: '/about/' },
  { label: 'Contact', to: '/contact/' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close everything on navigation, otherwise the menu hangs open behind the
  // new page.
  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [pathname])

  // Lock body scroll behind the mobile overlay.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setServicesOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Small delay on close so the pointer can travel from trigger to panel.
  const openServices = () => {
    window.clearTimeout(closeTimer.current)
    setServicesOpen(true)
  }
  const closeServices = () => {
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 140)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth ${
        scrolled
          ? 'border-b border-ink/8 bg-paper/88 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
      style={{ ['--header-h' as string]: '76px' }}
    >
      <div className="shell flex h-[76px] items-center justify-between gap-6">
        <Link
          to="/"
          className="group flex flex-col leading-none"
          aria-label={`${site.name} — home`}
        >
          <span className="h-section text-[1.28rem] tracking-tight sm:text-[1.4rem]">
            Beck&apos;s
          </span>
          <span className="mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-oak">
            Hardwood Floors
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <div
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={closeServices}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className="inline-flex items-center gap-1 rounded-pill px-4 py-2 text-[0.92rem] font-medium text-ink/78 transition hover:bg-ink/5 hover:text-ink"
            >
              Services
              <ChevronDown
                size={15}
                strokeWidth={2.4}
                className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.985 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-full w-[330px] overflow-hidden rounded-2xl border border-ink/10 bg-white p-2 shadow-lift-lg"
                >
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to={s.path}
                      className="block rounded-xl px-3.5 py-3 transition hover:bg-sand"
                    >
                      <span className="block text-[0.92rem] font-semibold">
                        {s.navLabel}
                      </span>
                      <span className="mt-0.5 block text-[0.79rem] leading-snug text-ink/55">
                        {s.navBlurb}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `rounded-pill px-4 py-2 text-[0.92rem] font-medium transition hover:bg-ink/5 ${
                  isActive ? 'text-ink' : 'text-ink/78 hover:text-ink'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={`tel:${site.phone.e164}`}
            className="hidden items-center gap-2 rounded-pill bg-ink px-5 py-2.5 text-[0.88rem] font-semibold text-paper transition hover:bg-oak sm:inline-flex"
            data-cta="call-header"
          >
            <Phone size={15} strokeWidth={2.6} aria-hidden="true" />
            {site.phone.display}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/14 transition hover:bg-ink/5 lg:hidden"
          >
            <Menu size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-paper lg:hidden"
          >
            <div className="shell flex h-[76px] items-center justify-between">
              <span className="h-section text-[1.28rem]">Beck&apos;s</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/14"
              >
                <X size={20} strokeWidth={2.2} aria-hidden="true" />
              </button>
            </div>

            <nav
              className="shell flex flex-col gap-1 pt-6"
              aria-label="Mobile"
            >
              <p className="px-1 pb-2 pt-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ink/40">
                Services
              </p>
              {services.map((s, i) => (
                <MobileLink key={s.slug} to={s.path} index={i}>
                  {s.navLabel}
                </MobileLink>
              ))}
              <div className="my-3 border-t rule" />
              {NAV.map((n, i) => (
                <MobileLink key={n.to} to={n.to} index={services.length + i}>
                  {n.label}
                </MobileLink>
              ))}

              <a
                href={`tel:${site.phone.e164}`}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-pill bg-oak px-6 py-4 text-base font-semibold text-white shadow-lift"
              >
                <Phone size={18} strokeWidth={2.6} aria-hidden="true" />
                {site.phone.display}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function MobileLink({
  to,
  children,
  index,
}: {
  to: string
  children: React.ReactNode
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.04 + index * 0.035, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={to}
        className="block rounded-xl px-1 py-3 font-display text-[1.55rem] font-bold tracking-tight transition hover:text-oak"
      >
        {children}
      </Link>
    </motion.div>
  )
}
