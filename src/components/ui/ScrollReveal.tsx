'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  /** Animation entry delay in seconds */
  delay?: number
  /** Which axis to slide in from */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  /** Distance in px to travel on entry */
  distance?: number
  /** Duration in seconds */
  duration?: number
  /** Whether to only animate once */
  once?: boolean
}

/**
 * Wraps children in a Framer Motion div that animates into view
 * when it enters the viewport. Use in server components by passing
 * children as server-rendered nodes.
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 28,
  duration = 0.55,
  once = true,
}: ScrollRevealProps) {
  const initial: Record<string, number> = { opacity: 0 }
  if (direction === 'up') initial.y = distance
  if (direction === 'down') initial.y = -distance
  if (direction === 'left') initial.x = distance
  if (direction === 'right') initial.x = -distance

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '0px 0px -60px 0px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
