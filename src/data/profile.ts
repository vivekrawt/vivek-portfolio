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
  resumePath: 'Vivek_Resume.pdf',
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
 * PRD §8.8 — order is the order they render in. Kaggle waits on a URL; an
 * empty string hides the link until one is pasted in.
 */
export const socials: SocialLink[] = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vivek-rawat-89096522a/', icon: 'linkedin' },
  { name: 'GitHub', url: 'https://github.com/vivekrawt', icon: 'github' },
  { name: 'X', url: 'https://x.com/Xrasmaus', icon: 'x' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/vivekrawat01/', icon: 'leetcode' },
  { name: 'Kaggle', url: '', icon: 'kaggle' },
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
    period: 'Apr 2026 — Oct 2026',
    note: 'On-site, Gurgaon',
    logo: 'cabswale.png',
    url: 'https://cabswale.ai',
    summary: {
      before: 'Building end-to-end analytics products, ',
      highlight: 'automated reporting and forecasting solutions',
      after: ' to drive data-backed business decisions across product, operations, and growth.',
  },
  },
  {
    role: 'Data Intern',
    org: 'Ullas Trust',
    period: 'Jun 2025 — Aug 2025',
    note: 'Hybrid',
    logo: 'ullas-trust.png',
    url: 'https://www.ullastrust.org',
    summary: {
  before: 'Cleaning and analyzing 10,000+ records using Python, Pandas, and Excel, ',
  highlight: 'transforming raw data into actionable insights',
  after: ' through data validation, statistical imputation, survey analysis, and automated dashboards.',
},
  },
  {
    role: 'Data Analyst Trainee',
    org: 'Edunet Foundation',
    period: 'Jun 2024 — Aug 2024',
    note: 'Remote',
    logo:'edunet-foundation.png',
    url:'https://edunetfoundation.org/',
   summary: {
  before: 'Analyzing Uber trip data using Python, Pandas, and Power BI, ',
  highlight: 'uncovering demand patterns and ride-booking trends',
  after: ' through exploratory data analysis, interactive dashboards, and data-driven business insights.',
},
  },
]

/** Concise technical skills grouped for quick scanning. */
export const techStack: StackGroup[] = [
  {
    key: 'programming',
    title: 'Programming Languages',
    tools: [
      { name: 'Python', logo: 'python' },
      { name: 'SQL', logo: 'sql' },
      { name: 'Java', logo: 'openjdk' },
      { name: 'JavaScript', logo: 'javascript' },
      { name: 'TypeScript', logo: 'typescript' },
      { name: 'R', logo: 'r' },
    ],
  },
  {
    key: 'analytics',
    title: 'Data Analytics & BI',
    tools: [
      { name: 'Data Analysis', logo: 'skill-generic' },
      { name: 'Business Intelligence', logo: 'skill-generic' },
      { name: 'Statistical Analysis', logo: 'skill-generic' },
      { name: 'Product Analytics', logo: 'skill-generic' },
      { name: 'Predictive Analytics', logo: 'skill-generic' },
    ],
  },
  {
    key: 'visualization',
    title: 'Data Visualization',
    tools: [
      { name: 'Power BI', logo: 'powerbi' },
      { name: 'Tableau', logo: 'tableau' },
      { name: 'Excel', logo: 'excel' },
      { name: 'Looker Studio', logo: 'looker' },
      { name: 'Matplotlib', logo: 'skill-generic' },
      { name: 'Seaborn', logo: 'skill-generic' },
    ],
  },
  {
    key: 'data-science',
    title: 'Data Science & Machine Learning',
    tools: [
      { name: 'Pandas', logo: 'pandas' },
      { name: 'NumPy', logo: 'numpy' },
      { name: 'Scikit-learn', logo: 'sklearn' },
      { name: 'PyTorch', logo: 'pytorch' },
      { name: 'OpenCV', logo: 'opencv' },
    ],
  },
  {
    key: 'databases',
    title: 'Databases & Cloud',
    tools: [
      { name: 'BigQuery', logo: 'bigquery' },
      { name: 'MySQL', logo: 'mysql' },
      { name: 'MongoDB', logo: 'mongodb' },
      { name: 'Firebase', logo: 'firebase' },
      { name: 'Google Cloud Platform (GCP)', logo: 'gcp' },
    ],
  },
  {
    key: 'engineering',
    title: 'Data Engineering',
    tools: [
      { name: 'ETL', logo: 'skill-generic' },
      { name: 'Data Pipelines', logo: 'skill-generic' },
      { name: 'Data Integration', logo: 'skill-generic' },
      { name: 'Data Automation', logo: 'skill-generic' },
    ],
  },
  {
    key: 'software',
    title: 'Software Development',
    tools: [
      { name: 'Node.js', logo: 'nodejs' },
      { name: 'Express.js', logo: 'express' },
      { name: 'React.js', logo: 'react' },
      { name: 'FastAPI', logo: 'fastapi' },
      { name: 'REST APIs', logo: 'skill-generic' },
    ],
  },
  {
    key: 'ai',
    title: 'AI & Generative AI',
    tools: [
      { name: 'LLMs', logo: 'skill-generic' },
      { name: 'Agentic AI', logo: 'skill-generic' },
      { name: 'NLP', logo: 'skill-generic' },
      { name: 'Computer Vision', logo: 'skill-generic' },
      { name: 'Prompt Engineering', logo: 'skill-generic' },
      { name: 'Machine Learning', logo: 'skill-generic' },
    ],
  },
  {
    key: 'ai-tools',
    title: 'AI Tools & Platforms',
    tools: [
      { name: 'ChatGPT', logo: 'chatgpt' },
      { name: 'Google Gemini', logo: 'gemini' },
      { name: 'Claude', logo: 'claude' },
      { name: 'GitHub Copilot', logo: 'copilot' },
      { name: 'Gemini API', logo: 'gemini' },
    ],
  },
  {
    key: 'developer-tools',
    title: 'Developer Tools',
    tools: [
      { name: 'Git', logo: 'git' },
      { name: 'GitHub', logo: 'github' },
      { name: 'Docker', logo: 'docker' },
      { name: 'Linux', logo: 'linux' },
    ],
  },
]

/** PRD §8.6 */
export const awards: Award[] = [
  {
    title: 'Hackathon Winner — Park Prabandh 2026',
    project: 'Agentic AI smart parking',
    detail: 'GDSC · DCE',
  },
  {
    title: 'FAER Scholar',
    project: 'Deep Fake Detection System',
    detail: '2025—26',
  },
  { title: 'Vice Chair, ACM-W Chapter', detail: '2024—25' },
  {
    title: 'Higher Education Scholar (HES)',
    project: 'Ullas Trust',
  },
  {
    title: '3rd Runner-up — HACK GENESIS 2025',
    project: 'Christ University, Ghaziabad',
  },
]
