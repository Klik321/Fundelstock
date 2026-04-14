import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(dateString: string): string {
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true })
  } catch {
    return dateString
  }
}

export function formatPrice(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatChange(value: number, isPercent = false): string {
  const prefix = value >= 0 ? '+' : ''
  return isPercent ? `${prefix}${value.toFixed(2)}%` : `${prefix}${value.toFixed(2)}`
}

export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.slice(0, length)}…` : str
}

/**
 * Sanitize a user-supplied string to prevent XSS.
 * Strips HTML tags and trims whitespace.
 */
export function sanitizeText(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim().slice(0, 1000)
}

/**
 * Validate that a URL uses https:// and is not a javascript: or data: URL.
 */
export function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:'
  } catch {
    return false
  }
}
