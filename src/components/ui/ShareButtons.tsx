'use client'

import { useState } from 'react'
import { Check, Copy, Twitter } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ShareButtonsProps {
  url: string
  title: string
  className?: string
}

export default function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const copyLink = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard not available — silently ignore
    }
  }

  const shareOnX = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const text = encodeURIComponent(`${title} via @Fundelstock`)
    const shareUrl = encodeURIComponent(url)
    window.open(`https://x.com/intent/tweet?text=${text}&url=${shareUrl}`, '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="flex items-center justify-center w-7 h-7 rounded-lg border border-border-medium bg-bg-elevated hover:bg-bg-surface-hover text-text-tertiary hover:text-text-primary transition-all"
      >
        {copied ? <Check size={11} className="text-accent-green" /> : <Copy size={11} />}
      </button>
      <button
        onClick={shareOnX}
        aria-label="Share on X"
        className="flex items-center justify-center w-7 h-7 rounded-lg border border-border-medium bg-bg-elevated hover:bg-bg-surface-hover text-text-tertiary hover:text-text-primary transition-all"
      >
        <Twitter size={11} />
      </button>
    </div>
  )
}
