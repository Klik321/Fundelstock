import { cn } from '@/lib/utils'

interface LoadingCardProps {
  className?: string
  lines?: number
  showImage?: boolean
}

export default function LoadingCard({
  className,
  lines = 3,
  showImage = false,
}: LoadingCardProps) {
  return (
    <div className={cn('glass-card p-5 space-y-3 animate-pulse', className)}>
      {showImage && (
        <div className="skeleton h-40 w-full rounded-xl" />
      )}
      <div className="skeleton h-4 w-3/4 rounded-lg" />
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <div
          key={i}
          className={cn('skeleton h-3 rounded-lg', i === lines - 2 ? 'w-1/2' : 'w-full')}
        />
      ))}
      <div className="flex items-center gap-2 pt-1">
        <div className="skeleton h-3 w-16 rounded-lg" />
        <div className="skeleton h-3 w-12 rounded-lg" />
      </div>
    </div>
  )
}
