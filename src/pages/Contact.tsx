import { Check, Copy, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ContactForm } from '@/components/ContactForm'
import { Underlined } from '@/components/Deco'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { SocialLinks } from '@/components/SocialLinks'
import { profile } from '@/data/profile'
import { track } from '@/lib/analytics'
import { useSeo } from '@/lib/useSeo'

/** FR-8 — direct email plus copy-to-clipboard. */
function EmailRow() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <a
        href={`mailto:${profile.email}`}
        onClick={() => track('cta_say_hello_click', { source: 'contact-mailto' })}
        className="link-underline text-[1.0625rem] text-ink"
      >
        {profile.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded border border-hairline px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-[0.06em] text-ink-muted transition-colors hover:border-ink/25 hover:text-ink"
      >
        {copied ? (
          <Check className="size-3.5 text-[rgb(var(--accent-ink))]" strokeWidth={2} aria-hidden="true" />
        ) : (
          <Copy className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
        )}
        {copied ? 'Copied' : 'Copy'}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </div>
  )
}

export default function Contact() {
  useSeo({
    title: 'Contact — Vivek Rawat',
    description:
      'Open to data analyst roles and freelance analytics projects. Send a message, or email vivekrawat.dev@gmail.com directly.',
    path: 'contact',
  })

  return (
    <div className="frame section">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
        <div>
          <Reveal>
            <SectionHeading as="h1" kicker="Contact">
              Let&rsquo;s talk <Underlined>data</Underlined>
            </SectionHeading>
          </Reveal>

          <Reveal delay={80} className="mt-8 max-w-prose space-y-8">
            <p className="text-[1.0625rem] leading-relaxed text-ink-muted">
              I&rsquo;m open to data analyst roles and to freelance analytics work — dashboards,
              reporting pipelines, or an honest look at data you suspect is lying to you.{' '}
              {profile.responseTime}
            </p>

            <div className="space-y-6 border-t border-hairline pt-8">
              <div>
                <h2 className="mono-label">Email</h2>
                <div className="mt-3">
                  <EmailRow />
                </div>
              </div>

              {profile.phone.show && (
                <div>
                  <h2 className="mono-label">Phone</h2>
                  <p className="mt-3 text-[1.0625rem]">
                    <a href={`tel:${profile.phone.number.replace(/\s/g, '')}`} className="link-underline">
                      {profile.phone.number}
                    </a>
                  </p>
                </div>
              )}

              <div>
                <h2 className="mono-label">Based in</h2>
                <p className="mt-3 flex items-center gap-2 text-[1.0625rem] text-ink-muted">
                  <MapPin className="size-[18px] shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
                  {profile.location} · {profile.locationNote}
                </p>
              </div>

              <div>
                <h2 className="mono-label">Elsewhere</h2>
                <SocialLinks className="mt-3 text-[1.0625rem]" />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140} className="lg:pt-4">
          <h2 className="sr-only">Send a message</h2>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  )
}
