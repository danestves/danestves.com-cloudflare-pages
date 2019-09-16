import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
import Manifest from 'next-manifest/manifest'

class MyDocument extends Document {
  render () {
    return (
      <html lang='es' prefix='og: http://ogp.me/ns#'>
        <Head>
          <Manifest href='/static/manifest.json' themeColor='#0090da' />
        </Head>
        <body>
          <Main />
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: `
{
  "@context": "http://schema.org",
  "@type": "Organization",
  "name": "Daniel Esteves",
  "description": "Desarrollador web frontend en Venezuela.",
  "url": "https://danestves.com",
  "foundingDate": "2016-06-01",
  "founder": [
    {
      "@type": "Person",
      "name": "Daniel Esteves"
    }
  ],
  "sameAs": [
    "https://facebook.com/danestvesve/",
    "https://twitter.com/danestves/",
    "https://instagram.com/danestves",
    "https://www.linkedin.com/in/danestves/"
  ]
}
            `
            }}
          />
          <NextScript />
        </body>
      </html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  const css = sheets.toString()

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: (
      <style
        id='jss-server-side'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: css }}
      />
    )
    // styles: [
    //   <React.Fragment key='styles'>
    //     {initialProps.styles}

    //     {sheets.getStyleElement()}
    //   </React.Fragment>
    // ]
  }
}

export default MyDocument
