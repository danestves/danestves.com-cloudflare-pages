const defaultTheme = require(`tailwindcss/defaultTheme`)

module.exports = {
  purge: {
    content: [
      './src/components/**/*.tsx',
      './src/components/**/*.ts',
      './src/pages/**/*.tsx',
      './src/pages/**/*.ts',
    ],
    options: {
      whitelist: [
        `z-100`,
        `embed-responsive`,
        `aspect-ratio-square`,
        `aspect-ratio-16/9`,
        `aspect-ratio-4/3`,
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      aspectRatio: {
        none: 0,
        square: [1, 1],
        '16/9': [16, 9],
        '4/3': [4, 3],
        '21/9': [21, 9],
      },
      backdropFilter: {
        none: `none`,
        blur: `blur(20px)`,
        'blur-hover': 'blur(10px)',
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
        tertiary: `#2F80ED`,
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
      maxHeight: {
        0: `0`,
        64: `16rem`,
      },
      minHeight: {
        20: `5rem`,
      },
      textOpacity: {
        90: `0.90`,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '& h1, & h2, & h3, & h4': {
              color: theme(`colors.white`),
            },
            a: {
              color: theme(`colors.primary`),
              transition: theme(`transitionProperty.all`),
              transitionDuration: theme(`transitionDuration.200`),

              '&:hover': {
                color: theme(`colors.primary`),
                opacity: theme(`opacity.75`),
              },
            },
            strong: {
              color: theme(`colors.white`),
            },
            blockquote: {
              color: theme(`colors.gray.400`),
            },
            code: {
              padding: `${theme(`padding.1`)} ${theme(`padding.2`)}`,
              fontSize: theme(`fontSize.sm`),
              fontWeight: 400,
              color: theme(`colors.gray.100`),
              whiteSpace: theme(`whitespace.normal`),
              borderRadius: theme(`borderRadius.default`),
              fontFamily: `"Source Code Pro", ${[...defaultTheme.fontFamily.mono]}`,
              backgroundColor: `rgb(39, 40, 34)`,

              '&:after, &:before': {
                content: `"" !important`,
              },
            },
            ol: {
              '&>li:before': {
                color: `${theme(`colors.white`)} !important`,
              },
            },
          },
        },
      }),
      zIndex: {
        100: 100,
      },
    },
  },
  variants: {
    extend: {
      aspectRatio: [`responsive`],
      backgroundColor: [`responsive`, `hover`, `group-hover`],
      backdropFilter: [`responsive`, `hover`],
      borderColor: [`responsive`, `hover`, `focus`, `first`, `last`],
      borderWidth: [`responsive`, `hover`, `focus`, `first`, `last`],
      boxShadow: [`responsive`, `hover`, `focus`],
      filter: [`responsive`],
      fontSize: [`group-hover`],
      margin: [`responsive`, `first`, `last`, `group-hover`],
      opacity: [`responsive`, `hover`, `focus`, `group-hover`],
      padding: [`responsive`],
      placeholderColor: [`responsive`, `focus`],
      scale: [`group-hover`],
      space: [`hover`, `group-hover`],
      textColor: [`responsive`, `hover`, `group-hover`],
    },
  },
  plugins: [
    require(`@tailwindcss/typography`),
    require(`tailwindcss-filters`),
    require(`tailwindcss-responsive-embed`),
    require(`tailwindcss-aspect-ratio`),
  ],
}
