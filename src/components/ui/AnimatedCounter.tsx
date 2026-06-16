'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface AnimatedCounterProps {
  /** The final number to count to */
  target: number
  suffix?: string
  prefix?: string
  /** Count-up duration in seconds */
  duration?: number
  className?: string
  /** Format with toLocaleString? */
  format?: boolean
}

/**
 * Counts up to `target` once the element enters the viewport.
 *
 * Robustness contract — the value is NEVER stuck at 0:
 *  - SSR / no-JS / crawlers / OG previews render the real `target` (initial state).
 *  - First client render also shows `target`, so there is no hydration mismatch.
 *  - With motion allowed, the count-up runs from 0 → target when scrolled into view.
 *  - With `prefers-reduced-motion`, we skip the animation and hold `target`.
 */
export default function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 1.4,
  className,
  format = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const prefersReducedMotion = useReducedMotion()
  // Initialise to target so SSR + first paint always show the real number.
  const [count, setCount] = useState(target)
  const hasAnimated = useRef(false)

  useEffect(() => {
    // Keep the real number for reduced-motion users — never animate.
    if (prefersReducedMotion) {
      setCount(target)
      return
    }
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    let raf = 0
    const startTime = performance.now()
    const totalMs = Math.max(1, duration * 1000)
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / totalMs, 1)
      setCount(Math.round(easeOutCubic(progress) * target))
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setCount(target)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, target, duration, prefersReducedMotion])

  const display = format ? count.toLocaleString() : count

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
