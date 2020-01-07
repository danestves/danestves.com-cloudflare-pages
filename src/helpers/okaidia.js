// @flow
// Original: https://github.com/dracula/visual-studio-code
// Converted automatically using ./tools/themeFromVsCode

/*:: import type { PrismTheme } from '../src/types' */

var theme /*: PrismTheme */ = {
  plain: {
    color: "#F8F8F2",
    backgroundColor: "#272822",
    fontFamily: '"Fira Code", monospace',
  },
  styles: [
    {
      types: ["constant", "deleted", "symbol", "property", "tag"],
      style: {
        color: "#f92672",
      },
    },
    {
      types: ["function", "attr-value", "class-name", "atrule"],
      style: {
        color: "#e6db74",
      },
    },
    {
      types: ["changed"],
      style: {
        color: "rgb(255, 184, 108)",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "#f8f8f2",
      },
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
      style: {
        color: "#a6e22e",
      },
    },
    {
      types: ["keyword"],
      style: {
        color: "#66d9ef",
      },
    },
    {
      types: ["operator", "entity", "url", "variable"],
      style: {
        color: "rgb(102, 217, 239)",
      },
    },
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#708090",
      },
    },
    {
      types: ["boolean", "number"],
      style: {
        color: "#ae81ff",
      },
    },
    {
      types: ["regex", "important"],
      style: {
        color: "#fd971f",
      },
    },
    {
      types: ["important", "bold"],
      style: {
        fontStyle: "bold",
      },
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic",
      },
    },
    {
      types: ["entity"],
      style: {
        cursor: "help",
      },
    },
  ],
}

module.exports = theme
