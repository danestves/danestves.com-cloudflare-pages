// Dependencies
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/**
 * @type {import("@types/tailwindcss/tailwind-config").TailwindConfig }
 **/
module.exports = {
  mode: 'jit',
  purge: {
    content: ['./src/{components,pages}/**/*.{ts,tsx}'],
    safelist: ['max-w-md', 'max-w-lg'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#00C389',
        secondary: '#29ABE2',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      fontFamily: {
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: '475px',
        ...defaultTheme.screens,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: '#838383',
            a: {
              color: '#071D49',
              transition: theme('transitionProperty.all'),
              transitionDuration: theme('transitionDuration.200'),
              '&:hover': {
                color: '#071D49',
                opacity: theme('opacity.80'),
              },
              code: { color: theme('colors.blue.400') },
            },
            code: {
              backgroundColor: '#282a36',
              color: '#f8f8f2',
              borderRadius: theme('borderRadius.md'),
              padding: `${defaultTheme.spacing[1]} ${defaultTheme.spacing[0.5]}`,
              fontWeight: theme('fontWeight.normal'),
            },
            'h2,h3,h4,h5,h6': {
              color: '#071D49',
              'scroll-margin-top': defaultTheme.spacing[32],
              position: 'relative',
              paddingLeft: defaultTheme.spacing[6],
              marginLeft: `-${defaultTheme.spacing[6]}`,
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.300'),
              color: theme('colors.gray.400'),
              'p:first-of-type::before': false,
              'p:last-of-type::after': false,
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.300') },
                ul: {
                  marginTop: `0 !important`,
                },
              },
              ul: {
                '&:first-child': {
                  marginTop: `0 !important`,
                },
                li: {
                  '&:first-child': {
                    marginTop: `8px !important`,
                  },
                },
              },
            },
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
            'h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
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
            '.giphy-gif-img': {
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
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.horizontal-tb': {
          writingMode: 'horizontal-tb',
        },
        '.vertical-rl': {
          writingMode: 'vertical-rl',
        },
        '.vertical-lr': {
          writingMode: 'vertical-lr',
        },
      }
      addUtilities(newUtilities)
    }),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
