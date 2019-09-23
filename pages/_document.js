import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
import Manifest from 'next-manifest/manifest'

class MyDocument extends Document {
  render() {
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
          <script
            type='text/javascript'
            dangerouslySetInnerHTML={{
              __html: `
/**
 *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
 *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
 */
/*
var urlDisqus;
var identifierDisqus;
var disqus_config = function () {
    this.page.url = urlDisqus;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = identifierDisqus; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
*/
(function() {  // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    
    s.src = 'https://daniel-esteves.disqus.com/embed.js';
    
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();
              `
            }}
          />
          <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>
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
  }
}

export default MyDocument
