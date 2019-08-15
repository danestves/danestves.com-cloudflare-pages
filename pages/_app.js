import 'cross-fetch/polyfill'
import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import {
  ThemeProvider,
  createGenerateClassName,
  StylesProvider
} from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Helmet from 'react-helmet'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { window } from 'browser-monads'
import NProgress from 'nextjs-progressbar'
import { GraphQLProvider } from 'graphql-react'
import { withGraphQLApp } from 'next-graphql-react'
import theme from '../src/theme'
import { Navbar } from '../components/Navbar'
import '../styles/styles.css'

const location = window.location.href

const generateClassName = createGenerateClassName({
  productionPrefix: 'de'
})

class MyApp extends App {
  componentDidMount () {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    AOS.init()
  }

  render () {
    const { Component, pageProps, graphql } = this.props

    return (
      <Container>
        <Helmet>
          <script id='lazy-loading'>{`
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
          `}</script>
        </Helmet>
        <Head>
          <title>Daniel Esteves | Desarrollador Web - TSU en Informática</title>
          <meta
            property='og:url'
            content={location}
          />
        </Head>
        <NProgress color='#fff' spinner={false} />
        <StylesProvider generateClassName={generateClassName}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <GraphQLProvider graphql={graphql}>
              <Component {...pageProps} />
            </GraphQLProvider>
          </ThemeProvider>
        </StylesProvider>
      </Container>
    )
  }
}

export default withGraphQLApp(MyApp)
