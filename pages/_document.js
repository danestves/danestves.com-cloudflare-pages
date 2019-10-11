import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";
import Manifest from "next-manifest/manifest";

class MyDocument extends Document {
  render() {
    return (
      <html lang="es" prefix="og: http://ogp.me/ns#">
        <Head>
          <Manifest href="/static/manifest.json" themeColor="#0090da" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TVDJW37');
            `
            }}
          />
        </Head>
        <body>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-TVDJW37"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          <Main />
          <script
            type="application/ld+json"
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
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
window.$crisp=[];window.CRISP_WEBSITE_ID="d478fe87-1333-4a2d-834c-5908620fa639";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
            `
            }}
          />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  const css = sheets.toString();

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: (
      <style
        id="jss-server-side"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: css }}
      />
    )
  };
};

export default MyDocument;
