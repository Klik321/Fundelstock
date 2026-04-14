'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

const CONSENT_KEY = 'fundelstock_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true)
    } catch {
      // localStorage may be unavailable (private mode, etc.)
    }
  }, [])

  const dismiss = (accepted: boolean) => {
    try {
      localStorage.setItem(CONSENT_KEY, accepted ? 'accepted' : 'declined')
    } catch {
      // ignore
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="card flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="shrink-0 w-9 h-9 rounded-xl bg-accent-blue-bg border border-accent-blue-border flex items-center justify-center">
                <Cookie size={16} className="text-accent-blue" />
              </div>
              <p className="text-sm text-text-secondary leading-snug">
                We use essential cookies for site functionality.{' '}
                <Link href="/cookies" className="text-accent-blue hover:underline">
                  Learn more
                </Link>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => dismiss(false)}
                className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-text-secondary rounded-lg border border-border-medium hover:bg-bg-elevated transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => dismiss(true)}
                className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-white bg-accent-blue hover:bg-accent-blue-hover rounded-lg transition-colors"
              >
                Accept
              </button>
              <button
                onClick={() => dismiss(false)}
                aria-label="Close"
                className="p-2 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-bg-elevated transition-colors"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
