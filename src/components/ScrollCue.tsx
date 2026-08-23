import { ArrowDown } from 'lucide-react'
import { cn } from '@/lib/cn'

/** PRD §5.6 / FR-10 — the reference's animated ↓ cue. Decorative only. */
export function ScrollCue({ className }: { className?: string }) {
  return (
    <div className={cn('flex justify-center', className)} aria-hidden="true">
      <ArrowDown
        className="size-[18px] text-ink-muted animate-cue-bob"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </div>
  )
}
