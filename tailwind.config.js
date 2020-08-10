// Dependencies
const defaultTheme = require(`tailwindcss/defaultTheme`);

module.exports = {
  purge: [`./src/**/*.{js,jsx,ts,tsx}`],
  theme: {
    extend: {
      backdropFilter: {
        none: `none`,
        blur: `blur(20px)`,
      },
      borderWidth: {
        10: `10px`,
      },
      colors: {
        primary: `#00C389`,
        secondary: `#071D49`,
      },
      container: {
        center: true,
      },
      filter: {
        none: `none`,
        grayscale: `grayscale(1)`,
        invert: `invert(1)`,
        sepia: `sepia(1)`,
      },
      fontSize: {
        '7xl': `5rem`,
      },
      fontFamily: {
        sans: [`Poppins`, ...defaultTheme.fontFamily.sans],
        mono: [`Source Code Pro`, ...defaultTheme.fontFamily.mono],
      },
      height: {
        88: `22rem`,
      },
      inset: {
        '1/2': `50%`,
      },
      zIndex: {
        '100': 100,
      },
    },
  },
  variants: {
    backgroundColor: [`responsive`, `hover`, `group-hover`, `dark`, `dark:hover`],
    backdropFilter: [`responsive`],
    borderColor: [`responsive`, `hover`, `focus`, `dark`, `dark:hover`],
    boxShadow: [`responsive`, `hover`, `focus`, `dark`, `dark:hover`],
    filter: [`responsive`],
    margin: [`responsive`, `first`, `last`],
    padding: [`responsive`],
    placeholderColor: [`responsive`, `focus`, `dark`],
    textColor: [`responsive`, `hover`, `group-hover`, `dark`, `dark:hover`],
  },
  corePlugins: {},
  plugins: [
    require(`@danestves/tailwindcss-darkmode`)(),
    require(`@tailwindcss/ui`),
    require(`@tailwindcss/typography`),
    require(`tailwindcss-filters`),
  ],
};
