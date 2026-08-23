# Vivek Rawat — Data Analyst Portfolio

Editorial, Swiss-minimal portfolio built to the spec in `Portfolio_Website_PRD.md`.

**Stack:** React 18 · Vite · TypeScript · Tailwind CSS · React Router · lucide-react

```bash
npm install
npm run dev        # http://localhost:5173/vivek-portfolio/
npm run build      # → dist/  (base = /vivek-portfolio/)
npm run build:root # → dist/  (base = /, for a domain root)
npm run preview    # serve the production build
npm run typecheck
```

## Editing content

All copy lives in two files. Nothing else needs to change.

| File | Holds |
|---|---|
| `src/data/profile.ts` | Name, role, availability, email, résumé path, hero intro, hero stats, experience (with company logos), tech stack (with tool logos), awards, social URLs, About photo deck |
| `src/data/projects.ts` | The project array — the `/projects` grid and every `/projects/:slug` case study render from it |

Adding an object to `projects` creates both a new card and a new case-study page.
A project's `visual` is either a generated SVG motif (`{ type: 'motif', motif: 'flow' }`)
or a real screenshot (`{ type: 'image', src: 'images/projects/…' }`) — cards and
case-study pages both read it.

The About page photo deck cycles on click. To add a shot, drop a square image
in `public/images/about/` and append it to `aboutGallery` in `profile.ts`; the
counter and cycling pick up the new length on their own. Keep them square and
under ~150 KB (see the note on image prep below). The deck shows three cards at
once — the two behind the front one are the photos coming up next — and mounts
only one `<img>` per card, so photo count does not inflate the DOM.

Logos live in `public/images/` and are referenced by filename only:
`logos/*.png` for employers (`experience[].logo`) and `tech/*.svg` for tools
(`techStack[].tools[].logo`). Both are local files — no icon CDN at runtime.
Adding a URL to the empty `Kaggle` / `LeetCode` entries in `socials` makes those
links appear in the footer and on `/contact`; an empty string hides them.

## Routes

`/` · `/about` · `/projects` · `/projects/:slug` · `/contact` · `/resume.pdf` · 404 fallback

## Deploying

### GitHub Pages (current host)

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.

**One-time setup:** in the repo, go to **Settings → Pages → Build and deployment**
and set **Source** to **GitHub Actions**. Until that is switched from
"Deploy from a branch", Pages will keep serving the old files and the workflow's
output will be ignored.

Deep links (`/vivek-portfolio/about`) work via `public/404.html`, which stashes the
requested route in `?p=` and hands it back to the router in `src/main.tsx`.

### Vercel / custom domain

`vercel.json` is ready — it runs `npm run build:root` (which passes `--base=/`)
and rewrites all routes to `index.html`. If you move to an apex domain, also update:

- `base` in `vite.config.ts`
- `profile.siteUrl` in `src/data/profile.ts`
- the absolute URLs in `index.html` (canonical, OG, Twitter, JSON-LD)
- `public/sitemap.xml` and `public/robots.txt`

## Contact form

Validates locally (required fields, email format, honeypot, inline errors, focus
moved to the first error, typed content never cleared). Delivery:

- **No key set** — falls back to a prefilled mail client, so it is never a dead end.
- **With a key** — posts to Web3Forms. Grab a free key at
  [web3forms.com](https://web3forms.com), then set `VITE_WEB3FORMS_KEY`
  locally in `.env` (see `.env.example`) and as a repository secret of the same
  name for the Actions build.

## Analytics

`src/lib/analytics.ts` defines the five PRD §14 events
(`cta_say_hello_click`, `resume_download`, `project_view`, `contact_submit`,
`outbound_click`) and already fires them at every call site. It forwards to
Plausible or Vercel Analytics automatically once either script is on the page;
until then the calls are inert.

## Design tokens

Defined once as CSS variables in `src/index.css` and consumed through
`tailwind.config.ts`. Amber (`--gold`, `--gold-ink`, `--gold-soft`,
`--gold-line`) is the decorative accent — swashes, kickers, icon tiles, card
motifs. Green (`--accent`) is reserved for live/availability state only. Use
`--gold-ink` for any amber **text**; the brighter `--gold` does not clear 4.5:1
on the canvas. The Phase-2 dark theme (PRD §5.3) is already written under
`:root[data-theme='dark']` — shipping it needs a toggle that sets that attribute,
not a refactor.

## Motion

Decorative motion is CSS transform/opacity only — no animation library. The
gradient orb drifts on a 26s loop, the dotted grid breathes over 14s, and the
analytics curve draws itself **once** via a `stroke-dashoffset` transition fired
by `useInView` (`src/lib/useInView.ts`), after which only its end point pulses.
Every decorative element is `aria-hidden`, and the global
`prefers-reduced-motion` block in `src/index.css` collapses all of it — the
curve resolves to fully drawn rather than never appearing, because `useInView`
returns true immediately when reduced motion is set.

## Image prep

Source photos and dashboard captures are optimised before they ship — square-cropped
where needed, resized to ~1000px, and saved as progressive JPEG at quality 84.
Originals live in `legacy/about-originals/` and are not deployed. The current set
went from 1.8 MB to 153 KB this way, which is the difference between passing and
failing the PRD's mobile LCP budget.

## Archive

`legacy/` holds the previous CRT / editorial / retro builds and their images.
Nothing in the live site imports from it; delete the folder whenever you like.
