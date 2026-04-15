'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Activity, ChevronDown, Menu, Search, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SECTORS } from '@/data/sectors'
import { useSearch } from '@/providers/SearchProvider'
import ThemeToggle from '@/components/ui/ThemeToggle'
import NotificationBell from '@/components/notifications/NotificationBell'
import MobileNav from './MobileNav'
import dynamic from 'next/dynamic'

// Heavy modal — client only
const SearchModal = dynamic(() => import('@/components/search/SearchModal'), { ssr: false })
const MarketCountdown = dynamic(() => import('@/components/ui/MarketCountdown'), { ssr: false })

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/news', label: 'News' },
  { href: '/indices', label: 'Indices' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/alerts', label: 'Alerts' },
]

export default function Header() {
  const pathname = usePathname()
  const { openSearch } = useSearch()
  const [scrolled, setScrolled] = useState(false)
  const [sectorsOpen, setSectorsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ⌘K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        openSearch()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [openSearch])

  // Close dropdowns on route change
  useEffect(() => {
    setSectorsOpen(false)
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === href : pathname.startsWith(href)

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'header-glass shadow-card' : 'bg-transparent',
        )}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-md"
                style={{ background: 'linear-gradient(135deg, #2962ff, #7c4dff)' }}
              >
                <Activity size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[15px] font-bold tracking-tight">
                <span className="text-text-primary">Fundel</span>
                <span className="text-accent-blue">stock</span>
              </span>
            </Link>

            {/* ── Market Countdown ── */}
            <div className="hidden md:flex items-center px-3">
              <MarketCountdown />
            </div>

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex items-center gap-1 flex-1" aria-label="Main navigation">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-150',
                    isActive(href)
                      ? 'bg-accent-blue-bg text-accent-blue'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated',
                  )}
                >
                  {label}
                </Link>
              ))}

              {/* Sectors dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSectorsOpen(!sectorsOpen)}
                  aria-haspopup="true"
                  aria-expanded={sectorsOpen}
                  className={cn(
                    'flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-150',
                    pathname.startsWith('/sectors')
                      ? 'bg-accent-blue-bg text-accent-blue'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated',
                  )}
                >
                  Sectors
                  <ChevronDown
                    size={13}
                    className={cn('transition-transform duration-200', sectorsOpen && 'rotate-180')}
                  />
                </button>

                {sectorsOpen && (
                  <div
                    className="absolute left-0 top-full mt-2 w-52 rounded-xl border border-border-medium overflow-hidden z-50 p-1.5"
                    style={{ background: 'var(--bg-surface)', boxShadow: '0 16px 48px rgba(0,0,0,0.6)' }}
                    role="menu"
                  >
                    {SECTORS.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/sectors/${s.slug}`}
                        role="menuitem"
                        className={cn(
                          'flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors',
                          pathname === `/sectors/${s.slug}`
                            ? 'bg-accent-blue-bg text-accent-blue'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated',
                        )}
                      >
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* ── Right side ── */}
            <div className="flex items-center gap-2">
              {/* Search button */}
              <button
                onClick={openSearch}
                aria-label="Search (⌘K)"
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border border-border-medium bg-bg-elevated hover:bg-bg-surface-hover text-text-tertiary hover:text-text-primary transition-all text-xs"
              >
                <Search size={13} />
                <span className="hidden lg:inline">Search...</span>
                <kbd className="hidden lg:inline font-mono text-[10px] px-1.5 py-0.5 rounded-md border border-border-medium bg-bg-primary text-text-tertiary">
                  ⌘K
                </kbd>
              </button>

              {/* Notification bell */}
              <NotificationBell />

              {/* Theme toggle */}
              <ThemeToggle />

              {/* Disclaimer pill — xl+ only */}
              <Link
                href="/disclaimer"
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent-amber-border bg-accent-amber-bg text-accent-amber text-[11px] font-medium hover:opacity-80 transition-opacity"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-pulse-dot" />
                Not financial advice
              </Link>

              {/* Mobile hamburger */}
              <button
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-bg-elevated hover:bg-bg-surface-hover transition-colors text-text-secondary"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Close sectors dropdown on outside click */}
        {sectorsOpen && (
          <div className="fixed inset-0 z-40" aria-hidden="true" onClick={() => setSectorsOpen(false)} />
        )}
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchModal />
    </>
  )
}
