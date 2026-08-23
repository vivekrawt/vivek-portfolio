import { LinkButton } from '@/components/Button'
import { Underlined } from '@/components/Deco'
import { useSeo } from '@/lib/useSeo'

export default function NotFound() {
  useSeo({
    title: 'Not found — Vivek Rawat',
    description: 'That page does not exist.',
    path: '404',
  })

  return (
    <div className="frame flex min-h-[calc(100dvh-var(--nav-h)-140px)] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-label uppercase text-gold-ink">Error 404</p>
      <h1 className="mt-6 font-display text-h2">
        No data for <Underlined>this route</Underlined>
      </h1>
      <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-ink-muted">
        The page you asked for is not in the dataset. The ones that are, are one click away.
      </p>
      <LinkButton to="/" size="lg" className="mt-12 w-full max-w-[18rem] rounded-full">
        Back home
      </LinkButton>
    </div>
  )
}
