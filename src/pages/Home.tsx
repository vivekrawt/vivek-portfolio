import { Link } from 'react-router-dom'
import { Hero } from '@/components/Hero'
import { ProjectGrid } from '@/components/ProjectGrid'
import { Reveal } from '@/components/Reveal'
import { useSeo } from '@/lib/useSeo'

export default function Home() {
  useSeo({
    title: 'Vivek Rawat — Data Analyst',
    description:
      'Data analyst turning raw data into decisions — analytics for a platform serving 460K+ drivers and 20K+ daily active users.',
  })

  return (
    <>
      <Hero />

      {/* PRD §7.1 — selected-work teaser strip. */}
      <section className="frame section border-t border-hairline" aria-labelledby="selected-work">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="selected-work" className="mono-label">
            Selected work
          </h2>
          <Link to="/projects" className="link-underline text-sm text-ink-muted hover:text-ink">
            All projects →
          </Link>
        </Reveal>

        <ProjectGrid compact limit={3} className="mt-10" />
      </section>
    </>
  )
}
