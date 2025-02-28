import type { Config } from 'tailwindcss';
import * as animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0D47A1',
          secondary: '#488ECB',
          accent: '#8BC53F',
          yellow: '#FFD814',
        },
        overlay: {
          white: 'rgba(255, 255, 255, 0.8)',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      width: {
        fixedScreen: '1300px',
      },
      boxShadow: {
        close: '0px 1px 0px 2px rgba(0,0,0,0.11)',
        spread: '0px 20px 52px 4px rgba(0,0,0,0.3)',
      },
      scaleX: {
        '0%': {
          transform: 'scaleX(0)',
        },

        '100%': {
          transform: 'scaleX(1)',
        },
      },
      animation: {
        scaleX: 'scaleX 200ms ease-in-out',
      },
      screens: {
        'nav-xl': '1050px',
        'nav-md': '780px',
      },
    },
  },
  //   plugins: [require('tailwindcss-animate')],
  plugins: [animate],
} satisfies Config;
