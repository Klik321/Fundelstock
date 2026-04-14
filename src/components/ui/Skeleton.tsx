import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  height?: string | number
  width?: string | number
  rounded?: string
}

export function Skeleton({ className, height, width, rounded = 'rounded-lg' }: SkeletonProps) {
  return (
    <div
      className={cn('skeleton', rounded, className)}
      style={{ height, width }}
      aria-hidden="true"
    />
  )
}

export function SkeletonNewsCard({ className }: { className?: string }) {
  return (
    <div className={cn('card p-4 space-y-3', className)}>
      <Skeleton height={14} className="w-3/4" />
      <Skeleton height={12} className="w-full" />
      <Skeleton height={12} className="w-1/2" />
      <div className="flex items-center gap-2 pt-1">
        <Skeleton height={20} width={60} rounded="rounded-full" />
        <Skeleton height={20} width={50} rounded="rounded-full" />
        <Skeleton height={10} width={80} className="ml-auto" />
      </div>
    </div>
  )
}

export function SkeletonSectorCard({ className }: { className?: string }) {
  return (
    <div className={cn('card overflow-hidden', className)}>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton width={36} height={36} rounded="rounded-lg" />
          <div className="space-y-1.5">
            <Skeleton width={90} height={14} />
            <Skeleton width={50} height={11} />
          </div>
        </div>
        <div className="text-right space-y-1">
          <Skeleton width={70} height={18} />
          <Skeleton width={50} height={11} />
        </div>
      </div>
      <Skeleton height={160} rounded="rounded-none" />
      <div className="p-4 space-y-2">
        <Skeleton height={11} className="w-full" />
        <Skeleton height={11} className="w-4/5" />
      </div>
    </div>
  )
}
