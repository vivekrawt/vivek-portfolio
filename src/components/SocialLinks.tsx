import { SocialIcon } from '@/components/SocialIcon'
import { visibleSocials } from '@/data/profile'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'

interface SocialLinksProps {
  className?: string
  /**
   * "text" is the plain underlined list used on /contact; "tile" is the
   * footer's amber icon tile followed by the network name.
   */
  variant?: 'text' | 'tile'
  /** Tile variant only — drops the name below `lg` so the row never wraps. */
  compactLabels?: boolean
}

/** PRD §6.3 / FR-9 — external, new tab, tracked. */
export function SocialLinks({ className, variant = 'text', compactLabels = false }: SocialLinksProps) {
  const tile = variant === 'tile'

  return (
    <ul
      className={cn(
        'flex flex-wrap items-center',
        tile ? 'gap-x-4 gap-y-3 sm:gap-x-5' : 'gap-x-5 gap-y-2',
        className,
      )}
    >
      {visibleSocials().map((social) => (
        <li key={social.name}>
          <a
            href={social.url}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => track('outbound_click', { destination: social.name })}
            aria-label={tile ? `${social.name} — opens in a new tab` : undefined}
            className={
              tile
                ? 'group flex items-center gap-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink'
                : 'link-underline text-sm text-ink-muted hover:text-ink'
            }
          >
            {tile && (
              <span className="icon-tile size-8 border border-gold/45 transition-colors group-hover:border-gold group-hover:bg-gold/20">
                <SocialIcon name={social.icon} />
              </span>
            )}
            <span className={cn(tile && compactLabels && 'hidden lg:inline')}>{social.name}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
