import {
  Award,
  Briefcase,
  CalendarDays,
  Database,
  ExternalLink,
  GraduationCap,
  MapPin,
  Star,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import { awards, experience, techStack } from '@/data/profile'
import { track } from '@/lib/analytics'
import { asset } from '@/lib/asset'

const awardIcons: LucideIcon[] = [Trophy, GraduationCap, Award]

function Column({
  title,
  icon: Icon,
  children,
}: {
  title: string
  icon: LucideIcon
  children: React.ReactNode
}) {
  return (
    <section className="px-6 py-8 lg:px-8">
      <h3 className="flex items-center gap-3">
        <span className="icon-tile size-9">
          <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className="mono-label text-ink">{title}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-gold-line/45" />
        <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
      </h3>
      <div className="mt-6">{children}</div>
    </section>
  )
}

/** PRD §7.2 — Work Experience / Data Stack / Recognition, in one panel. */
export function AboutColumns() {
  return (
    <div className="grid divide-y divide-hairline rounded-[20px] border border-hairline bg-surface/70 shadow-panel backdrop-blur-sm lg:grid-cols-3 lg:divide-x lg:divide-y-0">
      <Column title="Work Experience" icon={Briefcase}>
        <ol className="space-y-7">
          {experience.map((job) => (
            <li key={`${job.org}-${job.period}`} className="relative pl-5">
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.42em] size-2.5 rounded-full border-2 border-gold bg-canvas"
              />
              <p className="text-[0.95rem] font-semibold leading-snug">{job.role}</p>

              {/* Fixed-size chip so logos of different aspect ratios take up
                  the same footprint. The mark replaces the company name
                  visually; the name stays for screen readers. */}
              <div className="mt-2">
                {job.logo && job.url ? (
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => track('outbound_click', { destination: job.org })}
                    aria-label={`Visit the ${job.org} website (opens in a new tab)`}
                    className="group/logo relative inline-flex h-11 w-[130px] items-center justify-center rounded-xl border border-hairline bg-canvas/70 px-3 transition-all duration-200 ease-editorial hover:border-gold hover:bg-gold-soft/60 focus-visible:border-gold"
                  >
                    <img
                      src={asset(`images/logos/${job.logo}`)}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="max-h-6 w-auto max-w-full object-contain"
                    />

                    <ExternalLink
                      aria-hidden="true"
                      strokeWidth={2}
                      className="absolute -right-1.5 -top-1.5 size-[18px] rounded-full bg-gold p-[3px] text-ink opacity-0 transition-opacity duration-200 group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100"
                    />

                    {/* Says where the click goes, on hover and on keyboard focus. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-full top-1/2 z-20 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 font-mono text-[0.65rem] tracking-wide text-surface opacity-0 shadow-lift transition-opacity duration-200 group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100"
                    >
                      {job.url.replace(/^https?:\/\/(www\.)?/, '')} ↗
                    </span>
                  </a>
                ) : (
                  <span className="text-[0.9rem] text-ink-muted">{job.org}</span>
                )}
                {job.logo && <span className="sr-only">{job.org}</span>}
              </div>

              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] text-ink-muted">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                  {job.period}
                </span>
                {job.note && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                    {job.note}
                  </span>
                )}
              </p>

              {job.summary && (
                <p className="mt-3 rounded-xl border border-hairline bg-canvas/70 px-3.5 py-3 text-[0.83rem] leading-relaxed text-ink-muted">
                  {job.summary.before}
                  <span className="text-ink decoration-gold-line decoration-2 underline-offset-[3px] [text-decoration-line:underline]">
                    {job.summary.highlight}
                  </span>
                  {job.summary.after}
                </p>
              )}
            </li>
          ))}
        </ol>
      </Column>

      <Column title="Tech Stack" icon={Database}>
        <ul className="divide-y divide-hairline">
          {techStack.map((group) => (
            <li key={group.key} className="py-3.5 first:pt-0 last:pb-0">
              <p className="text-[0.88rem] font-semibold leading-snug">{group.title}</p>

              <ul className="mt-2 flex flex-wrap gap-1.5">
                {group.tools.map((tool) => (
                  <li
                    key={tool.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-canvas/70 py-1 pl-1.5 pr-2.5 text-[0.76rem] text-ink-muted"
                  >
                    {tool.logo && (
                      <img
                        src={asset(`images/tech/${tool.logo}.svg`)}
                        alt=""
                        aria-hidden="true"
                        width={16}
                        height={16}
                        loading="lazy"
                        decoding="async"
                        className="size-4 object-contain"
                      />
                    )}
                    {tool.name}
                  </li>
                ))}
              </ul>

              {group.items && (
                <p className="mt-2 text-[0.8rem] leading-snug text-ink-muted/85">{group.items}</p>
              )}
            </li>
          ))}
        </ul>
      </Column>

      <Column title="Recognition" icon={Star}>
        <ul className="divide-y divide-hairline">
          {awards.map((award, i) => {
            const Icon = awardIcons[i % awardIcons.length]
            return (
              <li key={award.title} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                <span className="icon-tile mt-0.5 size-9">
                  <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[0.92rem] font-medium leading-snug">
                    {award.title}
                  </span>
                  {award.project && (
                    <span className="mt-1 block text-[0.84rem] leading-snug text-ink-muted">
                      {award.project}
                    </span>
                  )}
                  {award.detail && (
                    <span className="mt-1 block font-mono text-[0.7rem] text-ink-muted">
                      {award.detail}
                    </span>
                  )}
                </span>
              </li>
            )
          })}
        </ul>
      </Column>
    </div>
  )
}
