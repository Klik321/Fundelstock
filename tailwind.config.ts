import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Terminal Luxe core backgrounds ──────────────────────────────────
        bg: {
          primary: '#0b0e17',
          surface: '#131722',
          'surface-hover': '#1c2030',
          elevated: '#1e2235',
          ticker: '#0d1019',
        },
        // ── Text hierarchy ───────────────────────────────────────────────────
        text: {
          primary: '#d1d4dc',
          secondary: '#787b86',
          tertiary: '#4a4e5e',
        },
        // ── Semantic accent colors ───────────────────────────────────────────
        accent: {
          green: '#26a69a',
          'green-bg': 'rgba(38,166,154,0.12)',
          'green-border': 'rgba(38,166,154,0.25)',
          red: '#ef5350',
          'red-bg': 'rgba(239,83,80,0.12)',
          'red-border': 'rgba(239,83,80,0.25)',
          blue: '#2962ff',
          'blue-hover': '#1e4fd9',
          'blue-bg': 'rgba(41,98,255,0.12)',
          'blue-border': 'rgba(41,98,255,0.25)',
          amber: '#ff9800',
          'amber-bg': 'rgba(255,152,0,0.12)',
          'amber-border': 'rgba(255,152,0,0.30)',
          purple: '#7c4dff',
          'purple-bg': 'rgba(124,77,255,0.12)',
        },
        // ── Borders ──────────────────────────────────────────────────────────
        border: {
          subtle: 'rgba(255,255,255,0.04)',
          medium: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.14)',
        },
      },

      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },

      borderRadius: {
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '28px',
        '4xl': '36px',
      },

      backdropBlur: {
        glass: '20px',
        heavy: '40px',
      },

      boxShadow: {
        glass: '0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        card: '0 2px 20px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(41,98,255,0.25)',
        'glow-blue': '0 0 24px rgba(41,98,255,0.3)',
        'glow-green': '0 0 20px rgba(38,166,154,0.25)',
        'glow-red': '0 0 20px rgba(239,83,80,0.25)',
        'glow-amber': '0 0 20px rgba(255,152,0,0.25)',
      },

      backgroundImage: {
        'gradient-mesh':
          "radial-gradient(ellipse at 20% 0%, rgba(41,98,255,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(124,77,255,0.04) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(38,166,154,0.03) 0%, transparent 60%)",
        'gradient-brand': 'linear-gradient(135deg, #2962ff 0%, #7c4dff 100%)',
        'gradient-green-fade': 'linear-gradient(135deg, rgba(38,166,154,0.15) 0%, transparent 100%)',
        'gradient-card-border':
          'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
      },

      animation: {
        'pulse-dot': 'pulseDot 1.5s ease-in-out infinite',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'fade-in': 'fadeIn 0.35s ease-out forwards',
        ticker: 'ticker 60s linear infinite',
        shimmer: 'shimmer 1.6s ease-in-out infinite',
        float1: 'float1 18s ease-in-out infinite',
        float2: 'float2 24s ease-in-out infinite',
        float3: 'float3 20s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
      },

      keyframes: {
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '0.5' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float1: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '25%': { transform: 'translate(40px, -30px) scale(1.05)' },
          '50%': { transform: 'translate(20px, 20px) scale(0.97)' },
          '75%': { transform: 'translate(-25px, -15px) scale(1.03)' },
        },
        float2: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-35px, 25px) scale(1.04)' },
          '66%': { transform: 'translate(30px, -20px) scale(0.96)' },
        },
        float3: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(20px, -35px) scale(1.06)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}

export default config
