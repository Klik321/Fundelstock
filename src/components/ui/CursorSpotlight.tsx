'use client'

import { memo, useEffect, useState } from 'react'

function CursorSpotlight() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 })

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth <= 768) return

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      className="pointer-events-none"
      style={{
        position: 'fixed',
        width: 600,
        height: 600,
        left: pos.x,
        top: pos.y,
        background:
          'radial-gradient(circle, rgba(41,98,255,0.06) 0%, transparent 50%)',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        transition: 'left 0.15s ease, top 0.15s ease',
      }}
    />
  )
}

export default memo(CursorSpotlight)
