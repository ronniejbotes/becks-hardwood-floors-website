import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, X } from 'lucide-react'
import Seo from '../components/Seo'
import FadeIn from '../components/FadeIn'
import BeforeAfter from '../components/BeforeAfter'
import { Section, Kicker, SectionHeading } from '../components/Section'
import { CallButton } from '../components/Buttons'
import { cityState } from '../site.config'
import {
  galleryItems,
  galleryTags,
  isIllustration,
  type GalleryItem,
} from '../content/gallery'
import { beforeAfterItems } from '../content/home'
import { breadcrumbSchema, webPageSchema } from '../lib/schema'

const LAST_UPDATED = '2026-08-11'

export default function Gallery() {
  const [filter, setFilter] = useState<string>('All')
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  const visible =
    filter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.tag === filter)

  return (
    <>
      <Seo
        title={`Hardwood Floor Gallery | ${cityState}`}
        description="Hardwood floor finishes, stains and installations — refinished oak, wide-plank white oak, dark stains and waterproof vinyl plank. Beck's Hardwood Floors, Winston-Salem."
        path="/gallery/"
        image="/media/gallery-foyer.jpg"
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Gallery', path: '/gallery/' },
          ]),
          webPageSchema({
            title: 'Gallery',
            description: 'Hardwood floor finishes and installations.',
            path: '/gallery/',
            dateModified: LAST_UPDATED,
          }),
        ]}
      />

      <section className="bg-sand pt-[76px]">
        <div className="shell py-14 lg:py-18">
          <FadeIn y={22}>
            <Kicker>Finishes &amp; floor types</Kicker>
            <h1
              className="h-display max-w-[16ch]"
              style={{ fontSize: 'clamp(2.3rem, 6.2vw, 4.4rem)' }}
            >
              Before &amp; after
            </h1>
            <p className="mt-6 max-w-prose text-[1.05rem] leading-relaxed text-ink/72">
              Sheen levels, stain colors, plank widths and floor types, so you
              can point at something and say &ldquo;that one&rdquo;. Choosing a
              finish is much easier looking at a floor than reading a name on a
              tin.
            </p>
          </FadeIn>

          {isIllustration && (
            <FadeIn delay={0.1}>
              <p className="mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-oak/25 bg-oak/8 p-4 text-[0.87rem] leading-relaxed text-ink/72">
                <Info size={17} strokeWidth={2.3} className="mt-0.5 shrink-0 text-oak-deep" aria-hidden="true" />
                <span>
                  These images show floor types and finishes for reference. They
                  are illustrations rather than photographs of completed jobs —
                  we would rather label them honestly than pass them off as
                  something they are not.
                </span>
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Before / after */}
      <Section tone="paper" className="py-16 sm:py-20">
        <div className="shell">
          <FadeIn>
            <SectionHeading className="max-w-[20ch]">
              Watch a floor change
            </SectionHeading>
            <p className="mt-4 max-w-prose leading-relaxed text-ink/68">
              Toggle between the two states.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            {beforeAfterItems.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.1}>
                <BeforeAfter item={item} />
                <h3 className="mt-5 font-semibold">{item.heading}</h3>
                <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink/62">
                  {item.body}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* Filterable grid */}
      <Section tone="sand" className="py-16 sm:py-20">
        <div className="shell">
          <FadeIn>
            <div className="mb-10 flex flex-wrap gap-2">
              {galleryTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setFilter(tag)}
                  aria-pressed={filter === tag}
                  className={`rounded-pill px-5 py-2.5 text-[0.87rem] font-semibold transition-all duration-200 ${
                    filter === tag
                      ? 'bg-ink text-paper shadow-sm'
                      : 'border border-ink/14 bg-white/60 text-ink/65 hover:border-ink/30 hover:text-ink'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </FadeIn>

          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((item) => (
                <motion.figure
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className={item.wide ? 'sm:col-span-2' : ''}
                >
                  <button
                    type="button"
                    onClick={() => setLightbox(item)}
                    className="group block w-full overflow-hidden rounded-card bg-linen shadow-lift"
                    aria-label={`View larger: ${item.caption}`}
                  >
                    <picture>
                      <source srcSet={item.webp} type="image/webp" />
                      <img
                        src={item.src}
                        alt={item.alt}
                        width={1600}
                        height={1200}
                        loading="lazy"
                        decoding="async"
                        className={`w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.03] ${
                          item.wide ? 'aspect-[16/9]' : 'aspect-[4/3]'
                        }`}
                      />
                    </picture>
                  </button>
                  <figcaption className="mt-3 flex items-start justify-between gap-4">
                    <p className="text-[0.88rem] leading-snug text-ink/65">
                      {item.caption}
                    </p>
                    <span className="shrink-0 rounded-pill bg-ink/6 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-ink/50">
                      {item.tag}
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </Section>

      <Section tone="dark" rounded className="py-16 sm:py-20">
        <div className="shell text-center">
          <FadeIn>
            <SectionHeading className="mx-auto max-w-[20ch]">
              Seen a finish you like?
            </SectionHeading>
            <p className="mx-auto mt-5 max-w-prose leading-relaxed text-paper/62">
              Tell us which one and we will bring samples to the house so you
              can see it against your own light and your own walls.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="/contact/"
                className="inline-flex items-center gap-2 rounded-pill bg-oak px-8 py-4 font-semibold text-white shadow-lift transition hover:bg-oak-deep"
              >
                Get a free estimate
              </a>
              <CallButton size="lg" invert />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/92 p-4 sm:p-10"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.caption}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 text-paper transition hover:bg-paper/10"
            >
              <X size={20} strokeWidth={2.2} aria-hidden="true" />
            </button>
            <motion.figure
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-full w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <picture>
                <source srcSet={lightbox.webp} type="image/webp" />
                <img
                  src={lightbox.src}
                  alt={lightbox.alt}
                  className="max-h-[78vh] w-full rounded-2xl object-contain"
                />
              </picture>
              <figcaption className="mt-4 text-center text-[0.92rem] text-paper/72">
                {lightbox.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
