import { site, absUrl, addressLine } from '../site.config'

/**
 * Structured data builders.
 *
 * ─── TWO RULES THAT ARE NEVER BROKEN HERE ────────────────────────────────
 *
 * 1. NO `aggregateRating` AND NO `review` ON THE BUSINESS NODE.
 *    Google's review-snippet documentation: "If the entity that's being
 *    reviewed controls the reviews about itself, their pages that use
 *    LocalBusiness or any other type of Organization structured data are
 *    ineligible for star review feature." Adding Travis's own Google reviews
 *    here would make the whole domain ineligible for stars, permanently, in
 *    exchange for nothing. Real reviews go on the page as plain HTML instead.
 *
 * 2. NO PROPERTY IS EMITTED THAT WE CANNOT BACK UP.
 *    Google: "Your structured data must be a true representation of the page
 *    content." An absent property beats an invented one. Anything unverified
 *    in site.config.ts is omitted here rather than guessed at.
 *
 * ─── ON THE @type ────────────────────────────────────────────────────────
 * schema.org has no flooring-contractor type. The subtypes of
 * HomeAndConstructionBusiness are Plumber, Electrician, RoofingContractor,
 * HousePainter, GeneralContractor, HVACBusiness, Locksmith and MovingCompany
 * — none of them fit. So we use the nearest real ancestor,
 * HomeAndConstructionBusiness ("A LocalBusiness that provides services around
 * homes and buildings"), plus `additionalType` pointing at an external
 * vocabulary, which is schema.org's sanctioned escape hatch. Inventing
 * "FlooringContractor" would be invalid markup.
 */

const BUSINESS_ID = `${site.url}/#business`
const WEBSITE_ID = `${site.url}/#website`
const LOGO_ID = `${site.url}/#logo`

type JsonLd = Record<string, unknown>

/** The LocalBusiness node. Emitted once, on the homepage. */
export function businessSchema(): JsonLd {
  const node: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': BUSINESS_ID,
    additionalType: 'https://en.wikipedia.org/wiki/Wood_flooring',
    name: site.name,
    legalName: site.legalName,
    description: `Hardwood floor installation, sanding and refinishing in ${site.address.locality}, ${site.address.regionName}. Owner-operated by ${site.owner}.`,
    url: absUrl('/'),
    telephone: site.phone.e164,
    // `foundingDate` is deliberately omitted — sources disagree by two decades
    // (see site.config.ts). Structured data must be a true representation.
    founder: { '@type': 'Person', name: site.owner },
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: site.serviceArea.map((name) => ({ '@type': 'City', name })),
    knowsLanguage: ['en-US'],
    logo: {
      '@type': 'ImageObject',
      '@id': LOGO_ID,
      url: absUrl('/media/logo.png'),
      caption: site.name,
    },
    image: [absUrl('/media/hero.jpg')],
    hasOfferCatalog: { '@id': `${site.url}/#services` },
  }

  // Only claim opening hours once someone has actually confirmed them.
  if (site.hours.verified) {
    node.openingHoursSpecification = [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: site.hours.weekdays.opens,
        closes: site.hours.weekdays.closes,
      },
    ]
  }

  // sameAs is identity, not rating — always safe, and it ties the profiles
  // together into one entity. Only include links that actually exist.
  const sameAs = [
    site.profiles.facebook,
    site.profiles.bbb,
    site.profiles.google,
  ].filter((u): u is string => Boolean(u))
  if (sameAs.length) node.sameAs = sameAs

  if (site.email) node.email = site.email

  return node
}

export function websiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absUrl('/'),
    name: site.name,
    publisher: { '@id': BUSINESS_ID },
    inLanguage: 'en-US',
  }
}

/**
 * A single service offering. `Service` is an Intangible, NOT a LocalBusiness —
 * conflating the two is the most common error in agency-generated markup.
 * The business is the `provider`; the service is the thing provided.
 */
export function serviceSchema(opts: {
  name: string
  description: string
  path: string
  serviceType: string
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absUrl(opts.path)}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: absUrl(opts.path),
    provider: { '@id': BUSINESS_ID },
    areaServed: site.serviceArea.map((name) => ({ '@type': 'City', name })),
  }
}

/** Breadcrumbs are one of the few rich results genuinely available here. */
export function breadcrumbSchema(
  trail: { name: string; path: string }[]
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absUrl(crumb.path),
    })),
  }
}

/**
 * FAQPage markup.
 *
 * Honest note: Google retired the FAQ rich result — it stopped appearing in
 * Search on 7 May 2026 and the documentation was removed on 15 June 2026.
 * This markup will NOT produce stars, accordions or extra SERP real estate,
 * and must never be sold to a client as if it will. It is emitted because it
 * is valid schema.org, it costs nothing, Google has confirmed retired markup
 * "won't cause issues in Search", and non-Google consumers still read it.
 */
export function faqSchema(faqs: { q: string; a: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function webPageSchema(opts: {
  title: string
  description: string
  path: string
  dateModified: string
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absUrl(opts.path)}#webpage`,
    url: absUrl(opts.path),
    name: opts.title,
    description: opts.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
    dateModified: opts.dateModified,
    inLanguage: 'en-US',
  }
}

/** Convenience: the full offer catalogue, emitted on the homepage. */
export function offerCatalogSchema(
  services: { name: string; path: string }[]
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${site.url}/#services`,
    name: `${site.name} services`,
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.name,
        url: absUrl(s.path),
        provider: { '@id': BUSINESS_ID },
      },
    })),
  }
}

export { addressLine }
