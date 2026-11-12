import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sap: {
          50: '#eef5ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#0a6ed1',
          600: '#0854a0',
          700: '#0b4d8f',
          800: '#0d3f73',
          900: '#0a2f56',
          950: '#061d36',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        popover: 'hsl(var(--popover))',
      },
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
          'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
          'Helvetica Neue', 'Arial', 'sans-serif',
        ],
        mono: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        panel: '0 1px 2px 0 rgba(0,0,0,.04), 0 1px 6px -1px rgba(0,0,0,.06)',
        float: '0 8px 28px -8px rgba(10,47,86,.24)',
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.75rem',
      },
      typography: {},
    },
  },
  plugins: [],
};

export default config;
