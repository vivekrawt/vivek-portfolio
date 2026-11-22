import type { Stat } from '@/types'
import { cn } from '@/lib/cn'

/** A value that opens with a digit or a comparator is a real measurement. */
const isQuantitative = (value: string) => /^[\d$£€<>~+]/.test(value.trim())

/**
 * PRD §7.4 — big number, quiet label.
 *
 * Qualitative callouts ("Rule-based", "Real-time") drop a size so they read as
 * the attributes they are; only actual figures get the full display treatment.
 */
export function StatCallout({ value, label }: Stat) {
  return (
    <div className="border-t border-ink pt-3 sm:pt-4">
      <p
        className={cn(
          'font-display tabular-nums',
          isQuantitative(value)
            ? 'text-[1.65rem] sm:text-stat'
            : 'text-[1.2rem] font-semibold leading-tight tracking-tight sm:text-[1.75rem]',
        )}
      >
        {value}
      </p>
      <p className="mt-1.5 text-xs leading-snug text-ink-muted sm:mt-2 sm:text-sm">{label}</p>
    </div>
  )
}
