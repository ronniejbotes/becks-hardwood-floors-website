import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { site } from '../site.config'

/**
 * Sticky call/quote bar, phones only.
 *
 * On a trades site the phone call is the conversion. Someone reading this on a
 * phone should never be more than a thumb away from making it. Appears after
 * the hero so it does not cover the first screen.
 */
export default function MobileCallBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 p-3 backdrop-blur-md sm:hidden"
          style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
        >
          <div className="flex gap-2.5">
            <a
              href={`tel:${site.phone.e164}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-pill bg-oak py-3.5 font-semibold text-white shadow-lift"
              data-cta="call-sticky"
            >
              <Phone size={17} strokeWidth={2.6} aria-hidden="true" />
              Call now
            </a>
            <Link
              to="/contact/"
              className="flex flex-1 items-center justify-center gap-2 rounded-pill border-2 border-ink/18 py-3.5 font-semibold"
            >
              <MessageSquare size={17} strokeWidth={2.4} aria-hidden="true" />
              Free quote
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
