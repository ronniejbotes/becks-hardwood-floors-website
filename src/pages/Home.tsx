import { Link } from 'react-router-dom'
import { ArrowRight, Check, MapPin, ShieldQuestion } from 'lucide-react'
import Seo from '../components/Seo'
import FadeIn from '../components/FadeIn'
import Magnet from '../components/Magnet'
import ServiceStack from '../components/ServiceStack'
import BeforeAfter from '../components/BeforeAfter'
import FaqAccordion from '../components/FaqAccordion'
import { Section, Kicker, SectionHeading } from '../components/Section'
import { CallButton } from '../components/Buttons'
import ContactForm from '../components/ContactForm'
import { site, cityState } from '../site.config'
import { services } from '../content/services'
import { reviews, reviewSource } from '../content/reviews'
import { beforeAfterItems, scopeChecklist } from '../content/home'
import {
  businessSchema,
  websiteSchema,
  webPageSchema,
  offerCatalogSchema,
  faqSchema,
} from '../lib/schema'

const LAST_UPDATED = '2026-08-11'

/** See the usage note on the hero <img>. */
const HIGH_PRIORITY = { fetchpriority: 'high' } as Record<string, string>

/** Homepage FAQ — the questions people ask before they call anyone. */
const homeFaqs = [
  {
    q: 'How much does it cost to refinish hardwood floors?',
    a: 'Cost depends on square footage, the condition of the floor, whether you are changing color, and which finish goes on. Anyone quoting a firm price before seeing the floor is guessing. Beck’s gives free estimates on site, which is the only way to price the job honestly.',
  },
  {
    q: 'Do you charge for an estimate?',
    a: 'No. Estimates are free. We come and look at the floor, tell you whether it needs a full refinish or just a recoat, and put the scope in writing — including tear-out, debris removal and shoe molding, so there is nothing to argue about later.',
  },
  {
    q: 'How long does a hardwood floor job take?',
    a: 'A refinish depends on square footage and the finish chosen, because water-based products can be coated on consecutive days while oil-based ones need 8 to 12 hours between coats. Installation depends on the material and how much tear-out is involved. You get a day count with the estimate.',
  },
  {
    q: 'What areas do you cover?',
    a: `Beck’s Hardwood Floors works across Winston-Salem and Forsyth County, including ${site.serviceArea.slice(1, 5).join(', ')} and the surrounding towns. If you are not sure whether you are in range, call and ask — it is a short conversation.`,
  },
  {
    q: 'Can I stay in the house during the work?',
    a: 'Often, with a room-by-room schedule. The floors being worked on cannot be walked on for 24 to 48 hours after the final coat, and the work area gets sealed off from the rest of the house. Tell us what you need and the schedule gets built around it.',
  },
  {
    q: 'Is dustless sanding really dust free?',
    a: 'No, and the trade body says so. The National Wood Flooring Association states that dust cannot be completely eliminated from the sanding process. What a good contractor does is contain it — vacuum-fed machines, sealed doorways, covered HVAC returns. Anyone promising zero dust is overselling.',
  },
]

