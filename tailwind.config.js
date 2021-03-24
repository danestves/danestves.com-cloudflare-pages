const { fontFamily, spacing } = require(`tailwindcss/defaultTheme`)

module.exports = {
  purge: [
    './src/components/**/*.{ts,tsx}',
    './src/layouts/**/*.{ts,tsx}',
    './src/pages/**/*.{ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
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
      fontSize: {
        '7xl': `5rem`,
        '8xl': `6rem`,
      },
      fontFamily: {
        sans: [`Inter`, ...fontFamily.sans],
        mono: [`Fira Code`, ...fontFamily.mono],
      },
      height: {
        88: `22rem`,
      },
      inset: {
        '1/2': `50%`,
      },
      maxHeight: (theme) => theme('spacing'),
      minHeight: (theme) => theme('spacing'),
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
              borderLeftColor: theme('colors.gray.500'),
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
                borderBottomColor: theme('colors.white'),
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
      borderColor: [`first`, `last`],
      borderWidth: [`first`, `last`],
      boxShadow: [`responsive`, `hover`, `focus`],
      fontSize: [`group-hover`],
      margin: [`first`, `last`, `group-hover`],
      opacity: [`group-hover`, `disabled`],
      padding: [`responsive`],
      placeholderColor: [`focus`],
      scale: [`group-hover`],
      space: [`group-hover`],
      textColor: [`group-hover`],
      translate: [`group-hover`],
    },
  },
  plugins: [require(`@tailwindcss/typography`), require('@tailwindcss/aspect-ratio')],
}
