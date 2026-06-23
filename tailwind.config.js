/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F1720',
        surface: '#1B2430',
        border: '#2F3B4C',
        primary: {
          DEFAULT: '#D97706',
          hover: '#B45309',
        },
        secondary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
        },
        success: '#15803D',
        warning: '#CA8A04',
        error: '#B91C1C',
        text: {
          primary: '#F3F4F6',
          secondary: '#9CA3AF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
