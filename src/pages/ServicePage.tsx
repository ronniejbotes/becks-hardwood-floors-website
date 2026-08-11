import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, ExternalLink, Info } from 'lucide-react'
import Seo from '../components/Seo'
import FadeIn from '../components/FadeIn'
import DataTable from '../components/DataTable'
import FaqAccordion from '../components/FaqAccordion'
import ContactForm from '../components/ContactForm'
import { Section, Kicker, SectionHeading } from '../components/Section'
import { CallButton } from '../components/Buttons'
import { site, cityState } from '../site.config'
import { services, type Service } from '../content/services'
import {
  serviceSchema,
  breadcrumbSchema,
  webPageSchema,
  faqSchema,
} from '../lib/schema'

const LAST_UPDATED = '2026-08-11'
const LAST_UPDATED_LABEL = 'August 11, 2026'

/** React 18 renders only the lowercase DOM attribute; @types/react 18 declares
 *  only the camelCase prop. Spreading satisfies both. */
const HIGH_PRIORITY = { fetchpriority: 'high' } as Record<string, string>

/**
 * Shared template for the four service pages.
 *
 * One template, four genuinely different content objects — this is NOT the
 * doorway-page pattern, which is the same content with the place name swapped.
 * Each page answers a different buying question with its own sourced material.
 */
