/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0d0d0d",
        secondary: "#404040",
        tertiary: "#bfbfbf",
      },
    },
  },
  plugins: [],
};
