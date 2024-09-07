/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'office':"url('/assets/images/office.png')"
      }
    },
  },
  plugins: [],
}

