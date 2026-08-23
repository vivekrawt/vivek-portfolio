/**
 * PRD §14 — event names are fixed here so every call site agrees.
 *
 * No analytics vendor is wired in yet. Drop in Plausible or Vercel Analytics
 * and this forwards to it automatically; until then calls are inert in prod
 * and logged in dev.
 */
export type AnalyticsEvent =
  | 'cta_say_hello_click'
  | 'resume_download'
  | 'project_view'
  | 'contact_submit'
  | 'outbound_click'

type Props = Record<string, string | number | boolean>

declare global {
  interface Window {
    plausible?: (event: string, options?: { props: Props }) => void
    va?: (event: 'event', payload: { name: string } & Props) => void
  }
}

export function track(event: AnalyticsEvent, props: Props = {}): void {
  if (typeof window === 'undefined') return

  window.plausible?.(event, { props })
  window.va?.('event', { name: event, ...props })

  if (import.meta.env.DEV && !window.plausible && !window.va) {
    console.debug('[analytics]', event, props)
  }
}
