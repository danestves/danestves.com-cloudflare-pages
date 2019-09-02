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
          <NextScript />
          <script
            id='lazy-loading'
            dangerouslySetInnerHTML={{
              __html: `
function lazyLoading () {
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.src = img.src;
      img.loading = 'lazy';
      img.setAttribute('data-src', img.src);
    });
  } else {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.classList.add('lazyload');
    });
    // Dynamically import the LazySizes library
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js';
    document.body.appendChild(script);
  }
}
setInterval(lazyLoading, 5000);
              `
            }}
          />
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
