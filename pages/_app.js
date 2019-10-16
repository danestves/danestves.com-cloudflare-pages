import "cross-fetch/polyfill";
import React from "react";
import App from "next/app";
import Head from "next/head";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AOS from "aos";
import "aos/dist/aos.css";
import NProgress from "nextjs-progressbar";
import { GraphQLProvider } from "graphql-react";
import { withGraphQLApp } from "next-graphql-react";
import { Router as Router2, useRouter } from "next/router";
import { create } from "jss";
import rtl from "jss-rtl";
import { Navbar, ThemeProvider } from "../components";
import { KEYWORDS } from "../constants";
import "../styles/styles.scss";

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
  insertionPoint: process.browser
    ? document.querySelector("#insertion-point-jss")
    : null
});

function AppWrapper({ graphql, children }) {
  const router = useRouter();

  let pathname = router.pathname;
  let fonts = [
    "https://fonts.googleapis.com/css?family=Open+Sans|Poppins&display=swap"
  ];
  if (pathname.match(/blog/)) {
    fonts = [
      "https://fonts.googleapis.com/css?family=Open+Sans|Poppins|Fira+Code&display=swap"
    ];
  }

  return (
    <>
      <Head>
        {fonts.map(font => (
          <link rel="stylesheet" href={font} key={font} />
        ))}
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <title>Daniel Esteves | Desarrollador Web - TSU en Informática</title>
        <meta
          name="description"
          content="Daniel Esteves desarrollador web frontend ha realizado sitios web utilizando WordPress, React, Gatsby, NextJS y mucho más. Listo para realizar tu sueño."
          key="description"
        />
        <meta name="keywords" content={KEYWORDS} key="keywords" />
        <meta name="author" content="Daniel Esteves" />
        <meta name="copyright" content="Daniel Esteves" />
        {/* Facebook */}
        <meta
          property="og:title"
          content="Daniel Esteves | Desarrollador Web - TSU en Informática"
          key="og:title"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://danestves.com/static/og.jpg"
          key="og:image"
        />
        <meta
          property="og:description"
          content="Daniel Esteves desarrollador web frontend ha realizado sitios web utilizando WordPress, React, Gatsby, NextJS y mucho más. Listo para realizar tu sueño."
          key="og:description"
        />
        <meta
          property="og:url"
          content={`https://danestves.com${Router2._rewriteUrlForNextExport(
            router.asPath
          )}`}
        />
        {/* Twitter */}
        <meta
          name="twitter:title"
          content="Daniel Esteves | Desarrollador Web - TSU en Informática"
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content="Daniel Esteves desarrollador web frontend ha realizado sitios web utilizando WordPress, React, Gatsby, NextJS y mucho más. Listo para realizar tu sueño."
          key="twitter:description"
        />
        <meta
          name="twitter:image"
          content="https://danestves.com/static/og.jpg"
          key="twitter:image"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@danestves" />
        <meta
          name="twitter:image:alt"
          content="Daniel Esteves | Desarrollador Web - TSU en Informática"
          key="twitter:image:alt"
        />
        {/* Google */}
        <meta
          name="google-site-verification"
          content="z1laVtIbEpQYtR9llP5ICFgSwfLoEDHmfi_rbTh8oRg"
        />
        <meta name="msvalidate.01" content="F4F455B991A40467C9C79C17B6AC2894" />
        <meta name="yandex-verification" content="ca013f8e5304f0ad" />
      </Head>
      <NProgress color="#fff" spinner={false} />
      <GraphQLProvider graphql={graphql}>
        <StylesProvider jss={jss}>
          <ThemeProvider>
            <CssBaseline />
            <Navbar />
            {children}
          </ThemeProvider>
        </StylesProvider>
      </GraphQLProvider>
    </>
  );
}

class MyApp extends App {
  componentDidMount() {
    AOS.init();
  }

  render() {
    const { Component, graphql, pageProps } = this.props;

    return (
      <AppWrapper graphql={graphql} pageProps={pageProps}>
        <Component {...pageProps} />
      </AppWrapper>
    );
  }
}

export default withGraphQLApp(MyApp);
