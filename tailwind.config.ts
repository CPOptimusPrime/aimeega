import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        body: ['var(--font-instrument)', 'sans-serif'],
      },
      colors: {
        bg: '#06060a',
        surface: '#0d0d14',
        surface2: '#13131e',
        border: '#1e1e30',
        border2: '#28284a',
        // Aimeega brand — logo gradient purple→blue
        brand: '#7b2fff',
        'brand-mid': '#5b7fff',
        'brand-light': '#00b4ff',
        red: '#ff3d6b',
        blue: '#00b4ff',
        green: '#00d48a',
        purple: '#7b2fff',
        orange: '#ff9900',
        muted: '#70708a',
        dim: '#2a2a40',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #7b2fff 0%, #00b4ff 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(123,47,255,0.15) 0%, rgba(0,180,255,0.08) 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease forwards',
        'ticker': 'ticker 28s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
