/**
 * Gallery.
 *
 * ⚠ EVERY IMAGE HERE IS AI-GENERATED AND IS NOT A PHOTOGRAPH OF BECK'S WORK.
 *
 * They exist so the gallery can be designed, laid out and demonstrated before
 * Travis hands over real job photographs. The page therefore:
 *   - labels itself plainly as showing finishes and floor types rather than
 *     claiming "our recent projects",
 *   - never names a customer, street, neighbourhood or date,
 *   - never says "we did this".
 *
 * ON HANDOVER: drop Travis's real photos into media-src/, re-run
 * `node scripts/optimize-media.mjs`, rewrite these captions around the real
 * jobs, and set `isIllustration` to false so the disclaimer banner disappears.
 */

export const isIllustration = true

export type GalleryItem = {
  src: string
  webp: string
  alt: string
  caption: string
  /** Which service this shows — used for the filter chips. */
  tag: 'Refinishing' | 'Installation' | 'Vinyl plank' | 'Detail'
  /** Grid emphasis. */
  wide?: boolean
}

export const galleryItems: GalleryItem[] = [
  {
    src: '/media/gallery-foyer.jpg',
    webp: '/media/gallery-foyer.webp',
    alt: 'A two-storey entrance foyer with a curved staircase, stained treads and a high-gloss medium-brown hardwood floor',
    caption: 'High-gloss finish on a foyer floor, with stained stair treads to match',
    tag: 'Refinishing',
    wide: true,
  },
  {
    src: '/media/gallery-detail.jpg',
    webp: '/media/gallery-detail.webp',
    alt: 'Close-up of refinished red oak flooring with raking light across the grain and a satin sheen',
    caption: 'Satin finish on red oak — low sheen, grain still visible',
    tag: 'Detail',
  },
  {
    src: '/media/gallery-kitchen.jpg',
    webp: '/media/gallery-kitchen.webp',
    alt: 'A bright kitchen with wide-plank white oak flooring running through it',
    caption: 'Wide-plank white oak carried through a kitchen',
    tag: 'Installation',
  },
  {
    src: '/media/gallery-bedroom.jpg',
    webp: '/media/gallery-bedroom.webp',
    alt: 'An empty bedroom with dark espresso-stained solid hardwood strip flooring',
    caption: 'A dark stain on solid strip flooring',
    tag: 'Refinishing',
  },
  {
    src: '/media/gallery-openplan.jpg',
    webp: '/media/gallery-openplan.webp',
    alt: 'An open-plan living and dining space with continuous light white oak flooring running toward glass doors',
    caption: 'One continuous floor run through an open-plan space',
    tag: 'Installation',
    wide: true,
  },
  {
    src: '/media/gallery-basement.jpg',
    webp: '/media/gallery-basement.webp',
    alt: 'A finished basement family room with warm mid-brown waterproof luxury vinyl plank flooring',
    caption: 'Waterproof vinyl plank in a basement — where solid wood should not go',
    tag: 'Vinyl plank',
  },
  {
    src: '/media/after-refinish.jpg',
    webp: '/media/after-refinish.webp',
    alt: 'A refinished oak floor in an older home, warm honey tone with an even satin sheen',
    caption: 'The same worn floor from the before-and-after, after sanding',
    tag: 'Refinishing',
  },
  {
    src: '/media/after-install.jpg',
    webp: '/media/after-install.webp',
    alt: 'Newly installed wide-plank white oak flooring in a dining room',
    caption: 'New wide-plank oak over what was a bare plywood subfloor',
    tag: 'Installation',
  },
  {
    src: '/media/sanding.jpg',
    webp: '/media/sanding.webp',
    alt: 'A drum floor sander part-way through a pass, with raw sanded oak on one side and old dark finish on the other',
    caption: 'Mid-sand — raw wood on one side of the line, old finish on the other',
    tag: 'Detail',
    wide: true,
  },
]

export const galleryTags = [
  'All',
  'Refinishing',
  'Installation',
  'Vinyl plank',
  'Detail',
] as const
