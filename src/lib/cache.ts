/**
 * Simple in-memory TTL cache for server-side API responses.
 * Prevents hammering external APIs on every request.
 */

interface CacheEntry<T> {
  data: T
  expiresAt: number
}

class TTLCache {
  private store = new Map<string, CacheEntry<unknown>>()

  set<T>(key: string, data: T, ttlMs: number): void {
    this.store.set(key, { data, expiresAt: Date.now() + ttlMs })
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key) as CacheEntry<T> | undefined
    if (!entry) return null
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key)
      return null
    }
    return entry.data
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  delete(key: string): void {
    this.store.delete(key)
  }

  /** Remove all expired entries */
  prune(): void {
    const now = Date.now()
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) this.store.delete(key)
    }
  }
}

// Single shared instance (module-level singleton)
export const cache = new TTLCache()

// 5-minute TTL for all news responses
export const NEWS_TTL_MS = 5 * 60 * 1000
// 1-minute TTL for quote data
export const QUOTE_TTL_MS = 60 * 1000
