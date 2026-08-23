import { BarChart3, CircleCheck, Database } from 'lucide-react'
import { AnalyticsCurve, Underlined } from '@/components/Deco'
import { ProjectGrid } from '@/components/ProjectGrid'
import { Reveal } from '@/components/Reveal'
import { ScrollCue } from '@/components/ScrollCue'
import { SectionHeading } from '@/components/SectionHeading'
import { projects } from '@/data/projects'
import { useSeo } from '@/lib/useSeo'

const traits = [
  { icon: BarChart3, label: 'Real business problems' },
  { icon: Database, label: 'End-to-end analysis' },
  { icon: CircleCheck, label: 'Actionable outcomes' },
]

export default function Projects() {
  useSeo({
    title: 'Projects — Vivek Rawat',
    description:
      'Case studies in SQL risk analytics, CPI time-series modelling, healthcare cost analysis, Power BI dashboards, and OCR/NLP compliance automation.',
    path: 'projects',
  })

  return (
    <div className="frame section">
      <div className="relative">
        <AnalyticsCurve
          variant="climb"
          className="pointer-events-none absolute right-0 top-0 hidden h-36 w-[26rem] lg:block"
        />

        <Reveal className="max-w-prose">
          <SectionHeading as="h1" kicker="All projects">
            Work that ends <Underlined>in a decision</Underlined>
          </SectionHeading>
          <p className="mt-7 text-[1.0625rem] leading-relaxed text-ink-muted">
            {projects.length} case studies, each one written the same way — the business question,
            how the data was actually wrangled, and what changed as a result. SQL pipelines, Power
            BI dashboards, Excel deep-dives, and a bit of Python.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {traits.map((trait) => (
              <li
                key={trait.label}
                className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/70 py-1.5 pl-1.5 pr-4 text-[0.85rem] text-ink-muted shadow-panel"
              >
                <span className="icon-tile size-7">
                  <trait.icon className="size-[15px]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                {trait.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <ScrollCue className="mt-12" />

      <ProjectGrid className="mt-10" />
    </div>
  )
}
