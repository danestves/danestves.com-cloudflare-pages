import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
import theme from '../src/theme'
import { keywords } from '../constants'

class MyDocument extends Document {
  render () {
    return (
      <html lang='es' prefix='og: http://ogp.me/ns#'>
        <Head>
          <meta charSet='utf-8' />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
          />
          <meta
            name='description'
            content='Desarrollador web en Venezuela. Experiencia en el diseño y construcción de sitios web, personalización y optimización. JavaScript, React, Gatsby y WordPress.'
          />
          <meta
            name='keywords'
            content={keywords}
          />
          <meta name='author' content='Daniel Esteves' />
          <meta name='copyright' content='Daniel Esteves' />
          <link rel='alternate' hrefLang='es' href='https://danestves.com/' />
          {/* Facebook */}
          <meta
            property='og:title'
            content='Daniel Esteves | Desarrollador Web - TSU en Informática'
          />
          <meta property='og:type' content='website' />
          <meta property='og:image' content='https://danestves.com/img/og.jpg' />
          <meta
            property='og:description'
            content='Desarrollador web en Venezuela. Experiencia en el diseño y construcción de sitios web, personalización y optimización. JavaScript, React, Gatsby y WordPress.'
          />
          {/* Twitter */}
          <meta
            name='twitter:title'
            content='Daniel Esteves | Desarrollador Web - TSU en Informática'
          />
          <meta
            name='twitter:description'
            content='Desarrollador web en Venezuela. Experiencia en el diseño y construcción de sitios web, personalización y optimización. JavaScript, React, Gatsby y WordPress.'
          />
          <meta name='twitter:image' content='https://danestves.com/img/og.jpg' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@danestves' />
          <meta
            name='twitter:image:alt'
            content='Daniel Esteves | Desarrollador Web - TSU en Informática'
          />
          {/* Google */}
          <meta name='google-site-verification' content='z1laVtIbEpQYtR9llP5ICFgSwfLoEDHmfi_rbTh8oRg' />
          <meta name='msvalidate.01' content='F4F455B991A40467C9C79C17B6AC2894' />

          {/* PWA primary color */}
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [
      <React.Fragment key='styles'>
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    ]
  }
}

export default MyDocument
