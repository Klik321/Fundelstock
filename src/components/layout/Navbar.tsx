'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  TrendingUp,
  Search,
  BarChart2,
  Globe,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SECTORS } from '@/config/sectors'

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sectorsOpen, setSectorsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Markets' },
    { href: '/indices', label: 'Indices' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bg-base/90 blur-backdrop border-b border-border shadow-card'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-accent/15 border border-accent/30 group-hover:bg-accent/25 transition-colors">
              <TrendingUp size={16} className="text-accent" />
            </div>
            <span className="text-lg font-bold tracking-tight text-ink-primary">
              Fundel<span className="text-accent">stock</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-xl transition-colors',
                  pathname === href
                    ? 'text-ink-primary bg-bg-elevated'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-bg-elevated',
                )}
              >
                {label}
              </Link>
            ))}

            {/* Sectors dropdown */}
            <div className="relative">
              <button
                onClick={() => setSectorsOpen(!sectorsOpen)}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-colors',
                  pathname.startsWith('/sector')
                    ? 'text-ink-primary bg-bg-elevated'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-bg-elevated',
                )}
              >
                <BarChart2 size={14} />
                Sectors
                <ChevronDown
                  size={12}
                  className={cn('transition-transform', sectorsOpen && 'rotate-180')}
                />
              </button>

              {sectorsOpen && (
                <div className="absolute top-full mt-2 left-0 glass-card noPadding bg-bg-surface border border-border shadow-glass z-50 min-w-[240px] p-2">
                  {SECTORS.map((sector) => (
                    <Link
                      key={sector.slug}
                      href={`/sector/${sector.slug}`}
                      onClick={() => setSectorsOpen(false)}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 text-sm rounded-xl transition-colors',
                        pathname === `/sector/${sector.slug}`
                          ? 'text-ink-primary bg-bg-elevated'
                          : 'text-ink-secondary hover:text-ink-primary hover:bg-bg-elevated',
                      )}
                    >
                      {sector.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Disclaimer badge */}
            <Link
              href="/disclaimer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bear-bg border border-bear-border text-bear text-xs font-medium hover:bg-bear-bg/70 transition-colors"
            >
              Not Financial Advice
            </Link>

            {/* Mobile toggle */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-bg-elevated hover:bg-bg-overlay transition-colors text-ink-secondary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border pb-4 pt-2 space-y-1 animate-fade-in">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors',
                  pathname === href
                    ? 'text-ink-primary bg-bg-elevated'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-bg-elevated',
                )}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border mt-2">
              <p className="px-4 pb-2 text-2xs font-semibold uppercase tracking-widest text-ink-muted">
                Sectors
              </p>
              {SECTORS.map((sector) => (
                <Link
                  key={sector.slug}
                  href={`/sector/${sector.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2 text-sm text-ink-secondary hover:text-ink-primary hover:bg-bg-elevated rounded-xl transition-colors"
                >
                  {sector.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
