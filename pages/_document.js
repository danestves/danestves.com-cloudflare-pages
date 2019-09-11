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
            id='dark-mode'
            dangerouslySetInnerHTML={{
              __html: `
void function() {
  window.__onThemeChange = function() {}
  var preferredTheme
  try {
    preferredTheme = localStorage.getItem('theme')
  } catch (err) { }
  function setTheme(newTheme) {
    window.__theme = newTheme
    preferredTheme = newTheme
    document.body.className = newTheme
    window.__onThemeChange(newTheme)
  }
  window.__setPreferredTheme = function(newTheme) {
    setTheme(newTheme)
    try {
      localStorage.setItem('theme', newTheme)
    } catch (err) {}
  }
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
  darkQuery.addListener(function(e) {
    window.__setPreferredTheme(e.matches ? 'dark' : 'light')
  })
  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))
}()
              `
            }}
          />
          <script
            dangerouslySetInnetHTML={{
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
