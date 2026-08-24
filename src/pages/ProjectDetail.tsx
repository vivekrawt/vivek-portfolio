import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Visual } from '@/components/ProjectThumb'
import { Reveal } from '@/components/Reveal'
import { StatCallout } from '@/components/StatCallout'
import { ToolChips } from '@/components/ToolChip'
import { getProject, projects } from '@/data/projects'
import { asset } from '@/lib/asset'
import { track } from '@/lib/analytics'
import { useSeo } from '@/lib/useSeo'

function Prose({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-hairline pt-8 sm:grid-cols-[168px_minmax(0,1fr)] sm:gap-10">
      <h2 className="mono-label sm:pt-1.5">{title}</h2>
      <div className="max-w-prose">{children}</div>
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="relative pl-6 text-[1.0625rem] leading-relaxed text-ink-muted">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[0.62em] size-[5px] rounded-full bg-ink/35"
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  useSeo({
    title: project ? `${project.title} — Vivek Rawat` : 'Project — Vivek Rawat',
    description: project?.outcome ?? '',
    path: `projects/${slug ?? ''}`,
  })

  useEffect(() => {
    if (project) track('project_view', { project: project.slug })
  }, [project])

  if (!project) return <Navigate to="/404" replace />

  const next = projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length]

  return (
    <article className="frame section">
      <Reveal>
        <Link
          to="/projects"
          className="link-underline inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="size-4" strokeWidth={1.75} aria-hidden="true" />
          All projects
        </Link>
      </Reveal>

      {/* Header — PRD §7.4.1 */}
      <Reveal delay={60} className="mt-10 max-w-4xl">
        <p className="flex items-center gap-3 font-mono text-label uppercase text-gold-ink">
          {project.index} · {project.date}
          <span aria-hidden="true" className="h-[2px] w-7 rounded-full bg-gold" />
        </p>
        <h1 className="mt-5 font-display text-h2">{project.title}</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-muted">{project.outcome}</p>
        <ToolChips tools={project.tools} className="mt-7" />
      </Reveal>

      {/* At a glance — at least one quantified stat above the fold. */}
      <Reveal delay={120} className="mt-14">
        <h2 className="sr-only">At a glance</h2>
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {project.stats.map((stat) => (
            <StatCallout key={stat.label} {...stat} />
          ))}
        </div>
      </Reveal>

      {/* Visual — PRD §7.4.6 */}
      <Reveal delay={80} className="mt-16">
        <div className="rounded-[20px] border border-hairline bg-surface p-6 shadow-panel sm:p-10">
          <div className="mx-auto aspect-[16/9] max-w-4xl">
            <Visual visual={project.visual} eager />
          </div>
        </div>
        <p className="mt-3 font-mono text-[0.72rem] text-ink-muted">
          {project.index} ·{' '}
          {project.visual.type === 'image'
            ? 'Dashboard as built.'
            : 'Schematic of the analysis — not production data.'}
        </p>
      </Reveal>

      {/* Supporting sheets from the same analysis. */}
      {project.gallery && project.gallery.length > 0 && (
        <Reveal delay={80} className="mt-8">
          <h2 className="sr-only">Supporting views</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {project.gallery.map((item) => (
              <figure key={item.src}>
                <div className="rounded-[16px] border border-hairline bg-surface p-4 shadow-panel">
                  <img
                    src={asset(item.src)}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] w-full rounded-lg object-contain"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-[0.72rem] text-ink-muted">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      )}

      <div className="mt-16 space-y-12">
        <Reveal>
          <Prose title="Problem">
            <p className="text-[1.0625rem] leading-relaxed text-ink-muted">{project.problem}</p>
          </Prose>
        </Reveal>

        <Reveal>
          <Prose title="Approach">
            <Bullets items={project.approach} />
          </Prose>
        </Reveal>

        <Reveal>
          <Prose title="Impact">
            <Bullets items={project.impact} />
          </Prose>
        </Reveal>

        {(project.links.repo || project.links.live) && (
          <Reveal>
            <Prose title="Links">
              <ul className="space-y-3">
                {project.links.repo && (
                  <li>
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={() => track('outbound_click', { destination: `repo:${project.slug}` })}
                      className="link-underline inline-flex items-center gap-1.5 text-[1.0625rem] text-ink"
                    >
                      View the repository on GitHub
                      <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  </li>
                )}
                {project.links.live && (
                  <li>
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={() => track('outbound_click', { destination: `live:${project.slug}` })}
                      className="link-underline inline-flex items-center gap-1.5 text-[1.0625rem] text-ink"
                    >
                      Open the live dashboard
                      <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  </li>
                )}
              </ul>
            </Prose>
          </Reveal>
        )}
      </div>

      <Reveal className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-8">
        <Link to="/projects" className="link-underline text-sm text-ink-muted hover:text-ink">
          ← All projects
        </Link>
        <Link to={`/projects/${next.slug}`} className="link-underline text-sm text-ink hover:text-ink">
          Next: {next.title} →
        </Link>
      </Reveal>
    </article>
  )
}
