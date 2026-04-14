export interface StockPreview {
  symbol: string
  name: string
  tvSymbol: string
}

export interface SectorData {
  name: string
  slug: string
  etf: string // e.g. "XLK"
  tvSymbol: string // e.g. "AMEX:XLK"
  iconName: string // lucide-react icon name
  color: string // hex brand color for this sector
  keywords: string[] // for auto-tagging news
  description: string
  stocks: StockPreview[]
}
