/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#EBA63F",
        secondary: "#3CBCC3",
        neutral: "#F7F4E9",
        accent: "#438945",
        danger: "#E40C2B",
      },
      fontFamily: {
        oleo: ["Oleo Script", "cursive"],
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  variants: {
    opacity: ["responsive", "hover", "focus", "disabled"],
  },
  plugins: [],
};
