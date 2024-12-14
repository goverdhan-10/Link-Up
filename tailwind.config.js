/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      
      },
    },
    extend: {
      colors: {
         'primary-500': '#128C7E',  // WhatsApp's signature green
  'primary-600': '#075E54',  // A darker variant for depth
  'secondary-500': '#25D366', // A lighter, vibrant green for accents or secondary UI elements
  'off-white': '#E4F2EB',    // A soft, off-white for background or content areas
  'red': '#FF5A5A',          // A bold red for attention and alerts
  'dark-1': '#000000',       // A deep, dark base color
  'dark-2': '#0A0A0A',       // Slightly lighter dark tone
  'dark-3': '#121212',       // Medium dark for card backgrounds or borders
  'dark-4': '#1C1C1E',       // A darker shade for more subdued elements
  'light-1': '#FFFFFF',      // Pure white for UI elements
  'light-2': '#F4F7F6',      // Light gray for less prominent UI elements
  'light-3': '#B5B8B9',      // Soft gray for text and less important details
  'light-4': '#8A8E8C'  
      },
      screens: {
        'xs': '480px',
      
      },
      width: {
        '420': '420px',
        '465': '465px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],

      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};