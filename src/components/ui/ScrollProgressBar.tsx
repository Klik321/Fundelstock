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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        height: 2,
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #2962ff, #7c4dff, #26a69a)',
        pointerEvents: 'none',
        transition: 'width 0.05s linear',
      }}
    />
  )
}
