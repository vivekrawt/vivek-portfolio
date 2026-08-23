import { Download, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { profile } from '@/data/profile'
import { track } from '@/lib/analytics'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

const routes = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About me', end: false },
  { to: '/projects', label: 'All projects', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

const pill = 'rounded-full bg-gold-soft px-5 py-2 font-medium text-ink'
const quiet = 'rounded-full px-5 py-2 text-ink-muted hover:text-ink'

function ResumeLink({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  return (
    <a
      href={asset(profile.resumePath)}
      download="Vivek-Rawat-Data-Analyst.pdf"
      onClick={() => {
        track('resume_download', { source: 'nav' })
        onNavigate?.()
      }}
      className={cn(
        'link-underline inline-flex items-center gap-1.5 py-1.5 text-ink-muted hover:text-ink',
        className,
      )}
    >
      <Download className="size-[15px]" strokeWidth={1.75} aria-hidden="true" />
      Résumé
    </a>
  )
}

/** Floating pill nav — the detached rounded container from the redesign. */
export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    if (!open) return

    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button')
      if (!focusables?.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 pt-4 sm:pt-5">
      <div className="frame">
        <nav
          aria-label="Primary"
          className="rounded-[18px] border border-hairline bg-surface/92 shadow-pill backdrop-blur-md"
        >
          <div className="flex h-15 items-center gap-4 px-4 sm:px-6">
            <Logo />

            <ul className="hidden flex-1 items-center justify-center gap-1 text-[0.9rem] md:flex">
              {routes.map((route) => (
                <li key={route.to}>
                  <NavLink
                    to={route.to}
                    end={route.end}
                    className={({ isActive }) =>
                      cn('inline-block transition-colors duration-200', isActive ? pill : quiet)
                    }
                  >
                    {route.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="ml-auto hidden text-[0.9rem] md:block">
              <ResumeLink />
            </div>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="ml-auto inline-flex size-11 items-center justify-center rounded-full text-ink md:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>

      {/*
        Portalled to <body>: the nav carries backdrop-blur, which would
        otherwise become the containing block for this fixed element and clip
        the panel to the bar's height.
      */}
      {open &&
        createPortal(
          <div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[60] flex flex-col bg-canvas md:hidden"
          >
            <div className="frame flex h-15 shrink-0 items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  toggleRef.current?.focus()
                }}
                aria-label="Close menu"
                className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <ul className="frame flex flex-1 flex-col justify-center gap-1 pb-24">
              {routes.map((route) => (
                <li key={route.to}>
                  <NavLink
                    to={route.to}
                    end={route.end}
                    className={({ isActive }) =>
                      cn(
                        'block py-3 font-display text-[2rem] font-bold tracking-tight transition-colors',
                        isActive ? 'text-ink' : 'text-ink-muted',
                      )
                    }
                  >
                    {route.label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-8 border-t border-hairline pt-8 text-base">
                <ResumeLink onNavigate={() => setOpen(false)} />
              </li>
            </ul>
          </div>,
          document.body,
        )}
    </header>
  )
}
