if (!self.define) {
  const e = (e) => {
      'require' !== e && (e += '.js')
      let a = Promise.resolve()
      return (
        i[e] ||
          (a = new Promise(async (a) => {
            if ('document' in self) {
              const i = document.createElement('script')
              ;(i.src = e), document.head.appendChild(i), (i.onload = a)
            } else importScripts(e), a()
          })),
        a.then(() => {
          if (!i[e]) throw new Error(`Module ${e} didn’t register its module`)
          return i[e]
        })
      )
    },
    a = (a, i) => {
      Promise.all(a.map(e)).then((e) => i(1 === e.length ? e[0] : e))
    },
    i = { require: Promise.resolve(a) }
  self.define = (a, s, c) => {
    i[a] ||
      (i[a] = Promise.resolve().then(() => {
        let i = {}
        const r = { uri: location.origin + a.slice(1) }
        return Promise.all(
          s.map((a) => {
            switch (a) {
              case 'exports':
                return i
              case 'module':
                return r
              default:
                return e(a)
            }
          })
        ).then((e) => {
          const a = c(...e)
          return i.default || (i.default = a), i
        })
      }))
  }
}
define('./sw.js', ['./workbox-030153e1'], function (e) {
  'use strict'
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/P_-yD8hoN1aafkDpF8MiC/_buildManifest.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/P_-yD8hoN1aafkDpF8MiC/_ssgManifest.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url:
            '/_next/static/chunks/88678149a3554a7ed7d2d81f830276d0c5275037.517992a58d190ede9d9b.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url:
            '/_next/static/chunks/9670714cf56472ed36257ff397f9a2ecdaf2b72a.035cf120b0e43f8b40b8.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url:
            '/_next/static/chunks/c9787b2e67d04485ea556b79e503c7f6cc1ff4d5.b4da5e84206c52df05bf.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/chunks/commons.906d98b090ec2197e538.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url:
            '/_next/static/chunks/d3c4489a39831ba27ef0234e2ba3d2c463adf544.0e632a273ed71686bcae.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/chunks/framework.e1c496a06137bbd211c8.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/chunks/main-647c76e2b21de2e6df80.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/chunks/pages/_app-58551bbc8a1c8f3611a8.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/chunks/pages/_error-3ae79cd60771db8b5e5d.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/chunks/pages/blog-199917745a43133aa7d6.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/chunks/pages/blog/%5Bslug%5D-49dc5f20519c3f01b27d.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/chunks/pages/contacto-53f20687fcb1a5e7669f.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/chunks/pages/dayairis-4e6a4aac376d45b5ce54.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/chunks/pages/index-ed3a658d365df1532693.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/chunks/pages/open-source-1bd0e395dfc132983e7c.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/chunks/pages/portafolio-2ab2d942d4cb1621f2f7.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/chunks/pages/portafolio/%5B...slug%5D-cb59a453f73fbfaf43a2.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/chunks/pages/sobre-mi-d7bf6457d1c7aa1e0bb3.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/chunks/polyfills-5ba9c403cc30e4733b64.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        {
          url: '/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js',
          revision: 'P_-yD8hoN1aafkDpF8MiC',
        },
        { url: '/_next/static/css/c8ca55e55976a6bb30fd.css', revision: 'P_-yD8hoN1aafkDpF8MiC' },
        { url: '/code.png', revision: 'aa8430c3b552c60d8b897ec7c7d44383' },
        { url: '/danestves-resume.pdf', revision: 'd6b7cfc97554783a3c5b020082f84d58' },
        { url: '/dayairis/1.jpg', revision: 'fba3dd5965ca7fc7a60021d8ebe2a324' },
        { url: '/dayairis/2.jpg', revision: '41e9f5bee8292e59ab5e7d60416e23ae' },
        { url: '/dayairis/3.jpg', revision: 'c737b9cfa7649ce1aebba581aac75ea9' },
        { url: '/dayairis/4.jpg', revision: '8213c2e5ce6cedc1e9e1b6cd74a201be' },
        { url: '/dayairis/5.jpg', revision: '8c7d4c652b2104a4753455cf6e842712' },
        { url: '/dayairis/6.jpg', revision: 'c45895d07ba58b088e51c2df5b42bb28' },
        { url: '/faster.png', revision: 'c5a4f876271082da340ca41dd5dee01a' },
        { url: '/hero.webp', revision: '06dbd70e59245d2a19443847f7120501' },
        { url: '/interfaces.png', revision: '9c4e6b1d24f67ce589edd11b96e802ca' },
        { url: '/logo.png', revision: 'da907efeee083909598487bf7b71afc2' },
        { url: '/me.jpg', revision: '54e9f6e3723c29deb20d5d2e5facc2db' },
        { url: '/og.png', revision: '1e191939a852087e2340f7fa7cdbfdee' },
        { url: '/programming-animation.gif', revision: '9387a8b4fa67c9033e28e2f64eb2f49f' },
        { url: '/robots.txt', revision: '3285ef24338766ae2218146d8aca38b4' },
        { url: '/rss.xml', revision: '50f1b67aa2967a8e93d2fb54a86804ec' },
        { url: '/sitemap.xml', revision: 'aec39ef0ee6d4bd9264d539b26e7fd40' },
        { url: '/static/building.svg', revision: 'c6378bf42105c43f802332b9038613a1' },
        { url: '/static/calendar.svg', revision: 'a044357f2f86cf4981b41f831603e9ef' },
        { url: '/static/computer.svg', revision: '72a1cdb342fa2ab2362cfdec9c3800f8' },
        { url: '/static/design.svg', revision: '25f4be49fd3b2b798e90b3c12f978741' },
        { url: '/static/fonts/FiraCode-VF.woff2', revision: '552a1fc473db4e764581ab9be0d47a3b' },
        {
          url: '/static/fonts/inter-var-latin.woff2',
          revision: '812b3dd29751112389e93387c4f7dd0a',
        },
        { url: '/static/graphql.svg', revision: '0fecda105fdd07e0fa1dc053e8bae274' },
        {
          url: '/static/icons/android-chrome-192x192.png',
          revision: '08bfc5ef286c215e9fbde5d8d07af671',
        },
        {
          url: '/static/icons/android-chrome-512x512.png',
          revision: 'f046ae4b783b7e7b21a20a05b9803a4d',
        },
        {
          url: '/static/icons/apple-touch-icon-precomposed.png',
          revision: 'd3f9cec76e52672f8c5207eec5cdb64b',
        },
        { url: '/static/icons/apple-touch-icon.png', revision: 'da3611e44f2027cdd037135e4376d297' },
        { url: '/static/icons/browserconfig.xml', revision: '5cb785be307c24763a9087750742e6b9' },
        { url: '/static/icons/favicon-16x16.png', revision: '1c2f8ffdd9a4dbc370b68bd041d2a1ca' },
        { url: '/static/icons/favicon-194x194.png', revision: '4497f8cdad5c42dbf874c62bb11f92b4' },
        { url: '/static/icons/favicon-32x32.png', revision: '2bb5b14f1d8729aefef22fe5a72243d2' },
        { url: '/static/icons/favicon.ico', revision: 'c7889121c563a7085ae094bfb5f01ddb' },
        { url: '/static/icons/maskable-icon.png', revision: 'd1b8fa3c5496978104b15d943aa5403a' },
        { url: '/static/icons/mstile-150x150.png', revision: '158a46f2087806b908fa64c24f1ceaed' },
        {
          url: '/static/icons/safari-pinned-tab.svg',
          revision: '849bc25ae9543116593d02894a806e52',
        },
        { url: '/static/icons/site.webmanifest', revision: '0b06870f25cb00d4c88cbe017d65c890' },
        {
          url: '/static/images/alpinejs-el-tailwindcss-para-javascript/banner.png',
          revision: '32b063907bf017d449de21f1e0aad467',
        },
        {
          url: '/static/images/aprender-tailwindcss-2020/banner.png',
          revision: 'ea2f07416872ccb8aac75532afd7c8d7',
        },
        {
          url: '/static/images/aprender-tailwindcss-2020/tailwind-ranking-state-of-css-2019.png',
          revision: '0ea192bc391a33797920f75bbed6e1b6',
        },
        {
          url: '/static/images/aprender-tailwindcss-2020/tailwind-use-state-of-css-2019.png',
          revision: 'd3acf484cfb119d49aa8b7ee1aa20dd5',
        },
        {
          url: '/static/images/codesign-international/banner.jpg',
          revision: '52d48ddb67d2829a1570adcdd0f2dbf2',
        },
        {
          url: '/static/images/codesign-international/og.jpg',
          revision: 'b8d0e3dd721e466b33cad36f050f25fd',
        },
        {
          url: '/static/images/como-iniciar-con-tailwindcss/banner.jpg',
          revision: 'e1ac87e16596cfb3795936f155c4bceb',
        },
        {
          url: '/static/images/como-iniciar-con-tailwindcss/devtools.png',
          revision: '51de83a671731106707a52338fb40d6b',
        },
        {
          url: '/static/images/como-iniciar-con-tailwindcss/first-section.png',
          revision: 'e346e57e34185d146b1a4595e11d02fa',
        },
        {
          url: '/static/images/como-iniciar-con-tailwindcss/flex-direction-docs.png',
          revision: '3a7ea6e1de82e59dedbdeee2d03537e6',
        },
        {
          url: '/static/images/como-iniciar-con-tailwindcss/getting-started.png',
          revision: 'f9114f5a7a76d1b9ed7ea0a81bbe2d4a',
        },
        {
          url: '/static/images/como-iniciar-con-tailwindcss/sidebar.png',
          revision: '6794fa92c1ca385867542810725de2e7',
        },
        {
          url: '/static/images/configurar-tailwindcss-con-create-react-app/banner.jpg',
          revision: '2534e8eca01e2ff45843b74884c1e787',
        },
        {
          url: '/static/images/genera-automaticamente-og-image-con-react/banner.jpg',
          revision: '2dca155d15ba7738d7a96ae4b63df4ec',
        },
        {
          url: '/static/images/genera-automaticamente-og-image-con-react/flayyer-studio-play.png',
          revision: '5039358df29ee8943af6d97cee9a7a31',
        },
        {
          url:
            '/static/images/genera-automaticamente-og-image-con-react/flayyer-studio-whatsapp-agent.png',
          revision: '5beaba113249ab51ab5e349afcbaf95d',
        },
        {
          url: '/static/images/genera-automaticamente-og-image-con-react/flayyer-studio.png',
          revision: 'f43de6461abfac1105c2a24e176c2676',
        },
        {
          url:
            '/static/images/genera-automaticamente-og-image-con-react/flayyer-twitter-card-preview.png',
          revision: '20d95d4dbdc776f8650c96b40ba2ad4d',
        },
        {
          url:
            '/static/images/genera-automaticamente-og-image-con-react/flayyer-whatsapp-card-preview.png',
          revision: 'c86b8a11c3971b7010b5f085ae5d4374',
        },
        {
          url: '/static/images/genera-automaticamente-og-image-con-react/yarn-start.png',
          revision: 'f039d5465be00455cd08f2f216428a59',
        },
        {
          url: '/static/images/huebris-arts/banner.jpg',
          revision: '976746e62ea9e10ffe1c81d1280352c8',
        },
        { url: '/static/images/huebris-arts/og.jpg', revision: 'a9d43c2755ece1bcfebd2048196d7cd1' },
        {
          url: '/static/images/jordy-cardona/banner.jpg',
          revision: '0cae43ca94506eaf95ef94a4ff833856',
        },
        {
          url: '/static/images/jordy-cardona/og.jpg',
          revision: '54a5068b901ffe5cc0c976561f08cd77',
        },
        {
          url: '/static/images/mi-viaje-por-el-2020/banner.jpg',
          revision: '1844d7a4ae47651333766be21f665277',
        },
        {
          url: '/static/images/mi-viaje-por-el-2020/github-repositories.png',
          revision: 'a6f7f10a2dba831f0dd1d2e5c743127a',
        },
        {
          url: '/static/images/mi-viaje-por-el-2020/youtube-channel.png',
          revision: '1861edada6bf4e5be1eff1d3b4e6dd3e',
        },
        {
          url: '/static/images/netnovation/banner.jpg',
          revision: '0308345114e245bbe9d93f7763a98319',
        },
        { url: '/static/images/netnovation/og.jpg', revision: '7770ef7782d9913717317a9baf642f33' },
        {
          url: '/static/images/nextjs-typescript-eslint-prettier-tailwindcss/banner.jpg',
          revision: 'f0fe1d895526de862b86b596cfab620a',
        },
        {
          url: '/static/images/plexus-market/banner.jpg',
          revision: '0de03cc477b21a93e34486a0827cc39d',
        },
        {
          url: '/static/images/plexus-market/og.jpg',
          revision: '025cef82d0b69dcc8899eb48c7f95346',
        },
        {
          url: '/static/images/react-de-prop-types-a-typescript/banner.jpg',
          revision: 'f20d874b28696c441f12d0e86ca0d058',
        },
        {
          url: '/static/images/react-de-prop-types-a-typescript/console-error.png',
          revision: 'ab9063021d947aae9a74ff4bbaea686f',
        },
        {
          url: '/static/images/react-de-prop-types-a-typescript/example-function.png',
          revision: 'fe18efc463627558b971ec957b23aeac',
        },
        {
          url: '/static/images/react-de-prop-types-a-typescript/image-size-prop-error.png',
          revision: '59a90b0e4f9946bcf4c986ceb5345341',
        },
        {
          url: '/static/images/react-de-prop-types-a-typescript/single-post-error.png',
          revision: '7696613b474252aed5e6c03e52b02a52',
        },
        { url: '/static/images/sumac/banner.jpg', revision: '06e22adeca78b679979abaa56a893d54' },
        { url: '/static/images/sumac/og.jpg', revision: 'ccd5d4036b764c254ad3bd9e594a1a21' },
        {
          url: '/static/images/sya-inmobiliaria/banner.jpg',
          revision: '7c07f7faafb6013c2ae1b8405ada79c6',
        },
        {
          url: '/static/images/sya-inmobiliaria/og.jpg',
          revision: '250c90e6ec03c827ad4b67bac76624b6',
        },
        {
          url: '/static/images/tomar-capturas-en-chrome-devtools/area-screenshot-devtools.png',
          revision: 'd8c364b95b745f885141dddd651d4090',
        },
        {
          url: '/static/images/tomar-capturas-en-chrome-devtools/area-screenshot.png',
          revision: 'e791133c33a738319ff54595632ed64d',
        },
        {
          url: '/static/images/tomar-capturas-en-chrome-devtools/banner.jpg',
          revision: '72d3591616bb3f88b75f224a4a12b67f',
        },
        {
          url: '/static/images/tomar-capturas-en-chrome-devtools/devtools-options.png',
          revision: 'ec9d5bff2d42d316b863441291c45300',
        },
        {
          url: '/static/images/tomar-capturas-en-chrome-devtools/devtools-screenshot-options.png',
          revision: '607645bd6b9b12729354a47b0ff7a9e7',
        },
        {
          url: '/static/images/tomar-capturas-en-chrome-devtools/full-size-screenshot.png',
          revision: 'c09aaa79f22a8f48a0e14e20c722b1ea',
        },
        {
          url: '/static/images/tomar-capturas-en-chrome-devtools/node-screenshot-with-devtools.png',
          revision: 'd324bb1dc9c80265027d237e6b484295',
        },
        {
          url: '/static/images/tomar-capturas-en-chrome-devtools/node-screenshot.png',
          revision: '5c7335d732fb82ea913278f6f0cbc23f',
        },
        {
          url: '/static/images/tomar-capturas-en-chrome-devtools/visible-area-screenshot.png',
          revision: '401560344f9aa64590318a5873df8434',
        },
        {
          url: '/static/images/tu-casillero/banner.jpg',
          revision: '0f49f63143dbd4917e6f5b5935e481c3',
        },
        { url: '/static/images/tu-casillero/og.jpg', revision: '947018e884587ce2d7275ba23dc4937d' },
        {
          url: '/static/images/useeffect-usestate-actualizar-hooks/banner.png',
          revision: 'feaddf69092614e11556725d19914ada',
        },
        { url: '/static/images/vensal/banner.jpg', revision: '4272ddc5c4a2c2b9461c62d0cf8c4c54' },
        { url: '/static/images/vensal/og.jpg', revision: '4d698e3c20ef9c98b0819cd0589b5479' },
        {
          url: '/static/images/ya-no-necesitas-jquery/banner.png',
          revision: '918d24a0b2f3f752b0a6be2685ab3362',
        },
        {
          url: '/static/images/zipabrand/banner.jpg',
          revision: '7d2598e436fe6255ce085c9274d03f47',
        },
        { url: '/static/images/zipabrand/og.jpg', revision: 'f54ba321ffbd0d4f4b52c98e01a44453' },
        { url: '/static/lang/en.svg', revision: 'c39480d514fe1af4c7e5f62a3ac53b67' },
        { url: '/static/lang/es.svg', revision: 'c3853709f676abcc9c50ce691004cdb5' },
        { url: '/static/link.svg', revision: '99d928e927f4c1bb8d9e3b8eb2215738' },
        { url: '/static/niche.svg', revision: '5f8382c00b62ef6886efda02d95a8f96' },
        { url: '/static/nodejs.svg', revision: '29b23d3f0314a1f223b7d3768fb79ac3' },
        { url: '/static/palette.svg', revision: '71ea0f87a1c717d0366ae15f61a21cdc' },
        { url: '/static/react.svg', revision: 'ce1e0192fb368714cf25ccf4ec8e0e57' },
        { url: '/static/wordpress.svg', revision: '45af8f2377aadc766c2844b1d9b10b88' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 1, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/api\/.*$/i,
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /.*/i,
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
        ],
      }),
      'GET'
    )
})
