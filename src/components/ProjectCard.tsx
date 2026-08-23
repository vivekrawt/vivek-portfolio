import { Link } from 'react-router-dom'
import { FolderMotif, Visual } from '@/components/ProjectThumb'
import { ToolChips } from '@/components/ToolChip'
import { moreCard } from '@/data/projects'
import { track } from '@/lib/analytics'
import type { Project } from '@/types'

const frame =
  'block overflow-hidden rounded-[18px] border border-hairline bg-surface shadow-panel transition-all duration-300 ease-editorial ' +
  'group-hover:-translate-y-1 group-hover:border-gold/45 group-hover:shadow-lift ' +
  'group-focus-visible:-translate-y-1 group-focus-visible:border-gold/45'

/** PRD §7.3 — thumb + mono index inside the frame; copy beneath it. */
export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      onClick={() => track('project_view', { project: project.slug })}
      className="group block rounded-[18px] focus-visible:outline-none"
    >
      <article>
        <div className={frame}>
          <div
            className="aspect-[4/3] p-5 grayscale opacity-90 transition-all duration-500 ease-editorial group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100"
          >
            <Visual visual={project.visual} />
          </div>

          <div className="flex items-center gap-2.5 border-t border-hairline px-4 py-2.5">
            <span className="font-mono text-[0.7rem] font-medium text-gold-ink">{project.index}</span>
            <span className="font-mono text-[0.7rem] text-ink-muted">{project.shortTitle}</span>
          </div>
        </div>

        {!compact && (
          <div className="mt-5 space-y-3">
            <h3 className="font-display text-[1.0625rem] font-semibold leading-snug tracking-tight">
              {project.title}
            </h3>
            <p className="text-[0.9rem] leading-relaxed text-ink-muted">{project.outcome}</p>
            <ToolChips tools={project.tools.slice(0, 3)} />
          </div>
        )}
      </article>
    </Link>
  )
}

/** PRD §7.3 — slot 04: an outbound card instead of a fourth case study. */
export function MoreOnGitHubCard({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={moreCard.href}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => track('outbound_click', { destination: 'GitHub — more projects' })}
      className="group block rounded-[18px] focus-visible:outline-none"
    >
      <article>
        <div className={frame}>
          <div className="aspect-[4/3] p-5 grayscale opacity-90 transition-all duration-500 ease-editorial group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100">
            <FolderMotif />
          </div>

          <div className="flex items-center gap-2.5 border-t border-hairline px-4 py-2.5">
            <span className="font-mono text-[0.7rem] font-medium text-gold-ink">{moreCard.index}</span>
            <span className="font-mono text-[0.7rem] text-ink-muted">{moreCard.label}</span>
          </div>
        </div>

        {!compact && (
          <div className="mt-5 space-y-3">
            <h3 className="font-display text-[1.0625rem] font-semibold leading-snug tracking-tight">
              {moreCard.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </h3>
            <p className="text-[0.9rem] leading-relaxed text-ink-muted">{moreCard.outcome}</p>
          </div>
        )}
      </article>
    </a>
  )
}
