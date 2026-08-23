import {
  ArrowRight,
  Database,
  Download,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnalyticsCurve, DotGrid, GradientOrb, Underlined } from '@/components/Deco'
import { Reveal } from '@/components/Reveal'
import { ScrollCue } from '@/components/ScrollCue'
import { heroStats, profile } from '@/data/profile'
import { track } from '@/lib/analytics'
import { asset } from '@/lib/asset'

const { intro } = profile

const statIcons: Record<string, LucideIcon> = {
  drivers: Users,
  users: TrendingUp,
  records: Database,
}

/** The three headline figures, on one card under the intro. */
function StatStrip() {
  return (
    <ul className="grid divide-y divide-hairline rounded-2xl border border-hairline bg-surface/70 px-2 py-1 shadow-panel backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {heroStats.map((stat) => {
        const Icon = statIcons[stat.icon]
        return (
          <li key={stat.label} className="flex items-center gap-3 px-4 py-4 sm:justify-center">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/12 text-[rgb(var(--accent-ink))]">
              <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="text-left">
              <span className="block font-display text-[1.35rem] font-bold leading-none tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="mt-1 block text-[0.8rem] leading-tight text-ink-muted">
                {stat.label}
              </span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

/** PRD §7.1 — name, availability, proof, one action. */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <GradientOrb />
      <DotGrid />

      <div className="frame relative">
        <div className="flex min-h-[calc(100dvh-var(--nav-h))] flex-col items-center justify-center py-14 text-center sm:py-16">
          {/* Roles badge — the green dot still means "available". */}
          <Reveal>
            <p className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-hairline bg-surface/80 px-5 py-2 text-[0.85rem] text-ink-muted shadow-panel backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="inline-block size-[7px] shrink-0 rounded-full bg-accent animate-dot-pulse"
              />
              <span className="sr-only">{profile.availability}.</span>
              {profile.roles.map((role, i) => (
                <span key={role} className="inline-flex items-center gap-2.5">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-ink-muted/45">
                      •
                    </span>
                  )}
                  {role}
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal delay={70} className="mt-7">
            <h1 className="font-display text-display">
              <span className="sr-only">
                {profile.name} — {profile.role}
              </span>
              <span aria-hidden="true">
                <Underlined>{profile.name}</Underlined>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140} className="mt-9 w-full max-w-[34rem]">
            <p className="text-balance text-[1.0625rem] leading-[1.55] text-ink sm:text-lg">
              {intro.lead} {intro.now}{' '}
              <strong className="font-semibold">{intro.metricA}</strong> {intro.joiner}{' '}
              <strong className="font-semibold">{intro.metricB}</strong> {intro.at}{' '}
              <strong className="font-semibold">{intro.company}</strong>.
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-9 w-full max-w-[40rem]">
            <h2 className="sr-only">By the numbers</h2>
            <StatStrip />
          </Reveal>

          <Reveal delay={260} className="mt-9 w-full max-w-[22rem]">
            <Link
              to="/contact"
              onClick={() => track('cta_say_hello_click', { source: 'hero' })}
              className="group inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-ink text-base font-medium text-surface shadow-glow transition-all duration-200 ease-editorial hover:bg-ink/88"
            >
              Say hello
              <ArrowRight
                className="size-[18px] text-gold transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>

            <p className="mt-5 text-sm">
              <a
                href={asset(profile.resumePath)}
                download="Vivek_Resume.pdf"
                onClick={() => track('resume_download', { source: 'hero' })}
                className="inline-flex items-center gap-2 text-ink-muted decoration-gold-line decoration-2 underline-offset-[6px] transition-colors hover:text-ink hover:underline"
              >
                <Download className="size-4" strokeWidth={1.75} aria-hidden="true" />
                Download résumé
              </a>
            </p>
          </Reveal>
        </div>
      </div>

      <AnalyticsCurve
        variant="wave"
        className="pointer-events-none absolute inset-x-0 bottom-4 h-28 w-full opacity-80"
      />
      <ScrollCue className="relative pb-10" />
    </section>
  )
}
