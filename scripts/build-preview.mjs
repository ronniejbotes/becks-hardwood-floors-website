#!/usr/bin/env node
/**
 * Build for a preview / staging domain (e.g. a Hostinger temp subdomain).
 *
 *   npm run build:preview -- https://lightcyan-curlew-520407.hostingersite.com
 *
 * Differs from a production build in exactly two ways, both deliberate:
 *
 *  1. Canonicals, og:url and schema @ids point at the preview host instead of
 *     the real domain. Serving a page whose canonical names a different host is
 *     how you end up with the preview competing with the real site later.
 *
 *  2. Indexing is blocked — noindex meta on every page, an X-Robots-Tag header,
 *     and no sitemap. Staging carries placeholder photography and unconfirmed
 *     copy, so it must not be indexed as if it were the finished site.
 *
 * Written as a script rather than an inline env var because `VAR=x npm run …`
 * does not work in cmd.exe, and this repo is developed on Windows.
 */

import { spawnSync } from 'node:child_process'

const arg = process.argv[2] || process.env.PREVIEW_URL

if (!arg) {
  console.error(
    'Usage: npm run build:preview -- https://your-temp-domain.hostingersite.com'
  )
  process.exit(1)
}

let origin
try {
  const u = new URL(arg)
  if (!/^https?:$/.test(u.protocol)) throw new Error('not http(s)')
  origin = u.origin
} catch {
  console.error(`Not a valid URL: ${arg}`)
  console.error('Expected something like https://lightcyan-curlew-520407.hostingersite.com')
  process.exit(1)
}

console.log(`\nPreview build for ${origin}`)
console.log('Indexing will be blocked (noindex + X-Robots-Tag, no sitemap).\n')

const result = spawnSync('npm', ['run', 'build'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, VITE_SITE_URL: origin, VITE_NOINDEX: '1' },
})

process.exit(result.status ?? 1)
