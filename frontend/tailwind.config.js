/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'okaida' : '#272822',
        'oakida-bg' : '#00000059',
      }
    },
  },
  plugins: [],
}