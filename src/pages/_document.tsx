// Dependencies
import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext, DocumentInitialProps } from 'next/document'

// Internals
import { getCssText } from '@/lib/stitches'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <style
            dangerouslySetInnerHTML={{ __html: getCssText() }}
            id="stitches"
          />
        </Head>

        <body className="bg-white transition-colors duration-100 dark:bg-[#292929]">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
