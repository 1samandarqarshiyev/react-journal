/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js,jsx}", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        virgo: ["Virgo", "sans-serif"],
        code: ["SourceCode", "mono"],
      },
    },
  },
  plugins: [],
};
