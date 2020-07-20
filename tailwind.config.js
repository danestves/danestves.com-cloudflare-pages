module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      container: {
        center: true
      },
      inset: {
        '1/2': '50%'
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
  plugins: [require('@danestves/tailwindcss-darkmode')()]
};
