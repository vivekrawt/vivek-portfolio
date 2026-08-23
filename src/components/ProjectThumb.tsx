import { asset } from '@/lib/asset'
import type { ProjectVisual, ThumbKind } from '@/types'

/**
 * Data-viz motifs standing in for the reference's 3D wireframes (PRD §5.7).
 *
 * Each motif is inline SVG — weightless, crisp at any size, and grayscaled by
 * the parent card until hover.
 *
 * Colour is a single-hue emphasis scheme: amber marks whatever the analysis is
 * pointing at, neutral grey carries everything else. One hue against a neutral
 * has no pair for a colourblind reader to confuse, so it is safe by
 * construction, and amber clears 3:1 against the white card. The meaning each
 * highlight carries (flagged risk, an inflation surge, a violation) lives in
 * the alt text rather than in the colour.
 */

const GOLD = 'rgb(var(--gold))'
const NEUTRAL = 'rgb(var(--ink) / 0.38)'
const NEUTRAL_SOFT = 'rgb(var(--ink) / 0.22)'
const GRID = 'rgb(var(--hairline))'
const SURFACE = 'rgb(var(--surface))'

const svgProps = {
  viewBox: '0 0 320 240',
  role: 'img' as const,
  className: 'h-full w-full',
  preserveAspectRatio: 'xMidYMid meet',
}

/** 01 — transaction routing: sources fan into merchant bars, two paths flagged. */
function FlowMotif({ title }: { title: string }) {
  const sources = [58, 92, 126, 160, 194]
  const merchants = [
    { y: 60, w: 74 },
    { y: 96, w: 58 },
    { y: 132, w: 92 },
    { y: 168, w: 44 },
  ]
  // Indices 2 and 4 carry the >$10K cross-border flag.
  const flagged = new Set([2, 4])

  return (
    <svg {...svgProps} aria-label={title}>
      <title>{title}</title>

      {sources.map((y, i) => (
        <path
          key={`edge-${y}`}
          d={`M 56 ${y} C 104 ${y}, 108 ${merchants[Math.min(i, 3)].y}, 152 ${merchants[Math.min(i, 3)].y}`}
          fill="none"
          stroke={flagged.has(i) ? GOLD : NEUTRAL_SOFT}
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}

      {sources.map((y, i) => (
        <g key={`node-${y}`}>
          {flagged.has(i) && (
            <circle cx={48} cy={y} r={11} fill="none" stroke={GOLD} strokeWidth={1.75} opacity={0.6} />
          )}
          <circle
            cx={48}
            cy={y}
            r={6}
            fill={flagged.has(i) ? GOLD : NEUTRAL}
            stroke={SURFACE}
            strokeWidth={2}
          />
        </g>
      ))}

      {merchants.map((m, i) => (
        <rect
          key={`bar-${m.y}`}
          x={158}
          y={m.y - 7}
          width={m.w}
          height={14}
          rx={4}
          fill={i === 2 ? GOLD : NEUTRAL}
          opacity={i === 2 ? 1 : 0.75}
        />
      ))}

      <line x1={152} y1={40} x2={152} y2={200} stroke={GRID} strokeWidth={1} />
    </svg>
  )
}

/** 02 — flat CPI baseline ending in the December-2023 surge. */
function TimeseriesMotif({ title }: { title: string }) {
  const baseline = 'M 34 168 L 62 160 L 90 166 L 118 152 L 146 158 L 174 146 L 202 152'
  const surge = 'M 202 152 L 230 132 L 258 96 L 286 52'

  return (
    <svg {...svgProps} aria-label={title}>
      <title>{title}</title>

      {[64, 104, 144, 184].map((y) => (
        <line key={y} x1={30} y1={y} x2={292} y2={y} stroke={GRID} strokeWidth={1} />
      ))}
      <line x1={30} y1={204} x2={292} y2={204} stroke={GRID} strokeWidth={1.5} />

      <path d={`${surge} L 286 204 L 202 204 Z`} fill={GOLD} opacity={0.2} />
      <path
        d={baseline}
        fill="none"
        stroke={NEUTRAL}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={surge}
        fill="none"
        stroke={GOLD}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx={286} cy={52} r={5.5} fill={GOLD} stroke={SURFACE} strokeWidth={2} />
    </svg>
  )
}

/** 04 — scanned label records, three ringed as anomalies. */
function AnomalyMotif({ title }: { title: string }) {
  const points = [
    [62, 168], [80, 150], [96, 162], [110, 140], [126, 152], [140, 134],
    [152, 146], [166, 128], [178, 140], [192, 122], [206, 134], [218, 118],
    [232, 128], [246, 112], [258, 124], [270, 108],
    [74, 176], [104, 172], [134, 158], [164, 152], [196, 144], [226, 138], [252, 132],
  ]
  const anomalies: Array<[number, number]> = [[118, 62], [200, 78], [252, 54]]

  return (
    <svg {...svgProps} aria-label={title}>
      <title>{title}</title>

      <line x1={44} y1={40} x2={44} y2={200} stroke={GRID} strokeWidth={1.5} />
      <line x1={44} y1={200} x2={292} y2={200} stroke={GRID} strokeWidth={1.5} />

      {points.map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={4.5}
          fill={NEUTRAL}
          stroke={SURFACE}
          strokeWidth={1.5}
        />
      ))}

      {anomalies.map(([cx, cy]) => (
        <g key={`a-${cx}`}>
          <circle cx={cx} cy={cy} r={11} fill="none" stroke={GOLD} strokeWidth={1.75} opacity={0.6} />
          <circle cx={cx} cy={cy} r={5.5} fill={GOLD} stroke={SURFACE} strokeWidth={2} />
        </g>
      ))}

      <line
        x1={44}
        y1={96}
        x2={292}
        y2={96}
        stroke={GOLD}
        strokeWidth={1.5}
        strokeDasharray="5 5"
        opacity={0.55}
      />
    </svg>
  )
}

