/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0a0e27',
        'cyber-secondary': '#151935',
        'cyber-cyan': '#00f0ff',
        'cyber-purple': '#b537f2',
        'cyber-success': '#00ff88',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
