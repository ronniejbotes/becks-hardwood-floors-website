import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Clock, Phone } from 'lucide-react'
import Seo from '../components/Seo'
import FadeIn from '../components/FadeIn'
import { Section, Kicker, SectionHeading } from '../components/Section'
import { CallButton } from '../components/Buttons'
import { site, cityState, addressLine } from '../site.config'
import { reviews, reviewSource } from '../content/reviews'
import { breadcrumbSchema, webPageSchema } from '../lib/schema'

const LAST_UPDATED = '2026-08-11'

/**
 * About page.
 *
 * A named, real human on an About page is one of the strongest trust signals a
 * small contractor site has. Everything below is drawn from verifiable public
 * record or quoted directly from published reviews.
 *
 * ⚠ WHAT IS DELIBERATELY MISSING, AND WHY:
 *   - No origin story, no "Travis grew up…", no family history. None of that is
 *     on public record and inventing it is exactly the kind of thing that gets
 *     caught out. The block marked NEEDS TRAVIS below is where it goes once he
 *     tells us.
 *   - No "fully insured", no license number, no NWFA membership. See the
 *     doNotPublish notes in src/site.config.ts.
 *   - No founding year. Sources disagree by two decades.
 */
export default function About() {
  return (
    <>
      <Seo
        title={`About Travis Beck | Beck's Hardwood Floors`}
        description="Beck's Hardwood Floors is owner-operated by Travis Beck in Winston-Salem, NC. He quotes the work himself and runs the crew that does it."
        path="/about/"
        image="/media/sanding.jpg"
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about/' },
          ]),
          webPageSchema({
            title: 'About Travis Beck',
            description:
              'Owner-operated hardwood flooring in Winston-Salem, North Carolina.',
            path: '/about/',
            dateModified: LAST_UPDATED,
          }),
        ]}
      />

      <section className="bg-sand pt-[76px]">
        <div className="shell py-14 lg:py-20">
          <FadeIn y={24}>
            <Kicker>The person doing the work</Kicker>
            <h1
              className="h-display max-w-[16ch]"
              style={{ fontSize: 'clamp(2.3rem, 6.2vw, 4.6rem)' }}
            >
              Beck&apos;s is {site.owner}
            </h1>
            <p className="mt-6 max-w-prose text-[1.05rem] leading-relaxed text-ink/72">
              Beck&apos;s Hardwood Floors is a sole proprietorship in{' '}
              {cityState}, owned and run by {site.owner}. He looks at the floor,
              works out what it needs, prices the job and runs the crew that
              does it. When you call the number on this site, you are calling
              the person who will be standing in your living room.
            </p>
          </FadeIn>
        </div>
      </section>

      <Section tone="paper" className="py-16 sm:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="copy">
            <FadeIn>
              <h2
                className="h-section mb-5"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
              >
                What Beck&apos;s actually specializes in
              </h2>
              <p className="mb-4 text-ink/70">
                Two things, mainly: putting hardwood floors in, and bringing old
                ones back. That has been the description of the business since
                at least its first website, which listed installation, sanding,
                and prefinished, unfinished and laminated flooring. The Facebook
                page still describes the business the same way today.
              </p>
              <p className="mb-4 text-ink/70">
                Around that sits the work those two jobs pull in — tearing out
                old carpet and vinyl before a new floor goes down, fitting
                waterproof vinyl plank in the rooms where solid wood is the
                wrong material, stairs and treads, and replacing boards that
                have been damaged.
              </p>
            </FadeIn>

            <FadeIn>
              <h2
                className="h-section mb-5 mt-12"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
              >
                How the work runs
              </h2>
              <p className="mb-4 text-ink/70">
                Beck&apos;s works with a small crew rather than subcontracting
                the job out to whoever is available. The reviews describe it
                consistently: turning up early rather than late, and splitting a
                whole-house job into upstairs and downstairs so a family could be
                away for part of it.
              </p>
              <p className="mb-4 text-ink/70">
                We also put the scope in writing before starting — what comes
                up, what gets hauled away, whether shoe molding and thresholds
                are in the price. That is not a flourish. It is the single most
                common thing that goes wrong on a flooring job, and it is
                avoidable with one conversation at the estimate.
              </p>
            </FadeIn>

            {/* ⚠ NEEDS TRAVIS — see file header. */}
            <FadeIn>
              <h2
                className="h-section mb-5 mt-12"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
              >
                Straight answers over easy ones
              </h2>
              <p className="mb-4 text-ink/70">
                A lot of what a good flooring contractor does is talk people out
                of the more expensive job. A floor that only looks dull often
                needs a recoat, not a full sand. A floor with hardly any wear
                layer left should not be sanded at all. A basement should not
                get solid hardwood, whatever it costs.
              </p>
              <p className="mb-4 text-ink/70">
                Those answers are on the service pages of this site with the
                trade body&apos;s guidance cited next to them, so you can check
                them before anyone quotes you — including us.
              </p>
              <Link
                to="/refinishing/"
                className="mt-2 inline-flex items-center gap-2 font-semibold text-ink underline decoration-oak decoration-2 underline-offset-4 transition hover:text-oak"
              >
                Refinish or recoat? Read the difference
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </FadeIn>
          </div>

          {/* Details card */}
          <FadeIn delay={0.12}>
            <div
              className="sticky space-y-6 rounded-card border border-ink/10 bg-sand p-7"
              style={{ top: 'calc(var(--header-h) + 32px)' }}
            >
              <div>
                <h2 className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink/45">
                  The details
                </h2>
                <dl className="space-y-4 text-[0.92rem]">
                  <div>
                    <dt className="font-semibold">Owner</dt>
                    <dd className="text-ink/65">{site.owner}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Business type</dt>
                    <dd className="text-ink/65">Sole proprietorship</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Based in</dt>
                    <dd className="text-ink/65">
                      {site.address.county}, {site.address.regionName}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border-t rule pt-6">
                <address className="space-y-3.5 not-italic text-[0.92rem]">
                  <a
                    href={`tel:${site.phone.e164}`}
                    className="flex items-center gap-3 font-semibold transition hover:text-oak"
                  >
                    <Phone size={16} strokeWidth={2.4} className="text-oak" aria-hidden="true" />
                    {site.phone.display}
                  </a>
                  <p className="flex items-start gap-3 text-ink/65">
                    <MapPin size={16} strokeWidth={2.4} className="mt-0.5 shrink-0 text-oak" aria-hidden="true" />
                    <span>{addressLine}</span>
                  </p>
                  <p className="flex items-start gap-3 text-ink/65">
                    <Clock size={16} strokeWidth={2.4} className="mt-0.5 shrink-0 text-oak" aria-hidden="true" />
                    <span>
                      Mon–Fri, 8am–5pm
                      <br />
                      <span className="text-ink/45">Closed weekends</span>
                    </span>
                  </p>
                </address>
                <p className="mt-4 text-[0.78rem] leading-relaxed text-ink/45">
                  The address is an office, not a showroom. Samples come to you.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Reviews */}
      <Section tone="dark" rounded className="py-16 sm:py-24">
        <div className="shell">
          <FadeIn>
            <Kicker invert>Unedited</Kicker>
            <SectionHeading className="max-w-[18ch]">
              What people have written
            </SectionHeading>
            <p className="mt-5 max-w-prose leading-relaxed text-paper/62">
              Quoted word for word from public reviews. Beck&apos;s has a
              critical review as well as good ones, and the link below goes to
              the page showing all of them.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((review, i) => (
              <FadeIn key={review.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-card border rule-invert p-7">
                  <blockquote className="flex-1 leading-relaxed text-paper/78">
                    &ldquo;{review.quote}&rdquo;
                    {review.truncated && (
                      <span className="text-paper/40"> [continues]</span>
                    )}
                  </blockquote>
                  <figcaption className="mt-6 border-t rule-invert pt-5 text-[0.85rem]">
                    <span className="font-semibold">{review.name}</span>
                    <span className="block text-paper/45">
                      {review.location ? `${review.location} · ` : ''}
                      {review.platform}, {review.when}
                    </span>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href={reviewSource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-oak-soft underline decoration-2 underline-offset-4"
              >
                {reviewSource.label}
              </a>
              <CallButton invert />
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  )
}
