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

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render(): JSX.Element {
    return (
      <Html lang="es">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="194x194"
            href="/static/icons/favicon-194x194.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/static/icons/android-chrome-192x192.png"
          />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png" />
          <link rel="manifest" href="/static/icons/site.webmanifest" />
          <link rel="mask-icon" href="/static/icons/safari-pinned-tab.svg" color="#071d49" />
          <link rel="shortcut icon" href="/static/icons/favicon.ico" />
          <meta
            name="apple-mobile-web-app-title"
            content="Desarrollador Web Frontend | @danestves"
          />
          <meta name="application-name" content="Desarrollador Web Frontend | @danestves" />
          <meta name="msapplication-TileColor" content="#071d49" />
          <meta name="msapplication-config" content="/static/icons/browserconfig.xml" />
          <meta name="theme-color" content="#071d49" />

          <link rel="preconnect" href="https://vitals.vercel-insights.com" />
          <link rel="preconnect" href="https://queue.simpleanalyticscdn.com" />

          <link
            rel="preload"
            href="/static/fonts/poppins/poppins-v15-latin-regular.woff"
            as="font"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/static/fonts/poppins/poppins-v15-latin-regular.woff2"
            as="font"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/static/fonts/poppins/poppins-v15-latin-600.woff"
            as="font"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/static/fonts/poppins/poppins-v15-latin-600.woff2"
            as="font"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/static/fonts/poppins/poppins-v15-latin-700.woff"
            as="font"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/static/fonts/poppins/poppins-v15-latin-700.woff2"
            as="font"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/static/fonts/source-code-pro/source-code-pro-v13-latin-regular.woff"
            as="font"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/static/fonts/source-code-pro/source-code-pro-v13-latin-regular.woff2"
            as="font"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/static/fonts/source-code-pro/source-code-pro-v13-latin-700.woff"
            as="font"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/static/fonts/source-code-pro/source-code-pro-v13-latin-700.woff2"
            as="font"
            type="font/woff2"
          />
        </Head>

        <body className="bg-secondary">
          <Main />
          <NextScript />

          <script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
          <noscript>
            <img
              src="https://queue.simpleanalyticscdn.com/noscript.gif"
              alt=""
              referrerPolicy="no-referrer-when-downgrade"
            />
          </noscript>
        </body>
      </Html>
    )
  }
}
