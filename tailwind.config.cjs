const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        surface: {
          DEFAULT: '#F5F5F7',
          dark: '#1E1E2F'
        },
        foreground: {
          DEFAULT: '#1E1E2F',
          light: '#F5F5F7'
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 15px 40px rgba(108, 99, 255, 0.15)'
      }
    }
  },
  plugins: []
}
