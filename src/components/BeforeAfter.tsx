import { useCallback, useEffect, useRef, useState } from 'react'
import { RotateCcw, Play } from 'lucide-react'

export type BeforeAfterItem = {
  id: string
  /** Short label above the card, e.g. "Sand & refinish". */
  kicker: string
  heading: string
  body: string
  beforeSrc: string
  /** Final frame as a still — also the reduced-motion and no-video fallback. */
  afterSrc: string
  videoSrc: string
  beforeAlt: string
  afterAlt: string
}

type Mode = 'before' | 'after'

/**
 * Before/after viewer.
 *
 * The "before" state is a still photo. The "after" state plays a short clip of
 * the new floor going down over that exact same frame, then rests on its final
 * frame — so the toggle reads as one continuous transformation of one room
 * rather than two unrelated photos.
 *
 * Behaviour notes:
 *  - The clip is generated from the before frame and ends on the after frame,
 *    so the still and the video's last frame line up pixel-for-pixel.
 *  - It plays through once when first scrolled into view, then stops. It does
 *    not loop; a looping transformation is distracting next to body copy.
 *  - `prefers-reduced-motion` swaps the video for the after still entirely.
 *  - Video is `preload="none"` until first activation to keep it off the
 *    critical path — this sits well below the fold.
 */
export default function BeforeAfter({ item }: { item: BeforeAfterItem }) {
  const [mode, setMode] = useState<Mode>('before')
  const [hasPlayed, setHasPlayed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoRunDone = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const useVideo = !reducedMotion && !videoFailed

  const showAfter = useCallback(() => {
    setMode('after')
    if (!useVideo) return
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    // Autoplay can still be refused (low-power mode, aggressive settings).
    // Falling back to the still keeps the toggle honest either way.
    v.play().then(() => setHasPlayed(true)).catch(() => setVideoFailed(true))
  }, [useVideo])

  const showBefore = useCallback(() => {
    setMode('before')
    videoRef.current?.pause()
  }, [])

  // Play through once, unprompted, the first time the card is properly on
  // screen. This is the whole selling point of the section — asking for a
  // click first means most visitors never see it.
  useEffect(() => {
    const el = containerRef.current
    if (!el || !useVideo) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !autoRunDone.current) {
            autoRunDone.current = true
            showAfter()
          }
        }
      },
      { threshold: 0.55 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [showAfter, useVideo])

  const replay = () => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    v.play().catch(() => setVideoFailed(true))
  }

  return (
    <div ref={containerRef} className="w-full">
      {/* Toggle */}
      <div
        className="mb-4 inline-flex items-center gap-1.5 rounded-pill border border-ink/12 bg-white/70 p-1.5 backdrop-blur"
        role="group"
        aria-label={`${item.heading} — before and after`}
      >
        <TogglePill
          active={mode === 'before'}
          onClick={showBefore}
          label="Before"
        />
        <TogglePill
          active={mode === 'after'}
          onClick={showAfter}
          label="After"
          icon={mode !== 'after' && useVideo ? <Play size={13} fill="currentColor" /> : undefined}
        />
      </div>

      {/* Media */}
      <div className="relative overflow-hidden rounded-card bg-linen shadow-lift-lg">
        {/* 16:9 box keeps layout stable before the media decodes — no CLS. */}
        <div className="relative aspect-[16/9] w-full">
          <img
            src={item.beforeSrc}
            alt={item.beforeAlt}
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-smooth ${
              mode === 'before' ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {useVideo ? (
            <video
              ref={videoRef}
              src={item.videoSrc}
              poster={item.beforeSrc}
              muted
              playsInline
              preload="none"
              aria-label={item.afterAlt}
              onError={() => setVideoFailed(true)}
              onEnded={() => setHasPlayed(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-smooth ${
                mode === 'after' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <img
              src={item.afterSrc}
              alt={item.afterAlt}
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-smooth ${
                mode === 'after' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Corner state badge */}
          <div className="pointer-events-none absolute left-4 top-4 rounded-pill bg-ink/72 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-paper backdrop-blur-sm">
            {mode === 'before' ? 'Before' : 'After'}
          </div>

          {/* Replay, only once there is something to replay */}
          {mode === 'after' && useVideo && hasPlayed && (
            <button
              type="button"
              onClick={replay}
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-pill bg-ink/72 px-3.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-paper backdrop-blur-sm transition hover:bg-ink/88"
            >
              <RotateCcw size={13} strokeWidth={2.5} aria-hidden="true" />
              Replay
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function TogglePill({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean
  onClick: () => void
  label: string
  icon?: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-pill px-5 py-2 text-[0.82rem] font-semibold tracking-wide transition-all duration-200 ease-smooth ${
        active
          ? 'bg-ink text-paper shadow-sm'
          : 'text-ink/60 hover:bg-ink/6 hover:text-ink'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}
