import type { Config } from 'tailwindcss'

/**
 * Every colour resolves through a CSS variable (see src/index.css) so the
 * Phase-2 dark theme in PRD §5.3 is a variable swap, not a refactor.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        edge: 'rgb(var(--edge) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-muted': 'rgb(var(--ink-muted) / <alpha-value>)',
        hairline: 'rgb(var(--hairline) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        highlight: 'rgb(var(--highlight) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        'gold-ink': 'rgb(var(--gold-ink) / <alpha-value>)',
        'gold-soft': 'rgb(var(--gold-soft) / <alpha-value>)',
        'gold-line': 'rgb(var(--gold-line) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // PRD §5.4 — display scale is fluid, body is fixed.
        display: ['clamp(3rem, 9vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '700' }],
        h2: ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em', fontWeight: '700' }],
        h3: ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        stat: ['clamp(2.25rem, 4.5vw, 3.25rem)', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '700' }],
        label: ['0.8rem', { lineHeight: '1.2', letterSpacing: '0.06em', fontWeight: '500' }],
      },
      spacing: {
        // PRD §5.5 — 8px base scale.
        15: '3.75rem',
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        38: '9.5rem',
      },
      maxWidth: {
        frame: '1280px',
        prose: '68ch',
      },
      borderRadius: {
        DEFAULT: '6px',
        card: '10px',
      },
      boxShadow: {
        card: '0 1px 2px rgb(20 20 20 / 0.04)',
        lift: '0 12px 32px -12px rgb(20 20 20 / 0.16)',
        portrait: '0 18px 44px -22px rgb(20 20 20 / 0.32)',
        pill: '0 6px 24px -10px rgb(20 20 20 / 0.14), 0 1px 2px rgb(20 20 20 / 0.05)',
        glow: '0 12px 32px -10px rgb(244 183 57 / 0.55)',
        panel: '0 2px 10px -4px rgb(20 20 20 / 0.06)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        'cue-bob': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.45' },
          '50%': { transform: 'translateY(7px)', opacity: '1' },
        },
        'dot-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(0.86)' },
        },
        // Decorative background motion — slow, small, GPU-friendly.
        'orb-float': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '33%': { transform: 'translate3d(16px, -14px, 0)' },
          '66%': { transform: 'translate3d(-12px, 10px, 0)' },
        },
        'dot-breathe': {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        },
        'point-pulse': {
          '0%, 100%': { opacity: '0.16', transform: 'scale(0.82)' },
          '50%': { opacity: '0.34', transform: 'scale(1.12)' },
        },
      },
      animation: {
        'cue-bob': 'cue-bob 2.1s var(--ease-editorial) infinite',
        'dot-pulse': 'dot-pulse 2.4s ease-in-out infinite',
        'orb-float': 'orb-float 26s ease-in-out infinite',
        'dot-breathe': 'dot-breathe 14s ease-in-out infinite',
        'point-pulse': 'point-pulse 3.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
