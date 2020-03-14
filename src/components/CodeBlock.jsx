// Dependencies
import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"

// Theme
import theme from "../helpers/okaidia"

export default ({ language, value }) => (
  <Highlight {...defaultProps} code={value} language={language} theme={theme}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre
        className={`${className} leading-tight p-3 overflow-auto rounded text-base my-6 mx-0 font-light`}
        style={style}
      >
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
)
