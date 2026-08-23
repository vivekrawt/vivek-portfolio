import type { Award, ExperienceItem, SocialLink, StackGroup } from '@/types'

/**
 * Single source of truth for everything about Vivek that is not a project.
 * Edit here — no component needs to change (PRD §11.2, US-5).
 */
export const profile = {
  name: 'Vivek Rawat',
  role: 'Data Analyst',
  location: 'Gurgaon, Haryana, India',
  locationNote: 'Open to remote',
  availability: 'Available for data analyst roles & freelance analytics projects',
  email: 'vivekrawat.dev@gmail.com',
  /** Kept off the site by default; flip to true to surface it on /contact. */
  phone: { number: '+91 88825 11472', show: false },
  responseTime: 'I usually reply within a day.',

  siteUrl: 'https://vivekrawt.github.io/vivek-portfolio/',
  resumePath: 'resume.pdf',
  portraitPath: 'images/portrait.jpg',

  /** The three roles in the hero badge. */
  roles: ['Data Analyst', 'Problem Solver', 'Impact Maker'],

  /** Hero intro — PRD §8.2. The bold spans are applied in the Hero component. */
  intro: {
    lead: "I'm a data analyst who turns raw, messy data into decisions leaders can act on.",
    now: 'Right now I own analytics for an outstation travel platform serving',
    metricA: '460K+ drivers',
    joiner: 'and',
    metricB: '20K+ daily active users',
    at: 'at',
    company: 'Cabswale.ai',
  },
} as const

/**
 * PRD §8.8 — LinkedIn and GitHub are confirmed. Kaggle and LeetCode render
 * automatically the moment a URL is pasted in; an empty string hides the link.
 */
export const socials: SocialLink[] = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vivek-rawat-89096522a/' },
  { name: 'GitHub', url: 'https://github.com/vivekrawt' },
  { name: 'Kaggle', url: '' },
  { name: 'LeetCode', url: '' },
]

export const visibleSocials = (): SocialLink[] => socials.filter((s) => s.url.length > 0)

/** The headline figures in the hero's stat strip. */
export const heroStats: { value: string; label: string; icon: 'drivers' | 'users' | 'records' }[] = [
  { value: '460K+', label: 'Active Drivers', icon: 'drivers' },
  { value: '20K+', label: 'Daily Active Users', icon: 'users' },
  { value: '10K+', label: 'Records Analyzed Daily', icon: 'records' },
]

/**
 * The click-to-cycle photo stack on /about. Square 1:1 crops.
 *
 * To add a shot: drop a square image in public/images/about/ and append an
 * entry here — the deck picks up the new length on its own. Alt text matters:
 * it is what a screen-reader user gets when the photo changes.
 */
export const aboutGallery: { src: string; alt: string }[] = [
  { src: 'images/about/about-01.jpg', alt: 'Vivek Rawat in a grey suit — studio portrait' },
  { src: 'images/about/about-02.jpg', alt: 'Vivek in profile, looking out across a misty mountain ridge' },
  { src: 'images/about/about-03.jpg', alt: 'Vivek smiling on a hillside under an overcast sky' },
  { src: 'images/about/about-04.jpg', alt: 'Vivek presenting to a room, arms open beside a screen reading “Bhook lagi hai”' },
  { src: 'images/about/about-05.jpg', alt: 'Vivek standing with arms outstretched in front of a wall-mounted world map at the Intellect office' },
  { src: 'images/about/about-06.jpg', alt: 'The Indian flag filling a large studio screen' },
  { src: 'images/about/about-07.jpg', alt: 'Vivek with two friends outside a Microsoft office' },
  { src: 'images/about/about-08.jpg', alt: 'A blue Krishna statue in a garden fountain' },
  { src: 'images/about/about-09.jpg', alt: "Vivek at an Ullas Trust “Can Do” workshop backdrop reading “I'm a proud Ullas young achiever”" },
  { src: 'images/about/about-10.jpg', alt: 'A rural classroom of school students at their desks' },
  { src: 'images/about/about-11.jpg', alt: 'Vivek with a group of school students holding certificates at Govt. Sr. Sec. School, Gorawar' },
  { src: 'images/about/about-12.jpg', alt: 'Vivek with fellow students in a university lobby' },
  { src: 'images/about/about-13.jpg', alt: 'Vivek working through a problem with colleagues at a desk' },
  { src: 'images/about/about-14.jpg', alt: 'A purple flower opening among green leaves' },
  { src: 'images/about/about-15.jpg', alt: 'A footpath cutting through a field toward distant mountains' },
  { src: 'images/about/about-16.jpg', alt: 'Vivek speaking at a lectern' },
  { src: 'images/about/about-17.jpg', alt: 'Framed folk-art prints on a pale wall' },
  { src: 'images/about/about-18.jpg', alt: 'Vivek in a hoodie on a balcony with forested hills behind' },
  { src: 'images/about/about-19.jpg', alt: 'Vivek looking out over a river valley from a hilltop' },
  { src: 'images/about/about-20.jpg', alt: 'A framed quote on a wall: “Self-care is not self-indulgence, it is self-preservation.”' },
  { src: 'images/about/about-21.jpg', alt: 'A quote card: “The most difficult thing in life is to know yourself.” — Thales' },
]

