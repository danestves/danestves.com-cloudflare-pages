// Dependencies
import * as React from 'react'
import { ClipboardIcon, CheckIcon } from '@radix-ui/react-icons'
import copy from 'copy-to-clipboard'

// Internals
import { clsx } from '@/utils'

export type CodeProps = {
  className: string
}

export const Pre: React.FC<CodeProps> = ({
  children,
  className,
}): JSX.Element => {
  const [hasCopied, setHasCopied] = React.useState(false)
  const [code, setCode] = React.useState(undefined)
  const preRef = React.useRef<HTMLPreElement | null>(null)

  React.useEffect(() => {
    if (preRef.current) {
      const codeElement = preRef.current.querySelector('code')

      // Remove line-numbering from code
      const code = codeElement.innerText.replace(/^[0-9\s]{1,2}/gm, '')

      setCode(code)
    }
  }, [preRef])

  React.useEffect(() => {
    if (hasCopied) copy(code)

    setTimeout(() => setHasCopied(false), 1500)
  }, [code, hasCopied])

  return (
    <div className="relative group" data-code-block>
      <pre className={clsx(className, 'relative')} ref={preRef}>
        {children}
      </pre>

      <div className="absolute top-2 right-2">
        <button
          aria-label="Copy code to clipboard"
          className="bg-[#111] inline-flex rounded-md transition-opacity duration-150 opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
          data-microtip-position="left"
          onClick={() => setHasCopied(true)}
          role="tooltip"
          type="button"
        >
          {hasCopied ? (
            <CheckIcon className="w-5 h-5 m-2" />
          ) : (
            <ClipboardIcon className="w-5 h-5 m-2" />
          )}
        </button>
      </div>
    </div>
  )
}
