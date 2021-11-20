// Dependencies
import Document, { Html, Head, Main, NextScript } from 'next/document'

// Internals
import { getCssText } from '@/lib/stitches'

export default class AppDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            crossOrigin="anonymous"
            href="https://plausible.io"
            rel="preconnect"
          />
          <link
            crossOrigin="anonymous"
            href="https://vitals.vercel-insights.com"
            rel="preconnect"
          />
          <style
            dangerouslySetInnerHTML={{ __html: getCssText() }}
            id="stitches"
          />
        </Head>

        <body className="bg-white dark:bg-[#292929]">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
