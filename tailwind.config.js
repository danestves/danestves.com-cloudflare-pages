const { fontFamily, spacing } = require(`tailwindcss/defaultTheme`)

module.exports = {
  mode: 'jit',
  purge: [
    './src/components/**/*.{ts,tsx}',
    './src/layouts/**/*.{ts,tsx}',
    './src/pages/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  important: true,
  theme: {
    extend: {
      boxShadow: {
        search: '0 25px 50px -12px rgb(0 0 0 / 25%)',
        'search-item': '0 1px 2px 0 rgb(0 0 0 / 5%)',
      },
      colors: {
        primary: {
          DEFAULT: '#00c389',
          100: '#ccf3e7',
          200: '#99e7d0',
          300: '#66dbb8',
          400: '#33cfa1',
          500: '#00c389',
          600: '#009c6e',
          700: '#007552',
          800: '#004e37',
          900: '#00271b',
        },
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
      fontFamily: {
        sans: [`Inter`, ...fontFamily.sans],
        title: [`Roboto Slab`, ...fontFamily.sans],
        roboto: [`Roboto`, ...fontFamily.sans],
      },
      maxHeight: (theme) => theme('spacing'),
      minHeight: (theme) => theme('spacing'),
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.600'),
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
            code: {
              backgroundColor: '#282a36',
              color: '#f8f8f2',
              borderRadius: theme('borderRadius.md'),
              padding: `${spacing[1]} ${spacing[0.5]}`,
              fontWeight: theme('fontWeight.normal'),
            },
            'h2,h3,h4': {
              color: theme('colors.gray.700'),
              'scroll-margin-top': spacing[32],
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.300'),
              color: theme('colors.gray.400'),
              'p:first-of-type::before': false,
              'p:last-of-type::after': false,
            },
            hr: { borderColor: theme('colors.gray.500') },

            ol: {
              li: {
                '&:before': {
                  color: theme('colors.gray.200'),
                },
              },
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.300') },
              },
            },
            strong: { color: theme('colors.gray.700') },
            thead: {
              color: theme('colors.gray.700'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.300'),
              },
            },
            pre: {
              pre: {
                margin: 0,
              },
            },
          },
        },
        dark: {
          css: {
            code: {
              backgroundColor: '#011627',
              color: '#d6deeb',
            },
            color: theme('colors.gray.200'),
            'h2,h3,h4': {
              color: theme('colors.gray.100'),
              'scroll-margin-top': spacing[32],
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.500'),
              color: theme('colors.gray.400'),
            },
            strong: { color: theme('colors.gray.300') },
            thead: {
              color: theme('colors.gray.100'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.300'),
              },
            },
          },
        },
        lg: {
          css: {
            '.graphcms-image-wrapper img': {
              margin: 0,
            },
            pre: {
              padding: 0,
              pre: {
                paddingTop: '1em',
                paddingRight: '1.5em',
                paddingBottom: '1em',
                paddingLeft: '1.5em',
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-pseudo-elements')(),
  ],
}
