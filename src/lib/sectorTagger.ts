/**
 * Automatic sector and index tagging for news articles.
 * Scans headline + summary against keyword dictionaries and returns
 * matching sector slugs (sorted by match count) and index slugs.
 */

const SECTOR_KEYWORDS: Record<string, string[]> = {
  technology: [
    'tech', 'technology', 'software', 'AI', 'artificial intelligence', 'semiconductor',
    'chip', 'cloud', 'SaaS', 'Apple', 'Microsoft', 'Google', 'NVIDIA', 'Meta',
    'cybersecurity', 'data center', 'ChatGPT', 'OpenAI', 'machine learning',
  ],
  healthcare: [
    'pharma', 'biotech', 'FDA', 'drug', 'hospital', 'medical', 'vaccine',
    'clinical trial', 'healthcare', 'therapeutic', 'Pfizer', 'Moderna',
    'Eli Lilly', 'GLP-1', 'Ozempic', 'drug approval',
  ],
  financials: [
    'bank', 'Fed', 'Federal Reserve', 'interest rate', 'JPMorgan', 'Goldman',
    'insurance', 'lending', 'mortgage', 'credit', 'loan', 'fintech', 'payments',
    'inflation', 'rate hike', 'rate cut', 'Wall Street', 'banking',
  ],
  energy: [
    'oil', 'gas', 'OPEC', 'crude', 'renewable', 'solar', 'wind', 'ExxonMobil',
    'Chevron', 'petroleum', 'pipeline', 'drilling', 'LNG', 'energy transition',
    'oil prices', 'barrel', 'shale', 'offshore',
  ],
  'consumer-discretionary': [
    'retail', 'luxury', 'auto', 'Tesla', 'Amazon', 'Nike', 'consumer spending',
    'e-commerce', 'travel', 'restaurant', 'holiday sales', 'consumer confidence',
  ],
  'consumer-staples': [
    'food', 'beverage', 'grocery', 'Walmart', 'Procter', 'Coca-Cola', 'household',
    'tobacco', 'PepsiCo', 'consumer goods', 'Costco',
  ],
  industrials: [
    'manufacturing', 'aerospace', 'defense', 'Boeing', 'Caterpillar', 'construction',
    'logistics', 'railroad', 'infrastructure', 'supply chain', 'freight', 'automation',
  ],
  materials: [
    'mining', 'copper', 'steel', 'gold', 'lithium', 'chemicals', 'aluminum',
    'lumber', 'commodity', 'silver', 'iron ore', 'rare earth',
  ],
  'real-estate': [
    'housing', 'mortgage', 'REIT', 'property', 'real estate', 'commercial real estate',
    'home prices', 'rent', 'housing market', 'foreclosure', 'office space',
  ],
  utilities: [
    'utility', 'power grid', 'natural gas', 'electricity', 'water', 'nuclear power',
    'regulated', 'NextEra', 'power outage', 'clean energy',
  ],
  'communication-services': [
    'media', 'streaming', 'telecom', '5G', 'advertising', 'social media',
    'Disney', 'Netflix', 'Alphabet', 'TikTok', 'AT&T', 'Verizon', 'subscriber',
  ],
}

const INDEX_KEYWORDS: Record<string, string[]> = {
  sp500: ['S&P 500', 'SPX', 'US stocks', 'US market', 'large cap', 'Wall Street'],
  nasdaq: ['NASDAQ', 'tech stocks', 'QQQ', 'composite', 'growth stocks'],
  djia: ['Dow Jones', 'DJIA', 'blue chip', 'Dow', 'industrial average'],
  russell2000: ['Russell 2000', 'small cap', 'RUT', 'domestic economy'],
  ftse100: ['FTSE', 'London Stock Exchange', 'UK stocks', 'British market', 'LSE'],
  dax: ['DAX', 'German stocks', 'Frankfurt', 'Deutsche', 'German economy'],
  nikkei225: ['Nikkei', 'Japan stocks', 'Tokyo', 'TSE', 'Japanese market', 'yen'],
  hangseng: ['Hang Seng', 'Hong Kong', 'HKEX', 'China stocks', 'HSI'],
  tsx: ['TSX', 'Canada stocks', 'Toronto Stock Exchange', 'Canadian market'],
  eurostoxx50: ['Euro Stoxx', 'European stocks', 'Eurozone', 'EU market'],
}

function countMatches(text: string, keywords: string[]): number {
  const lower = text.toLowerCase()
  return keywords.reduce((count, kw) => count + (lower.includes(kw.toLowerCase()) ? 1 : 0), 0)
}

export interface TagResult {
  sectors: string[]  // sorted by relevance (highest match count first)
  indices: string[]
}

/**
 * Tag a news article with relevant sector and index slugs.
 * @param headline Article headline
 * @param summary  Article summary/description
 * @returns Object with matched sector slugs and index slugs
 */
export function tagArticle(headline: string, summary: string = ''): TagResult {
  const text = `${headline} ${summary}`

  // Score sectors
  const sectorScores: [string, number][] = Object.entries(SECTOR_KEYWORDS)
    .map(([slug, kws]) => [slug, countMatches(text, kws)] as [string, number])
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])

  // Score indices
  const indexSlugs: string[] = Object.entries(INDEX_KEYWORDS)
    .filter(([, kws]) => countMatches(text, kws) > 0)
    .map(([slug]) => slug)

  return {
    sectors: sectorScores.map(([slug]) => slug),
    indices: indexSlugs,
  }
}

/**
 * Detect sentiment from headline/summary keywords.
 */
export function detectSentiment(text: string): 'bullish' | 'bearish' | 'neutral' {
  const lower = text.toLowerCase()

  const bullishTerms = [
    'surge', 'rally', 'beat', 'profit', 'growth', 'record', 'upgrade', 'buy',
    'jump', 'soar', 'gain', 'rise', 'boost', 'strong', 'positive', 'outperform',
    'upside', 'exceeds', 'beats estimates', 'bullish', 'revenue growth',
  ]
  const bearishTerms = [
    'fall', 'drop', 'decline', 'miss', 'loss', 'cut', 'downgrade', 'sell',
    'plunge', 'crash', 'slump', 'recession', 'layoff', 'downside', 'warning',
    'underperform', 'below estimates', 'bearish', 'concern', 'fear', 'risk',
  ]

  const bullCount = bullishTerms.filter((t) => lower.includes(t)).length
  const bearCount = bearishTerms.filter((t) => lower.includes(t)).length

  if (bullCount > bearCount && bullCount >= 1) return 'bullish'
  if (bearCount > bullCount && bearCount >= 1) return 'bearish'
  return 'neutral'
}

/**
 * Detect if an article is breaking news based on recency and keywords.
 */
export function isBreaking(headline: string, publishedAt: string): boolean {
  const ageMs = Date.now() - new Date(publishedAt).getTime()
  const ageHours = ageMs / (1000 * 60 * 60)
  if (ageHours > 2) return false // only mark as breaking if < 2 hours old

  const breakingTerms = [
    'breaking', 'just in', 'alert', 'urgent', 'flash', 'developing',
    'live:', 'update:', 'exclusive',
  ]
  const lower = headline.toLowerCase()
  return breakingTerms.some((t) => lower.includes(t))
}
