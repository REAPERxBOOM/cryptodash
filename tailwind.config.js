/** @type {import('tailwindcss').Config} */
import withMt from '@material-tailwind/html/utils/withMT'

module.exports = withMt({
  content: ["./index.html"],
  theme: {
    extend: {},
  },
  plugins: [],
})

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {}
    }
  },
  plugins: [require("tailwindcss-animate")],
}