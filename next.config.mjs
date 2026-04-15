// @ts-check

/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://s3.tradingview.com https://www.tradingview.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob: https:;
  frame-src https://www.tradingview.com https://s3.tradingview.com;
  connect-src 'self' https://finnhub.io https://newsapi.org https://www.alphavantage.co https://gnews.io wss://www.tradingview.com wss://data.tradingview.com;
  media-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim()

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
]

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'static.finnhub.io' },
      { protocol: 'https', hostname: '**.reuters.com' },
      { protocol: 'https', hostname: '**.bloomberg.com' },
      { protocol: 'https', hostname: '**.cnbc.com' },
      { protocol: 'https', hostname: '**.wsj.com' },
      { protocol: 'https', hostname: '**.ft.com' },
      { protocol: 'https', hostname: '**.marketwatch.com' },
      { protocol: 'https', hostname: '**.businessinsider.com' },
      { protocol: 'https', hostname: '**.seekingalpha.com' },
      { protocol: 'https', hostname: '**.newsapi.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ]
  },

  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
}

export default nextConfig
