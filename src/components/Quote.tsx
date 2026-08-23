import { Reveal } from '@/components/Reveal'

/** Sign-off line above the footer, on every page. */
export function Quote() {
  return (
    <section aria-label="Closing quote" className="border-t border-hairline">
      <div className="frame">
        <Reveal className="relative mx-auto max-w-3xl py-16 text-center sm:py-20">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none font-display text-[5rem] leading-none text-gold/25 sm:text-[6.5rem]"
          >
            &ldquo;
          </span>

          <figure className="relative">
            <blockquote>
              <p className="font-display text-[1.65rem] font-bold leading-[1.25] tracking-tight sm:text-[2.15rem]">
                Giving up is not in the{' '}
                <span className="relative whitespace-nowrap">
                  <span className="marker">BLOOD</span>
                </span>{' '}
                sir!
              </p>
            </blockquote>

            <figcaption className="mt-5 font-mono text-label uppercase text-ink-muted">
              — Nimsdai
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
