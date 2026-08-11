import { cityState } from '../site.config'

/**
 * Service page content.
 *
 * EVIDENCE BASE — what we can honestly say Beck's does, and where it comes from:
 *   Installation ............ their own 2011 site: "installation"; Google review
 *                             (Tolentino): 5" hand-cut hardwood, whole house
 *   Sanding / refinishing ... their own 2011 site: "sanding"; Facebook tagline:
 *                             "Hardwood Flooing installation and refinishing"
 *   Prefinished / unfinished  their own 2011 site, verbatim service list
 *   Waterproof / LVP ........ Google review (Rutherford, 2021): "replaced all of
 *                             the flooring in our home with waterproof floors"
 *   Carpet tear-out ......... Google review (Tolentino): "tore out the existing rugs"
 *   Stairs .................. Facebook profile photo: curved staircase, stained treads
 *
 *   ⚠ REPAIR — no direct public evidence. Board replacement is a normal part of
 *     any refinishing contractor's work and the term has real search demand, so
 *     the page is built. CONFIRM WITH TRAVIS before this goes live publicly.
 *
 * Every technical claim below is sourced to NWFA (the trade body) or to a
 * manufacturer's current technical data sheet, listed in `sources` per page and
 * rendered as outbound links. Anything that could not be sourced was cut.
 */

export type ServiceSection = {
  id: string
  /** H2, phrased as the question a buyer would actually type. */
  h2: string
  /** 40–75 words. Must survive being quoted with nothing around it: no
   *  pronouns pointing outside the paragraph, names the thing and the place. */
  answer: string
  detail?: string[]
  list?: { label: string; text: string }[]
}

export type ServiceTable = {
  caption: string
  headers: string[]
  rows: string[][]
  /** Shown under the table. Sourced tables need their source visible. */
  note?: string
}

export type Service = {
  slug: string
  path: string
  navLabel: string
  navBlurb: string
  /** CTA text on the homepage service card. */
  linkLabel: string
  /** <title> — keep the rendered length under ~60 characters. */
  title: string
  metaDescription: string
  h1: string
  /** The one-line promise under the H1. */
  tagline: string
  /** 40–75 words directly under the H1. The most important text on the page. */
  answerBlock: string
  heroImage: string
  heroAlt: string
  sections: ServiceSection[]
  table?: ServiceTable
  faqs: { q: string; a: string }[]
  sources: { label: string; url: string }[]
  /** Honest disqualifier. Builds more trust than any claim. */
  notForYou?: string
}

