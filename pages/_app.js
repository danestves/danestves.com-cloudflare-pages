import 'cross-fetch/polyfill'
import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { ThemeProvider, StylesProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AOS from 'aos'
import 'aos/dist/aos.css'
import NProgress from 'nextjs-progressbar'
import { GraphQLProvider } from 'graphql-react'
import { withGraphQLApp } from 'next-graphql-react'
import { Router as Router2, withRouter } from 'next/router'
import theme from '../src/theme'
import { Navbar } from '../components'
import { keywords } from '../constants'
import '../styles/styles.css'

class MyApp extends App {
  componentDidMount () {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    AOS.init()
  }

  render () {
    const { Component, pageProps, graphql, router } = this.props

    return (
      <Container>
        <Head>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
          />
          <title>Daniel Esteves | Desarrollador Web - TSU en Informática</title>
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
          <meta
            property='og:url'
            content={`https://danestves.com${Router2._rewriteUrlForNextExport(router.asPath)}`}
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
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
        </Head>
        <NProgress color='#fff' spinner={false} />
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <GraphQLProvider graphql={graphql}>
              <CssBaseline />
              <Navbar />
              <Component {...pageProps} />
            </GraphQLProvider>
          </ThemeProvider>
        </StylesProvider>
      </Container>
    )
  }
}

export default withGraphQLApp(withRouter(MyApp))
