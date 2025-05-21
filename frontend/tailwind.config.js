/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-red-500',
    'bg-yellow-400',
    'bg-green-500'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}