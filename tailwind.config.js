/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'max-2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'max-xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'max-lg': {'max': '1200px'},
      // => @media (max-width: 1023px) { ... }

      'max-lp' : {'max': '1050px'},

      'max-md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'md' : {'min' : '767px'},

      'max-sm': {'max': '639px'},

      'max-xs': {'max': '540px'}
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
});
