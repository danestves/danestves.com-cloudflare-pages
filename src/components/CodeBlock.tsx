// Dependencies
import * as React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'

// Theme
import theme from '@/utils/okaidia'

type CodeBlockTypes = {
  language: Language
  value: string
}

const CodeBlock = ({ language, value }: CodeBlockTypes): JSX.Element => (
  // eslint-disable-next-line
  // @ts-ignore
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

export default CodeBlock
