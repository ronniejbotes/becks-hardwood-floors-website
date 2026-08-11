# Beck's Hardwood Floors — website

Marketing site for Beck's Hardwood Floors, a hardwood flooring contractor in
Winston-Salem, North Carolina. Owner: Travis Beck. Phone: (336) 764-2395.

**Status: in development. The imagery is placeholder and several business
details are still unconfirmed — read [§ Before this goes live](#before-this-goes-live)
before treating this as finished.**

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

There is a handover checklist covering unconfirmed business facts, claims that
must never appear on the site, and the placeholder imagery that has to be
swapped out. It is kept **out of this repository on purpose** — this repo is
public so Hostinger can deploy from it, and those notes concern a prospect who
has not seen them.

See `HANDOVER.local.md` (gitignored, local only) or the team drive.

The short version, for anyone touching the code:

- **Every image is AI-generated placeholder.** Replace with real photos before
  this is shown as finished work. Drop them in `media-src/`, run
  `node scripts/optimize-media.mjs`, then set `isIllustration = false` in
  `src/content/gallery.ts` and remove `illustration: true` from
  `src/content/home.ts`.
- **Do not add claims to `src/site.config.ts` without a source.** The comments
  in that file record where every published fact came from and which ones are
  still unverified. Read them before editing.
- **Never add `aggregateRating` or `review` structured data.** See the header
  comment in `src/lib/schema.ts` for why.

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

Hostinger's Git integration **clones a branch and serves it — it never runs a
build.** Pointing it at `main` would fill `public_html` with TypeScript and no
`index.html`. So the repo keeps a second branch, `deploy`, containing the built
site at its root, and a workflow that regenerates it.

```
main ──push──> GitHub Action builds ──force-push──> deploy ──Hostinger pulls──> public_html
```

### One-time setup

The repo is **private**, so Hostinger authenticates over SSH.

1. **hPanel → Advanced → GIT**, copy the SSH key from *Private Git Repository*.
2. **GitHub → repo → Settings → Deploy keys → Add deploy key.** Paste it, title
   it "Hostinger", leave *Allow write access* **unchecked**. Read-only is all it
   needs, and a read-only key cannot damage the repo if the host is ever
   compromised.
3. **Empty `public_html`.** Hostinger refuses to deploy into a non-empty
   directory, and it ships a placeholder `index.html` / `default.php`.
4. Back on the GIT page, *Create a New Repository*:

   | Field | Value |
   |---|---|
   | Repository | `git@github.com:ronniejbotes/becks-hardwood-floors-website.git` |
   | Branch | `deploy` |
   | Directory | *(leave blank — deploys to `public_html`)* |

   The SSH form of the URL is required. The HTTPS form only works for public
   repos.
5. Click **Create**, then **Deploy**.

### After that

Push to `main` → the Action rebuilds and updates `deploy` (~1 min) → click
**Deploy** in hPanel. Hostinger also shows a webhook URL on that page; add it to
GitHub under Settings → Webhooks to skip the click entirely.

### Choosing the domain and indexing state

Both are repository variables — **Settings → Secrets and variables → Actions →
Variables**:

| Variable | Default | Set it to |
|---|---|---|
| `SITE_URL` | `https://lightcyan-curlew-520407.hostingersite.com` | The origin the site is actually served from |
| `NOINDEX` | `1` | `0` once it is on the real domain and ready to rank |

`SITE_URL` drives every canonical tag, `og:url` and schema `@id`, so a wrong
value points the whole site at a host it is not on.

The defaults are deliberately the safe ones — temp domain, indexing **off**. A
site that is not indexed is fixable in a minute. A staging copy full of
placeholder photography, indexed under a throwaway subdomain and competing with
the real site later, is not.

**Going live checklist:** set `SITE_URL` to the real domain, set `NOINDEX` to
`0`, push, deploy, then submit the sitemap in Search Console.

### Alternative: FTP

`.github/workflows/deploy.yml` uploads `dist/` straight to `public_html` over
FTP, with no hPanel click. It is **manual-trigger only** until you add
`FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD` (hPanel → Files → FTP Accounts)
and uncomment its `push:` trigger. Use one method or the other, not both.

### Local preview build

```bash
npm run build:preview -- https://some-temp-domain.hostingersite.com
```

Same output the Action produces: canonicals on that host, indexing blocked.

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
