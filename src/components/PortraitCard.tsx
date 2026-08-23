import { useEffect, useState } from 'react'
import { Sparkle } from '@/components/Deco'
import { aboutGallery, profile } from '@/data/profile'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

/** How far each card behind the front one is nudged and turned. */
const OFFSET = 15
const TILT = 2.6
/** Never stack more than this many cards, however many photos there are. */
const MAX_VISIBLE = 3

/**
 * A deck of square photos. One card per photo up to MAX_VISIBLE, each offset
 * and rotated behind the one in front, so the cards peeking out show the
 * photos actually coming up rather than blank filler.
 *
 * Clicking deals the next photo to the front and wraps. Only one <img> is
 * mounted per card — with 20-odd photos, rendering them all and toggling
 * opacity would put ~60 images in the DOM — and the next one beyond the deck
 * is preloaded so the swap never lands on an empty card.
 *
 * Add images to `aboutGallery` in src/data/profile.ts; the deck grows itself.
 */
export function PortraitCard() {
  const [current, setCurrent] = useState(0)
  const [dealt, setDealt] = useState(0)
  const total = aboutGallery.length
  const depth = Math.min(total, MAX_VISIBLE)
  const cycles = total > 1

  const photoAt = (i: number) => aboutGallery[i % total]

  const next = () => {
    setCurrent((i) => (i + 1) % total)
    setDealt((n) => n + 1)
  }

  // Reset the deal pulse so it can replay on the next click.
  useEffect(() => {
    if (!dealt) return
    const t = setTimeout(() => setDealt(0), 260)
    return () => clearTimeout(t)
  }, [dealt])

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
              transform: `translate(${d * OFFSET}px, ${d * (OFFSET * 0.62)}px) rotate(${d * TILT}deg)`,
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
                'size-full object-cover',
                // Cards behind sit back a touch so the front one reads first.
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
      className="relative mx-auto w-full max-w-[340px] lg:max-w-[380px]"
      style={{ paddingRight: (depth - 1) * OFFSET, paddingBottom: (depth - 1) * OFFSET * 0.62 }}
    >
      <Sparkle className="absolute -left-3 -top-4 z-10 size-5 opacity-80" />
      <Sparkle className="absolute -bottom-1 right-1 z-10 size-4 opacity-70" />

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
            className="group absolute inset-0 block rounded-[18px] text-left"
          >
            {deck}

            {/* Counter and click affordance ride on the front card. */}
            <span
              style={{ zIndex: depth + 1 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 rounded-b-[18px] bg-gradient-to-t from-black/60 to-transparent px-3.5 pb-3 pt-10 font-mono text-[0.68rem] tracking-[0.08em] text-white"
            >
              <span className="tabular-nums">
                {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                CLICK TO CHANGE
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
