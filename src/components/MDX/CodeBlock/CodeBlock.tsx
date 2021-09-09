// Dependencies
import Highlight, { defaultProps } from 'prism-react-renderer'
import type { Language, PrismTheme } from 'prism-react-renderer'

// Internals
import { Line, LineContent, LineNumber, Pre } from './styles'

export type CodeBlockProps = {
  className: Language
  children: string
}

const atomTheme: PrismTheme = {
  plain: {
    color: '#c5c8c6',
    backgroundColor: '#1d1f21',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#7C7C7C',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#c5c8c6',
      },
    },
    {
      types: ['property', 'keyword', 'tag'],
      style: {
        color: '#96CBFE',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: '#FFFFB6',
        textDecorationLine: 'underline',
      },
    },
    {
      types: ['boolean', 'constant'],
      style: {
        color: '#99CC99',
      },
    },
    {
      types: ['symbol', 'deleted'],
      style: {
        color: '#f92672',
      },
    },
    {
      types: ['number'],
      style: {
        color: '#FF73FD',
      },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: {
        color: '#A8FF60',
      },
    },
    {
      types: ['variable'],
      style: {
        color: '#C6C5FE',
      },
    },
    {
      types: ['operator'],
      style: {
        color: '#EDEDED',
      },
    },
    {
      types: ['entity'],
      style: {
        color: '#FFFFB6',
        cursor: 'help',
      },
    },
    {
      types: ['url'],
      style: {
        color: '#96CBFE',
      },
    },
    {
      types: ['atrule', 'attr-value'],
      style: {
        color: '#F9EE98',
      },
    },
    {
      types: ['function'],
      style: {
        color: '#DAD085',
      },
    },
    {
      types: ['regex'],
      style: {
        color: '#E9C062',
      },
    },
    {
      types: ['important'],
      style: {
        color: '#fd971f',
        fontWeight: 'bold',
      },
    },
    {
      types: ['bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
  ],
}

export const CodeBlock = ({
  className,
  children,
}: CodeBlockProps): JSX.Element => {
  const language: Language = className?.replace('language-', '') as Language

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={atomTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              {/* Verify if the last line is empty, if is, don't render nothing */}
              {i + 1 !== tokens.length && (
                <>
                  <LineNumber>{i + 1}</LineNumber>
                  <LineContent>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </LineContent>
                </>
              )}
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  )
}
