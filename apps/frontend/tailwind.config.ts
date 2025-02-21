import type { Config } from 'tailwindcss';

export default {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        green: {
          700: '#0D8112',
        },
        pink: {
          200: '#FFB8EF',
          300: '#E7AADA',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
