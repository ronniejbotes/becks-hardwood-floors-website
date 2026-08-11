import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock, Facebook } from 'lucide-react'
import { site, addressLine } from '../site.config'
import { services } from '../content/services'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-espresso text-paper">
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr] lg:gap-16">
          {/* Brand + NAP. This block is the on-page NAP; it must match the
              Google Business Profile character for character. */}
          <div>
            <div className="flex flex-col leading-none">
              <span className="h-section text-2xl">Beck&apos;s</span>
              <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-oak-soft">
                Hardwood Floors
              </span>
            </div>

            <p className="mt-5 max-w-sm text-[0.93rem] leading-relaxed text-paper/62">
              Hardwood floor installation, sanding and refinishing in
              Winston-Salem and across Forsyth County. Owner-operated by{' '}
              {site.owner}.
            </p>

            <address className="mt-7 space-y-3.5 not-italic text-[0.93rem]">
              <a
                href={`tel:${site.phone.e164}`}
                className="flex items-center gap-3 text-paper transition hover:text-oak-soft"
              >
                <Phone size={16} strokeWidth={2.3} className="shrink-0 text-oak-soft" aria-hidden="true" />
                <span className="font-semibold">{site.phone.display}</span>
              </a>
              <p className="flex items-start gap-3 text-paper/62">
                <MapPin size={16} strokeWidth={2.3} className="mt-0.5 shrink-0 text-oak-soft" aria-hidden="true" />
                <span>{addressLine}</span>
              </p>
              {site.hours.verified && (
                <p className="flex items-start gap-3 text-paper/62">
                  <Clock size={16} strokeWidth={2.3} className="mt-0.5 shrink-0 text-oak-soft" aria-hidden="true" />
                  <span>
                    Monday to Friday, 8am–5pm
                    <br />
                    <span className="text-paper/45">Closed weekends</span>
                  </span>
                </p>
              )}
            </address>

            {/* Not a showroom — the address is a unit in a shared building. */}
            <p className="mt-4 max-w-sm text-[0.78rem] leading-relaxed text-paper/38">
              Our address is an office, not a showroom — we bring samples to
              you and quote on site.
            </p>
          </div>

          <nav aria-label="Services">
            <h2 className="mb-5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-oak-soft">
              What we do
            </h2>
            <ul className="space-y-3 text-[0.93rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={s.path}
                    className="text-paper/68 transition hover:text-paper"
                  >
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="mb-5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-oak-soft">
              Company
            </h2>
            <ul className="space-y-3 text-[0.93rem]">
              <li>
                <Link to="/gallery/" className="text-paper/68 transition hover:text-paper">
                  Before &amp; after
                </Link>
              </li>
              <li>
                <Link to="/about/" className="text-paper/68 transition hover:text-paper">
                  About Travis
                </Link>
              </li>
              <li>
                <Link to="/contact/" className="text-paper/68 transition hover:text-paper">
                  Get a free estimate
                </Link>
              </li>
              <li>
                <a
                  href={site.profiles.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-paper/68 transition hover:text-paper"
                >
                  <Facebook size={15} strokeWidth={2.2} aria-hidden="true" />
                  Facebook
                </a>
              </li>
            </ul>

            <h2 className="mb-4 mt-9 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-oak-soft">
              Areas served
            </h2>
            <p className="text-[0.88rem] leading-relaxed text-paper/55">
              {site.serviceArea.join(' · ')}
            </p>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t rule-invert pt-8 text-[0.8rem] text-paper/42 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {site.address.county}, {site.address.regionName}.
          </p>
          <p>
            Site by{' '}
            <span className="text-paper/62">Cognexa</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
