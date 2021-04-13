// Dependencies
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/static/fonts/inter-var-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/static/fonts/FiraCode-VF.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
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

          <script
            async
            defer
            data-domain="danestves.com"
            src="https://plausible.io/js/plausible.js"
          ></script>
        </Head>

        <body className="bg-secondary-700">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
