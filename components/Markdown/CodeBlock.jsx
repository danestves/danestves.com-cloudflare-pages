import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from '../../helpers/okaidia'

export default ({ language, value }) => (
  <Highlight {...defaultProps} code={value} language={language} theme={theme}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={style}>
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