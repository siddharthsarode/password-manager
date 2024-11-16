/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#090B11",
        "primary": "#3C3BFF",
        "secondary": "#212226",
        "light": "#535867",
      }
    },
  },
  plugins: [],
}

