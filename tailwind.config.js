// Dependencies
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/**
 * @type {import("@types/tailwindcss/tailwind-config").TailwindConfig }
 **/
module.exports = {
  mode: 'jit',
  purge: ['./src/{components,pages}/**/*.{ts,tsx}'],
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
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: '475px',
        ...defaultTheme.screens,
      },
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
  ],
}
