// Dependencies
import { useTheme } from 'next-themes'
import Highlight, { defaultProps } from 'prism-react-renderer'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
import nightOwlLight from 'prism-react-renderer/themes/dracula'
import type { Language } from 'prism-react-renderer'

interface Props {
  className: Language
  children: string
}

export const CodeBlock = ({ className, children }: Props): JSX.Element => {
  const { theme } = useTheme()

  const language: Language = className?.replace('language-', '') as Language

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={theme === 'dark' ? nightOwl : nightOwlLight}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {/* Verify if the last line is empty, if is, don't render nothing */}
              {i + 1 !== tokens.length &&
                line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default CodeBlock
