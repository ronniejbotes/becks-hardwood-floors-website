/**
 * Single source of truth for the business's NAP (Name, Address, Phone) and
 * every other hard fact that appears on the site or in structured data.
 *
 * NAP consistency between this file, the Google Business Profile and every
 * directory listing is the thing that makes the business one unambiguous
 * entity to a search engine. Change it here, nowhere else.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * PROVENANCE — every value below is traceable to a source.
 *   [GBP]  Google Business Profile listing
 *   [BBB]  https://www.bbb.org/us/nc/winston-salem/profile/
 *          hardwood-floor-contractors/becks-hardwood-floors-0503-235955470
 *   [TODO] NOT VERIFIED — must be confirmed with Travis before launch.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const site = {
  /** [GBP] Google spells it with the apostrophe. BBB drops it. Google wins —
   *  it is the customer-facing listing and the one people search. */
  name: "Beck's Hardwood Floors",
  legalName: 'Becks Hardwood Floors', // [BBB] sole proprietorship
  owner: 'Travis Beck', // [BBB] "Mr. Travis Beck, Owner"

  /**
   * ⚠ FOUNDING YEAR IS GENUINELY CONFLICTED — DO NOT PUBLISH A "SINCE YYYY".
   *
   *   BBB .............. "Business Started: 2/1/2009" (17 years)
   *   Manta ............ "proudly doing business for 37 years" (≈1989)
   *   Their own 2011 site "serving the Winston Salem, NC area for over 20
   *                       years" (≤1991)
   *
   * The likeliest reading is that Travis worked the trade from the late 1980s
   * and registered the sole proprietorship in 2009 — but that is inference,
   * not fact, so it does not go on a page.
   *
   * `experienceFloor` is the only claim true under EVERY source: even the most
   * conservative record (BBB, 2009) clears 15 years. Ask Travis to confirm the
   * real date — if it is genuinely 1989 he is leaving a much stronger selling
   * point on the table.
   */
  founding: {
    verified: false,
    experienceFloor: 15,
    sources: {
      bbb: 2009,
      manta: 1989,
      ownSite2011: 1991,
    },
  },

  /**
   * Canonical origin. Every canonical tag, og:url and schema @id is built from
   * this, so it MUST match the host the files are actually served from.
   *
   * Override at build time for preview deploys:
   *   VITE_SITE_URL=https://lightcyan-curlew-520407.hostingersite.com npm run build
   *
   * Or just use `npm run build:preview`, which also sets VITE_NOINDEX.
   */
  url:
    (import.meta.env?.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
    'https://beckshardwoodfloors.com',

  /**
   * When true every page emits `noindex, nofollow` and no sitemap is written.
   *
   * This is not optional housekeeping for a preview build. A demo site for an
   * unsold client, indexed on a hostingersite.com subdomain, means: a duplicate
   * of the real site competing with it later, a client's business name ranking
   * on a URL nobody controls long-term, and AI-generated placeholder photos
   * publicly attributed to a real contractor. Keep it on for every preview.
   */
  noindex: import.meta.env?.VITE_NOINDEX === '1',

  phone: {
    display: '(336) 764-2395', // [GBP] and [BBB]
    /** E.164 for tel: links and schema. Country code is required. */
    e164: '+13367642395',
  },

  /** [TODO] Not published on GBP or BBB. Placeholder until Travis confirms —
   *  the contact form is the working channel in the meantime. */
  email: null as string | null,

  address: {
    /** Suite G confirmed via The Blue Book: "12133 N.C. Hwy. 150 N., Suite G". */
    street: '12133 NC Highway 150 N, Suite G',
    locality: 'Winston-Salem',
    region: 'NC',
    regionName: 'North Carolina',
    postalCode: '27127', // [BBB] gives ZIP+4 as 27127-8011
    country: 'US',
    county: 'Forsyth County', // first-party: "We are located in Forsyth County."
    /**
     * This is a unit in a multi-tenant building (other occupants include an
     * insurance agency and a hair salon) — it is NOT a showroom. Never write
     * copy inviting customers to "visit our showroom" or "browse samples
     * in store".
     */
    isShowroom: false,
  },

  /** Verified Mon–Fri 8–5, Sat/Sun closed, from Google's data via Birdeye:
   *  https://reviews.birdeye.com/becks-hardwood-floors-156200711212394 */
  hours: {
    verified: true,
    weekdays: { opens: '08:00', closes: '17:00' },
    saturday: null, // closed
    sunday: null, // closed
  },

  /** Towns close enough to Winston-Salem to be defensible. Deliberately short.
   *  Do NOT build a page per town — that is Google's doorway-page pattern. */
  serviceArea: [
    'Winston-Salem',
    'Clemmons',
    'Lewisville',
    'Kernersville',
    'Advance',
    'Pfafftown',
    'Tobaccoville',
    'King',
    'Walkertown',
  ],

  /** Profiles that describe this same business. `sameAs` is identity, not
   *  rating — safe and useful, unlike review markup. */
  profiles: {
    /** Canonical Facebook URL (page id 100064824708405). Dormant, 61 likes. */
    facebook: 'https://www.facebook.com/people/Becks-Hardwood-Floors/100064824708405/',
    bbb: 'https://www.bbb.org/us/nc/winston-salem/profile/hardwood-floor-contractors/becks-hardwood-floors-0503-235955470',
    nextdoor: 'https://nextdoor.com/pages/becks-hardwood-floors-winston-salem-nc/',
    /** [TODO] Replace with the real Google Maps place URL once we have the
     *  place_id. Needed for the "read our reviews" link and hasMap. */
    google: null as string | null,
  },

  /**
   * ⚠ CLAIMS THAT MUST NEVER APPEAR ON THIS SITE — each was checked and failed.
   *
   *  "BBB A+ rated" / "BBB accredited"
   *      FALSE. Google's AI summaries assert this; the actual BBB profile says
   *      "Not Rated — BBB does not have sufficient information to issue a
   *      rating" and the business is NOT accredited. Publishing it is a
   *      checkable lie on the one page a cautious buyer will verify.
   *
   *  "Fully insured" / "licensed and insured"
   *      UNCONFIRMED. The only source is Travis's own 2011 website. Fifteen
   *      years stale. Get a current certificate of insurance before this goes
   *      anywhere near the page — it is a strong trust signal once evidenced.
   *
   *  "NWFA member" / any certification
   *      No trade-association membership found on any source.
   *
   *  Any "since YYYY" or "X years in business"
   *      See `founding` above. Sources disagree by two decades.
   *
   *  aggregateRating / review structured data
   *      Self-serving. Makes the domain ineligible for star features. See
   *      src/lib/schema.ts.
   */
  doNotPublish: true,

  /** Google Business Profile primary category, mirrored for consistency. */
  primaryCategory: 'Flooring contractor', // [GBP]
} as const

/** Absolute URL builder — canonicals and schema must never be relative. */
export function absUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${site.url}${clean === '/' ? '/' : clean}`
}

/** "Winston-Salem, NC" — used in headings and answer blocks. */
export const cityState = `${site.address.locality}, ${site.address.region}`

/** Single formatted street address line. */
export const addressLine = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`