export const services: Service[] = [
  /* ───────────────────────────── REFINISHING ───────────────────────────── */
  {
    slug: 'refinishing',
    path: '/refinishing/',
    navLabel: 'Sanding & refinishing',
    navBlurb: 'Bring worn, dull or scratched floors back without replacing them',
    linkLabel: 'Refinishing, step by step',
    title: `Hardwood Floor Refinishing in ${cityState} | Beck's`,
    metaDescription:
      'Sanding and refinishing for worn, dull or scratched hardwood floors in Winston-Salem and Forsyth County. Free estimate from Travis Beck. Call (336) 764-2395.',
    h1: `Hardwood Floor Refinishing in ${cityState}`,
    tagline: 'Sanding, staining and finishing that makes an old floor look new again',
    answerBlock:
      'Hardwood floor refinishing sands off the old worn finish and a very thin layer of the wood beneath it, then puts down fresh stain and protective coats. Beck’s Hardwood Floors refinishes solid and engineered floors across Winston-Salem and Forsyth County. Most floors that look past saving are not — refinishing costs far less than replacement and reuses the wood already in the house.',
    heroImage: '/media/after-refinish.jpg',
    heroAlt:
      'A refinished red oak floor in an empty Winston-Salem living room, warm honey tone with a soft satin sheen',
    sections: [
      {
        id: 'do-i-need-refinishing',
        h2: 'Does my floor need refinishing, or just a recoat?',
        answer:
          'A floor needs a full sand and refinish if it has visible dents, wear patterns or permanent cupping, or if the color is changing. Anything short of that is usually a candidate for a screen and recoat — a much cheaper job that abrades the existing finish and adds a fresh coat on top, without touching the wood underneath.',
        detail: [
          'That decision rule is the National Wood Flooring Association’s, not a sales line. Their sanding guidelines put it plainly: it is not necessary to fully sand a floor to restore the finish unless the floor has visible dents, wear patterns or permanent cupping, or the customer wants to change the color. If none of those apply, a recoat may well be enough.',
          'It matters financially, because a recoat is a fraction of the cost and a fraction of the disruption. It also matters for the life of the floor — every full sanding spends a little of the wood you can never get back. We will tell you which one your floor needs when we look at it, and we would rather sell you the smaller job.',
        ],
        list: [
          {
            label: 'Full sand and refinish',
            text: 'Visible dents, worn-through traffic paths, permanent cupping, or you want a different color.',
          },
          {
            label: 'Screen and recoat',
            text: 'Finish looks dull, lightly scratched or tired, but the wood itself is sound and the color is staying.',
          },
          {
            label: 'Neither, yet',
            text: 'Surface grime and haze from the wrong cleaning products. Sometimes a proper clean is the whole job.',
          },
        ],
      },
      {
        id: 'recoat-risk',
        h2: 'Can a recoat fail?',
        answer:
          'Yes, and any contractor who says otherwise is guessing. A new coat will not bond over wax, grease or silicone left by some cleaning products, and one brand of finish is not always compatible with another. The NWFA is blunt about this: testing in one area does not guarantee acceptable performance, and the customer must be told so before work starts.',
        detail: [
          'So we test before we quote a recoat. Two drops of water left on the floor for ten minutes will usually reveal wax — if white spots appear, the floor has probably been waxed and a recoat is the wrong call. Mineral spirits on a white rag is the other check: yellow or brown residue means wax.',
          'If the floor has been waxed, NWFA guidance is to re-wax rather than resand wherever possible. That is not the answer that earns us the most money, but it is the one that leaves you with a floor that works.',
        ],
      },
      {
        id: 'the-process',
        h2: 'What actually happens when you refinish a floor?',
        answer:
          'Refinishing a floor runs in a fixed order: prepare and seal the room, sand in three passes from coarse to fine, deal with the edges and corners the big machine cannot reach, vacuum and tack the surface clean, then apply stain if you want it and two or more coats of finish, abrading lightly between coats so each one bonds.',
        detail: [
          'The sanding is where the skill sits. The first cut goes at a slight angle across the boards using the finest grit that will actually flatten the floor — the NWFA abrasive chart says exactly that: use the finest grit paper that will flatten the floor, do not over-sand. The second and third cuts run parallel with the grain, stepping up through the grits. Skipping a grit leaves scratches the next paper cannot remove, and they only show up once the stain goes on, at which point the fix is starting again.',
          'Between finish coats we abrade the surface to give the next coat something to key into. The NWFA calls this creating a profile, or tooth — a mechanical bond. Some waterborne systems bond chemically instead if the next coat goes on inside 48 hours, which is why a water-based job can be coated in consecutive days and an oil-based one cannot.',
        ],
      },
      {
        id: 'dust',
        h2: 'Is hardwood floor sanding really dustless?',
        answer:
          'No sanding is genuinely dustless, and you should be wary of anyone who promises it. The National Wood Flooring Association states it directly: while dust cannot be completely eliminated from the sanding process, the flooring professional should take steps to minimize the dust. What good contractors sell is containment — vacuum-fed machines and a sealed work area, not magic.',
        detail: [
          'What containment actually means in practice, straight from the NWFA jobsite guidance: seal the doorways with plastic, exhaust the work area with a fan where possible, cover HVAC supply and return openings so the system does not distribute dust through the house, protect smoke and carbon-monoxide detectors, and cover gas fireplace openings and shut off the pilot.',
          'There is a safety reason as well as a housekeeping one. Sanding dust is highly flammable, and the risk is higher on an old floor because the ground-up old finish ends up in the bag with the wood. Bags get emptied before they are half full, and nails get set before sanding, because a spark off a nail head can smoulder in a bag unnoticed for hours.',
        ],
      },
      {
        id: 'oil-or-water',
        h2: 'Should I choose an oil-based or water-based finish?',
        answer:
          'Oil-based polyurethane costs less and gives a warm amber tone that deepens with age. Water-based finish dries and cures far faster, stays much closer to the raw color of the wood, and smells less. The trade-off worth understanding: oil-based ambering is permanent, and recoating later with a water-based product will not reverse it.',
        detail: [
          'The numbers below come from the technical data sheets of two products made by the same manufacturer, so they are a fair comparison rather than marketing. They also show why no honest contractor gives one universal cure time — even two water-based finishes from one brand disagree, with a three-day cure on one and seven on the other.',
          'We will tell you which product is going on your floor and give you that product’s actual numbers before we start.',
        ],
      },
      {
        id: 'when-can-i-walk',
        h2: 'How long before I can walk on the floor and move furniture back?',
        answer:
          'Most surface-finished floors can be walked on after 24 to 48 hours. Furniture should be lifted — never slid — back into place after 48 hours or as the finish manufacturer directs. Area rugs wait until the finish has fully cured, which the NWFA puts at generally 7 to 30 days depending on the product used.',
        detail: [
          'Rugs are the one people get wrong, because the floor feels hard long before it is cured. A rug laid too early traps solvent against a finish that is still off-gassing and can print a permanent outline into it. Some product data sheets allow rugs sooner than the NWFA range — we follow the more conservative guidance and tell you the date rather than the tin’s minimum.',
          'Plan the job around this. A whole-house refinish means real disruption, and the honest version of the schedule is better than a cheerful one.',
        ],
      },
      {
        id: 'how-many-times',
        h2: 'How many times can a hardwood floor be refinished?',
        answer:
          'There is no fixed number, and any contractor quoting one is inventing it. The real limit is thickness: the NWFA says a floor with less than 3/32 of an inch of wear layer left should not be sanded. A properly executed sanding removes less than 1/32 of an inch, so a careful job costs the floor very little.',
        detail: [
          'That is measurable, not a guess. The remaining wear layer can be checked at a floor register, by lifting a transition molding, or with a feeler gauge in a gap between boards. On engineered floors the gauge method is less reliable, because on some products the veneer does not run all the way down to the tongue — so engineered floors get checked more carefully before anyone puts a machine on them.',
          'It is also a quality signal. A heavy-handed sander who takes off more than they need to is spending years of your floor’s remaining life to save themselves a pass.',
        ],
      },
    ],
    table: {
      caption: 'Oil-based vs water-based floor finish — manufacturer figures',
      headers: ['', 'Oil-based polyurethane', 'Water-based (2-component)'],
      rows: [
        ['Dry time between coats', '8–12 hours', '2–3 hours'],
        ['Cured after 24 hours', 'About 40%', 'About 80%'],
        ['Full cure', 'About 14 days', 'About 3 days'],
        ['Furniture back', 'After 72 hours', 'After full cure'],
        ['Color over time', 'Ambers permanently, yellows further with age', 'Far more color-stable'],
        ['Odor during work', 'Strong solvent smell', 'Noticeably lower'],
      ],
      note: 'Figures from the Bona Woodline Polyurethane (oil-modified) and Bona Traffic HD technical data sheets, both linked below. Cure times vary by product — we will give you the numbers for the finish actually going on your floor.',
    },
    faqs: [
      {
        q: 'Can I stay in my house while the floors are refinished?',
        a: 'Usually not comfortably in the rooms being worked on. The floor cannot be walked on for 24 to 48 hours after the final coat, and the work area is sealed off. Many people stay and work around a room-by-room schedule; others move out for a few days. Tell us which you need and we will plan around it.',
      },
      {
        q: 'Do you move the furniture?',
        a: 'Talk to us about it up front and get it written into the estimate either way. Furniture, appliance disconnection and who removes what are the details that cause arguments later when they are left vague, so we would rather be specific before the work starts than assume.',
      },
      {
        q: 'Why do my floors look dull and cloudy?',
        a: 'Usually a build-up from the wrong cleaning product rather than a failed finish. Oil soaps, wax-based cleaners and anything that promises shine leave a haze that traps dirt. Sometimes it cleans off, sometimes the residue has to be abraded away, and it also determines whether a recoat can bond at all.',
      },
      {
        q: 'Can you change the color of my floors?',
        a: 'Yes, and wanting a color change is one of the four reasons a full sand is genuinely necessary. Note that a floor can only go so much lighter than the natural color of the wood underneath it, and red oak in particular carries a pink undertone that shows through lighter stains. We test stain on your actual floor first.',
      },
      {
        q: 'Will the gaps between my boards close up?',
        a: 'Refinishing does not close gaps, and filling them wholesale is usually a mistake, because solid wood floors expand and contract with the seasons and filler pushed into a moving joint will crack out. Gaps that open in winter and close in summer are normal behavior. Persistent wide gaps are worth looking at properly.',
      },
      {
        q: 'How long does refinishing take?',
        a: 'It depends on square footage, the number of coats and the finish chosen — a water-based system can be coated on consecutive days, while oil-based needs 8 to 12 hours between coats. The sanding is rarely the slow part. We give a day count with the estimate rather than a generic figure.',
      },
    ],
    sources: [
      {
        label: 'NWFA, Sanding and Finishing Guidelines and Methods (Rev. March 2007)',
        url: 'https://allstateflooringdistributors.com/wp-content/uploads/2019/03/nwfa_complete_sanding_finishing_guideline-1.pdf',
      },
      {
        label: 'NWFA, Engineered Wood Flooring Refinishable Program (Hardwood Floors Magazine, Aug/Sept 2022)',
        url: 'https://nwfa.org/wp-content/uploads/2022/09/HFM_AugSept22_final_refinishable_small.pdf',
      },
      {
        label: 'Bona Traffic HD technical data sheet (27 May 2026)',
        url: 'https://www.bona.com/globalassets/catalogassets/tds-bona-traffic-hd-us-enus_20260527131533.pdf',
      },
      {
        label: 'NWFA, Homeowner’s Handbook to Real Wood Floors',
        url: 'https://woodfloors.org/wp-content/uploads/Homeowners_Handbook_to_Real_Wood_Floors_web.pdf',
      },
    ],
    notForYou:
      'If your floor has less than 3/32 of an inch of wear layer left, sanding it again will do more harm than good — and we will say so rather than take the job. Floors that have been waxed are often better re-waxed than resanded. And if the finish is only dull, ask us about a recoat before you pay for a full refinish.',
  },

  /* ───────────────────────────── INSTALLATION ──────────────────────────── */
  {
    slug: 'installation',
    path: '/installation/',
    navLabel: 'Hardwood installation',
    navBlurb: 'New solid or engineered floors, prefinished or finished on site',
    linkLabel: 'How installation works',
    title: `Hardwood Floor Installation in ${cityState} | Beck's`,
    metaDescription:
      'New solid and engineered hardwood floor installation in Winston-Salem and Forsyth County. Prefinished or site-finished, carpet tear-out included. Call (336) 764-2395.',
    h1: `Hardwood Floor Installation in ${cityState}`,
    tagline: 'Solid and engineered floors, prefinished or sanded and finished in place',
    answerBlock:
      'Beck’s Hardwood Floors installs new solid and engineered hardwood throughout Winston-Salem and Forsyth County — including tearing out the old carpet or vinyl first. Floors can arrive prefinished from the mill or be installed raw and then sanded, stained and finished in your home, which is the route that gets you a seamless surface and any color you want.',
    heroImage: '/media/after-install.jpg',
    heroAlt:
      'Newly installed wide-plank white oak flooring in an empty Winston-Salem dining room',
    sections: [
      {
        id: 'solid-or-engineered',
        h2: 'Should I choose solid or engineered hardwood?',
        answer:
          'Solid hardwood is one piece of wood through its whole thickness and can be sanded many times, but it moves with humidity and must not go below grade. Engineered hardwood is a real wood veneer over a stable plywood core, can be installed below grade and over concrete, and can be refinished only as far as its veneer allows.',
        detail: [
          'The below-grade rule is the one homeowners most often get wrong, and the NWFA installation guidelines are emphatic about it: solid wood floors are not recommended for below-grade installations, while engineered wood floors can be installed successfully below grade, direct to concrete or to a wood subfloor.',
          'It also catches more houses than people expect, because below grade is defined by the soil outside, not by whether the room feels like a basement. The NWFA counts the whole level as below grade where soil sits along any perimeter wall more than 3 inches above the finished floor level. Around Winston-Salem that takes in a lot of split-levels and walk-out basements that nobody thinks of as basements at all.',
        ],
      },
      {
        id: 'prefinished-or-site',
        h2: 'Prefinished or finished on site — which is better?',
        answer:
          'Prefinished boards arrive coated from the factory, so the floor is walkable the day it goes down and there is no sanding dust or finish smell in the house. Site-finished floors are installed raw then sanded and coated in place, which fills the seams between boards, allows any stain color, and leaves one continuous unbroken surface.',
        detail: [
          'Beck’s has installed both for years — the old company listing put it as prefinished, unfinished and laminated. The right answer depends more on your tolerance for disruption than on quality.',
          'One point worth knowing if you are looking at site-finished engineered flooring: the initial sand and finish uses up part of the veneer before you ever walk on it. The NWFA’s own arithmetic has a 4/32-inch wear layer losing 1/32 inch in that first sanding, leaving 3/32 inch — which is the same as where a factory-finished board starts. It is not a reason to avoid it, just a reason to know what you are buying.',
        ],
      },
      {
        id: 'acclimation',
        h2: 'Does wood flooring need to acclimate before installation?',
        answer:
          'Wood flooring needs to reach the right moisture content for your house, which is not the same thing as sitting in the hallway for a set number of days. The NWFA sets no fixed waiting period, and some manufacturers require no acclimation at all for certain products. What matters is measuring the wood and the subfloor, not counting days.',
        detail: [
          '"Leave it in the room for three days" is one of the most repeated pieces of flooring advice on the internet and it is not an NWFA requirement. The actual guidance is to check moisture content on delivery to set a baseline, then acclimate to the manufacturer’s recommendation and to what the local climate requires.',
          'The condition of the house matters more than the calendar. Where building codes allow, the NWFA recommends running the permanent HVAC system for at least five days before installation. Where it cannot run yet, conditions should be held near normal living conditions — 60 to 80 degrees Fahrenheit and the average yearly relative humidity for the area. A floor laid into a house that has never been conditioned is the classic cause of gaps and cupping the following season.',
        ],
      },
      {
        id: 'what-happens-to-old-floor',
        h2: 'Do you remove the old carpet or vinyl?',
        answer:
          'Yes — tear-out is part of the job and should be written into the estimate, along with who takes the debris away. Beck’s has torn out carpet ahead of hardwood installs for years. Get the scope in writing: what comes up, what gets hauled off, and whether shoe molding and transitions are included.',
        detail: [
          'We are specific about this because vagueness here is what turns a good job into a dispute. Tear-out, disposal, shoe molding, thresholds, moving appliances and reinstalling trim are all real work, and every one of them needs to be either in the price or explicitly out of it before anyone starts.',
          'Ask us to itemise it. If another contractor will not, that tells you something.',
        ],
      },
    ],
    table: {
      caption: 'Solid vs engineered hardwood',
      headers: ['', 'Solid hardwood', 'Engineered hardwood'],
      rows: [
        ['Construction', 'One piece of wood throughout', 'Real wood veneer over a plywood core'],
        ['Below grade (basements)', 'Not recommended by the NWFA', 'Can be installed below grade'],
        ['Over concrete', 'Not typically', 'Yes'],
        ['Refinishing', 'Many times, limited by thickness', 'Limited by veneer thickness'],
        ['Movement with humidity', 'More', 'Less'],
        ['Width options', 'Widest range in strip and plank', 'Wide planks are more stable'],
      ],
      note: 'Below-grade guidance from the NWFA Installation Guidelines, linked below.',
    },
    faqs: [
      {
        q: 'Can I put hardwood in my basement?',
        a: 'Not solid hardwood — the NWFA does not recommend it below grade. Engineered hardwood is designed for exactly that situation and can go straight onto concrete. Note that "below grade" is judged by the soil outside: if earth sits more than 3 inches above your floor level along any exterior wall, that level counts.',
      },
      {
        q: 'Can hardwood go over concrete?',
        a: 'Engineered hardwood can. Concrete carries and releases moisture, so the slab has to be tested and an appropriate moisture barrier used for the installation method chosen. This is one of the places where skipping a step does not show up for a year and then shows up everywhere at once.',
      },
      {
        q: 'What about radiant heat?',
        a: 'Wood floors can go over radiant heat, but the system, the wood species and the installation method all have to suit each other, and the NWFA publishes a separate appendix specifically for radiant installations. Tell us before we quote — it changes the material recommendation.',
      },
      {
        q: 'How wide can the planks be?',
        a: 'Wide planks look excellent and are more prone to seasonal movement, showing gaps in dry months more visibly than narrow strip flooring. Engineered construction handles width more stably than solid. One of Beck’s Google reviews describes a whole-house install in 5-inch hand-cut hardwood, so wide is well within scope.',
      },
      {
        q: 'Will my new floor match the existing hardwood in the next room?',
        a: 'Rarely exactly, and be suspicious of anyone who promises it will. Existing floors have aged, ambered and been walked on. Options are to blend at a threshold, to run the new floor into the old and sand both together so they take the same stain, or to accept a deliberate transition.',
      },
    ],
    sources: [
      {
        label: 'NWFA, Installation Guidelines (Rev. June 2002)',
        url: 'https://www.floorreports.com/images/technotes_files/54.pdf',
      },
      {
        label: 'NWFA, Engineered Wood Flooring Refinishable Program (Aug/Sept 2022)',
        url: 'https://nwfa.org/wp-content/uploads/2022/09/HFM_AugSept22_final_refinishable_small.pdf',
      },
      {
        label: 'NWFA, Homeowner’s Handbook to Real Wood Floors',
        url: 'https://woodfloors.org/wp-content/uploads/Homeowners_Handbook_to_Real_Wood_Floors_web.pdf',
      },
    ],
    notForYou:
      'If your existing floor only looks tired, refinishing it will almost always cost less and keep the wood you already own. And if the room is below grade, we will steer you to engineered or to luxury vinyl plank rather than sell you solid hardwood that the trade body says should not go there.',
  },

  /* ─────────────────────────── LUXURY VINYL PLANK ──────────────────────── */
  {
    slug: 'luxury-vinyl-plank',
    path: '/luxury-vinyl-plank/',
    navLabel: 'Waterproof vinyl plank',
    navBlurb: 'LVP for kitchens, baths, basements and houses with dogs',
    linkLabel: 'Where vinyl plank wins',
    title: `Waterproof Vinyl Plank Flooring in ${cityState}`,
    metaDescription:
      'Luxury vinyl plank and waterproof flooring installed in Winston-Salem and Forsyth County. Good for basements, kitchens, bathrooms and pets. Call (336) 764-2395.',
    h1: `Waterproof Vinyl Plank Flooring in ${cityState}`,
    tagline: 'LVP for the rooms where real wood is the wrong answer',
    answerBlock:
      'Luxury vinyl plank is a waterproof floor that looks like wood and handles water, pets and basements without complaint. Beck’s Hardwood Floors installs LVP across Winston-Salem and Forsyth County — one customer’s Google review describes replacing all the flooring in their home with waterproof floors, upstairs and down. It is the honest answer for rooms where hardwood would not last.',
    heroImage: '/media/gallery-basement.jpg',
    heroAlt:
      'Warm mid-brown waterproof luxury vinyl plank flooring in a finished basement family room',
    sections: [
      {
        id: 'why-lvp',
        h2: 'When is vinyl plank the better choice than hardwood?',
        answer:
          'Vinyl plank is the better choice wherever water, humidity or heavy abuse would ruin real wood: basements and below-grade rooms, kitchens, bathrooms, laundries, mud rooms, and houses with large dogs or young children. Vinyl plank is also the practical answer for rental properties and for anyone who wants a floor that needs no refinishing, ever.',
        detail: [
          'A hardwood contractor recommending vinyl might look odd. It is not. A solid hardwood floor put somewhere it should not go is a floor that cups, gaps and fails, and then it is our name on it. Recommending the right material for the room is cheaper for you and better for us.',
          'Where hardwood genuinely is the better floor — living rooms, bedrooms, dining rooms, hallways, anywhere upstairs — we will say so just as plainly. Real wood can be refinished for decades and adds something to a house that a printed photographic layer does not.',
        ],
      },
      {
        id: 'lvp-limits',
        h2: 'What are the downsides of luxury vinyl plank?',
        answer:
          'Vinyl plank cannot be refinished. A scratched or gouged plank is replaced, not repaired, and when the wear layer eventually goes the floor is replaced entirely. Vinyl plank can also dent under heavy point loads, some products fade in strong direct sun, and it does not add the same value to a house that real hardwood does.',
        detail: [
          'The other thing worth knowing is that "waterproof" describes the plank, not the room. Water that gets through the seams and sits on the subfloor will still cause a problem underneath a perfectly intact waterproof floor. It buys you time against spills and mopping, not against a burst supply line.',
          'Quality also varies enormously between products at similar prices, mostly in the thickness of the wear layer. We will tell you which spec actually matters for the room you are putting it in.',
        ],
      },
      {
        id: 'lvp-install',
        h2: 'What is involved in installing vinyl plank?',
        answer:
          'Most luxury vinyl plank is a floating floor: the planks lock to each other rather than to the subfloor. That makes installation faster and less disruptive than hardwood, with no sanding, no finish and no cure time. The floor is usually walkable the same day. The work that matters is the preparation underneath.',
        detail: [
          'Subfloor flatness is the thing that separates a good LVP job from a bad one. Vinyl plank is thin and flexible, so it telegraphs whatever is underneath it — a dip or a ridge in the subfloor becomes a dip or a ridge you can feel through the floor, and on a locking floor it can eventually work the joints apart.',
          'Tear-out of the existing carpet, vinyl or tile is part of the job, and so is hauling the debris away. Ask for it in writing.',
        ],
      },
    ],
    table: {
      caption: 'Hardwood vs luxury vinyl plank',
      headers: ['', 'Solid hardwood', 'Luxury vinyl plank'],
      rows: [
        ['Waterproof', 'No', 'Yes (the plank itself)'],
        ['Below grade / basements', 'Not recommended', 'Yes'],
        ['Can be refinished', 'Yes, many times', 'No — replace damaged planks'],
        ['Scratch behavior', 'Sands out', 'Permanent; plank gets swapped'],
        ['Underfoot', 'Solid, hard', 'Slightly softer, warmer'],
        ['Lifespan', 'Decades, renewable', 'Limited by the wear layer'],
        ['Effect on resale', 'Generally positive', 'Neutral'],
      ],
    },
    faqs: [
      {
        q: 'Is vinyl plank actually waterproof?',
        a: 'The plank itself is, on the products sold as waterproof. The floor as a system is water-resistant rather than sealed — water can still reach the subfloor through the seams and around the perimeter. It handles spills, pets and mopping easily. It does not make a room immune to a leak.',
      },
      {
        q: 'Will vinyl plank look cheap?',
        a: 'Good LVP looks convincing; cheap LVP looks like plastic. The differences are the realism of the print, whether the surface texture lines up with the grain pattern, how many different plank images are in the run before it repeats, and the thickness of the wear layer. Look at a large sample in daylight, not a small one in a showroom.',
      },
      {
        q: 'Can vinyl plank go over my existing tile or vinyl?',
        a: 'Sometimes, if the existing floor is sound, well bonded and flat enough, and if the added height still works with your doors and appliances. Grout lines can telegraph through. We will tell you honestly whether your floor is a candidate or whether tearing it out is the better call.',
      },
      {
        q: 'How do I clean it?',
        a: 'Sweep or vacuum, then damp mop with the manufacturer’s recommended cleaner. Avoid steam mops and abrasive pads, and check the warranty before using anything else — most manufacturers name specific products, and using something else can void the warranty even where it does no visible harm.',
      },
    ],
    sources: [
      {
        label: 'Google review describing waterproof flooring installed by Beck’s',
        url: 'https://reviews.birdeye.com/becks-hardwood-floors-156200711212394',
      },
      {
        label: 'NWFA, Installation Guidelines (below-grade guidance)',
        url: 'https://www.floorreports.com/images/technotes_files/54.pdf',
      },
    ],
    notForYou:
      'If the room is upstairs, dry and normally used, real hardwood is the better floor and we will tell you so. Vinyl plank cannot be refinished — it is a floor you eventually replace rather than renew.',
  },

  /* ───────────────────────────── REPAIR ────────────────────────────────── */
  {
    slug: 'repair',
    path: '/repair/',
    navLabel: 'Repairs & board replacement',
    navBlurb: 'Water damage, deep scratches, squeaks and failed boards',
    linkLabel: 'What can be repaired',
    title: `Hardwood Floor Repair in ${cityState} | Beck's`,
    metaDescription:
      'Hardwood floor repair in Winston-Salem: water-damaged boards, deep scratches, squeaks and gaps. Board replacement blended into the existing floor. Call (336) 764-2395.',
    h1: `Hardwood Floor Repair in ${cityState}`,
    tagline: 'Fixing the bad section without replacing the whole floor',
    answerBlock:
      'Hardwood floor repair replaces damaged boards and blends the new wood into the surrounding floor, rather than tearing out a room over one bad patch. Beck’s Hardwood Floors handles water damage, deep gouges, squeaks and failed boards across Winston-Salem and Forsyth County. Repairs are usually finished by sanding and refinishing the affected area so the patch does not read as a patch.',
    heroImage: '/media/before-refinish.jpg',
    heroAlt: 'A worn hardwood floor with damage and dark traffic paths before repair',
    sections: [
      {
        id: 'what-can-be-repaired',
        h2: 'What kinds of hardwood floor damage can be repaired?',
        answer:
          'Most localised damage can be repaired: water-stained or cupped boards near a dishwasher or door, deep gouges and pet scratches that will not sand out, boards split by a dropped weight, squeaks and movement, and sections lifted for plumbing or electrical work. Repair means cutting out the affected boards and weaving new ones into the existing pattern.',
        detail: [
          'The judgement call is how far the damage really reaches. Water in particular travels further than it looks — a stain the size of a dinner plate on the surface can sit above several feet of subfloor that also needs attention. Cutting out the visible part and stopping there is how a repair fails twice.',
          'Some things are not repairs at all. A floor that has cupped across an entire room usually has a moisture source underneath it that has to be found and fixed first, or the new boards will do exactly the same thing.',
        ],
      },
      {
        id: 'will-it-match',
        h2: 'Will a repaired section match the rest of my floor?',
        answer:
          'Not on its own — new wood is a different age, and it will not match a floor that has ambered and worn for twenty years. Getting a repair to disappear usually means sanding and refinishing the whole room, or at minimum the whole run of boards, so old and new take the same stain and finish together.',
        detail: [
          'This is the part homeowners are most often disappointed by, so it is worth being clear before the work starts rather than after. A patch dropped into an existing finished floor will be visible. A patch sanded and finished along with everything around it generally will not.',
          'Where a floor cannot be refinished — too little wear layer left — we will tell you that a repair will always show, and let you decide.',
        ],
      },
      {
        id: 'squeaks-and-gaps',
        h2: 'What causes squeaky floors and gaps between boards?',
        answer:
          'Squeaks come from movement: boards rubbing each other or against a fastener, or a subfloor that has loosened from the joists. Gaps are usually seasonal — wood gives up moisture in winter and shrinks, then takes it back in summer. Gaps that open and close with the seasons are normal behavior, not a defect.',
        detail: [
          'That distinction decides the fix. Seasonal gaps should be left alone, because filler forced into a joint that is going to close again will crack out or push the boards apart. Gaps that stay open all year, or keep widening, point at a moisture problem or an installation issue and are worth investigating properly.',
          'Squeaks can often be fixed from above with the right fastener, sometimes from below if the subfloor is accessible. Either way it is worth finding the cause — a squeak that appears suddenly across a large area is telling you something.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is it cheaper to repair or replace a hardwood floor?',
        a: 'Repair, in almost every case where the rest of the floor is sound. Replacement means new material for the whole area plus tear-out and disposal, while a repair reuses everything that is not damaged. Repair stops being the better answer when the damage is widespread or the floor has no wear layer left to sand.',
      },
      {
        q: 'My floor got wet. How long do I have?',
        a: 'Act quickly. Get the water source stopped and the area dried out as fast as possible, because wood that stays wet cups, and cupping that sets can become permanent. Do not sand a cupped floor while it is still wet — flattening a swollen floor and then letting it dry leaves it crowned once it shrinks back.',
      },
      {
        q: 'Can deep scratches be sanded out?',
        a: 'Usually, if there is enough wear layer left, since a full sand removes less than 1/32 of an inch. Very deep gouges that reach past that may need the board replaced instead. Scratches that only go through the finish and not the wood are often handled by a recoat rather than a full sand.',
      },
      {
        q: 'Do you match old or unusual board widths?',
        a: 'Often, though older floors sometimes use widths and profiles that are no longer milled as standard. Where an exact match is not available, boards can sometimes be salvaged from a closet or under an appliance and the less visible spot filled with new wood instead — an old trick and usually the best-looking result.',
      },
    ],
    sources: [
      {
        label: 'NWFA, Sanding and Finishing Guidelines and Methods',
        url: 'https://allstateflooringdistributors.com/wp-content/uploads/2019/03/nwfa_complete_sanding_finishing_guideline-1.pdf',
      },
      {
        label: 'NWFA, Homeowner’s Handbook to Real Wood Floors',
        url: 'https://woodfloors.org/wp-content/uploads/Homeowners_Handbook_to_Real_Wood_Floors_web.pdf',
      },
    ],
    notForYou:
      'If a floor has cupped across a whole room, the moisture source has to be found and fixed before any board is replaced — otherwise the new wood does the same thing. We would rather tell you that than take the job twice.',
  },
]

export const serviceBySlug = Object.fromEntries(
  services.map((s) => [s.slug, s])
) as Record<string, Service>
