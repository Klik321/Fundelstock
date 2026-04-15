import dynamic from 'next/dynamic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Price Alerts — Fundelstock',
  description: 'Set price alerts and get notified when news mentions your tracked symbols.',
}

const PriceAlertBuilder = dynamic(
  () => import('@/components/alerts/PriceAlertBuilder'),
  { ssr: false },
)

export default function AlertsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Price Alerts</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Get notified when news mentions your tracked symbols
        </p>
      </div>
      <div className="max-w-2xl">
        <PriceAlertBuilder />
      </div>
    </div>
  )
}
