export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bistro-bg': '#0a0a0a',
        'bistro-text': '#E3DCC7',
        'bistro-green': '#0C5C3E',
        'bistro-red': '#CF0000',
        'bistro-red-dark': '#5D161A',
        'bistro-red-bright': '#CB1B3A',
      },
      fontFamily: {
        'serif': ['"Cormorant Garamond"', 'serif'],
        'sans': ['"Geist Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}