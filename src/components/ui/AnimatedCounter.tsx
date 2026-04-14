'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

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
 * Counts from 0 to `target` with a smooth easing animation
 * once the element enters the viewport.
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
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let raf: number
    const startTime = performance.now()
    const totalMs = duration * 1000

    // Ease-out-cubic
    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3)
    }

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / totalMs, 1)
      const easedProgress = easeOutCubic(progress)
      setCount(Math.floor(easedProgress * target))
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setCount(target)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, target, duration])

  const display = format ? count.toLocaleString() : count

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
