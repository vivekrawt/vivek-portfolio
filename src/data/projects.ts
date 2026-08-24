import type { Project } from '@/types'

/**
 * The grid at /projects and every /projects/:slug page render from this array.
 * Add an object and both appear — no layout edits (PRD §11.2, US-5).
 *
 * Ordered newest first. Entries 01—04 come from professional and course work;
 * 05—07 are self-directed analyses published on GitHub.
 */
export const projects: Project[] = [
  {
    slug: 'paypal-global-transaction-analytics',
    index: '01',
    shortTitle: 'PayPal Analytics',
    title: 'PayPal Global Transaction Analytics',
    date: 'Feb 2026',
    tools: ['SQL', 'Window Functions', 'CTEs', 'Risk Analytics'],
    outcome:
      'Ranked top markets and tier-1 merchants, and flagged $10K+ cross-border risk across a 5-table SQL pipeline.',
    stats: [
      { value: '5', label: 'normalized tables joined' },
      { value: '$10K+', label: 'cross-border risk flagged' },
      { value: 'Top 10', label: 'tier-1 merchants ranked' },
      { value: '12 mo', label: 'automated merchant scoring' },
    ],
    problem:
      'A global payments dataset spread across five normalized tables held the answer to three questions the business kept asking by hand: which international markets actually carry volume, which merchants deserve tier-1 treatment, and which cross-border transactions warrant a second look. Every answer meant a fresh ad-hoc query, and no two analysts wrote the same one.',
    approach: [
      'Engineered a SQL pipeline across 5 normalized tables, using multi-table joins and layered aggregation to build one reusable transaction fact view.',
      'Ranked international markets and top merchants by volume and value, so tiering came from the data rather than from account-manager intuition.',
      'Segmented risk and behaviour with window functions and nested subqueries, isolating cross-border transactions above $10,000 for review.',
      'Automated a rolling 12-month merchant performance score so tiering refreshes itself instead of being rebuilt each quarter.',
    ],
    impact: [
      'Cross-border transactions above $10,000 surface automatically instead of being sampled by hand.',
      'Merchant tiering runs on a repeatable 12-month score — one definition, not one per analyst.',
      'Market and merchant rankings became a single query the team reads the same way every time.',
    ],
    visual: {
      type: 'motif',
      motif: 'flow',
      alt: 'Abstract transaction-flow diagram: nodes joined by routing lines, with two high-value paths flagged in red.',
    },
    links: {},
  },
  {
    slug: 'india-cpi-inflation-analysis',
    index: '02',
    shortTitle: 'CPI Inflation',
    title: 'India CPI Inflation Analysis',
    date: 'Jan 2026',
    tools: ['Excel', 'Power BI', 'DAX', 'Power Query', 'Time-Series'],
    outcome:
      'Traced a >45% Dec-2023 inflation surge to non-food categories in a 15+ visual dashboard.',
    stats: [
      { value: '7 yrs', label: 'of CPI data modelled (2017—2023)' },
      { value: '>45%', label: 'Dec-2023 surge explained' },
      { value: '30+', label: 'sub-categories tracked' },
      { value: '15+', label: 'visuals shipped' },
    ],
    problem:
      'India’s CPI spiked sharply in December 2023, and the headline number said nothing about why. Seven years of monthly data across 7 categories and 30+ sub-categories existed, but in a shape that could not answer which categories moved the index, and by how much.',
    approach: [
      'Modelled 7 years of CPI data (2017—2023) in Power Query, reshaping monthly releases into one tidy time-series table.',
      'Computed monthly contribution % per category with DAX, so each category’s share of the index move is explicit rather than inferred.',
      'Split urban and rural series to test whether the surge was a national story or a segmented one.',
      'Shipped a 15+ visual Power BI dashboard covering YoY trend, category contribution, and sub-category drill-down.',
    ],
    impact: [
      'Identified non-food categories as the driver of the >45% December 2023 surge — the opposite of the food-price assumption.',
      'Urban vs. rural YoY comparison made the divergence between the two visible in one view.',
      'Category contribution % turned a single headline number into an attributable, drillable breakdown.',
    ],
    visual: {
      type: 'image',
      src: 'images/projects/cpi-dec2023-contribution.png',
      alt: 'Two horizontal bar charts comparing rural and urban category contribution to December 2023 inflation across seven categories, with clothing and health leading rural and personal expenses leading urban.',
    },
    gallery: [
      {
        src: 'images/projects/cpi-yoy-growth.png',
        alt: 'Column chart of year-on-year CPI growth from 2017 to 2022, with 2019 highlighted in amber as the peak at 8 percent.',
        caption: 'Year-on-year CPI growth, 2017—2022',
      },
      {
        src: 'images/projects/cpi-food-prices.png',
        alt: 'Monthly food inflation columns for the twelve months ending May 2023, above a bar chart ranking commodity groups from oils and fats at minus 17 percent to spices at 17 percent.',
        caption: 'Food prices by month and commodity',
      },
      {
        src: 'images/projects/cpi-covid-impact.png',
        alt: 'Three line charts tracking food, health, and essential services inflation from October 2018 to January 2021, each marked at the March 2020 onset of COVID-19.',
        caption: 'Inflation around the March 2020 onset',
      },
    ],
    links: { repo: 'https://github.com/vivekrawt/CPI-Consumer-Price-Index-Analysis-' },
  },
  {
    slug: 'us-healthcare-cost-demographics-analysis',
    index: '03',
    shortTitle: 'US Healthcare',
    title: 'US Healthcare Cost & Demographics Analysis',
    date: 'Jan — Feb 2026',
    tools: ['Excel', 'Power Query', 'Pivot Tables', 'EDA', 'Time-Series'],
    outcome:
      'Profiled 10,000+ patient records across 100 hospitals to link demographics and admission type to cost.',
    stats: [
      { value: '10,000+', label: 'patient records analysed' },
      { value: '100', label: 'hospitals covered' },
      { value: '~32%', label: 'of cases were emergency admissions' },
      { value: '6 yrs', label: 'of admissions trended (2018—2023)' },
    ],
    problem:
      'Hospital resource planning and patient cost optimisation both depend on knowing who is being admitted, for what, and at what price — but the underlying records held age, gender, condition, admission type, and billing as flat, unconnected columns. Nothing in that shape answers which conditions drive cost, or which demographics drive demand.',
    approach: [
      'Cleaned and standardised the demographic and medical fields, then bucketed age into Young (18—35), Middle (35—60), and Senior (60—85) cohorts.',
      'Measured prevalence of 6 conditions — arthritis, asthma, cancer, diabetes, hypertension, obesity — across those cohorts and by gender.',
      'Computed average billing by condition and demographic group, separating the common conditions from the expensive ones.',
      'Trended admissions from 2018 to 2023 and split them by type: emergency, urgent, and elective.',
      'Built multi-sheet dashboards in Excel using pivot tables, pivot charts, conditional formatting, and heatmaps.',
    ],
    impact: [
      'Hypertension and arthritis were the most common conditions in the middle and senior cohorts, at roughly 40%+ prevalence.',
      'Prevalence split cleanly by gender — higher obesity and diabetes among women, higher hypertension among men.',
      'Emergency cases made up about 32% of all admissions, a planning number that had not been quantified before.',
      'Hypertension consumed the most room and doctor allocation at 400+ cases, marking it as the priority for resourcing.',
      'Admissions peaked in 2020 at roughly 2,040 — the COVID signal, visible directly in the trend.',
    ],
    visual: {
      type: 'image',
      src: 'images/projects/us-healthcare-demographics.png',
      alt: 'Demographic vs medical condition dashboard: a stacked bar chart splitting six conditions across young, middle, and senior cohorts, beside a second chart splitting the same conditions by female and male case counts.',
    },
    gallery: [
      {
        src: 'images/projects/us-healthcare-age-gender.png',
        alt: 'Stacked bar chart breaking each of six conditions into six female and male age segments, with hypertension highest among middle-aged males.',
        caption: 'Age and gender crossed on one axis',
      },
      {
        src: 'images/projects/us-healthcare-resources.png',
        alt: 'Hospital resources worksheet: pivot tables counting patients, doctors, and rooms per condition, a monthly admissions bar chart, and a colour-scaled admission-type matrix.',
        caption: 'Hospital resource allocation',
      },
      {
        src: 'images/projects/us-healthcare-pivots.png',
        alt: 'Objectives worksheet showing the age-versus-condition pivot tables with conditional formatting, alongside the age-cohort prevalence chart they drive.',
        caption: 'The pivots behind the charts',
      },
    ],
    links: { repo: 'https://github.com/vivekrawt/US-Healthcare-Analysis' },
  },
  {
    slug: 'compliance-seva-legal-metrology-analytics',
    index: '04',
    shortTitle: 'Compliance Seva',
    title: 'Compliance Seva — Legal Metrology Analytics',
    date: 'Aug — Sep 2025',
    tools: ['OCR', 'NLP', 'Python', 'SQL', 'Power BI', 'Anomaly Detection'],
    outcome:
      'Automated regulatory label checks with OCR + NLP and real-time anomaly dashboards.',
    stats: [
      { value: 'OCR + NLP', label: 'pipeline over unstructured labels' },
      { value: 'Rule-based', label: 'anomaly detection on every record' },
      { value: 'Real-time', label: 'violation & RCA dashboards' },
    ],
    problem:
      'Legal metrology compliance is checked against what is printed on a product label — unstructured text, photographed at inconsistent angles and quality. Reviewing it manually does not scale, and by the time a violation pattern is noticed by hand, it has already spread across a product line.',
    approach: [
      'Built an AI-driven pipeline applying OCR to product-label images, then NLP to parse the extracted text into the declared fields regulation actually asks for.',
      'Implemented ETL validation so malformed and low-confidence extractions are caught before they reach the compliance layer rather than after.',
      'Applied rule-based anomaly detection against legal metrology requirements, scoring each record as compliant or flagged.',
      'Shipped real-time Power BI dashboards tracking violation trends and root-cause analysis by category and source.',
    ],
    impact: [
      'Label compliance checking runs automatically over unstructured images instead of by manual review.',
      'Violations surface as they occur, with root-cause breakdowns rather than a period-end count.',
      'ETL validation keeps bad extractions out of the compliance signal, so a flag means a real problem.',
    ],
    visual: {
      type: 'image',
      src: 'images/projects/compliance-seva-rules.png',
      alt: 'Compliance Rules screen listing six legal metrology rules — MRP declaration, ingredient list, expiry format, nutritional information, country of origin, and batch number — each with its category, priority, violation count, and active status.',
    },
    gallery: [
      {
        src: 'images/projects/compliance-seva-dashboard.png',
        alt: 'Compliance Seva dashboard: a sidebar of scanner, records, and rules-engine sections beside KPI cards for total scans, compliant products, violations detected, and critical issues, with a compliance donut and a recent-activity feed.',
        caption: 'Real-time compliance dashboard',
      },
      {
        src: 'images/projects/compliance-seva-scanner.png',
        alt: 'Compliance Seva landing screen headed Streamline Compliance Checks, offering camera, gallery, and link capture modes for validating product labels against Legal Metrology Rules 2011.',
        caption: 'Label capture — camera, gallery, or link',
      },
    ],
    links: { repo: 'https://github.com/vivekrawt/compliance-seva' },
  },
  {
    slug: 'bigbasket-performance-overview',
    index: '05',
    shortTitle: 'BigBasket BI',
    title: 'BigBasket Performance Overview',
    date: 'Jul 2025',
    tools: ['Power BI', 'Power Query', 'DAX', 'Data Modeling'],
    outcome:
      'An interactive Power BI view of $8.9M in sales across 28K products, ranking categories and top brands.',
    stats: [
      { value: '$8.9M', label: 'in sales analysed' },
      { value: '28K', label: 'products in scope' },
      { value: 'Top 10', label: 'brands ranked by revenue' },
      { value: '2.71', label: 'average product rating' },
    ],
    problem:
      'For a marketplace the size of BigBasket the question is never what did we sell, but which categories and brands are carrying the number — and whether price actually tracks how customers rate a product. Without one centralised interactive view, spotting an underperforming category means assembling the answer by hand every time. Built against a simulated BigBasket sales dataset.',
    approach: [
      'Extracted, transformed, and cleaned the sales, product, and category data in Power Query.',
      'Modelled relationships between the sales, product, and category tables so a single slicer filters the whole report coherently.',
      'Wrote DAX measures for the headline KPIs — total sales, total products, average discount, average rating, and highest-rated brands.',
      'Built a category treemap for share of sales, a top-10 brand bar chart for revenue leaders, and a price-versus-rating scatter to test the pricing assumption directly.',
      'Added category and rating slicers so a category manager can filter the whole dashboard down to their own patch.',
    ],
    impact: [
      'Category and brand contribution became visible at a glance, so marketing spend can follow revenue rather than intuition.',
      'The price-versus-rating scatter answers whether more expensive products actually earn better ratings — a question that had only been assumed.',
      'Stocking decisions get a concrete basis in category and brand popularity instead of last quarter’s habits.',
    ],
    visual: {
      type: 'image',
      src: 'images/projects/bigbasket-dashboard.jpg',
      alt: 'BigBasket Power BI dashboard: KPI cards for total sales and ratings, a category-wise sales treemap, a top-10 brands revenue bar chart, and a product price versus rating scatter plot.',
    },
    links: { repo: 'https://github.com/vivekrawt/Bigbasket_Performance-Overview_Dashboard-' },
  },
  {
    slug: 'weather-dashboard-india',
    index: '06',
    shortTitle: 'Weather BI',
    title: 'Weather Dashboard — 5 Indian Cities',
    date: 'Jul 2025',
    tools: ['Power BI', 'Power Query', 'DAX', 'Data Modeling'],
    outcome:
      'Real-time conditions and 7-day forecasts for five cities, with air quality and rain probability in one view.',
    stats: [
      { value: '5', label: 'cities tracked side by side' },
      { value: '7-day', label: 'rolling forecast per city' },
      { value: '6', label: 'AQI pollutants monitored' },
    ],
    problem:
      'Weather data arrives as a stream of disconnected readings — current conditions here, a forecast there, air quality somewhere else entirely. Anyone deciding whether to travel, commute, or schedule outdoor work has to assemble that picture themselves, for each city, every time.',
    approach: [
      'Transformed and cleaned city-level readings in Power Query, then modelled the forecast and AQI tables against a shared city dimension.',
      'Covered five deliberately different locations — Pune, Ukhimath, Gurgaon, Buxar, and Jaipur — so the dashboard spans hill, metro, and plains climates.',
      'Wrote DAX measures driving conditional formatting, so AQI and rain probability read as status rather than as raw numbers.',
      'Surfaced humidity, wind speed, pressure, UV index, visibility, and sunrise/sunset alongside the temperature line.',
      'Broke air quality into its six components — CO, PM2.5, O3, NO2, SO2, and PM10 — rather than showing one opaque index.',
    ],
    impact: [
      'A seven-day outlook, current conditions, and air quality for any of the five cities read from one screen instead of three sources.',
      'Day-wise drill-down turns the forecast into something you can plan a specific day against.',
      'Splitting AQI into its six pollutants shows what is actually driving a bad-air day, not just that it is bad.',
    ],
    visual: {
      type: 'image',
      src: 'images/projects/weather-dashboard.jpg',
      alt: 'Weather Power BI dashboard: current conditions for Pune, a seven-day temperature forecast line chart, an air quality index gauge with six pollutant readings, and a per-day chance-of-rain bar list.',
    },
    links: { repo: 'https://github.com/vivekrawt/weather_dashboard-' },
  },
  {
    slug: 'twitter-sentiment-analysis',
    index: '07',
    shortTitle: 'Tweet Sentiment',
    title: 'Twitter Sentiment Analysis',
    date: 'May — Jun 2025',
    tools: ['Python', 'scikit-learn', 'TF-IDF', 'NLTK', 'Matplotlib'],
    outcome:
      'A TF-IDF and logistic-regression pipeline sorting tweets into three sentiment classes, trained on a 1.6M-tweet corpus.',
    stats: [
      { value: '1.6M', label: 'tweets in the training corpus' },
      { value: '3', label: 'sentiment classes predicted' },
      { value: 'TF-IDF', label: 'vectorisation + logistic regression' },
    ],
    problem:
      'Raw tweets are about as unstructured as text gets — slang, emoji, handles, and stopwords wrapped around whatever opinion is actually being expressed. Turning 1.6 million of them into something a model can learn from is most of the work; the classifier is the easy part.',
    approach: [
      'Preprocessed raw tweet text with stemming and stopword removal, writing the cleaned corpus out separately from the raw dataset.',
      'Converted the cleaned text to TF-IDF vectors, so term importance is weighted rather than counted flat.',
      'Trained a logistic regression classifier to sort tweets as positive, neutral, or negative.',
      'Evaluated accuracy on both the training and held-out test sets, to check the model was generalising rather than memorising.',
      'Persisted the fitted model and vectoriser with pickle so inference does not require retraining.',
      'Plotted word frequency and tweet-length distribution to sanity-check the corpus before trusting the model on it.',
    ],
    impact: [
      'Preprocessing, training, and inference are separate scripts, so the corpus can be swapped without touching model code.',
      'Saved model and vectoriser artefacts make the classifier reusable on new tweets straight away.',
      'Corpus visualisations expose skew in the data before it quietly becomes skew in the predictions.',
    ],
    visual: {
      type: 'image',
      src: 'images/projects/twitter-word-frequency.jpg',
      alt: 'Bar chart of the most frequent words across the cleaned tweet corpus, ordered by count.',
    },
    links: { repo: 'https://github.com/vivekrawt/twitter_sentiment_analysis' },
  },
]

export const getProject = (slug?: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

/** PRD §7.3 — the trailing card links out to everything not written up here. */
export const moreCard = {
  index: '08',
  label: 'More on GitHub',
  outcome: 'Pandas data-cleaning work, computer-vision experiments, and whatever is in progress.',
  href: 'https://github.com/vivekrawt?tab=repositories',
} as const
