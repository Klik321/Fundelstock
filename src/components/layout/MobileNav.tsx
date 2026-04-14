'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { X, Activity, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SECTORS } from '@/data/sectors'

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname()

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 blur-glass"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.nav
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-[80vw] max-w-sm bg-bg-surface border-l border-border-medium flex flex-col overflow-y-auto"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-border-subtle">
              <Link href="/" onClick={onClose} className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center w-7 h-7 rounded-md"
                  style={{ background: 'linear-gradient(135deg, #2962ff, #7c4dff)' }}
                >
                  <Activity size={14} className="text-white" />
                </div>
                <span className="font-bold text-sm">
                  <span className="text-text-primary">Fundel</span>
                  <span className="text-accent-blue">stock</span>
                </span>
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 px-3 py-4 space-y-1">
              {[
                { href: '/', label: 'Home' },
                { href: '/news', label: 'All News' },
                { href: '/indices', label: 'Global Indices' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    pathname === href
                      ? 'bg-accent-blue-bg text-accent-blue'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated',
                  )}
                >
                  {label}
                </Link>
              ))}

              <div className="pt-4 pb-2">
                <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
                  Sectors
                </p>
                {SECTORS.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/sectors/${s.slug}`}
                    onClick={onClose}
                    className={cn(
                      'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                      pathname === `/sectors/${s.slug}`
                        ? 'bg-accent-blue-bg text-accent-blue'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated',
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                      {s.name}
                    </span>
                    <ChevronRight size={13} className="text-text-tertiary" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-4 border-t border-border-subtle space-y-2">
              {[
                { href: '/disclaimer', label: 'Disclaimer' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Use' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="block text-xs text-text-tertiary hover:text-text-secondary transition-colors"
                >
                  {label}
                </Link>
              ))}
              <p className="text-[10px] text-text-tertiary pt-1">
                ⚠ Not financial advice. For informational purposes only.
              </p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
