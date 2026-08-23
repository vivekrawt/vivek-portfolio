import { MapPin } from 'lucide-react'
import { AboutColumns } from '@/components/AboutColumns'
import { DecoArrow, Underlined } from '@/components/Deco'
import { PortraitCard } from '@/components/PortraitCard'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { profile } from '@/data/profile'
import { useSeo } from '@/lib/useSeo'

export default function About() {
  useSeo({
    title: 'About — Vivek Rawat',
    description:
      'Data analyst at Cabswale.ai: 20+ business KPIs, end-to-end funnel analytics, and reporting pipelines that removed 5+ hours of manual work per cycle.',
    path: 'about',
  })

  return (
    <div className="frame section">
      {/* Text left, photo deck right; on mobile the deck falls between the bio
          and the three columns, per PRD §7.2. */}
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
        <div>
          <Reveal>
            <SectionHeading as="h1" kicker="About me">
              A little bit <Underlined>about me</Underlined>
            </SectionHeading>
          </Reveal>

          <Reveal
            delay={80}
            className="mt-9 max-w-prose space-y-6 text-[1.0625rem] leading-relaxed text-ink-muted"
          >
            <p>
              I build the analytics layer that lets founders see product, business, and operations
              in one view. At <strong className="font-semibold text-ink">Cabswale.ai</strong> I
              designed <strong className="font-semibold text-ink">20+ business KPIs</strong> —
              funnels, cohorts, churn, retention, LTV, booking success — and built end-to-end funnel
              analytics that pinpoint exactly where users drop off.
            </p>
            <p>
              I like the unglamorous part too: automating executive reporting pipelines that removed{' '}
              <strong className="font-semibold text-ink">5+ hours</strong> of manual work per cycle,
              and consolidating 10,000+ messy records into clean, trustworthy datasets. My work is
              about <span className="marker font-medium text-ink">turning data into decisions</span>,
              not dashboards for their own sake.
            </p>
            <p className="flex items-center gap-2 text-[1rem]">
              <MapPin className="size-[18px] shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
              Based in {profile.location} — {profile.locationNote.toLowerCase()}.
            </p>
          </Reveal>
        </div>

        <Reveal delay={140} className="relative lg:pt-2">
          <DecoArrow className="absolute -right-2 top-2 hidden h-32 w-28 xl:block" />
          <PortraitCard />
        </Reveal>
      </div>

      <Reveal delay={80} className="mt-16 lg:mt-20">
        <h2 className="sr-only">Experience, stack, and recognition</h2>
        <AboutColumns />
      </Reveal>
    </div>
  )
}
