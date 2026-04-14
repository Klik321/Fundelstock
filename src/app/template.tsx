'use client'

/**
 * Next.js App Router template.tsx re-renders on every navigation,
 * making it the correct place for Framer Motion page transitions.
 * layout.tsx is preserved across navigations (no animation reset).
 */

import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
