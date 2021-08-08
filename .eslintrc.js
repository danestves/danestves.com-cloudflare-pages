module.exports = {
  extends: ['next', 'next/core-web-vitals', 'prettier'],
  rules: {
    'no-console': [
      2,
      {
        allow: ['warn', 'error'],
      },
    ],
  },
}
