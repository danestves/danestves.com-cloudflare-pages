// Dependencies
import * as React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
import GoogleFonts from 'next-google-fonts'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render(): JSX.Element {
    return (
      <Html lang="es">
        <Head>
          <GoogleFonts href="https://fonts.googleapis.com/css?family=Poppins:400,700|Source+Code+Pro:400,600,700&display=swap" />
        </Head>

        <body className="bg-secondary">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
