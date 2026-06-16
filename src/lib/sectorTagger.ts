/**
 * Automatic sector and index tagging for news articles.
 * Scans headline + summary against keyword dictionaries and returns
 * matching sector slugs (sorted by match count) and index slugs.
 */

const SECTOR_KEYWORDS: Record<string, string[]> = {
  technology: [
    'tech', 'technology', 'software', 'AI', 'artificial intelligence', 'semiconductor',
    'chip', 'cloud', 'SaaS', 'Apple', 'Microsoft', 'Google', 'NVIDIA', 'Meta',
    'cybersecurity', 'data center', 'ChatGPT', 'OpenAI', 'machine learning', 'Broadcom',
  ],
  healthcare: [
    'pharma', 'biotech', 'FDA', 'drug', 'hospital', 'medical', 'vaccine',
    'clinical trial', 'healthcare', 'therapeutic', 'Pfizer', 'Moderna',
    'Eli Lilly', 'GLP-1', 'Ozempic', 'drug approval', 'UnitedHealth', 'Merck', 'AbbVie',
  ],
  financials: [
    'bank', 'Fed', 'Federal Reserve', 'interest rate', 'JPMorgan', 'Goldman',
    'insurance', 'lending', 'mortgage', 'credit', 'loan', 'fintech', 'payments',
    'inflation', 'rate hike', 'rate cut', 'Wall Street', 'banking', 'Visa', 'Mastercard',
  ],
  energy: [
    'oil', 'gas', 'OPEC', 'crude', 'renewable', 'solar', 'wind', 'ExxonMobil',
    'Chevron', 'petroleum', 'pipeline', 'drilling', 'LNG', 'energy transition',
    'oil prices', 'barrel', 'shale', 'offshore', 'ConocoPhillips',
  ],
  'consumer-discretionary': [
    'retail', 'luxury', 'auto', 'Tesla', 'Amazon', 'Nike', 'consumer spending',
    'e-commerce', 'travel', 'restaurant', 'holiday sales', 'consumer confidence',
    'Home Depot', 'Starbucks', 'apparel', 'automaker',
  ],
  'consumer-staples': [
    'food', 'beverage', 'grocery', 'Walmart', 'Procter', 'Coca-Cola', 'household',
    'tobacco', 'PepsiCo', 'consumer goods', 'Costco', 'Nestle', 'Nestlé', 'Unilever',
    'Kraft Heinz', 'General Mills', 'Mondelez', 'Monster Beverage', 'Constellation Brands',
    'Hormel', 'Philip Morris', 'food inflation', 'consumer staples',
  ],
  industrials: [
    'manufacturing', 'aerospace', 'defense', 'Boeing', 'Caterpillar', 'construction',
    'logistics', 'railroad', 'infrastructure', 'supply chain', 'freight', 'automation',
    'Honeywell', 'GE Aerospace', 'UPS', 'industrial production',
  ],
  materials: [
    'mining', 'copper', 'steel', 'gold', 'lithium', 'chemicals', 'aluminum',
    'lumber', 'commodity', 'silver', 'iron ore', 'rare earth', 'Newmont',
    'Freeport-McMoRan', 'Linde', 'Air Products', 'Albemarle', 'Nucor', 'US Steel',
    'mining production', 'ore prices', 'smelter', 'refining',
  ],
  'real-estate': [
    'housing', 'mortgage', 'REIT', 'property', 'real estate', 'commercial real estate',
    'home prices', 'rent', 'housing market', 'foreclosure', 'office space',
    'residential property', 'office building', 'data center REIT', 'American Tower',
    'Prologis', 'Equinix', 'Welltower', 'homebuilder', 'home sales', 'vacancy rate',
    'commercial property',
  ],
  utilities: [
    'utility', 'utilities', 'power grid', 'natural gas', 'electricity', 'water', 'nuclear power',
    'regulated', 'NextEra', 'power outage', 'clean energy', 'electric utility',
    'power company', 'Duke Energy', 'Southern Company', 'Dominion Energy',
    'American Electric Power', 'transmission', 'grid', 'rate increase', 'dividend stock',
  ],
  'communication-services': [
    'media', 'streaming', 'telecom', '5G', 'advertising', 'social media',
    'Disney', 'Netflix', 'Alphabet', 'TikTok', 'AT&T', 'Verizon', 'subscriber',
    'broadcast', 'content', 'box office',
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

// ── Sentiment classification ─────────────────────────────────────────────────
//
// A weighted, word-boundary keyword classifier. Strong signals (unambiguous
// market moves) carry weight 2; softer signals weight 1. A clear margin is
// required so genuinely mixed or quiet headlines stay neutral. The bullish and
// bearish vocabularies are deliberately balanced in size and weighting to avoid
// the old bias that collapsed almost everything to neutral/bearish.

type WeightedTerm = { re: RegExp; weight: number }

function compile(terms: [string, number][]): WeightedTerm[] {
  return terms.map(([term, weight]) => ({
    // word-boundary match avoids false hits (e.g. "cut" inside "executive")
    re: new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'),
    weight,
  }))
}

const BULLISH_TERMS = compile([
  // strong
  ['surge', 2], ['surges', 2], ['soar', 2], ['soars', 2], ['rally', 2], ['rallies', 2],
  ['record high', 2], ['all-time high', 2], ['beats estimates', 2], ['beat estimates', 2],
  ['tops estimates', 2], ['beats expectations', 2], ['upgrade', 2], ['upgraded', 2],
  ['skyrocket', 2], ['jumps', 2], ['breakout', 2], ['outperform', 2], ['raises guidance', 2],
  ['raised guidance', 2], ['bullish', 2], ['buyback', 2], ['record profit', 2],
  // weak
  ['gain', 1], ['gains', 1], ['rise', 1], ['rises', 1], ['rose', 1], ['higher', 1],
  ['climb', 1], ['climbs', 1], ['growth', 1], ['profit', 1], ['profits', 1], ['strong', 1],
  ['beat', 1], ['boost', 1], ['boosts', 1], ['optimistic', 1], ['recovery', 1], ['rebound', 1],
  ['rebounds', 1], ['positive', 1], ['expand', 1], ['expands', 1], ['upside', 1], ['demand', 1],
  ['record', 1], ['wins', 1], ['approval', 1], ['approved', 1], ['raised', 1],
])

const BEARISH_TERMS = compile([
  // strong
  ['plunge', 2], ['plunges', 2], ['crash', 2], ['crashes', 2], ['collapse', 2], ['tumble', 2],
  ['tumbles', 2], ['plummet', 2], ['sell-off', 2], ['selloff', 2], ['misses estimates', 2],
  ['misses expectations', 2], ['downgrade', 2], ['downgraded', 2], ['bankruptcy', 2],
  ['recession', 2], ['slump', 2], ['slumps', 2], ['bearish', 2], ['layoff', 2], ['layoffs', 2],
  ['warns', 2], ['slashes', 2], ['default', 2],
  // weak
  ['fall', 1], ['falls', 1], ['fell', 1], ['drop', 1], ['drops', 1], ['decline', 1],
  ['declines', 1], ['lower', 1], ['loss', 1], ['losses', 1], ['weak', 1], ['weaker', 1],
  ['miss', 1], ['cut', 1], ['cuts', 1], ['concern', 1], ['concerns', 1], ['fear', 1],
  ['fears', 1], ['risk', 1], ['risks', 1], ['slows', 1], ['warning', 1], ['pressure', 1],
  ['sinks', 1], ['slide', 1], ['slides', 1], ['underperform', 1], ['downside', 1], ['probe', 1],
  ['lawsuit', 1], ['tariff', 1], ['tariffs', 1], ['shortfall', 1],
])

function scoreTerms(text: string, terms: WeightedTerm[]): number {
  return terms.reduce((sum, { re, weight }) => (re.test(text) ? sum + weight : sum), 0)
}

/**
 * Detect sentiment from a headline/summary using a weighted keyword model.
 */
export function detectSentiment(text: string): 'bullish' | 'bearish' | 'neutral' {
  const bull = scoreTerms(text, BULLISH_TERMS)
  const bear = scoreTerms(text, BEARISH_TERMS)

  if (bull > 0 && bull - bear >= 1) return 'bullish'
  if (bear > 0 && bear - bull >= 1) return 'bearish'
  return 'neutral'
}

/**
 * Detect if an article is breaking news based on recency and keywords.
 * Window widened to 6h so globally-sourced market news still qualifies.
 */
export function isBreaking(headline: string, publishedAt: string): boolean {
  const ageMs = Date.now() - new Date(publishedAt).getTime()
  const ageHours = ageMs / (1000 * 60 * 60)
  if (Number.isNaN(ageHours) || ageHours > 6) return false

  const breakingTerms = [
    'breaking', 'just in', 'alert', 'urgent', 'flash', 'developing',
    'live:', 'update:', 'exclusive', 'announces', 'plunge', 'surge', 'soar',
  ]
  const lower = headline.toLowerCase()
  return breakingTerms.some((t) => lower.includes(t))
}
