/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#3a5dd9" ,
        "secondary": "#3fc5ec",
      }
    }
  },
  plugins: [],
}