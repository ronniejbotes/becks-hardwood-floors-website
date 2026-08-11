# Beck's Hardwood Floors — website

Marketing site for Beck's Hardwood Floors, a hardwood flooring contractor in
Winston-Salem, North Carolina. Owner: Travis Beck. Phone: (336) 764-2395.

**Status: pre-sale demo. Not sold to the client yet. Read
[§ Before this goes live](#before-this-goes-live) before publishing it anywhere
public.**

React + TypeScript + Tailwind + Framer Motion, prerendered to static HTML with
`vite-react-ssg`. Deploys as plain files to Hostinger — no server, no database.

---

## Quick start

```bash
npm install
cp .env.example .env     # then add a Web3Forms key, see § Contact form
npm run dev              # http://localhost:5173
npm run build            # -> dist/
npm run preview          # serve the built site
```

| Script | Does |
|---|---|
| `npm run dev` | Vite dev server (client-rendered, fast refresh) |
| `npm run build` | Type-check → prerender all 9 routes → write `sitemap.xml`, `robots.txt`, `404.html` |
| `npm run preview` | Serve `dist/` exactly as it will be served in production |
| `npm run lint` | `tsc --noEmit` |
| `node scripts/optimize-media.mjs` | Re-encode everything in `media-src/` into web-sized JPEG + WebP + compressed MP4 |

---

## Before this goes live

Nothing on this site is invented, but several things are **unconfirmed** and a
few are **placeholders**. Work through this list with Travis first.

### 1. Replace the imagery — it is AI-generated

Every photograph on the site is AI-generated. None of it is Travis's work. It
is labelled on-page as illustration wherever it could be mistaken for a real
job, but **it must be replaced with his real photos before the site is public**.

```
media-src/     <- drop his real photos here
node scripts/optimize-media.mjs
```

Then:
- `src/content/gallery.ts` — set `isIllustration = false`, rewrite captions
- `src/content/home.ts` — drop `illustration: true` from the before/after items

The optimizer strips EXIF, which matters: **phone photos carry GPS coordinates
of customers' houses.** Never publish a raw phone photo.

The before/after feature needs a matched pair per job — same room, same camera
position, one before and one after. If Travis has those, they slot straight in.
The "magic install" clips are stylised visualisations and can stay or go.

### 2. Confirm these facts with Travis

| Item | Status | Why it matters |
|---|---|---|
| **Founding year** | ⚠️ Sources disagree by ~20 years | BBB says business started 2009. Manta says "37 years" (≈1989). His own 2011 website said "over 20 years" (≤1991). The site currently makes **no** "since YYYY" claim. If he really has been trading since the late 80s that is a much stronger selling point than 2009 — worth asking. |
| **"Fully insured"** | ⚠️ Not on the site | The only source is his own 2011 website — 15 years stale. Get a current certificate of insurance, then add it. Strong trust signal once evidenced. |
| **Repair service** | ⚠️ No public evidence | Installation, sanding/refinishing and LVP are all evidenced. Board repair is a normal part of the trade and has real search demand, so `/repair/` was built — but confirm he actually wants the work before it goes public. |
| **Name spelling** | ⚠️ Two forms in use | He uses "Becks Hardwood Floors" (no apostrophe) on Facebook and BBB. Google Maps, Blue Book and Birdeye use "Beck's". The site uses **"Beck's"** to match the Google Business Profile, which is the ranking surface. Pick one and make Facebook and BBB match. |
| **Email address** | ⚠️ None published | Not on any source. `beckshardwoodfloors@gmail.com` appears only in Google's AI summaries and could not be verified — do not use it without asking. |
| **Service area** | Reasonable, unconfirmed | Nine towns listed in `src/site.config.ts`. Confirm he actually travels to all of them. |
| **Hours** | ✅ Verified | Mon–Fri 8–5, closed weekends. |
| **Address** | ✅ Verified | 12133 NC Hwy 150 N, **Suite G**. It is an office in a shared building, **not a showroom** — the copy says so deliberately. |

### 3. Never put these on the site

- **"BBB A+ rated" or "BBB accredited"** — flatly false. Google's AI summaries
  claim it; the actual BBB profile says *"Not Rated — BBB does not have
  sufficient information to issue a rating"* and he is **not** accredited. This
  is the single most checkable lie available here, so it must not appear.
- **Any invented testimonial.** The three on the site are quoted word for word
  from real published reviews. He also has a **1-star review**, and the site
  links to the page that shows it. That is deliberate — cherry-picking in the
  dark is what gets caught.
- **`aggregateRating` or `review` structured data.** Google's rule: a business
  marking up reviews about itself makes its pages *ineligible for the star
  review feature*. Stars come from the Google Business Profile, never from
  markup on your own domain. See the header comment in `src/lib/schema.ts`.
- **A specific price.** No figure appears anywhere. Add one only when Travis
  gives you real numbers, and date it.

---

## Contact form

Posts to [Web3Forms](https://web3forms.com/) — free, no backend, works on plain
static hosting.

1. Go to web3forms.com, enter the destination email, and it emails you a key.
2. Put it in `.env` as `VITE_W3F_KEY=...`
3. Rebuild.

Enquiries land in whatever inbox the key was registered against. Point it at
your own while this is a demo; swap it for Travis's on handover.

The key is public by design (it is visible in the built JS). It is a routing
token, not a secret — it can only submit to the inbox it was registered to.

**With no key set the form disables its submit button and says so.** That is
intentional: a contractor site that silently swallows a lead is worse than one
with no form at all.

---

## Deploying to Hostinger

The build output is static files. Two options.

### Option A — GitHub Actions, automatic on push (recommended)

`.github/workflows/deploy.yml` builds and uploads `dist/` over FTP on every push
to `main`. Add these repository secrets under
**Settings → Secrets and variables → Actions**:

| Secret | Where to find it in hPanel |
|---|---|
| `FTP_SERVER` | Files → FTP Accounts → *FTP hostname* (e.g. `ftp.yourdomain.com`) |
| `FTP_USERNAME` | Files → FTP Accounts |
| `FTP_PASSWORD` | Files → FTP Accounts (set/reset it there) |
| `VITE_W3F_KEY` | Your Web3Forms key |

The workflow uploads into `public_html/`. Change `server-dir` if the domain is
on an addon domain rather than the primary one.

### Option B — manual upload

```bash
npm run build
```

Upload **the contents of `dist/`** (not the folder itself) into `public_html/`
via hPanel's File Manager or any FTP client. Include the hidden `.htaccess`.

### After the first deploy

1. **Check `.htaccess` uploaded.** File managers hide dotfiles by default. It
   handles HTTPS, the www/non-www redirect, caching and the 404 page. Without
   it the site works but leaks duplicate URLs.
2. **Pick www or non-www and stick to it.** `.htaccess` currently forces
   **non-www**. Both variants indexed as separate sites is a real and common
   own goal.
3. **Update the domain** in two places if it is not
   `beckshardwoodfloors.com` — `src/site.config.ts` (`url`) and
   `scripts/generate-sitemap.mjs` (`SITE_URL`). Then rebuild, or every canonical
   tag and sitemap entry will point at the wrong host.

---

## SEO notes

Built as a local business site: the **Google Business Profile is the primary
ranking surface** and this site feeds it. Website work makes the business
legible and eligible; it does not by itself move the map pack.

**Do first, in this order:**

1. **Claim the Google Business Profile.** It is currently unclaimed — the
   listing shows "Own this business?". This is the single highest-value action
   available and it is free. Nothing on this site matters as much.
2. **Set the primary category** to *Flooring contractor* (already what Google
   shows) and add secondary categories.
3. **Make NAP identical everywhere** — this site, GBP, BBB, Facebook, Nextdoor,
   Blue Book, Manta. Same name spelling, same Suite G, same phone. The site's
   NAP comes from `src/site.config.ts`; change it there and nowhere else.
4. **Get reviews.** Six Google reviews total is the real constraint, not the
   website. Ask every customer, by name, after the job. Never gate, never
   incentivise — both violate policy and risk the profile.
5. **Then** verify the domain in Search Console and submit
   `https://yourdomain.com/sitemap.xml`.

**What is already built in:**

- 8 indexable URLs, each prerendered to real static HTML with its own title,
  meta description, canonical and structured data. AI crawlers and answer
  engines largely do not execute JavaScript, which is why this is prerendered
  rather than a single-page app.
- One `<h1>` per page, `<h2>`s phrased as questions buyers actually type, and a
  self-contained 40–75 word answer block under each — written to survive being
  quoted on its own.
- `HomeAndConstructionBusiness` + `Service` + `BreadcrumbList` + `FAQPage`
  JSON-LD. There is no flooring-contractor type on schema.org, so the nearest
  real ancestor is used with `additionalType` rather than inventing one.
- Real `<table>` markup for every comparison, in horizontal scroll containers.
  A grid of `<div>`s renders identically and extracts as nothing.
- Outbound citations to NWFA and manufacturer data sheets on every technical
  claim.

**Honest caveat:** the `FAQPage` markup will not produce a rich result. Google
retired FAQ rich results in May 2026. It is emitted because it is valid, costs
nothing and non-Google consumers still read it — do not sell it as SERP real
estate.

**Do not** mass-generate a page per town. `/hardwood-floors-{town}` at scale is
named in Google's doorway-page policy. If a location page is ever added it needs
something genuinely local on it — a real job, real local detail — and the cap is
3–5.

---

## Project structure

```
src/
  site.config.ts        Single source of truth for NAP, hours, service area.
                        Every fact is annotated with its source. Change business
                        details HERE and nowhere else.
  content/
    services.ts         The four service pages. Content only, no markup.
    home.ts             Before/after items + the "what's included" checklist.
    gallery.ts          Gallery images and captions.
    reviews.ts          Verbatim real reviews. Read the rules at the top.
  lib/schema.ts         JSON-LD builders. Read the header before editing.
  components/
    BeforeAfter.tsx     The before/after toggle. Still -> video -> rests on the
                        final frame. Falls back to a static image under
                        prefers-reduced-motion or if the video fails.
    ContactForm.tsx     Web3Forms. Fails loudly, never silently.
    ServiceStack.tsx    Sticky-stacking service cards.
  pages/                One file per route; ServicePage.tsx is shared by all four
                        service pages.
scripts/
  optimize-media.mjs    Image/video pipeline. Strips EXIF.
  generate-sitemap.mjs  Post-build: sitemap.xml, robots.txt, 404.html.
media-src/              Source media, gitignored and NEVER served. Sits outside
                        public/ so Vite does not copy ~80 MB of source PNGs into
                        dist/. The optimised versions in public/media/ are
                        committed, so a fresh clone builds fine without it.
public/
  .htaccess             HTTPS, canonical host, caching, security headers.
  media/                Optimised and served.
```

### Adding a service page

Append an object to `services` in `src/content/services.ts`. The route, nav
entry, footer link, schema, sitemap entry and "other services" cards all derive
from that array — no other file needs touching.

---

## Accessibility and performance

- Skip link, visible focus rings, one `<h1>` per page, real landmarks.
- FAQs are native `<details>`/`<summary>`: keyboard and screen-reader correct,
  findable by in-page search, and readable with JavaScript disabled.
- `prefers-reduced-motion` is honoured throughout — the before/after swaps two
  still images instead of playing video, and the magnetic hover disables.
- Media is heavily optimised: source PNGs of 5–7 MB ship as 90–290 KB, and the
  two clips went from 4.6 MB each to roughly 200–290 KB.
- Verified with an automated pass across all 8 pages at 1440px and 390px: no
  horizontal overflow, no broken media, no dead internal links, exactly one
  `<h1>` per page, no console errors.
