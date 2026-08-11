import { Phone, MapPin, Clock, Facebook } from 'lucide-react'
import Seo from '../components/Seo'
import FadeIn from '../components/FadeIn'
import ContactForm from '../components/ContactForm'
import { Section, Kicker } from '../components/Section'
import { site, cityState, addressLine } from '../site.config'
import { breadcrumbSchema, webPageSchema, businessSchema } from '../lib/schema'

const LAST_UPDATED = '2026-08-11'

export default function Contact() {
  return (
    <>
      <Seo
        title={`Contact Beck's Hardwood Floors | ${cityState}`}
        description="Get a free hardwood flooring estimate in Winston-Salem. Call (336) 764-2395 or send the details of your floors and Travis Beck will get back to you."
        path="/contact/"
        schema={[
          businessSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact/' },
          ]),
          webPageSchema({
            title: 'Contact',
            description: 'Get a free hardwood flooring estimate in Winston-Salem, NC.',
            path: '/contact/',
            dateModified: LAST_UPDATED,
          }),
        ]}
      />

      <section className="bg-sand pt-[76px]">
        <div className="shell py-14 lg:py-18">
          <FadeIn y={22}>
            <Kicker>Free estimate</Kicker>
            <h1
              className="h-display max-w-[15ch]"
              style={{ fontSize: 'clamp(2.3rem, 6.2vw, 4.4rem)' }}
            >
              Let&apos;s look at your floors
            </h1>
            <p className="mt-6 max-w-prose text-[1.05rem] leading-relaxed text-ink/72">
              Tell us what you have and what is wrong with it, and{' '}
              {site.owner.split(' ')[0]} will come and look. Estimates are free
              and the scope goes in writing — tear-out, debris and trim
              included, so nothing is left to assume. Calling is always the
              fastest route.
            </p>
          </FadeIn>
        </div>
      </section>

      <Section tone="paper" className="py-14 sm:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <FadeIn>
            <ContactForm />
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="space-y-8">
              <div className="rounded-card border border-ink/10 bg-sand p-7">
                <h2 className="mb-5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink/45">
                  Reach us directly
                </h2>
                <address className="space-y-5 not-italic">
                  <a
                    href={`tel:${site.phone.e164}`}
                    className="flex items-start gap-3.5 transition hover:text-oak"
                    data-cta="call-contact"
                  >
                    <Phone size={18} strokeWidth={2.4} className="mt-1 shrink-0 text-oak" aria-hidden="true" />
                    <span>
                      <span className="block text-[0.78rem] font-semibold uppercase tracking-wide text-ink/45">
                        Phone
                      </span>
                      <span className="text-[1.15rem] font-bold">
                        {site.phone.display}
                      </span>
                    </span>
                  </a>

                  <div className="flex items-start gap-3.5">
                    <MapPin size={18} strokeWidth={2.4} className="mt-1 shrink-0 text-oak" aria-hidden="true" />
                    <span>
                      <span className="block text-[0.78rem] font-semibold uppercase tracking-wide text-ink/45">
                        Office
                      </span>
                      <span className="text-ink/72">{addressLine}</span>
                      <span className="mt-1.5 block text-[0.8rem] leading-relaxed text-ink/45">
                        An office, not a showroom — we bring samples to you and
                        quote at the house.
                      </span>
                    </span>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock size={18} strokeWidth={2.4} className="mt-1 shrink-0 text-oak" aria-hidden="true" />
                    <span>
                      <span className="block text-[0.78rem] font-semibold uppercase tracking-wide text-ink/45">
                        Hours
                      </span>
                      <span className="text-ink/72">
                        Monday to Friday, 8am – 5pm
                      </span>
                      <span className="block text-ink/45">Closed weekends</span>
                    </span>
                  </div>

                  <a
                    href={site.profiles.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 transition hover:text-oak"
                  >
                    <Facebook size={18} strokeWidth={2.4} className="mt-1 shrink-0 text-oak" aria-hidden="true" />
                    <span>
                      <span className="block text-[0.78rem] font-semibold uppercase tracking-wide text-ink/45">
                        Facebook
                      </span>
                      <span className="text-ink/72">Beck&apos;s Hardwood Floors</span>
                    </span>
                  </a>
                </address>
              </div>

              <div className="rounded-card border border-ink/10 p-7">
                <h2 className="mb-3 font-bold">Where we work</h2>
                <p className="text-[0.92rem] leading-relaxed text-ink/65">
                  {cityState} and across {site.address.county} —{' '}
                  {site.serviceArea.slice(1).join(', ')}. Not sure if you are in
                  range? Call and ask.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  )
}
