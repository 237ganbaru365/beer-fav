/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#B5FED9",
        secondary: "#98CBB4",
        neutral: "#F4F7F3",
        dark: "#423B0B",
        darker: "#474935",
      },
      fontFamily: {
        nova: ["Ibarra Real Nova", "serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  variants: {
    opacity: ["responsive", "hover", "focus", "disabled"],
  },
  plugins: [],
};
