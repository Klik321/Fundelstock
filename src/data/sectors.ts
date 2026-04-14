import type { SectorData } from '@/types/sector'

export const SECTORS: SectorData[] = [
  {
    name: 'Technology',
    slug: 'technology',
    etf: 'XLK',
    tvSymbol: 'AMEX:XLK',
    iconName: 'Cpu',
    color: '#2962ff',
    description:
      'Software, semiconductors, cloud computing, AI, and hardware companies driving the digital economy.',
    keywords: [
      'tech', 'technology', 'software', 'AI', 'artificial intelligence', 'semiconductor',
      'chip', 'cloud', 'SaaS', 'Apple', 'Microsoft', 'Google', 'NVIDIA', 'Meta',
      'Amazon AWS', 'cybersecurity', 'data center', 'ChatGPT', 'OpenAI',
    ],
    stocks: [
      { symbol: 'AAPL', name: 'Apple', tvSymbol: 'NASDAQ:AAPL' },
      { symbol: 'MSFT', name: 'Microsoft', tvSymbol: 'NASDAQ:MSFT' },
      { symbol: 'NVDA', name: 'NVIDIA', tvSymbol: 'NASDAQ:NVDA' },
      { symbol: 'GOOGL', name: 'Alphabet', tvSymbol: 'NASDAQ:GOOGL' },
      { symbol: 'META', name: 'Meta', tvSymbol: 'NASDAQ:META' },
      { symbol: 'AVGO', name: 'Broadcom', tvSymbol: 'NASDAQ:AVGO' },
    ],
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    etf: 'XLV',
    tvSymbol: 'AMEX:XLV',
    iconName: 'Heart',
    color: '#26a69a',
    description:
      'Pharmaceuticals, biotechnology, medical devices, hospitals, and health insurance companies.',
    keywords: [
      'pharma', 'biotech', 'FDA', 'drug', 'hospital', 'medical', 'vaccine',
      'clinical trial', 'health', 'therapeutic', 'Pfizer', 'Moderna', 'Eli Lilly',
      'J&J', 'UnitedHealth', 'drug approval', 'GLP-1', 'Ozempic',
    ],
    stocks: [
      { symbol: 'LLY', name: 'Eli Lilly', tvSymbol: 'NYSE:LLY' },
      { symbol: 'UNH', name: 'UnitedHealth', tvSymbol: 'NYSE:UNH' },
      { symbol: 'JNJ', name: 'Johnson & Johnson', tvSymbol: 'NYSE:JNJ' },
      { symbol: 'ABBV', name: 'AbbVie', tvSymbol: 'NYSE:ABBV' },
      { symbol: 'PFE', name: 'Pfizer', tvSymbol: 'NYSE:PFE' },
      { symbol: 'MRK', name: 'Merck', tvSymbol: 'NYSE:MRK' },
    ],
  },
  {
    name: 'Financials',
    slug: 'financials',
    etf: 'XLF',
    tvSymbol: 'AMEX:XLF',
    iconName: 'Landmark',
    color: '#ff9800',
    description:
      'Banks, investment firms, insurance, fintech, and payment processors at the heart of global finance.',
    keywords: [
      'bank', 'Fed', 'Federal Reserve', 'interest rate', 'JPMorgan', 'Goldman',
      'insurance', 'lending', 'mortgage', 'credit', 'loan', 'fintech', 'payments',
      'inflation', 'rate hike', 'rate cut', 'Wall Street', 'banking crisis',
    ],
    stocks: [
      { symbol: 'JPM', name: 'JPMorgan Chase', tvSymbol: 'NYSE:JPM' },
      { symbol: 'BAC', name: 'Bank of America', tvSymbol: 'NYSE:BAC' },
      { symbol: 'GS', name: 'Goldman Sachs', tvSymbol: 'NYSE:GS' },
      { symbol: 'V', name: 'Visa', tvSymbol: 'NYSE:V' },
      { symbol: 'BRK.B', name: 'Berkshire Hathaway', tvSymbol: 'NYSE:BRK.B' },
      { symbol: 'MS', name: 'Morgan Stanley', tvSymbol: 'NYSE:MS' },
    ],
  },
  {
    name: 'Energy',
    slug: 'energy',
    etf: 'XLE',
    tvSymbol: 'AMEX:XLE',
    iconName: 'Zap',
    color: '#ef5350',
    description:
      'Oil, natural gas, refiners, pipelines, and renewable energy companies powering the global economy.',
    keywords: [
      'oil', 'gas', 'OPEC', 'crude', 'renewable', 'solar', 'wind', 'ExxonMobil',
      'Chevron', 'petroleum', 'pipeline', 'drilling', 'LNG', 'energy transition',
      'oil prices', 'barrel', 'shale', 'offshore',
    ],
    stocks: [
      { symbol: 'XOM', name: 'ExxonMobil', tvSymbol: 'NYSE:XOM' },
      { symbol: 'CVX', name: 'Chevron', tvSymbol: 'NYSE:CVX' },
      { symbol: 'COP', name: 'ConocoPhillips', tvSymbol: 'NYSE:COP' },
      { symbol: 'SLB', name: 'SLB', tvSymbol: 'NYSE:SLB' },
      { symbol: 'EOG', name: 'EOG Resources', tvSymbol: 'NYSE:EOG' },
      { symbol: 'PSX', name: 'Phillips 66', tvSymbol: 'NYSE:PSX' },
    ],
  },
  {
    name: 'Consumer Discretionary',
    slug: 'consumer-discretionary',
    etf: 'XLY',
    tvSymbol: 'AMEX:XLY',
    iconName: 'ShoppingBag',
    color: '#7c4dff',
    description:
      'Retail, e-commerce, automotive, leisure, and luxury companies tied to consumer spending cycles.',
    keywords: [
      'retail', 'luxury', 'auto', 'Tesla', 'Amazon', 'Nike', 'consumer spending',
      'e-commerce', 'travel', 'restaurant', 'holiday sales', 'consumer confidence',
      'discretionary', 'apparel',
    ],
    stocks: [
      { symbol: 'AMZN', name: 'Amazon', tvSymbol: 'NASDAQ:AMZN' },
      { symbol: 'TSLA', name: 'Tesla', tvSymbol: 'NASDAQ:TSLA' },
      { symbol: 'HD', name: 'Home Depot', tvSymbol: 'NYSE:HD' },
      { symbol: 'NKE', name: 'Nike', tvSymbol: 'NYSE:NKE' },
      { symbol: 'SBUX', name: 'Starbucks', tvSymbol: 'NASDAQ:SBUX' },
      { symbol: 'MCD', name: "McDonald's", tvSymbol: 'NYSE:MCD' },
    ],
  },
  {
    name: 'Consumer Staples',
    slug: 'consumer-staples',
    etf: 'XLP',
    tvSymbol: 'AMEX:XLP',
    iconName: 'ShoppingCart',
    color: '#4caf50',
    description:
      'Food, beverages, household goods, and tobacco companies that remain resilient through economic cycles.',
    keywords: [
      'food', 'beverage', 'grocery', 'Walmart', 'Procter', 'Coca-Cola', 'household',
      'tobacco', 'consumer staples', 'PepsiCo', 'Nestlé', 'Unilever', 'consumer goods',
    ],
    stocks: [
      { symbol: 'WMT', name: 'Walmart', tvSymbol: 'NYSE:WMT' },
      { symbol: 'PG', name: 'Procter & Gamble', tvSymbol: 'NYSE:PG' },
      { symbol: 'KO', name: 'Coca-Cola', tvSymbol: 'NYSE:KO' },
      { symbol: 'PEP', name: 'PepsiCo', tvSymbol: 'NASDAQ:PEP' },
      { symbol: 'COST', name: 'Costco', tvSymbol: 'NASDAQ:COST' },
      { symbol: 'PM', name: 'Philip Morris', tvSymbol: 'NYSE:PM' },
    ],
  },
  {
    name: 'Industrials',
    slug: 'industrials',
    etf: 'XLI',
    tvSymbol: 'AMEX:XLI',
    iconName: 'Factory',
    color: '#607d8b',
    description:
      'Aerospace, defense, machinery, transportation, and logistics companies driving global infrastructure.',
    keywords: [
      'manufacturing', 'aerospace', 'defense', 'Boeing', 'Caterpillar', 'construction',
      'logistics', 'railroad', 'infrastructure', 'supply chain', 'freight', 'automation',
    ],
    stocks: [
      { symbol: 'CAT', name: 'Caterpillar', tvSymbol: 'NYSE:CAT' },
      { symbol: 'BA', name: 'Boeing', tvSymbol: 'NYSE:BA' },
      { symbol: 'HON', name: 'Honeywell', tvSymbol: 'NASDAQ:HON' },
      { symbol: 'RTX', name: 'RTX Corp', tvSymbol: 'NYSE:RTX' },
      { symbol: 'UPS', name: 'UPS', tvSymbol: 'NYSE:UPS' },
      { symbol: 'GE', name: 'GE Aerospace', tvSymbol: 'NYSE:GE' },
    ],
  },
  {
    name: 'Materials',
    slug: 'materials',
    etf: 'XLB',
    tvSymbol: 'AMEX:XLB',
    iconName: 'Gem',
    color: '#795548',
    description:
      'Mining, metals, chemicals, packaging, and construction materials companies.',
    keywords: [
      'mining', 'copper', 'steel', 'gold', 'lithium', 'chemicals', 'aluminum',
      'lumber', 'commodity', 'materials', 'silver', 'iron ore', 'rare earth',
    ],
    stocks: [
      { symbol: 'LIN', name: 'Linde', tvSymbol: 'NASDAQ:LIN' },
      { symbol: 'APD', name: 'Air Products', tvSymbol: 'NYSE:APD' },
      { symbol: 'NEM', name: 'Newmont', tvSymbol: 'NYSE:NEM' },
      { symbol: 'FCX', name: 'Freeport-McMoRan', tvSymbol: 'NYSE:FCX' },
      { symbol: 'ECL', name: 'Ecolab', tvSymbol: 'NYSE:ECL' },
      { symbol: 'ALB', name: 'Albemarle', tvSymbol: 'NYSE:ALB' },
    ],
  },
  {
    name: 'Real Estate',
    slug: 'real-estate',
    etf: 'XLRE',
    tvSymbol: 'AMEX:XLRE',
    iconName: 'Building2',
    color: '#f06292',
    description:
      'REITs and real estate companies spanning commercial, residential, data centers, and industrial properties.',
    keywords: [
      'housing', 'mortgage', 'REIT', 'property', 'real estate', 'commercial real estate',
      'home prices', 'rent', 'housing market', 'foreclosure', 'landlord', 'office space',
    ],
    stocks: [
      { symbol: 'AMT', name: 'American Tower', tvSymbol: 'NYSE:AMT' },
      { symbol: 'PLD', name: 'Prologis', tvSymbol: 'NYSE:PLD' },
      { symbol: 'EQIX', name: 'Equinix', tvSymbol: 'NASDAQ:EQIX' },
      { symbol: 'WELL', name: 'Welltower', tvSymbol: 'NYSE:WELL' },
      { symbol: 'DLR', name: 'Digital Realty', tvSymbol: 'NYSE:DLR' },
      { symbol: 'CCI', name: 'Crown Castle', tvSymbol: 'NYSE:CCI' },
    ],
  },
  {
    name: 'Utilities',
    slug: 'utilities',
    etf: 'XLU',
    tvSymbol: 'AMEX:XLU',
    iconName: 'Lightbulb',
    color: '#00bcd4',
    description:
      'Electric, gas, and water utilities providing essential services and stable dividends.',
    keywords: [
      'utility', 'power grid', 'natural gas', 'electricity', 'water', 'nuclear power',
      'regulated', 'dividend', 'clean energy', 'NextEra', 'power outage',
    ],
    stocks: [
      { symbol: 'NEE', name: 'NextEra Energy', tvSymbol: 'NYSE:NEE' },
      { symbol: 'DUK', name: 'Duke Energy', tvSymbol: 'NYSE:DUK' },
      { symbol: 'SO', name: 'Southern Company', tvSymbol: 'NYSE:SO' },
      { symbol: 'D', name: 'Dominion Energy', tvSymbol: 'NYSE:D' },
      { symbol: 'AEP', name: 'American Electric Power', tvSymbol: 'NASDAQ:AEP' },
      { symbol: 'EXC', name: 'Exelon', tvSymbol: 'NASDAQ:EXC' },
    ],
  },
  {
    name: 'Communication Services',
    slug: 'communication-services',
    etf: 'XLC',
    tvSymbol: 'AMEX:XLC',
    iconName: 'Radio',
    color: '#ab47bc',
    description:
      'Telecom, media, social networks, and streaming services connecting billions worldwide.',
    keywords: [
      'media', 'streaming', 'telecom', '5G', 'advertising', 'social media',
      'Disney', 'Netflix', 'Alphabet', 'Meta', 'TikTok', 'AT&T', 'Verizon',
      'content', 'subscriber', 'broadcast',
    ],
    stocks: [
      { symbol: 'GOOGL', name: 'Alphabet', tvSymbol: 'NASDAQ:GOOGL' },
      { symbol: 'META', name: 'Meta', tvSymbol: 'NASDAQ:META' },
      { symbol: 'NFLX', name: 'Netflix', tvSymbol: 'NASDAQ:NFLX' },
      { symbol: 'DIS', name: 'Disney', tvSymbol: 'NYSE:DIS' },
      { symbol: 'T', name: 'AT&T', tvSymbol: 'NYSE:T' },
      { symbol: 'VZ', name: 'Verizon', tvSymbol: 'NYSE:VZ' },
    ],
  },
]

export const getSectorBySlug = (slug: string): SectorData | undefined =>
  SECTORS.find((s) => s.slug === slug)
