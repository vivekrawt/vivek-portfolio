import type { ReactNode } from 'react'

export type ThumbKind = 'flow' | 'timeseries' | 'anomaly' | 'cohort'

/**
 * A project's visual is either a generated data-viz motif (for work whose
 * deliverable is a query or a spreadsheet) or a real dashboard screenshot.
 */
export type ProjectVisual =
  | { type: 'motif'; motif: ThumbKind; alt: string }
  | { type: 'image'; src: string; alt: string }

/** A supporting screenshot on a case-study page. */
export interface GalleryItem {
  src: string
  alt: string
  /** Mono caption under the image, naming what the sheet answers. */
  caption: string
}

export interface Stat {
  /** The number itself — kept short; it is set at display size. */
  value: string
  /** What the number counts. */
  label: string
}

export interface ProjectLinks {
  repo?: string
  live?: string
}

export interface Project {
  slug: string
  /** Mono index shown on the card, e.g. "01". */
  index: string
  title: string
  /** Short title used in the card's mono label, e.g. "PayPal Analytics". */
  shortTitle: string
  date: string
  tools: string[]
  /** One line answering "so what?" — shown on the card. */
  outcome: string
  stats: Stat[]
  problem: string
  approach: string[]
  impact: string[]
  visual: ProjectVisual
  /** Extra sheets from the same analysis, shown below the hero visual. */
  gallery?: GalleryItem[]
  links: ProjectLinks
}

export interface SocialLink {
  name: string
  /** Empty string = not published yet; the UI skips it. */
  url: string
}

export interface ExperienceItem {
  role: string
  org: string
  period: string
  note?: string
  /** Company mark in public/images/logos/, e.g. "cabswale.png". */
  logo?: string
  /** Company site; the logo links here when set. */
  url?: string
  /** Short blurb; `highlight` gets the amber underline. */
  summary?: { before: string; highlight: string; after: string }
}

/** One tool in the tech stack, optionally with a brand mark. */
export interface Tool {
  name: string
  /** Filename in public/images/tech/, without the extension. */
  logo?: string
}

export interface StackGroup {
  key: string
  title: string
  /** Products, shown as logo chips. */
  tools: Tool[]
  /** Techniques with no brand mark, shown as a quiet caption. */
  items?: string
}

export interface Award {
  title: string
  /** The work the award was given for. */
  project?: string
  detail?: string
}

export interface BioParagraph {
  /** Rendered as a paragraph; `marker` wraps one phrase in the highlight. */
  content: ReactNode
}
