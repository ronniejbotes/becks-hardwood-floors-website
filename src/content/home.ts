import type { BeforeAfterItem } from '../components/BeforeAfter'

/**
 * ⚠ THE TWO BEFORE/AFTER PIECES BELOW ARE ILLUSTRATIONS, NOT BECK'S JOBS.
 *
 * The rooms, the worn floor and the new floor are all AI-generated, and the
 * "after" clip is a stylised visualisation of a floor going down — not footage
 * of real work. They exist so the feature can be built and demonstrated before
 * Travis hands over real photographs.
 *
 * The copy below is therefore written to describe what the SERVICE does, and
 * never claims "we did this job", names a customer, or implies a real project.
 * The section is labelled on-page as an illustration.
 *
 * ON HANDOVER: replace the media in media-src/ with Travis's real
 * before/after photographs, re-run `node scripts/optimize-media.mjs`, delete
 * the `illustration` flag below, and rewrite these captions around the real job.
 */

export const beforeAfterItems: (BeforeAfterItem & { illustration: boolean })[] = [
  {
    id: 'refinish',
    illustration: true,
    kicker: 'Sand & refinish',
    heading: 'The floor is probably still in there',
    body: 'Gray, scratched, worn through along the walking routes — floors that look finished usually are not. Sanding takes off the failed finish and a hair of the wood, and what comes back is the same board that went down decades ago.',
    beforeSrc: '/media/before-refinish.jpg',
    afterSrc: '/media/transform-refinish-final.jpg',
    videoSrc: '/media/transform-refinish.mp4',
    beforeAlt:
      'A worn oak floor with a dull gray finish, dark traffic paths and water staining near the doorway',
    afterAlt:
      'The same floor after sanding and refinishing, warm honey-amber with an even satin sheen',
  },
  {
    id: 'install',
    illustration: true,
    kicker: 'New installation',
    heading: 'From bare subfloor to finished room',
    body: 'Once the carpet and tack strips are out, what is left is plywood, staples and adhesive. New boards go down row by row off a straight working line, and the room changes character entirely.',
    beforeSrc: '/media/before-install.jpg',
    afterSrc: '/media/transform-install-final.jpg',
    videoSrc: '/media/transform-install.mp4',
    beforeAlt:
      'A bare plywood subfloor after carpet removal, with visible seams, staples and tack strips',
    afterAlt:
      'The same room with newly installed wide-plank white oak flooring running toward the window',
  },
]

/**
 * "What's included" — the scope questions that cause disputes.
 *
 * This section exists for a specific reason. Beck's one critical public review
 * is not about workmanship; it is about scope and follow-up — shoe molding that
 * was not fitted, debris that was not taken away, and tear-out that was not
 * done. Those are all avoidable by agreeing the scope in writing up front.
 *
 * Putting the awkward questions on the page, unprompted, is both the honest
 * move and the commercially smart one: it is the single thing this site can do
 * that its competitors' sites do not.
 */
export const scopeChecklist = [
  {
    q: 'Who moves the furniture?',
    a: 'Agreed before we start and written on the estimate, either way. Large items, appliances and anything that needs disconnecting get named specifically rather than assumed.',
  },
  {
    q: 'Is tear-out of the old floor included?',
    a: 'Say so on the estimate. Carpet, tack strips, staples, old vinyl and tile are real work, and "the old floor comes up" should never be an assumption on either side.',
  },
  {
    q: 'Who hauls the debris away?',
    a: 'Named on the estimate, along with what counts. Tear-out debris and offcuts are the contractor’s to remove unless the estimate says otherwise in writing.',
  },
  {
    q: 'Is shoe molding included?',
    a: 'Listed as a line item, not left vague. Removing, refitting or supplying new shoe molding and thresholds is separate work from laying the floor, and it is where jobs get left unfinished.',
  },
  {
    q: 'What happens if something is wrong afterwards?',
    a: 'Tell us. Get the punch list agreed at walkthrough while everyone is still on site, because that is the point where problems are cheap to fix and easy to see.',
  },
]