export default function ServicePage({ service }: { service: Service }) {
  const others = services.filter((s) => s.slug !== service.slug)

  return (
    <>
      <Seo
        title={service.title}
        description={service.metaDescription}
        path={service.path}
        image={service.heroImage}
        schema={[
          serviceSchema({
            name: service.navLabel,
            description: service.answerBlock,
            path: service.path,
            serviceType: service.h1,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: service.navLabel, path: service.path },
          ]),
          webPageSchema({
            title: service.h1,
            description: service.metaDescription,
            path: service.path,
            dateModified: LAST_UPDATED,
          }),
          faqSchema(service.faqs),
        ]}
      />

      {/* ─────────────────────────────── HERO ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-sand pt-[76px]">
        <div className="shell grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-20">
          <div>
            {/* Breadcrumbs — matched by BreadcrumbList schema above. */}
            <nav aria-label="Breadcrumb" className="mb-7">
              <ol className="flex items-center gap-1.5 text-[0.82rem] text-ink/55">
                <li>
                  <Link to="/" className="transition hover:text-ink">
                    Home
                  </Link>
                </li>
                <ChevronRight size={13} aria-hidden="true" />
                <li aria-current="page" className="font-medium text-ink/80">
                  {service.navLabel}
                </li>
              </ol>
            </nav>

            <FadeIn y={26}>
              <h1
                className="h-display"
                style={{ fontSize: 'clamp(2.15rem, 5.6vw, 4.3rem)' }}
              >
                {service.h1}
              </h1>
              <p className="mt-4 text-[1.05rem] font-medium text-oak-deep">
                {service.tagline}
              </p>

              {/* Answer block. The single most important paragraph here. */}
              <p className="mt-6 max-w-prose text-[1.02rem] leading-relaxed text-ink/72">
                {service.answerBlock}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact/"
                  className="inline-flex items-center gap-2 rounded-pill bg-oak px-7 py-3.5 font-semibold text-white shadow-lift transition-all duration-200 hover:bg-oak-deep hover:shadow-lift-lg"
                >
                  Get a free estimate
                  <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
                </Link>
                <CallButton />
              </div>

              <p className="mt-7 text-[0.78rem] text-ink/45">
                Last updated: {LAST_UPDATED_LABEL}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.14} y={30}>
            <div className="overflow-hidden rounded-card shadow-lift-lg">
              <img
                src={service.heroImage}
                alt={service.heroAlt}
                width={1600}
                height={900}
                {...HIGH_PRIORITY}
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───────────────────────────── SECTIONS ───────────────────────────── */}
      <Section tone="paper" className="py-16 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
          <div className="copy">
            {service.sections.map((section, i) => (
              <FadeIn key={section.id} delay={0.04} y={26}>
                <div
                  id={section.id}
                  className={i !== 0 ? 'mt-14 border-t rule pt-14' : ''}
                >
                  <h2
                    className="h-section mb-5"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
                  >
                    {section.h2}
                  </h2>

                  {/* Self-contained answer, visually distinguished. */}
                  <p className="mb-6 border-l-[3px] border-oak pl-5 text-[1.04rem] font-medium leading-relaxed text-ink/85">
                    {section.answer}
                  </p>

                  {section.detail?.map((para, j) => (
                    <p key={j} className="mb-4 text-ink/68">
                      {para}
                    </p>
                  ))}

                  {section.list && (
                    <ul className="mt-6 space-y-3.5">
                      {section.list.map((li) => (
                        <li
                          key={li.label}
                          className="rounded-2xl border border-ink/10 bg-sand/50 p-5"
                        >
                          <strong className="block text-[0.95rem]">
                            {li.label}
                          </strong>
                          <span className="mt-1 block text-[0.95rem] leading-relaxed text-ink/65">
                            {li.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* The table belongs with the comparison section it explains. */}
                  {service.table &&
                    (section.id === 'oil-or-water' ||
                      section.id === 'solid-or-engineered' ||
                      section.id === 'lvp-limits') && (
                      <DataTable table={service.table} />
                    )}
                </div>
              </FadeIn>
            ))}

            {service.notForYou && (
              <FadeIn>
                <aside className="mt-14 rounded-card border border-oak/25 bg-oak/6 p-7">
                  <div className="mb-3 flex items-center gap-2.5">
                    <Info size={18} strokeWidth={2.4} className="text-oak-deep" aria-hidden="true" />
                    <h2 className="text-[1.05rem] font-bold">
                      When this is the wrong job for you
                    </h2>
                  </div>
                  <p className="leading-relaxed text-ink/72">{service.notForYou}</p>
                </aside>
              </FadeIn>
            )}
          </div>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div
              className="sticky space-y-8"
              style={{ top: 'calc(var(--header-h) + 32px)' }}
            >
              <nav aria-label="On this page">
                <h2 className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink/45">
                  On this page
                </h2>
                <ul className="space-y-2.5 border-l rule pl-4">
                  {service.sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block text-[0.87rem] leading-snug text-ink/62 transition hover:text-oak"
                      >
                        {s.h2}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="rounded-card border border-ink/10 bg-sand p-6">
                <p className="text-[0.92rem] font-semibold">
                  Not sure what your floor needs?
                </p>
                <p className="mt-2 text-[0.87rem] leading-relaxed text-ink/62">
                  A look at the floor settles it in ten minutes, and the
                  estimate is free.
                </p>
                <a
                  href={`tel:${site.phone.e164}`}
                  className="mt-4 inline-block font-semibold text-ink underline decoration-oak decoration-2 underline-offset-4"
                >
                  {site.phone.display}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* ─────────────────────────────── FAQ ──────────────────────────────── */}
      <Section tone="sand" className="py-16 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <FadeIn>
            <Kicker>Questions</Kicker>
            <SectionHeading className="max-w-[14ch]">
              {service.navLabel}, answered
            </SectionHeading>
          </FadeIn>
          <FadeIn delay={0.1}>
            <FaqAccordion faqs={service.faqs} />
          </FadeIn>
        </div>
      </Section>

      {/* ───────────────────────────── SOURCES ────────────────────────────── */}
      <Section tone="paper" className="py-14">
        <div className="shell">
          <FadeIn>
            <h2 className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink/45">
              Sources
            </h2>
            <p className="mb-5 max-w-prose text-[0.87rem] leading-relaxed text-ink/55">
              The technical claims on this page come from the National Wood
              Flooring Association and from manufacturers&apos; own technical
              data sheets, so you can check them rather than take our word for
              it.
            </p>
            <ul className="space-y-2.5">
              {service.sources.map((src) => (
                <li key={src.url}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-start gap-1.5 text-[0.87rem] text-ink/62 underline decoration-ink/25 underline-offset-4 transition hover:text-oak hover:decoration-oak"
                  >
                    {src.label}
                    <ExternalLink size={12} className="mt-1 shrink-0" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>

      {/* ───────────────────── OTHER SERVICES + CTA ───────────────────────── */}
      <Section tone="dark" rounded className="py-18 sm:py-24">
        <div className="shell">
          <FadeIn>
            <Kicker invert>Also from Beck&apos;s</Kicker>
            <SectionHeading className="mb-10 max-w-[18ch]">
              Other work we take on
            </SectionHeading>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((other, i) => (
              <FadeIn key={other.slug} delay={i * 0.07}>
                <Link
                  to={other.path}
                  className="group block h-full rounded-card border rule-invert p-6 transition hover:border-oak-soft/50 hover:bg-paper/5"
                >
                  <h3 className="mb-2 font-semibold">{other.navLabel}</h3>
                  <p className="text-[0.9rem] leading-relaxed text-paper/58">
                    {other.navBlurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-oak-soft">
                    {other.linkLabel}
                    <ArrowRight
                      size={14}
                      strokeWidth={2.5}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.15}>
            <div className="mt-16 grid gap-10 border-t rule-invert pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <SectionHeading className="max-w-[15ch]">
                  Get a free estimate
                </SectionHeading>
                <p className="mt-5 max-w-prose leading-relaxed text-paper/62">
                  {site.owner} looks at the floor himself and puts the scope in
                  writing — tear-out, debris and trim included, so there is
                  nothing to argue about later. Serving {cityState} and{' '}
                  {site.address.county}.
                </p>
                <div className="mt-8">
                  <CallButton size="lg" invert />
                </div>
              </div>
              <div className="text-ink">
                <ContactForm />
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  )
}
