import { cn } from '@/lib/cn'
import { useInView } from '@/lib/useInView'

/**
 * Decorative furniture: the swash under headings, the drifting gradient orb,
 * the dotted grid, sparkles, and the analytics curve that draws itself once.
 *
 * Everything here is aria-hidden — it carries no meaning, only atmosphere.
 * All motion is CSS transform/opacity (GPU-friendly) and every piece resolves
 * to its finished state under `prefers-reduced-motion`, which is handled
 * globally in src/index.css.
 */

/** Hand-drawn amber underline that sits beneath a heading's last line. */
export function Swash({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 14"
      preserveAspectRatio="none"
      className={cn('pointer-events-none block h-[0.3em] w-full text-gold-line', className)}
    >
      <path
        d="M3 9.5C52 4.2 108 2.6 165 3.4c40 .6 88 2.6 132 6.2"
        fill="none"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/**
 * Wraps a heading's final word(s) so the swash tracks the text width.
 * Use as: <h1>Work that ends <Underlined>in a decision</Underlined></h1>
 */
export function Underlined({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <Swash className="absolute -bottom-[0.3em] left-0" />
    </span>
  )
}

/** Four-point sparkle, as scattered around the portrait. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn('pointer-events-none text-gold', className)}
    >
      <path
        d="M12 2v7M12 15v7M2 12h7M15 12h7"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * Soft amber orb drifting 10–20px on a very slow loop. Two companion blooms
 * sit still behind it so the background has depth without extra motion.
 */
export function GradientOrb() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <span
        className="absolute left-[34%] top-[-6%] size-[420px] rounded-full animate-orb-float"
        style={{
          background: 'radial-gradient(circle, rgb(var(--gold) / 0.30) 0%, transparent 68%)',
          filter: 'blur(72px)',
        }}
      />
      <span
        className="absolute left-[-8%] top-[16%] size-[380px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(246,201,168,0.34) 0%, transparent 70%)',
          filter: 'blur(76px)',
        }}
      />
      <span
        className="absolute right-[-6%] top-[46%] size-[420px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(191,227,198,0.30) 0%, transparent 70%)',
          filter: 'blur(76px)',
        }}
      />
    </div>
  )
}

/** Dotted grid texture. Static apart from a barely-there opacity breath. */
export function DotGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'dot-grid pointer-events-none absolute inset-0 animate-dot-breathe',
        '[mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_100%)]',
        className,
      )}
    />
  )
}

interface CurveProps {
  /** "climb" rises to the top-right; "wave" runs along the bottom. */
  variant?: 'climb' | 'wave'
  className?: string
}

/**
 * Analytics curve — a thin pale-amber line rising like a growth chart, with
 * data points along it and one glowing point at the end.
 *
 * The line draws itself once when it scrolls into view (a stroke-dashoffset
 * transition, so it never re-runs), after which only the end point keeps a
 * slow pulse.
 */
export function AnalyticsCurve({ variant = 'climb', className }: CurveProps) {
  const { ref, inView } = useInView<SVGSVGElement>()

  const geometry = {
    climb: {
      box: '0 0 384 150',
      d: 'M8 132 C 58 128, 84 104, 132 100 S 208 108, 254 72 S 330 60, 374 18',
      nodes: [
        [132, 100],
        [254, 72],
        [330, 47],
      ],
      end: [374, 18],
    },
    wave: {
      box: '0 0 640 110',
      d: 'M4 86 C 64 86, 100 40, 160 40 S 254 82, 316 82 S 408 28, 474 28 S 566 68, 632 34',
      nodes: [
        [160, 40],
        [316, 82],
        [474, 28],
      ],
      end: [632, 34],
    },
  }[variant]

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox={geometry.box}
      fill="none"
      className={cn('pointer-events-none text-gold', className)}
    >
      <path
        d={geometry.d}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.5}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={inView ? 0 : 1}
        style={{ transition: 'stroke-dashoffset 1800ms cubic-bezier(0.22, 0.61, 0.36, 1)' }}
      />

      {geometry.nodes.map(([cx, cy], i) => (
        <circle
          key={cx}
          cx={cx}
          cy={cy}
          r={4}
          fill="currentColor"
          opacity={inView ? 0.7 : 0}
          style={{ transition: `opacity 420ms ease-out ${700 + i * 260}ms` }}
        />
      ))}

      {/* The highlighted end point: a soft glow ring that keeps a slow pulse. */}
      <g opacity={inView ? 1 : 0} style={{ transition: 'opacity 500ms ease-out 1500ms' }}>
        <circle
          cx={geometry.end[0]}
          cy={geometry.end[1]}
          r={13}
          fill="currentColor"
          className="animate-point-pulse"
          style={{ transformOrigin: `${geometry.end[0]}px ${geometry.end[1]}px` }}
        />
        <circle cx={geometry.end[0]} cy={geometry.end[1]} r={7} fill="rgb(var(--canvas))" />
        <circle cx={geometry.end[0]} cy={geometry.end[1]} r={5} fill="currentColor" />
      </g>
    </svg>
  )
}

/** Dashed looping arrow pointing at the portrait. */
export function DecoArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 130 150"
      fill="none"
      className={cn('pointer-events-none text-gold', className)}
    >
      <path
        d="M116 8c14 26 12 54-6 68-16 12-34 2-30-14 3-13 22-14 30 2 9 18-4 42-30 54-14 6-30 8-46 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray="6 7"
        opacity={0.75}
      />
      <path
        d="M42 116l-8 8 10 8"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
