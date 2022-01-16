// Dependencies
const plugin = require('tailwindcss/plugin');

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4fbfe',
          100: '#eaf7fc',
          200: '#caeaf8',
          300: '#a9ddf3',
          400: '#69c4eb',
          500: '#29abe2',
          600: '#259acb',
          700: '#1f80aa',
          800: '#196788',
          900: '#14546f',
          DEFAULT: '#29ABE2',
          darker: '#071D49',
        },
        secondary: {
          50: '#f2fcf9',
          100: '#e6f9f3',
          200: '#bff0e2',
          300: '#99e7d0',
          400: '#4dd5ac',
          500: '#00c389',
          600: '#00b07b',
          700: '#009267',
          800: '#007552',
          900: '#006043',
          DEFAULT: '#00C389',
        },
      },
      container: {
        center: true,
        padding: '1rem',
      },
      screens: {
        xs: '475px',
      },
    },
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
      };
      addUtilities(newUtilities);
    }),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
};
