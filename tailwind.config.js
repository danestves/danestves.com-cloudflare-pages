// Dependencies
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      borderWidth: {
        10: '10px'
      },
      colors: {
        primary: '#00C389',
        secondary: '#071D49'
      },
      container: {
        center: true
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        mono: ['Source Code Pro', ...defaultTheme.fontFamily.mono]
      },
      inset: {
        '1/2': '50%'
      },
      zIndex: {
        '100': 100
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'dark', 'dark:hover'],
    borderColor: ['responsive', 'hover', 'focus', 'dark', 'dark:hover'],
    boxShadow: ['responsive', 'hover', 'focus', 'dark', 'dark:hover'],
    margin: ['responsive', 'first', 'last'],
    padding: ['responsive'],
    placeholderColor: ['responsive', 'focus', 'dark'],
    textColor: ['responsive', 'hover', 'dark', 'dark:hover']
  },
  corePlugins: {},
  plugins: [
    require('@danestves/tailwindcss-darkmode')(),
    require('@tailwindcss/ui'),
    require('@tailwindcss/typography')
  ]
};
