import { Link } from 'react-router-dom'
import { SocialLinks } from '@/components/SocialLinks'
import { profile } from '@/data/profile'

/** PRD §6.3 — name/© left, "Get in touch" centre, socials right. */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hairline">
      <div className="frame">
        <div className="flex flex-col gap-6 py-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="flex items-center gap-4 sm:gap-6">
            <span className="text-ink">{profile.name}</span>
            <span>
              {profile.name} © {year}
            </span>
          </p>

          <Link
            to="/contact"
            className="text-ink underline decoration-ink/40 underline-offset-4 transition-colors hover:decoration-ink"
          >
            Get in touch
          </Link>

          <SocialLinks />
        </div>
      </div>
    </footer>
  )
}
