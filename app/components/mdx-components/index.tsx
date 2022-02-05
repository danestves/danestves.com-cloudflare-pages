// Dependencies
import {
  Sandpack,
  defaultDark,
  defaultLight,
} from '@codesandbox/sandpack-react';
import { CodePen, CodeSandbox } from 'mdx-embed';
import type { SandpackProps } from '@codesandbox/sandpack-react';

// Internals
import { Pre } from './pre';
import { Theme, useTheme } from 'remix-themes';

let mdxComponents = {
  CodePen,
  CodeSandbox,
  Sandpack: (props: SandpackProps) => {
    let [theme] = useTheme();

    return (
      <Sandpack
        {...props}
        theme={theme === Theme.DARK ? defaultDark : defaultLight}
      />
    );
  },
  pre: Pre,
};

export { mdxComponents };
