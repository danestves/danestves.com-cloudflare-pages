const { fontFamily, spacing } = require(`tailwindcss/defaultTheme`)

module.exports = {
  purge: {
    content: [
      './src/components/**/*.tsx',
      './src/components/**/*.ts',
      './src/pages/**/*.tsx',
      './src/pages/**/*.ts',
    ],
    options: {
      safelist: [
        `z-100`,
        `embed-responsive`,
        `aspect-ratio-square`,
        `aspect-ratio-16/9`,
        `aspect-ratio-4/3`,
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  important: true,
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
        'blur-0': 'blur(0px)',
        'blur-px': 'blur(1px)',
        'blur-0.5': 'blur(0.125rem)',
        'blur-1': 'blur(0.25rem)',
        'blur-1.5': 'blur(0.375rem)',
        'blur-2': 'blur(0.5rem)',
        'blur-2.5': 'blur(0.625rem)',
        'blur-3': 'blur(0.75rem)',
        'blur-3.5': 'blur(0.875rem)',
        'blur-4': 'blur(1rem)',
        'blur-5': 'blur(1.25rem)',
        'blur-6': 'blur(1.5rem)',
      },
      borderRadius: {
        '2xl': `2rem`,
      },
      borderWidth: {
        10: `10px`,
      },
      colors: {
        primary: `#00C389`,
        secondary: {
          DEFAULT: '#071d49',
          50: '#f3f4f6',
          100: '#e6e8ed',
          200: '#c1c7d2',
          300: '#9ca5b6',
          400: '#516180',
          500: '#071d49',
          600: '#061a42',
          700: '#051637',
          800: '#04112c',
          900: '#030e24',
        },
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
        sans: [`Inter var`, ...fontFamily.sans],
        mono: [`Fira Code var`, ...fontFamily.mono],
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
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.primary'),
              transition: theme('transitionProperty.all'),
              transitionDuration: theme('transitionDuration.200'),
              '&:hover': {
                color: theme('colors.primary'),
                opacity: theme('opacity.75'),
              },
              code: { color: theme('colors.blue.400') },
            },
            'h2,h3,h4': {
              color: theme('colors.gray.100'),
              'scroll-margin-top': spacing[32],
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              color: theme('colors.gray.300'),
              'p:first-of-type::before': false,
              'p:last-of-type::after': false,
            },
            hr: { borderColor: theme('colors.gray.500') },
            code: {
              color: theme('colors.gray.100'),
            },
            ol: {
              li: {
                '&:before': {
                  color: theme('colors.gray.200'),
                },
              },
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.200') },
              },
            },
            strong: { color: theme('colors.gray.300') },
            thead: {
              color: theme('colors.gray.100'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
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
      backgroundColor: [`group-hover`],
      backdropFilter: [`responsive`, `hover`],
      borderColor: [`first`, `last`],
      borderWidth: [`first`, `last`],
      boxShadow: [`responsive`, `hover`, `focus`],
      filter: [`responsive`],
      fontSize: [`group-hover`],
      margin: [`first`, `last`, `group-hover`],
      opacity: [`group-hover`],
      padding: [`responsive`],
      placeholderColor: [`focus`],
      scale: [`group-hover`],
      space: [`group-hover`],
      textColor: [`group-hover`],
      translate: [`group-hover`],
    },
  },
  plugins: [
    require(`@tailwindcss/typography`),
    require(`tailwindcss-filters`),
    require(`tailwindcss-responsive-embed`),
    require(`tailwindcss-aspect-ratio`),
  ],
}
