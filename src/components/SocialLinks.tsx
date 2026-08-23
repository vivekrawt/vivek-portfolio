import { visibleSocials } from '@/data/profile'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'

/** PRD §6.3 / FR-9 — external, new tab, tracked. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-x-5 gap-y-2', className)}>
      {visibleSocials().map((social) => (
        <li key={social.name}>
          <a
            href={social.url}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => track('outbound_click', { destination: social.name })}
            className="link-underline text-sm text-ink-muted hover:text-ink"
          >
            {social.name}
          </a>
        </li>
      ))}
    </ul>
  )
}
