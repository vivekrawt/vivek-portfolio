import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface Props {
  children: ReactNode
  /** Amber mono kicker above the heading, e.g. "All projects". */
  kicker?: string
  className?: string
  as?: 'h1' | 'h2'
}

/** Amber mono kicker with a trailing rule, over a display heading. */
export function SectionHeading({ children, kicker, className, as: Tag = 'h2' }: Props) {
  return (
    <div className={cn('space-y-5', className)}>
      {kicker && (
        <p className="flex items-center gap-3 font-mono text-label uppercase text-gold-ink">
          {kicker}
          <span aria-hidden="true" className="h-[2px] w-7 rounded-full bg-gold" />
        </p>
      )}
      <Tag className="font-display text-h2">{children}</Tag>
    </div>
  )
}
