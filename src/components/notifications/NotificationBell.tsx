'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, BellOff, X, ExternalLink } from 'lucide-react'
import { isSafeUrl, formatTimeAgo } from '@/lib/utils'

interface BreakingItem {
  id: string
  headline: string
  url: string
  source: string
  publishedAt: string
}

const STORAGE_KEY = 'fundelstock-seen-breaking'
const POLL_INTERVAL = 5 * 60 * 1000 // 5 minutes

function getSeenIds(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return new Set(raw ? JSON.parse(raw) : [])
  } catch { return new Set() }
}

function markSeen(ids: string[]) {
  try {
    const existing = getSeenIds()
    ids.forEach((id) => existing.add(id))
    // Keep only last 200 ids to avoid unbounded growth
    const trimmed = [...existing].slice(-200)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
  } catch {}
}

export default function NotificationBell() {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [panelOpen, setPanelOpen] = useState(false)
  const [unread, setUnread] = useState(0)
  const [items, setItems] = useState<BreakingItem[]>([])
  const panelRef = useRef<HTMLDivElement>(null)

  // Read browser permission on mount
  useEffect(() => {
    if ('Notification' in window) setPermission(Notification.permission)
  }, [])

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return
    const result = await Notification.requestPermission()
    setPermission(result)
  }, [])

  const sendBrowserNotification = useCallback((item: BreakingItem) => {
    if (permission !== 'granted') return
    try {
      const n = new Notification('🔴 Breaking Market News', {
        body: item.headline,
        tag: item.id,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      })
      n.onclick = () => {
        const safeUrl = isSafeUrl(item.url) ? item.url : '#'
        window.open(safeUrl, '_blank', 'noopener')
        n.close()
      }
    } catch {}
  }, [permission])

  const fetchBreaking = useCallback(async () => {
    try {
      const res = await fetch('/api/news/breaking')
      if (!res.ok) return
      const data: BreakingItem[] = await res.json()
      if (!Array.isArray(data)) return

      const seen = getSeenIds()
      const newItems = data.filter((a) => !seen.has(a.id))

      if (newItems.length > 0) {
        setItems((prev) => {
          // Merge + dedupe, newest first
          const merged = [...newItems, ...prev].filter(
            (item, idx, arr) => arr.findIndex((x) => x.id === item.id) === idx,
          ).slice(0, 20)
          return merged
        })
        setUnread((prev) => prev + newItems.length)
        // Send browser notifications for each new item
        newItems.forEach(sendBrowserNotification)
        markSeen(newItems.map((a) => a.id))
      }
    } catch {}
  }, [sendBrowserNotification])

  // Poll on mount and every 5 minutes
  useEffect(() => {
    fetchBreaking()
    const interval = setInterval(fetchBreaking, POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [fetchBreaking])

  // Close panel on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setPanelOpen(false)
      }
    }
    if (panelOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [panelOpen])

  const openPanel = () => {
    if (permission === 'default') requestPermission()
    setPanelOpen((prev) => !prev)
    setUnread(0)
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={openPanel}
        aria-label="Notifications"
        className="relative flex items-center justify-center w-9 h-9 rounded-lg border border-border-medium bg-bg-elevated hover:bg-bg-surface-hover transition-all text-text-secondary hover:text-text-primary"
      >
        {permission === 'denied' ? <BellOff size={15} /> : <Bell size={15} />}
        {unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-accent-red text-white text-[9px] font-bold"
          >
            {unread > 9 ? '9+' : unread}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {panelOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border-medium overflow-hidden z-50"
            style={{ background: 'var(--bg-surface)', boxShadow: '0 16px 48px rgba(0,0,0,0.6)' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
              <p className="text-sm font-semibold text-text-primary">Breaking Alerts</p>
              <div className="flex items-center gap-2">
                {permission === 'default' && (
                  <button
                    onClick={requestPermission}
                    className="text-[10px] text-accent-blue hover:underline"
                  >
                    Enable alerts
                  </button>
                )}
                {permission === 'denied' && (
                  <span className="text-[10px] text-text-tertiary">Alerts blocked in browser</span>
                )}
                {permission === 'granted' && (
                  <span className="flex items-center gap-1 text-[10px] text-accent-green">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse-dot" />
                    Live
                  </span>
                )}
                <button onClick={() => setPanelOpen(false)}>
                  <X size={13} className="text-text-tertiary hover:text-text-primary" />
                </button>
              </div>
            </div>

            <div className="max-h-72 overflow-y-auto">
              {items.length === 0 ? (
                <div className="px-4 py-8 text-center text-xs text-text-tertiary">
                  No breaking news detected yet.
                  <br />News is checked every 5 minutes.
                </div>
              ) : (
                items.map((item) => {
                  const safeUrl = isSafeUrl(item.url) ? item.url : '#'
                  return (
                    <a
                      key={item.id}
                      href={safeUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex items-start gap-3 px-4 py-3 border-b border-border-subtle hover:bg-bg-surface-hover transition-colors group"
                    >
                      <span className="breaking-dot mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-text-primary line-clamp-2 leading-snug">
                          {item.headline}
                        </p>
                        <p className="text-[10px] text-text-tertiary mt-0.5">
                          {item.source} · {formatTimeAgo(item.publishedAt)}
                        </p>
                      </div>
                      <ExternalLink size={10} className="shrink-0 text-text-tertiary group-hover:text-accent-blue mt-0.5" />
                    </a>
                  )
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
