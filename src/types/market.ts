export interface Quote {
  symbol: string
  price: number
  change: number
  changePercent: number
  high: number
  low: number
  open: number
  previousClose: number
  volume?: number
  timestamp: number
}

export interface SectorData {
  slug: string
  name: string
  description: string
  etfSymbol: string            // e.g. "AMEX:XLK"
  tvSymbol: string             // TradingView symbol
  keywords: string[]           // for news search
  iconName: string             // Lucide icon name
  color: string                // tailwind color class accent
  stocks: StockPreview[]       // representative stocks
}

export interface StockPreview {
  symbol: string
  name: string
  tvSymbol: string
}

export interface IndexData {
  slug: string
  name: string
  shortName: string
  symbol: string               // e.g. "FOREXCOM:SPXUSD"
  tvSymbol: string             // same or alternate for TradingView
  region: string
  currency: string
  description: string
}
