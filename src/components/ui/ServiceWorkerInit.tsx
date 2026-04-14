'use client'

import { useEffect } from 'react'

/** Registers the service worker silently. Must be rendered inside a client boundary. */
export default function ServiceWorkerInit() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {})
  }, [])

  return null
}
