import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SocialLinks } from '@/components/SocialLinks'
import { profile } from '@/data/profile'

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
    </footer>
  )
}
