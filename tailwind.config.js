// eslint-disable-next-line
const defaultTheme = require(`tailwindcss/defaultTheme`);

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: [`./src/**/*.{js,jsx,ts,tsx}`],
    options: {
      whitelist: [`z-100`],
    },
  },
  theme: {
    extend: {
      backdropFilter: {
        none: `none`,
        blur: `blur(20px)`,
      },
      borderRadius: {
        '2xl': `2rem`,
      },
      borderWidth: {
        10: `10px`,
      },
      colors: {
        primary: `#00C389`,
        secondary: `#071D49`,
        blue: `#2F80ED`,
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
        '8xl': `6rem`,
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
      minHeight: {
        20: `5rem`,
      },
      textOpacity: {
        90: `0.90`,
      },
      zIndex: {
        100: 100,
      },
    },
  },
  variants: {
    backgroundColor: [`responsive`, `hover`, `group-hover`],
    backdropFilter: [`responsive`],
    borderColor: [`responsive`, `hover`, `focus`, `first`, `last`],
    borderWidth: [`responsive`, `hover`, `focus`, `first`, `last`],
    boxShadow: [`responsive`, `hover`, `focus`],
    filter: [`responsive`],
    margin: [`responsive`, `first`, `last`],
    opacity: [`responsive`, `hover`, `focus`, `group-hover`],
    padding: [`responsive`],
    placeholderColor: [`responsive`, `focus`],
    textColor: [`responsive`, `hover`, `group-hover`],
  },
  corePlugins: {},
  plugins: [require(`@tailwindcss/ui`), require(`@tailwindcss/typography`), require(`tailwindcss-filters`)],
};
