/**
 * Real, published customer reviews.
 *
 * ─── RULES ────────────────────────────────────────────────────────────────
 * 1. Every word here is quoted verbatim from a publicly published review.
 *    Nothing is written, embellished, tidied or invented. If Travis wants a
 *    testimonial that does not exist yet, he has to go and earn it.
 * 2. These are rendered as plain HTML only. They are NOT wrapped in Review or
 *    aggregateRating structured data — a business marking up reviews about
 *    itself is self-serving under Google's rules and makes the whole domain
 *    ineligible for star features. See src/lib/schema.ts.
 * 3. The section links out to the full review source so anyone can check, and
 *    so nobody can claim we cherry-picked in the dark. Beck's has a 1-star
 *    review too; the link goes to the page that shows it.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type Review = {
  name: string
  /** Where it was published, for attribution. */
  platform: string
  /** Approximate date as published. */
  when: string
  location?: string
  /** Verbatim. Do not edit for tone, length or grammar. */
  quote: string
  /** True where the source shows visible truncation — we do not complete it. */
  truncated?: boolean
}

export const reviews: Review[] = [
  {
    name: 'Kristin Rutherford',
    platform: 'Google',
    when: 'January 2021',
    quote:
      'We recently replaced all of the flooring in our home with waterproof floors. Travis Beck and his crew were wonderful! They worked around our schedule, doing the downstairs and upstairs separately to accommodate us being out of town! They did a great job and were very professional! One of the few contractors I have worked with that were not just on time but early! Very reasonably priced and a great experience! Would recommend to anyone wanting to replace or update their floors!',
  },
  {
    name: 'James Tolentino',
    platform: 'Google',
    when: 'Around 2018',
    quote:
      'Beck’s hard wood floors is a quality hardwood installer with years of experience (so I was assured) and it showed. I had Beck install hardwoods throughout my entire house with 5" hand cut hardwoods and I when they finished my jaws dropped. The job was completely dazzling. His crew came in and tore out the existing rugs and began to lay the wood out in a systematic and efficient manner that left me utterly impressed…',
    truncated: true,
  },
  {
    name: 'S. S.',
    platform: 'Nextdoor',
    when: 'Verified in 2017',
    location: 'Clemmons, NC',
    quote:
      'We recently used Beck’s Harwoods and they did a great job. They have been in business for years and know what they are doing.',
  },
]

/** Where a reader can check every review, including the critical one. */
export const reviewSource = {
  label: 'Read every review, good and bad',
  url: 'https://reviews.birdeye.com/becks-hardwood-floors-156200711212394',
}
