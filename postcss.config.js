const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.js", "./src/**/*.jsx"],
  whitelist: ["html", "body"],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
})

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
    require("cssnano"),
  ],
}
