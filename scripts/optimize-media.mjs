#!/usr/bin/env node
/**
 * Media optimisation pass.
 *
 * Source files live in  media-src/       (committed, NEVER served)
 * Optimised output goes to public/media/  (served)
 *
 * media-src/ deliberately sits OUTSIDE public/. Anything under public/ is
 * copied verbatim into dist/ by Vite, so keeping 80 MB of source PNGs there
 * shipped every one of them to the web server alongside their own optimised
 * versions.
 *
 * Run with:  node scripts/optimize-media.mjs
 * Requires ffmpeg on PATH.
 *
 * Why this exists: Travis will hand over real job photos straight off a phone,
 * which means 4–8 MB JPEGs at odd dimensions. Dropping them into media-src/ and
 * re-running this keeps every served image correctly sized, stripped of EXIF
 * (phone photos carry GPS coordinates of customers' homes — that must not be
 * published) and paired with a WebP alternative.
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const RAW = join(root, 'media-src')
const OUT = join(root, 'public', 'media')

/** Width each image is served at. Images are never upscaled past their source. */
const IMAGE_WIDTH = 1600
const HERO_WIDTH = 2000
const JPEG_QUALITY = 4 // ffmpeg -q:v scale, 2 = best, 5 = getting soft
const WEBP_QUALITY = 78

/** Videos: 720p is plenty for a card that renders ~700px wide. */
const VIDEO_HEIGHT = 720
const VIDEO_CRF = 30

function run(args) {
  execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], {
    stdio: 'inherit',
  })
}

function kb(p) {
  return `${(statSync(p).size / 1024).toFixed(0)} KB`
}

if (!existsSync(RAW)) {
  console.error(`No source directory at ${RAW}`)
  process.exit(1)
}
mkdirSync(OUT, { recursive: true })

const files = readdirSync(RAW)

for (const file of files) {
  const { name, ext } = parse(file)
  const src = join(RAW, file)
  const lower = ext.toLowerCase()

  if (['.png', '.jpg', '.jpeg'].includes(lower)) {
    const width = name === 'hero' ? HERO_WIDTH : IMAGE_WIDTH
    // -map_metadata -1 strips EXIF, including any GPS tag.
    const scale = `scale='min(${width},iw)':-2:flags=lanczos`

    const jpg = join(OUT, `${name}.jpg`)
    run([...['-i', src], '-vf', scale, '-q:v', String(JPEG_QUALITY), '-map_metadata', '-1', jpg])

    const webp = join(OUT, `${name}.webp`)
    run([...['-i', src], '-vf', scale, '-quality', String(WEBP_QUALITY), '-map_metadata', '-1', webp])

    console.log(`image  ${name}  ${kb(src)} -> jpg ${kb(jpg)} / webp ${kb(webp)}`)
  }

  if (lower === '.mp4') {
    const mp4 = join(OUT, `${name}.mp4`)
    run([
      '-i', src,
      '-vf', `scale=-2:${VIDEO_HEIGHT}:flags=lanczos`,
      '-c:v', 'libx264',
      '-crf', String(VIDEO_CRF),
      '-preset', 'slow',
      '-profile:v', 'main',
      '-pix_fmt', 'yuv420p',
      // faststart puts the moov atom first so playback can begin before the
      // whole file has downloaded.
      '-movflags', '+faststart',
      '-an',
      mp4,
    ])

    // Poster = first frame. Last frame = the "after" still, so the video's end
    // state and the toggle's static state are pixel-identical.
    const poster = join(OUT, `${name}-poster.jpg`)
    run(['-i', src, '-vf', `scale=${IMAGE_WIDTH}:-2`, '-frames:v', '1', '-q:v', '3', poster])

    const last = join(OUT, `${name}-final.jpg`)
    run(['-sseof', '-0.2', '-i', src, '-vf', `scale=${IMAGE_WIDTH}:-2`, '-frames:v', '1', '-q:v', '3', '-update', '1', last])

    console.log(`video  ${name}  ${kb(src)} -> ${kb(mp4)} (+ poster, final frame)`)
  }
}

console.log('\nDone.')
