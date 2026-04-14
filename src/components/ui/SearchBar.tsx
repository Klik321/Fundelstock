'use client'

import { useState, type FormEvent } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export default function SearchBar({
  placeholder = 'Search news, sectors, stocks…',
  onSearch,
  className,
}: SearchBarProps) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (onSearch && value.trim()) {
      // Sanitize input before passing up
      onSearch(value.replace(/<[^>]*>/g, '').trim().slice(0, 200))
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'relative flex items-center gap-2',
        className,
      )}
      role="search"
    >
      <div
        className={cn(
          'relative flex items-center w-full rounded-xl border bg-bg-elevated transition-all duration-200',
          focused
            ? 'border-accent-blue shadow-glow-blue/30 shadow-[0_0_0_3px_rgba(41,98,255,0.15)]'
            : 'border-border-medium hover:border-border-strong',
        )}
      >
        <Search
          size={15}
          className="absolute left-3 text-text-tertiary pointer-events-none shrink-0"
        />
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          aria-label="Search"
          autoComplete="off"
          spellCheck={false}
          maxLength={200}
          className={cn(
            'w-full bg-transparent pl-9 pr-8 py-2 text-sm text-text-primary placeholder:text-text-tertiary',
            'focus:outline-none rounded-xl',
          )}
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue('')}
            className="absolute right-2.5 text-text-tertiary hover:text-text-secondary transition-colors"
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </div>
    </form>
  )
}
