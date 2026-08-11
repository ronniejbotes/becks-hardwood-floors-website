#!/usr/bin/env node
/**
 * Emits dist/sitemap.xml and dist/robots.txt after the SSG build.
 *
 * The URL list is derived from the directories the build actually produced, so
 * the sitemap can never drift out of step with what is deployed — a sitemap
 * listing URLs that 404, or missing URLs that exist, is one of the first things
 * to break trust in Search Console.
 *
 * DO NOT submit this sitemap until the real domain is live and SITE_URL below
 * matches it. Renaming a URL Google has already fetched costs authority; a
 * rename before first fetch is free.
 */

import {
  readdirSync,
  statSync,
  writeFileSync,
  readFileSync,
  existsSync,
  copyFileSync,
} from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const DIST = join(root, 'dist')

/**
 * Must match `url` in src/site.config.ts — both read the same env override so a
 * preview build cannot end up with canonicals on one host and a sitemap on
 * another.
 */
const SITE_URL = (process.env.VITE_SITE_URL || 'https://beckshardwoodfloors.com').replace(
  /\/$/,
  ''
)

/** Preview builds are not indexable, so they get no sitemap at all. */
const NOINDEX = process.env.VITE_NOINDEX === '1'

/** Relative priority. Home first, money pages next, everything else after. */
const PRIORITY = {
  '/': '1.0',
  '/refinishing/': '0.9',
  '/installation/': '0.9',
  '/luxury-vinyl-plank/': '0.8',
  '/repair/': '0.8',
  '/gallery/': '0.7',
  '/about/': '0.6',
  '/contact/': '0.7',
}

/** Never list these. */
const EXCLUDE = new Set(['/404/'])

if (!existsSync(DIST)) {
  console.error('No dist/ directory — run the build first.')
  process.exit(1)
}

/** Walk dist/ and collect every directory containing an index.html. */
function collectRoutes(dir, found = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (!statSync(full).isDirectory()) continue
    // Build output only; skip the static asset directories.
    if (entry === 'assets' || entry === 'media') continue
    if (existsSync(join(full, 'index.html'))) {
      found.push(`/${relative(DIST, full).split(/[\\/]/).join('/')}/`)
    }
    collectRoutes(full, found)
  }
  return found
}

const routes = ['/', ...collectRoutes(DIST)]
  .filter((r) => !EXCLUDE.has(r))
  .filter((v, i, a) => a.indexOf(v) === i)
  .sort((a, b) => (PRIORITY[b] ?? '0.5').localeCompare(PRIORITY[a] ?? '0.5'))

const today = new Date().toISOString().slice(0, 10)

if (NOINDEX) {
  // Belt and braces. The noindex meta tag on every page is what actually gets
  // the URL dropped from an index, and a robots.txt Disallow would stop a
  // crawler ever fetching the page to see it — so this emits BOTH the
  // machine-readable block and an X-Robots-Tag header via .htaccess, and
  // deliberately writes no sitemap.
  writeFileSync(
    join(DIST, 'robots.txt'),
    `# PREVIEW BUILD — NOT FOR PUBLIC INDEXING\nUser-agent: *\nDisallow: /\n`
  )

  const htaccessPath = join(DIST, '.htaccess')
  if (existsSync(htaccessPath)) {
    const current = readFileSync(htaccessPath, 'utf8')
    writeFileSync(
      htaccessPath,
      `# ── PREVIEW BUILD ───────────────────────────────────────────────────\n` +
        `# Injected by scripts/generate-sitemap.mjs because VITE_NOINDEX=1.\n` +
        `# Remove this block (or rebuild without VITE_NOINDEX) before going live.\n` +
        `<IfModule mod_headers.c>\n` +
        `  Header always set X-Robots-Tag "noindex, nofollow"\n` +
        `</IfModule>\n\n` +
        current
    )
  }

  console.log('PREVIEW BUILD: noindex meta on every page, X-Robots-Tag header')
  console.log('               robots.txt disallows all, no sitemap written')
  console.log(`               canonical origin: ${SITE_URL}`)
} else {

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <priority>${PRIORITY[route] ?? '0.5'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(DIST, 'sitemap.xml'), sitemap)

const robots = `# ${SITE_URL}
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

writeFileSync(join(DIST, 'robots.txt'), robots)

  console.log(`sitemap.xml written with ${routes.length} URLs:`)
  for (const r of routes) console.log(`  ${SITE_URL}${r}`)
}

// Apache's `ErrorDocument 404 /404.html` needs a real file at that exact path,
// but the SSG emits dist/404/index.html. Copy it up. Needed in both build modes.
const notFoundSrc = join(DIST, '404', 'index.html')
if (existsSync(notFoundSrc)) {
  copyFileSync(notFoundSrc, join(DIST, '404.html'))
  console.log('404.html copied from dist/404/index.html')
} else {
  console.warn('WARNING: no dist/404/index.html — ErrorDocument will not work.')
}