/** PRD §8.4 */
export const experience: ExperienceItem[] = [
  {
    role: 'Data Science Analyst Intern',
    org: 'Cabswale.ai',
    period: 'Apr 2026 — Sep 2026',
    note: 'On-site, Gurgaon',
    logo: 'cabswale.png',
    summary: {
      before: 'Building analytics products and automated reports ',
      highlight: 'to drive business decisions',
      after: ' across the driver, trip, and subscription ecosystem.',
    },
  },
  {
    role: 'Data Intern',
    org: 'Ullas Trust',
    period: 'Jun 2025 — Jul 2025',
    note: 'Hybrid',
    logo: 'ullas-trust.png',
    summary: {
      before: 'Analyzed 5,000+ survey responses and built ',
      highlight: 'dashboards that improved',
      after: ' program tracking and saved ~5 hours per week in manual reporting.',
    },
  },
]

/** PRD §8.5 — grouped so the column reads as a stack, not a keyword dump. */
export const techStack: StackGroup[] = [
  {
    key: 'sql',
    title: 'SQL',
    tools: [{ name: 'SQL', logo: 'sql' }],
    items: 'Joins · CTEs · Window Functions',
  },
  {
    key: 'python',
    title: 'Python',
    tools: [
      { name: 'Python', logo: 'python' },
      { name: 'Pandas', logo: 'pandas' },
      { name: 'NumPy', logo: 'numpy' },
    ],
    items: 'Matplotlib · Seaborn',
  },
  {
    key: 'bi',
    title: 'BI & Visualization',
    tools: [
      { name: 'Power BI', logo: 'powerbi' },
      { name: 'Tableau', logo: 'tableau' },
      { name: 'Looker Studio', logo: 'looker' },
    ],
  },
  {
    key: 'excel',
    title: 'Excel & Analysis',
    tools: [{ name: 'Advanced Excel', logo: 'excel' }],
    items: 'DAX · Power Query',
  },
  {
    key: 'databases',
    title: 'Databases & Cloud',
    tools: [
      { name: 'MySQL', logo: 'mysql' },
      { name: 'BigQuery', logo: 'bigquery' },
      { name: 'Google Cloud', logo: 'gcp' },
    ],
  },
  {
    key: 'etl',
    title: 'ETL & Automation',
    tools: [{ name: 'Sheets / Drive API', logo: 'sheets' }],
    items: 'ETL Pipelines',
  },
]

/** PRD §8.6 */
export const awards: Award[] = [
  {
    title: 'Hackathon Winner — Park Prabandh 2026',
    detail: 'Agentic AI smart parking · GDSC · DCE',
  },
  { title: 'FAER Scholar', detail: '2025—26' },
  { title: 'Vice Chair, ACM-W Chapter', detail: '2024—25' },
]
