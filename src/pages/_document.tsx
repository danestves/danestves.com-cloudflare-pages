// Dependencies
import Document, { Html, Head, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="es">
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

          <script
            type="module"
            dangerouslySetInnerHTML={{
              __html: `
              import {Workbox, messageSW} from 'https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-window.prod.mjs';

              if ('serviceWorker' in navigator) {
                const wb = new Workbox('/sw.js');
                let registration;

                const showSkipWaitingPrompt = (event) => {
                  // event.wasWaitingBeforeRegister will be false if this is
                  // the first time the updated service worker is waiting.
                  // When event.wasWaitingBeforeRegister is true, a previously
                  // updated service worker is still waiting.
                  // You may want to customize the UI prompt accordingly.

                  // Assumes your app has some sort of prompt UI element
                  // that a user can either accept or reject.
                  if (confirm("Hay una nueva versión del sitio web 🎉, ¿quieres actualizar?")) {
                    // Assuming the user accepted the update, set up a listener
                    // that will reload the page as soon as the previously waiting
                    // service worker has taken control.
                    wb.addEventListener('controlling', (event) => {
                      window.location.reload();
                    });

                    if (registration && registration.waiting) {
                      // Send a message to the waiting service worker,
                      // instructing it to activate.  
                      // Note: for this to work, you have to add a message
                      // listener in your service worker. See below.
                      messageSW(registration.waiting, {type: 'SKIP_WAITING'});
                    }
                  } else {
                    console.log("User rejected to reload the web app, keep using old version. New version will be automatically load when user open the app next time.")
                  }
                };

                // Add an event listener to detect when the registered
                // service worker has installed but is waiting to activate.
                wb.addEventListener('waiting', showSkipWaitingPrompt);
                wb.addEventListener('externalwaiting', showSkipWaitingPrompt);

                wb.register().then((r) => registration = r);
              }
            `,
            }}
          />
        </body>
      </Html>
    )
  }
}