export default function Home() {
  return (
    <>
      <Seo
        // 56 rendered characters — stays inside Google's truncation point
        // while still carrying both money keywords and the city.
        title="Hardwood Floor Refinishing & Installation, Winston-Salem"
        description="Hardwood floor sanding, refinishing and new installation in Winston-Salem and Forsyth County. Owner-operated by Travis Beck. Free estimates — call (336) 764-2395."
        path="/"
        image="/media/hero.jpg"
        schema={[
          businessSchema(),
          websiteSchema(),
          offerCatalogSchema(services.map((s) => ({ name: s.navLabel, path: s.path }))),
          webPageSchema({
            title: `Hardwood Floors ${cityState}`,
            description:
              'Hardwood floor sanding, refinishing and new installation in Winston-Salem and Forsyth County.',
            path: '/',
            dateModified: LAST_UPDATED,
          }),
          faqSchema(homeFaqs),
        ]}
      />

      {/* ─────────────────────────────── HERO ─────────────────────────────── */}
      <section className="relative flex min-h-[calc(100svh-0px)] flex-col justify-end overflow-hidden pt-[76px]">
        <img
          src="/media/hero.jpg"
          alt=""
          width={2000}
          height={1131}
          // The one image that must never lazy-load — it is the LCP element.
          // React 18's DOM renderer does not know the camelCase `fetchPriority`
          // prop (that landed in React 19) but @types/react 18 only declares the
          // camelCase form, so spreading the lowercase attribute satisfies both.
          {...HIGH_PRIORITY}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-bottom"
          aria-hidden="true"
        />
        {/* Legibility scrim. Warm-toned so it does not grey out the wood. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(178deg, rgba(251,248,244,0.97) 0%, rgba(251,248,244,0.9) 32%, rgba(251,248,244,0.55) 55%, rgba(28,23,20,0.12) 100%)',
          }}
          aria-hidden="true"
        />

        <div className="shell relative z-10 flex flex-1 flex-col justify-center pb-16 pt-10 sm:pb-24">
          <FadeIn delay={0.05} y={24}>
            <p className="mb-6 inline-flex items-center gap-2 rounded-pill border border-ink/12 bg-white/60 px-4 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-ink/70 backdrop-blur">
              <MapPin size={13} strokeWidth={2.6} className="text-oak" aria-hidden="true" />
              {cityState} &middot; {site.address.county}
            </p>
          </FadeIn>

          <FadeIn delay={0.12} y={34}>
            <h1
              className="h-display max-w-[16ch]"
              style={{ fontSize: 'clamp(2.9rem, 9.2vw, 8rem)' }}
            >
              Hardwood floors
              <br />
              <span className="text-oak">in Winston-Salem</span>
            </h1>
          </FadeIn>

          {/* Answer block — 40–75 words, self-contained, quotable alone. */}
          <FadeIn delay={0.24} y={22}>
            <p className="mt-7 max-w-[54ch] text-[1.02rem] leading-relaxed text-ink/72 sm:text-[1.12rem]">
              Beck&apos;s Hardwood Floors sands, refinishes and installs wood
              floors across Winston-Salem and Forsyth County. Owner-operated by{' '}
              {site.owner}, who quotes the job himself. Worn floors usually do
              not need replacing — most of the time the floor already in the
              house can be brought back for a fraction of the price.
            </p>
          </FadeIn>

          <FadeIn delay={0.34} y={20}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnet padding={70} strength={5}>
                <Link
                  to="/contact/"
                  className="inline-flex items-center gap-2 rounded-pill bg-oak px-8 py-4 font-semibold text-white shadow-lift transition-all duration-200 hover:bg-oak-deep hover:shadow-lift-lg"
                >
                  Get a free estimate
                  <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
                </Link>
              </Magnet>
              <CallButton size="lg" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───────────────────────── BEFORE / AFTER ─────────────────────────── */}
      <Section tone="sand" className="py-20 sm:py-28">
        <div className="shell">
          <FadeIn>
            <Kicker>See the difference</Kicker>
            <SectionHeading className="max-w-[20ch]">
              What a floor looks like before and after
            </SectionHeading>
            <p className="mt-5 max-w-prose leading-relaxed text-ink/68">
              Switch between the two states to watch the floor change. Most
              people are surprised how much is recoverable — the wood under a
              failed finish is usually fine.
            </p>
          </FadeIn>

          <div className="mt-14 space-y-20 sm:mt-16 lg:space-y-24">
            {beforeAfterItems.map((item, i) => (
              <FadeIn key={item.id} delay={0.05} y={36}>
                {/* Alternating rows must flip the COLUMN WIDTHS as well as the
                    order — reordering alone drops the media into the narrow
                    column and leaves the copy swimming in space. */}
                <div
                  className={`grid items-center gap-8 lg:gap-14 ${
                    i % 2 === 1
                      ? 'lg:grid-cols-[1fr_1.55fr]'
                      : 'lg:grid-cols-[1.55fr_1fr]'
                  }`}
                >
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    <BeforeAfter item={item} />
                  </div>

                  <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                    <Kicker>{item.kicker}</Kicker>
                    <h3
                      className="h-section mb-4"
                      style={{ fontSize: 'clamp(1.45rem, 2.7vw, 2.15rem)' }}
                    >
                      {item.heading}
                    </h3>
                    <p className="max-w-prose leading-relaxed text-ink/68">
                      {item.body}
                    </p>
                    {item.illustration && (
                      <p className="mt-5 text-[0.78rem] leading-relaxed text-ink/45">
                        Illustration of the process, not a photograph of a
                        completed job.
                      </p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* ───────────────────────────── SERVICES ───────────────────────────── */}
      <Section tone="paper" className="py-20 sm:py-28">
        <div className="shell">
          <FadeIn>
            <Kicker>What we do</Kicker>
            <SectionHeading className="max-w-[18ch]">
              Four things, done properly
            </SectionHeading>
          </FadeIn>
        </div>

        <div className="shell mt-14">
          <ServiceStack />
        </div>
      </Section>

      {/* ───────────────────── SCOPE / WHAT'S INCLUDED ────────────────────── */}
      <Section tone="dark" rounded className="py-20 sm:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <FadeIn>
              <Kicker invert>Before you hire anyone</Kicker>
              <SectionHeading className="max-w-[16ch]">
                Five questions worth asking in writing
              </SectionHeading>
              <p className="mt-5 max-w-prose leading-relaxed text-paper/62">
                Almost every flooring dispute comes from scope, not
                workmanship — who moves the furniture, who takes the debris,
                whether the shoe molding is in the price. Ask any contractor
                these five and get the answers on the estimate. Including us.
              </p>
              <div className="mt-8">
                <CallButton invert label="Ask us these now" />
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <dl className="space-y-0">
                {scopeChecklist.map((item, i) => (
                  <div
                    key={item.q}
                    className={`flex gap-5 py-6 ${
                      i !== 0 ? 'border-t rule-invert' : ''
                    }`}
                  >
                    <ShieldQuestion
                      size={20}
                      strokeWidth={2.1}
                      className="mt-0.5 shrink-0 text-oak-soft"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="mb-1.5 font-semibold">{item.q}</dt>
                      <dd className="leading-relaxed text-paper/62">{item.a}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* ───────────────────────────── REVIEWS ────────────────────────────── */}
      <Section tone="paper" className="py-20 sm:py-28">
        <div className="shell">
          <FadeIn>
            <Kicker>In their words</Kicker>
            <SectionHeading className="max-w-[20ch]">
              What customers have said
            </SectionHeading>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((review, i) => (
              <FadeIn key={review.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-card border border-ink/10 bg-white p-7 shadow-lift">
                  <blockquote className="flex-1">
                    <p className="leading-relaxed text-ink/78">
                      &ldquo;{review.quote}&rdquo;
                      {review.truncated && (
                        <span className="text-ink/40"> [continues]</span>
                      )}
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 border-t rule pt-5 text-[0.85rem]">
                    <span className="font-semibold">{review.name}</span>
                    <span className="block text-ink/50">
                      {review.location ? `${review.location} · ` : ''}
                      {review.platform}, {review.when}
                    </span>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.15}>
            <p className="mt-8 text-[0.88rem] text-ink/55">
              These are real published reviews, quoted word for word.{' '}
              <a
                href={reviewSource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink underline decoration-oak decoration-2 underline-offset-2"
              >
                {reviewSource.label}
              </a>{' '}
              — including the critical one.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ──────────────────────────── SERVICE AREA ────────────────────────── */}
      <Section tone="sand" className="py-16 sm:py-20">
        <div className="shell">
          <FadeIn>
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <Kicker>Where we work</Kicker>
                <SectionHeading className="max-w-[18ch]">
                  Winston-Salem and the towns around it
                </SectionHeading>
              </div>
              <ul className="flex max-w-xl flex-wrap gap-2.5">
                {site.serviceArea.map((town) => (
                  <li
                    key={town}
                    className="rounded-pill border border-ink/12 bg-white/70 px-4 py-2 text-[0.87rem] font-medium"
                  >
                    {town}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ─────────────────────────────── FAQ ──────────────────────────────── */}
      <Section tone="paper" className="py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <FadeIn>
            <Kicker>Common questions</Kicker>
            <SectionHeading className="max-w-[14ch]">
              Asked before every job
            </SectionHeading>
            <p className="mt-5 leading-relaxed text-ink/62">
              More detail lives on each service page.
            </p>
            <ul className="mt-6 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={s.path}
                    className="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-oak decoration-2 underline-offset-4 transition hover:text-oak"
                  >
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1}>
            <FaqAccordion faqs={homeFaqs} />
          </FadeIn>
        </div>
      </Section>

      {/* ─────────────────────────────── CTA ──────────────────────────────── */}
      <Section tone="dark" rounded id="quote" className="py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <FadeIn>
            <Kicker invert>Free estimate</Kicker>
            <SectionHeading className="max-w-[16ch]">
              Tell us about your floors
            </SectionHeading>
            <p className="mt-5 max-w-prose leading-relaxed text-paper/62">
              Send the details and {site.owner.split(' ')[0]} will come and look
              at the floor. You will get a written scope covering tear-out,
              debris and trim — not just a number.
            </p>

            <ul className="mt-8 space-y-3.5">
              {[
                'Free, no-obligation estimate',
                'Scope in writing before work starts',
                'Owner quotes the job himself',
                'Straight answer on refinish vs recoat',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check
                    size={18}
                    strokeWidth={2.6}
                    className="mt-0.5 shrink-0 text-oak-soft"
                    aria-hidden="true"
                  />
                  <span className="text-paper/78">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <CallButton size="lg" invert />
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="text-ink">
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  )
}
