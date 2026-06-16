'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const total = docHeight - winHeight
      setProgress(total > 0 ? (scrollY / total) * 100 : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        height: 2,
        width: '100%',
        transformOrigin: 'left',
        transform: `scaleX(${progress / 100})`,
        background: 'linear-gradient(90deg, #2962ff, #7c4dff, #26a69a)',
        pointerEvents: 'none',
        // transform (not width) keeps this on the compositor — no layout thrash
        transition: 'transform 0.1s linear',
        willChange: 'transform',
      }}
    />
  )
}
