import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

/** Restores the top of the page on every route change. */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'instant' })
  }, [pathname])

  return null
}

export function Layout() {
  return (
    <div className="sheet flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-surface"
      >
        Skip to content
      </a>

      <ScrollToTop />
      <Navbar />

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
