import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SocialLinks } from '@/components/SocialLinks'
import { Quote } from '@/components/Quote'
import { profile } from '@/data/profile'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

/**
 * Left-to-right slices of the footer range. Widths are a share of the viewport
 * so the range keeps its proportions instead of the centre peak ballooning on
 * wide screens; the row overflows on purpose and is clipped at both edges.
 */
const FOOTER_RANGE = [
  { src: '/images/footer-range-green.webp', width: 'w-[32%] sm:w-[30%] lg:w-[26%]', depth: 'z-20', flipped: true },
  { src: '/images/footer-range-snow.webp', width: 'w-[38%] sm:w-[34%] lg:w-[30%]', depth: 'z-10', flipped: false },
  { src: '/images/footer-range-glacier.webp', width: 'w-[50%] sm:w-[42%] lg:w-[38%]', depth: 'z-0', flipped: false },
  { src: '/images/footer-range-snow.webp', width: 'w-[38%] sm:w-[34%] lg:w-[30%]', depth: 'z-10', flipped: true },
  { src: '/images/footer-range-green.webp', width: 'w-[32%] sm:w-[30%] lg:w-[26%]', depth: 'z-20', flipped: false },
]

/**
 * PRD §6.3 — monogram + © left, "Get in touch" centre, socials right, with
 * hairline dividers between the three and a dotted grid bleeding in from
 * either edge. Everything collapses to a stacked column below `sm`.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-hairline">
      {/* Decorative dot grid at each end — matches the hero's texture. */}
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-y-0 left-0 hidden w-24 opacity-60 [mask-image:linear-gradient(to_right,black,transparent)] md:block"
      />
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-y-0 right-0 hidden w-24 opacity-60 [mask-image:linear-gradient(to_left,black,transparent)] md:block"
      />

      <div className="frame relative">
        <div className="flex flex-col items-start gap-8 py-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          {/* Identity */}
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-gold-soft font-display text-[0.9rem] font-bold tracking-tight text-ink"
            >
              VR
            </span>
            <span className="leading-tight">
              <span className="block font-semibold text-ink">{profile.name}</span>
              <span className="block">© {year} All rights reserved.</span>
            </span>
          </div>

          <span aria-hidden="true" className="hidden h-10 w-px bg-hairline lg:block" />

          {/* Call to action */}
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 border-b-2 border-gold-line pb-1 text-base font-medium text-ink transition-colors hover:border-ink"
          >
            Get in touch
            <ArrowUpRight
              className="size-4 transition-transform duration-300 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>

          <span aria-hidden="true" className="hidden h-10 w-px bg-hairline lg:block" />

          <SocialLinks variant="tile" compactLabels />
        </div>
      </div>

      <Quote />

      {/* PRD §6.3 addendum — a mountain range caps the page: the glacier peak
          sits centre with snow ridges either side and low green foothills
          closing the ends. Each cut-out is bottom-aligned and overlaps its
          neighbour, so five images read as one continuous ridge line that
          runs off both edges. Nearer (greener, lower) pieces stack in front. */}
      <div
        aria-hidden="true"
        className="flex w-full items-end justify-center overflow-hidden"
      >
        {FOOTER_RANGE.map(({ src, width, depth, flipped }, index) => (
          <img
            key={`${src}-${index}`}
            src={asset(src)}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className={cn(
              'block h-auto max-w-none shrink-0 select-none',
              // Feather the cut edges so neighbouring slices cross-dissolve
              // instead of showing the photo's rectangular boundary.
              '[-webkit-mask-image:linear-gradient(to_right,transparent,black_16%,black_84%,transparent)]',
              '[mask-image:linear-gradient(to_right,transparent,black_16%,black_84%,transparent)]',
              width,
              depth,
              flipped && '-scale-x-100',
              index > 0 && '-ml-[11%] sm:-ml-[9%]',
            )}
          />
        ))}
      </div>
    </footer>
  )
}
