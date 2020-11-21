module.exports = {
  purge: [
    './src/components/**/*.tsx',
    './src/components/**/*.ts',
    './src/pages/**/*.tsx',
    './src/pages/**/*.ts',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
