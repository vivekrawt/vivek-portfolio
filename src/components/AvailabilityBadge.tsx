import { profile } from '@/data/profile'
import { cn } from '@/lib/cn'

/** PRD §5.7 — green dot + availability line, sitting above the hero intro. */
export function AvailabilityBadge({ className }: { className?: string }) {
  return (
    <p className={cn('flex items-center justify-center gap-2 text-[0.82rem] text-ink-muted', className)}>
      <span
        aria-hidden="true"
        className="inline-block size-[7px] shrink-0 rounded-full bg-accent animate-dot-pulse"
      />
      {profile.availability}
    </p>
  )
}
