import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'
import { cn } from '@/lib/cn'

/** The "VR." wordmark — initials in ink, the full stop in amber. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label={`${profile.name} — home`}
      className={cn(
        'font-display text-[1.35rem] font-bold leading-none tracking-tight text-ink transition-opacity hover:opacity-70',
        className,
      )}
    >
      <span aria-hidden="true">
        VR<span className="text-gold">.</span>
      </span>
    </Link>
  )
}
