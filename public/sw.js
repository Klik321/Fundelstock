/**
 * Fundelstock Service Worker
 * Strategy:
 *   - Static shell assets (JS, CSS, fonts): Cache-first
 *   - API routes: Network-first with 5s timeout fallback
 *   - HTML pages: Network-first (always fresh)
 */

const CACHE_NAME = 'fundelstock-v1'
const STATIC_CACHE = 'fundelstock-static-v1'

// Assets to pre-cache on install
const PRECACHE_URLS = ['/', '/news', '/sectors', '/indices', '/portfolio']

// ── Install ─────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).catch(() => {}),
  )
  self.skipWaiting()
})

// ── Activate ─────────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME && k !== STATIC_CACHE)
          .map((k) => caches.delete(k)),
      ),
    ),
  )
  self.clients.claim()
})

// ── Fetch ─────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET and cross-origin requests
  if (request.method !== 'GET') return
  if (url.origin !== self.location.origin) return

  // API routes: network-first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetchWithTimeout(request, 5000).catch(() =>
        caches.match(request).then((r) => r ?? new Response('{"error":"offline"}', {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        })),
      ),
    )
    return
  }

  // Static assets (_next/static): cache-first
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request)
        if (cached) return cached
        const response = await fetch(request)
        if (response.ok) cache.put(request, response.clone())
        return response
      }),
    )
    return
  }

  // HTML pages: network-first, fall back to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          caches.open(CACHE_NAME).then((c) => c.put(request, response.clone()))
        }
        return response
      })
      .catch(() => caches.match(request).then((r) => r ?? fetch(request))),
  )
})

function fetchWithTimeout(request, ms) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('timeout')), ms)
    fetch(request).then(
      (res) => { clearTimeout(timeout); resolve(res) },
      (err) => { clearTimeout(timeout); reject(err) },
    )
  })
}

// ── Push Notification handler ──────────────────────────────────────────────
self.addEventListener('push', (event) => {
  if (!event.data) return
  try {
    const data = event.data.json()
    event.waitUntil(
      self.registration.showNotification(data.title ?? 'Fundelstock Alert', {
        body: data.body,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: data.tag,
        data: { url: data.url },
      }),
    )
  } catch {}
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url ?? '/'
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) return client.focus()
      }
      if (clients.openWindow) return clients.openWindow(url)
    }),
  )
})
