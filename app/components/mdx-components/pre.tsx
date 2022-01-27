// Dependencies
import * as React from 'react';
import { ClipboardIcon, CheckIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import copy from 'copy-to-clipboard';

// Internals
import { stringify } from '~/utils/stringify';
import { Tooltip } from '../tooltip';

type CodeProps = {
  className?: string;
};

const Pre: React.FC<CodeProps> = ({ children, className }): JSX.Element => {
  let [hasCopied, setHasCopied] = React.useState(false);
  let [code] = React.useState(() => stringify(children));
  let preRef = React.useRef<HTMLPreElement | null>(null);

  React.useEffect(() => {
    if (hasCopied) {
      copy(code);

      setTimeout(() => setHasCopied(false), 1500);
    }
  }, [code, hasCopied]);

  return (
    <div className="group relative" data-code-block>
      <pre className={clsx(className, 'relative shadow-md')} ref={preRef}>
        {children}
      </pre>

      <div className="absolute top-2 right-2">
        <Tooltip
          arrow={{
            className: 'border-b-gray-200 dark:border-b-gray-700',
          }}
          className="rounded-md bg-gray-200 py-2 px-4 text-sm text-[color:var(--syntax-fg)] shadow-md dark:bg-gray-700"
          label="Copy to clipboard"
        >
          <button
            className="inline-flex rounded-md bg-[color:var(--syntax-bg)] opacity-0 shadow-md ring-1 transition-opacity duration-150 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
            onClick={() => setHasCopied(true)}
            type="button"
          >
            {hasCopied ? (
              <CheckIcon className="m-2 h-5 w-5" />
            ) : (
              <ClipboardIcon className="m-2 h-5 w-5" />
            )}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export { Pre };
export type { CodeProps };
