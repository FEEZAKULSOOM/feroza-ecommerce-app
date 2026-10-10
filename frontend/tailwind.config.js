/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- Scans all JSX files in src
  ],
  theme: {
    extend: {
      colors: {
        firoza: {
          DEFAULT: '#00A896', // Custom Deep Turquoise color
          dark: '#028090',
        }
      }
    },
  },
  plugins: [],
}