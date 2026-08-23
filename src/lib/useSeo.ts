import { useEffect } from 'react'
import { profile } from '@/data/profile'

interface Seo {
  title: string
  description: string
  /** Route path without a leading slash, e.g. "about". */
  path?: string
}

const setMeta = (selector: string, attr: 'content' | 'href', value: string) => {
  const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector)
  if (el) el.setAttribute(attr, value)
}

/** PRD §13 — per-page title, description, canonical, and OG/Twitter mirrors. */
export function useSeo({ title, description, path = '' }: Seo): void {
  useEffect(() => {
    const url = `${profile.siteUrl}${path}`

    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
  }, [title, description, path])
}
