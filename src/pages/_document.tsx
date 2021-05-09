// Dependencies
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link href="/static/icons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="/static/icons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link
            href="/static/icons/favicon-194x194.png"
            rel="icon"
            sizes="194x194"
            type="image/png"
          />
          <link
            href="/static/icons/android-chrome-192x192.png"
            rel="icon"
            sizes="192x192"
            type="image/png"
          />
          <link href="/static/icons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/static/icons/site.webmanifest" rel="manifest" />
          <link color="#071d49" href="/static/icons/safari-pinned-tab.svg" rel="mask-icon" />
          <link href="/static/icons/favicon.ico" rel="shortcut icon" />
          <meta
            content="Desarrollador Web Frontend | @danestves"
            name="apple-mobile-web-app-title"
          />
          <meta content="Desarrollador Web Frontend | @danestves" name="application-name" />
          <meta content="#071d49" name="msapplication-TileColor" />
          <meta content="/static/icons/browserconfig.xml" name="msapplication-config" />
          <meta content="#071d49" name="theme-color" />

          <meta content="fc24b57a0cc85e0e" name="yandex-verification" />
        </Head>

        <body className="bg-gray-100 dark:bg-secondary-500">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
