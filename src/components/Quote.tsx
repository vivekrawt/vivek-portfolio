import { Reveal } from '@/components/Reveal'

/** Sign-off line inside the footer — under the contact bar, above the
 *  mountain range. Rendered on every page via `Footer`. */
export function Quote() {
  return (
    <section aria-label="Closing quote" className="border-t border-hairline">
      <div className="frame">
        <Reveal className="relative mx-auto max-w-3xl py-12 text-center sm:py-20">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 select-none font-display text-[4rem] leading-none text-gold/25 sm:top-6 sm:text-[6.5rem]"
          >
            &ldquo;
          </span>

          <figure className="relative">
            <blockquote>
              <p className="font-display text-[1.4rem] font-bold leading-[1.25] tracking-tight sm:text-[2.15rem]">
                Giving up is not in the{' '}
                <span className="relative whitespace-nowrap">
                  <span className="marker">BLOOD</span>
                </span>{' '}
                sir!
              </p>
            </blockquote>

            <figcaption className="mt-4 font-mono text-label uppercase text-ink-muted sm:mt-5">
              — Nimsdai
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
