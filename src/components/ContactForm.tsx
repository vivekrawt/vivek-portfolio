import { useId, useState, type FormEvent } from 'react'
import { Button } from '@/components/Button'
import { profile } from '@/data/profile'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Set VITE_WEB3FORMS_KEY (free key from web3forms.com) to post submissions.
 * Until it is set the form validates locally and hands off to a prefilled
 * mail client, so it is never a dead end.
 */
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Please tell me your name.'
  if (!values.email.trim()) errors.email = 'Please add an email so I can reply.'
  else if (!EMAIL.test(values.email.trim())) errors.email = 'That email address looks incomplete.'
  if (values.message.trim().length < 10) errors.message = 'A sentence or two is plenty — just a little more.'
  return errors
}

const field =
  'w-full rounded border bg-surface px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-ink-muted/60 transition-colors'

export function ContactForm() {
  const id = useId()
  // Controlled values — an error must never clear what was typed (US-3).
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const set = (key: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Honeypot — a bot fills it, a person never sees it.
    if ((new FormData(e.currentTarget).get('company') as string)?.length) return

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`${id}-${Object.keys(found)[0]}`)?.focus()
      return
    }

    if (!WEB3FORMS_KEY) {
      window.location.href =
        `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${values.name}`)}` +
        `&body=${encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)}`
      setStatus('sent')
      track('contact_submit', { transport: 'mailto' })
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio enquiry from ${values.name}`,
          from_name: values.name,
          ...values,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setValues({ name: '', email: '', message: '' })
      track('contact_submit', { transport: 'web3forms' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-card border border-hairline bg-surface p-8">
        <p className="font-display text-h3">Thanks — that came through.</p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
          {profile.responseTime} If it is urgent, {profile.email} reaches me directly.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus('idle')}>
          Send another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor={`${id}-name`} className="mono-label">
          Name
        </label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={set('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
          className={cn(field, 'mt-2', errors.name ? 'border-[#c0392b]' : 'border-hairline focus:border-ink')}
        />
        {errors.name && (
          <p id={`${id}-name-error`} className="mt-2 text-sm text-[#c0392b]">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-email`} className="mono-label">
          Email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={set('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
          className={cn(field, 'mt-2', errors.email ? 'border-[#c0392b]' : 'border-hairline focus:border-ink')}
        />
        {errors.email && (
          <p id={`${id}-email-error`} className="mt-2 text-sm text-[#c0392b]">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="mono-label">
          Message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          value={values.message}
          onChange={set('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          className={cn(field, 'mt-2 resize-y', errors.message ? 'border-[#c0392b]' : 'border-hairline focus:border-ink')}
        />
        {errors.message && (
          <p id={`${id}-message-error`} className="mt-2 text-sm text-[#c0392b]">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded border border-[#c0392b]/30 bg-[#c0392b]/5 px-3.5 py-3 text-sm text-[#c0392b]">
          That did not send. Your message is still here — try again, or email {profile.email}.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto sm:px-10">
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}
