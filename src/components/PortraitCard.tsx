import { useEffect, useRef, useState } from 'react'
import { Sparkle } from '@/components/Deco'
import { aboutGallery, profile } from '@/data/profile'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

/** How far each card behind the front one is nudged and turned. */
const OFFSET_DESKTOP = 14
const OFFSET_MOBILE = 8
const TILT_DESKTOP = 2.4
const TILT_MOBILE = 1.6
/** Never stack more than this many cards, however many photos there are. */
const MAX_VISIBLE = 3

/**
 * A deck of square photos. One card per photo up to MAX_VISIBLE, each offset
 * and rotated behind the one in front, so the cards peeking out show the
 * photos actually coming up rather than blank filler.
 *
 * Tapping or swiping deals the next photo to the front and wraps.
 */
export function PortraitCard() {
  const [current, setCurrent] = useState(0)
  const [dealt, setDealt] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const total = aboutGallery.length
  const depth = Math.min(total, MAX_VISIBLE)
  const cycles = total > 1

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const offset = isMobile ? OFFSET_MOBILE : OFFSET_DESKTOP
  const tilt = isMobile ? TILT_MOBILE : TILT_DESKTOP

  const photoAt = (i: number) => aboutGallery[i % total]

  const next = () => {
    setCurrent((i) => (i + 1) % total)
    setDealt((n) => n + 1)
  }

  // Auto-advance photo every 5 seconds. Resets countdown on manual tap or swipe.
  useEffect(() => {
    if (!cycles) return
    const timer = setInterval(() => {
      next()
    }, 5000)
    return () => clearInterval(timer)
  }, [cycles, current, total])

  // Reset the deal pulse so it can replay on the next click.
  useEffect(() => {
    if (!dealt) return
    const t = setTimeout(() => setDealt(0), 260)
    return () => clearTimeout(t)
  }, [dealt])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const diffX = touchStartX.current - e.changedTouches[0].clientX
    const diffY = touchStartY.current - e.changedTouches[0].clientY
    touchStartX.current = null
    touchStartY.current = null
    // If horizontal swipe is > 30px and predominantly horizontal:
    if (Math.abs(diffX) > 30 && Math.abs(diffX) > Math.abs(diffY)) {
      next()
    }
  }

  /** Slot 0 is the front card; higher slots sit further back. */
  const slots = Array.from({ length: depth }, (_, d) => d).reverse()

  const deck = (
    <>
      {slots.map((d) => {
        const photo = photoAt(current + d)
        return (
          <div
            key={d}
            aria-hidden={d !== 0}
            style={{
              transform: `translate(${d * offset}px, ${d * (offset * 0.62)}px) rotate(${d * tilt}deg)`,
              zIndex: depth - d,
            }}
            className={cn(
              'absolute inset-0 overflow-hidden rounded-[18px] border border-hairline bg-surface',
              d === 0 ? 'shadow-portrait' : 'shadow-panel',
            )}
          >
            <img
              src={asset(photo.src)}
              alt={d === 0 ? photo.alt : ''}
              aria-hidden={d !== 0}
              width={1000}
              height={1000}
              loading={d === 0 ? 'eager' : 'lazy'}
              fetchPriority={d === 0 ? 'high' : 'low'}
              decoding="async"
              className={cn(
                'size-full object-cover select-none',
                d > 0 && 'brightness-[0.97] saturate-[0.9]',
              )}
            />
          </div>
        )
      })}

      {/* Warm the next card beyond the deck so dealing never shows an empty face. */}
      {total > depth && (
        <img
          src={asset(photoAt(current + depth).src)}
          alt=""
          aria-hidden="true"
          width={1}
          height={1}
          loading="eager"
          fetchPriority="low"
          decoding="async"
          className="pointer-events-none absolute size-px opacity-0"
        />
      )}
    </>
  )

  return (
    <figure
      className="relative mx-auto w-full max-w-[270px] sm:max-w-[340px] lg:max-w-[380px]"
      style={{ paddingRight: (depth - 1) * offset, paddingBottom: (depth - 1) * offset * 0.62 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Sparkle className="absolute -left-1 -top-3 z-10 size-4 opacity-80 sm:-left-3 sm:-top-4 sm:size-5" />
      <Sparkle className="absolute -bottom-1 right-0 z-10 size-3.5 opacity-70 sm:right-1 sm:size-4" />

      {/* The square box: the front card is exactly 1:1, the rest offset into
          the padding reserved above. */}
      <div
        className={cn(
          'relative aspect-square w-full transition-transform duration-200 ease-editorial',
          dealt && 'scale-[0.985]',
        )}
      >
        {cycles ? (
          <button
            type="button"
            onClick={next}
            aria-label={`Show next photo — ${current + 1} of ${total}`}
            className="group absolute inset-0 block rounded-[18px] text-left cursor-pointer"
          >
            {deck}

            {/* Counter and click/tap affordance ride on the front card. */}
            <span
              style={{ zIndex: depth + 1 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 rounded-b-[18px] bg-gradient-to-t from-black/60 to-transparent px-3 pb-2.5 pt-8 font-mono text-[0.65rem] tracking-[0.08em] text-white sm:px-3.5 sm:pb-3 sm:pt-10 sm:text-[0.68rem]"
            >
              <span className="tabular-nums">
                {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <span className="opacity-80 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                TAP OR SWIPE
              </span>
            </span>
          </button>
        ) : (
          <div className="absolute inset-0">{deck}</div>
        )}
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {cycles ? `Photo ${current + 1} of ${total}: ${aboutGallery[current].alt}` : ''}
      </p>

      <figcaption className="sr-only">
        {profile.name} — {profile.role}
      </figcaption>
    </figure>
  )
}
