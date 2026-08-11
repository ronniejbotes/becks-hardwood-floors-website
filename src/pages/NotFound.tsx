import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { CallButton } from '../components/Buttons'
import { services } from '../content/services'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found | Beck's Hardwood Floors"
        description="That page does not exist."
        path="/404/"
        noindex
      />
      <section className="flex min-h-[70vh] items-center pt-[76px]">
        <div className="shell py-20">
          <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-oak">
            404
          </p>
          <h1
            className="h-display max-w-[14ch]"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.2rem)' }}
          >
            That page isn&apos;t here
          </h1>
          <p className="mt-5 max-w-prose leading-relaxed text-ink/68">
            The link may be old or mistyped. Everything Beck&apos;s does is
            below, or call and ask.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={s.path}
                  className="inline-block rounded-pill border border-ink/14 bg-white/60 px-5 py-2.5 text-[0.88rem] font-medium transition hover:border-oak hover:text-oak"
                >
                  {s.navLabel}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center rounded-pill bg-oak px-7 py-3.5 font-semibold text-white shadow-lift transition hover:bg-oak-deep"
            >
              Back to the homepage
            </Link>
            <CallButton />
          </div>
        </div>
      </section>
    </>
  )
}