/** 03 — condition prevalence, middle cohort against senior cohort. */
function CohortMotif({ title }: { title: string }) {
  const groups = [
    { middle: 62, senior: 96 },
    { middle: 40, senior: 54 },
    { middle: 88, senior: 128 },
    { middle: 34, senior: 46 },
    { middle: 70, senior: 104 },
  ]
  const base = 200
  const barW = 16
  const groupW = barW * 2 + 2

  return (
    <svg {...svgProps} aria-label={title}>
      <title>{title}</title>

      {[80, 120, 160].map((y) => (
        <line key={y} x1={40} y1={y} x2={288} y2={y} stroke={GRID} strokeWidth={1} />
      ))}

      {groups.map((g, i) => {
        const x = 48 + i * (groupW + 14)
        return (
          <g key={x}>
            <rect x={x} y={base - g.middle} width={barW} height={g.middle} rx={4} fill={NEUTRAL} />
            <rect
              x={x + barW + 2}
              y={base - g.senior}
              width={barW}
              height={g.senior}
              rx={4}
              fill={GOLD}
            />
          </g>
        )
      })}

      <line x1={40} y1={base} x2={288} y2={base} stroke={GRID} strokeWidth={1.5} />
    </svg>
  )
}

const motifs: Record<ThumbKind, (p: { title: string }) => JSX.Element> = {
  flow: FlowMotif,
  timeseries: TimeseriesMotif,
  anomaly: AnomalyMotif,
  cohort: CohortMotif,
}

export function ProjectThumb({ kind, title }: { kind: ThumbKind; title: string }) {
  const Motif = motifs[kind]
  return <Motif title={title} />
}

/** The folder mark on the trailing "More on GitHub" card. */
export function FolderMotif() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 240"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M62 78a8 8 0 0 1 8-8h48l16 18h64a8 8 0 0 1 8 8v10H62z"
        fill={NEUTRAL_SOFT}
      />
      <path
        d="M62 96a8 8 0 0 1 8-8h180a8 8 0 0 1 8 8v72a8 8 0 0 1-8 8H70a8 8 0 0 1-8-8z"
        fill={SURFACE}
        stroke={GRID}
        strokeWidth={2}
      />
      <path
        d="M142 148l38-38m0 0h-24m24 0v24"
        stroke={GOLD}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

interface VisualProps {
  visual: ProjectVisual
  /** Detail pages load their hero visual eagerly; cards stay lazy. */
  eager?: boolean
}

/**
 * Renders whichever visual a project carries — a generated motif or a real
 * dashboard screenshot — so cards and case-study pages share one code path.
 */
export function Visual({ visual, eager = false }: VisualProps) {
  if (visual.type === 'motif') {
    return <ProjectThumb kind={visual.motif} title={visual.alt} />
  }

  return (
    <img
      src={asset(visual.src)}
      alt={visual.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className="h-full w-full rounded-lg object-contain"
    />
  )
}
