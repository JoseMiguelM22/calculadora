/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 10px #a855f7, 0 0 20px #a855f7' },
          'to': { boxShadow: '0 0 20px #22d3ee, 0 0 40px #22d3ee' },
        }
      }
    },
  },
  plugins: [],
}