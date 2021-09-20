// Dependencies
import * as React from 'react'
import type { AppProps } from 'next/app'
import type {
  NextComponentType,
  NextLayoutComponentType,
  NextPageContext,
} from 'next'

declare module 'next' {
  type NextLayoutComponentType<P = Record<string, unknown>> = NextComponentType<
    NextPageContext,
    any,
    P
  > & {
    getLayout?: (
      page: React.ReactElement<any, any> | null
    ) => React.ReactElement<any, any> | null
  }

  type NextLayoutPage<P = Record<string, unknown>, IP = P> = NextComponentType<
    NextPageContext,
    IP,
    P
  > & {
    getLayout?: (
      page: React.ReactElement<any, any> | null
    ) => React.ReactElement<any, any> | null
  }
}

declare module 'next/app' {
  type AppLayoutProps<P = Record<string, unknown>> = AppProps & {
    Component: NextLayoutComponentType
    pageProps: P
  }
}
