import 'cross-fetch/polyfill'
import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { StylesProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AOS from 'aos'
import 'aos/dist/aos.css'
import NProgress from 'nextjs-progressbar'
import { GraphQLProvider } from 'graphql-react'
import { withGraphQLApp } from 'next-graphql-react'
import { Router as Router2, useRouter } from 'next/router'
import { Navbar, ThemeProvider } from '../components'
import { KEYWORDS } from '../constants'
import '../styles/styles.scss'

function AppWrapper({ graphql, children }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  const router = useRouter()

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
        />
        <title>Daniel Esteves | Desarrollador Web - TSU en Informática</title>
        <meta
          name='description'
          content='Daniel Esteves desarrollador web frontend ha realizado sitios web utilizando WordPress, React, Gatsby, NextJS y mucho más. Listo para realizar tu sueño.'
          key='description'
        />
        <meta name='keywords' content={KEYWORDS} key='keywords' />
        <meta name='author' content='Daniel Esteves' />
        <meta name='copyright' content='Daniel Esteves' />
        <link rel='alternate' hrefLang='es' href='https://danestves.com/' />
        <link
          rel='apple-touch-icon'
          sizes='57x57'
          href='/static/favicons/apple-icon-57x57.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='60x60'
          href='/static/favicons/apple-icon-60x60.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='72x72'
          href='/static/favicons/apple-icon-72x72.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='76x76'
          href='/static/favicons/apple-icon-76x76.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='114x114'
          href='/static/favicons/apple-icon-114x114.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='120x120'
          href='/static/favicons/apple-icon-120x120.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='144x144'
          href='/static/favicons/apple-icon-144x144.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='152x152'
          href='/static/favicons/apple-icon-152x152.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/static/favicons/apple-icon-180x180.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/static/favicons/android-icon-192x192.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/static/favicons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='96x96'
          href='/static/favicons/favicon-96x96.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/static/favicons/favicon-16x16.png'
        />
        <meta name='msapplication-TileColor' content='#0090da' />
        <meta
          name='msapplication-TileImage'
          content='/static/favicons/ms-icon-144x144.png'
        />
        {/* Facebook */}
        <meta
          property='og:title'
          content='Daniel Esteves | Desarrollador Web - TSU en Informática'
          key='og:title'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:image'
          content='https://danestves.com/static/og.jpg'
          key='og:image'
        />
        <meta
          property='og:description'
          content='Daniel Esteves desarrollador web frontend ha realizado sitios web utilizando WordPress, React, Gatsby, NextJS y mucho más. Listo para realizar tu sueño.'
          key='og:description'
        />
        <meta
          property='og:url'
          content={`https://danestves.com${Router2._rewriteUrlForNextExport(
            router.asPath
          )}`}
        />
        {/* Twitter */}
        <meta
          name='twitter:title'
          content='Daniel Esteves | Desarrollador Web - TSU en Informática'
          key='twitter:title'
        />
        <meta
          name='twitter:description'
          content='Daniel Esteves desarrollador web frontend ha realizado sitios web utilizando WordPress, React, Gatsby, NextJS y mucho más. Listo para realizar tu sueño.'
          key='twitter:description'
        />
        <meta
          name='twitter:image'
          content='https://danestves.com/static/og.jpg'
          key='twitter:image'
        />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@danestves' />
        <meta
          name='twitter:image:alt'
          content='Daniel Esteves | Desarrollador Web - TSU en Informática'
          key='twitter:image:alt'
        />
        {/* Google */}
        <meta
          name='google-site-verification'
          content='z1laVtIbEpQYtR9llP5ICFgSwfLoEDHmfi_rbTh8oRg'
        />
        <meta name='msvalidate.01' content='F4F455B991A40467C9C79C17B6AC2894' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Google+Sans:400,700|Poppins:400,500,600&display=swap'
        />
      </Head>
      <NProgress color='#fff' spinner={false} />
      <GraphQLProvider graphql={graphql}>
        <StylesProvider injectFirst>
          <ThemeProvider>
            <CssBaseline />
            <Navbar />
            {children}
          </ThemeProvider>
        </StylesProvider>
      </GraphQLProvider>
    </>
  )
}

class MyApp extends App {
  componentDidMount() {
    AOS.init()
  }

  render() {
    const { Component, graphql, pageProps } = this.props

    return (
      <AppWrapper graphql={graphql} pageProps={pageProps}>
        <Component {...pageProps} />
      </AppWrapper>
    )
  }
}

export default withGraphQLApp(MyApp)
