import { MoreOnGitHubCard, ProjectCard } from '@/components/ProjectCard'
import { Reveal } from '@/components/Reveal'
import { projects } from '@/data/projects'
import { cn } from '@/lib/cn'

interface Props {
  /** Home's teaser strip hides the copy under each card (PRD §7.1). */
  compact?: boolean
  /** Cap the number of case studies shown; the GitHub card always follows. */
  limit?: number
  className?: string
}

/** PRD §7.3 / §12.3 — 4-up desktop, 2-up tablet, 1-up mobile. */
export function ProjectGrid({ compact = false, limit, className }: Props) {
  const shown = limit ? projects.slice(0, limit) : projects
  return (
    <ul className={cn('grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {shown.map((project, i) => (
        <li key={project.slug}>
          <Reveal delay={i * 70}>
            <ProjectCard project={project} compact={compact} />
          </Reveal>
        </li>
      ))}
      <li>
        <Reveal delay={shown.length * 70}>
          <MoreOnGitHubCard compact={compact} />
        </Reveal>
      </li>
    </ul>
  )
}
