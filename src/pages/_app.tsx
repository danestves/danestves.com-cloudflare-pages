// Dependencies
import type { AppProps } from 'next/app'

// Internals
import '@/styles/main.css'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}
