import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../content/services'

/**
 * Sticky-stacking service cards.
 *
 * Each card pins under the header and scales down slightly as the next one
 * rises over it, so the four services read as one deliberate sequence rather
 * than a grid of tiles. Adapted from the card-stacking pattern in the brief.
 *
 * The scale target is derived from the card's index, so the deepest card in
 * the stack ends up smallest and the effect reads as depth.
 */
export default function ServiceStack() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative">
      {services.map((service, i) => (
        <StackCard
          key={service.slug}
          index={i}
          total={services.length}
          service={service}
        />
      ))}
    </div>
  )
}

function StackCard({
  service,
  index,
  total,
}: {
  service: (typeof services)[number]
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  // Cards deeper in the stack settle smaller.
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div
      ref={ref}
      className="sticky flex items-start justify-center"
      style={{ top: `calc(var(--header-h) + ${24 + index * 18}px)` }}
    >
      <motion.article
        style={{ scale }}
        className="w-full origin-top overflow-hidden rounded-card border border-ink/10 bg-white shadow-lift-lg"
      >
        <div className="grid gap-0 md:grid-cols-[1.05fr_1fr]">
          {/* Copy */}
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
            <div>
              <div className="mb-6 flex items-baseline gap-4">
                <span
                  className="h-display text-oak/22"
                  style={{ fontSize: 'clamp(2.6rem, 6vw, 4.6rem)' }}
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-oak">
                  {service.navBlurb}
                </span>
              </div>

              <h3
                className="h-section mb-4"
                style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)' }}
              >
                {service.navLabel}
              </h3>

              <p className="max-w-prose leading-relaxed text-ink/68">
                {service.answerBlock}
              </p>
            </div>

            <Link
              to={service.path}
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-pill border-2 border-ink/18 px-6 py-3 text-[0.9rem] font-semibold transition hover:border-oak hover:bg-oak hover:text-white"
            >
              {service.linkLabel}
              <ArrowUpRight
                size={17}
                strokeWidth={2.4}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Image */}
          <div className="relative min-h-[240px] md:min-h-[420px]">
            <img
              src={service.heroImage}
              alt={service.heroAlt}
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </motion.article>
    </div>
  )
}
