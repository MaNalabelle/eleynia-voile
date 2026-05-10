import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'eleynia-emerald-deep': '#0E2A1F',
        'eleynia-emerald':      '#1E5E3F',
        'eleynia-gold':         '#D4A24C',
        'eleynia-gold-light':   '#E8C57A',
        'eleynia-saphir':       '#1E3A8A',
        parchment:              '#F5EDD8',
        'parchment-dark':       '#E8DDB8',
        ink:                    '#0B0F0C',
        'white-glow':           '#FAF7F0',
      },
      fontFamily: {
        display:  ['var(--font-cinzel)', 'serif'],
        subtitle: ['var(--font-cormorant)', 'serif'],
        body:     ['var(--font-lora)', 'serif'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 7vw, 5.5rem)', { lineHeight: '1.1' }],
        'h1':      ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '1.2' }],
        'h2':      ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.25' }],
        'h3':      ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.3' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.7' }],
        'small':   ['0.9375rem', { lineHeight: '1.6' }],
        'caption': ['0.8125rem', { lineHeight: '1.5' }],
      },
      borderRadius: {
        DEFAULT: '6px',
        sm:      '4px',
        md:      '6px',
        lg:      '8px',
        xl:      '8px',
        '2xl':   '8px',
        full:    '8px',
      },
      boxShadow: {
        'gold-glow':    '0 0 24px rgba(212, 162, 76, 0.35)',
        'gold-glow-lg': '0 0 48px rgba(212, 162, 76, 0.45)',
        'emerald-glow': '0 0 32px rgba(30, 94, 63, 0.65)',
      },
      keyframes: {
        'gold-pulse': {
          '0%, 100%': { boxShadow: '0 0 12px rgba(212, 162, 76, 0.25)' },
          '50%':       { boxShadow: '0 0 36px rgba(212, 162, 76, 0.65)' },
        },
        'mist-drift': {
          '0%':   { transform: 'translateX(-5%) scaleX(1.05)' },
          '100%': { transform: 'translateX(5%) scaleX(0.95)' },
        },
        'scroll-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(8px)' },
        },
        'seal-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 6px rgba(30, 94, 63, 0.4))' },
          '50%':       { filter: 'drop-shadow(0 0 18px rgba(30, 94, 63, 0.9))' },
        },
      },
      animation: {
        'gold-pulse':    'gold-pulse 2s ease-in-out infinite',
        'mist-drift':    'mist-drift 12s ease-in-out infinite alternate',
        'scroll-bounce': 'scroll-bounce 2s ease-in-out infinite',
        'seal-glow':     'seal-glow 2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        eleynia: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
