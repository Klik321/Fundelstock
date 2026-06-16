import { ImageResponse } from 'next/og'

export const alt = 'Fundelstock — Real-Time Market-Moving News for Traders'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Branded social card, generated at build/request time (no binary asset to ship).
// Note: next/og (satori) requires display:flex on every element with >1 child.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0b0e17',
          backgroundImage:
            'radial-gradient(ellipse at 18% 0%, rgba(41,98,255,0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 100%, rgba(38,166,154,0.12) 0%, transparent 55%)',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'rgba(41,98,255,0.15)',
              border: '1px solid rgba(41,98,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2962ff',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            ↗
          </div>
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, color: '#d1d4dc' }}>
            <span>Fundel</span>
            <span style={{ color: '#2962ff' }}>stock</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, color: '#d1d4dc', letterSpacing: '-0.02em' }}>
            Market-Moving News,
          </div>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, color: '#d1d4dc', letterSpacing: '-0.02em' }}>
            <span>Organized For&nbsp;</span>
            <span style={{ color: '#2962ff' }}>Traders.</span>
          </div>
          <div style={{ display: 'flex', fontSize: 28, color: '#868d9b', marginTop: 8 }}>
            Live financial headlines by GICS sector &amp; global index.
          </div>
        </div>

        {/* Footer chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {['11 Sectors', '10 Indices', 'Live Sentiment'].map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                fontSize: 22,
                color: '#868d9b',
                padding: '8px 18px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {label}
            </div>
          ))}
          <div style={{ display: 'flex', marginLeft: 'auto', fontSize: 24, color: '#2962ff', fontWeight: 600 }}>
            fundlestock.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
