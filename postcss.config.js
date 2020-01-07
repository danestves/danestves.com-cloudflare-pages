module.exports = {
  plugins: [
    require("postcss-easy-import"),
    require("tailwindcss"),
    process.env.NODE_ENV === "production" &&
      require("@fullhuman/postcss-purgecss")({
        content: ["./src/**/*.{js,jsx,ts,tsx}"],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      }),
    require("autoprefixer"),
    require("cssnano"),
  ],
}
