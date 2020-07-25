// Dependencies
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import useDarkMode from 'use-dark-mode';
import { document } from 'browser-monads';

// Components
import { Header, Footer } from '.';

// Styles
import '../styles/main.css';

const Layout = ({ children }) => {
  // States
  const darkmode = useDarkMode();

  // Effects
  useEffect(() => {
    document.getElementById('year').innerHTML = new Date().getFullYear();
  }, []);

  // Render
  return (
    <>
      <Header />
      <Helmet
        htmlAttributes={{
          class: darkmode.value ? 'dark-mode' : 'light-mode'
        }}
        bodyAttributes={{
          class:
            'bg-gray-200 dark:bg-gray-900 dark:text-white transition-all duration-200'
        }}
      />

      <main className="container px-5">{children}</main>

      <Footer />

      <link rel="alternate" hreflang="es" href="https://danestves.com" />
      <link rel="alternate" hreflang="en" href="https://en.danestves.com" />
      <script
        type="text/javascript"
        src="https://cdn.weglot.com/weglot.min.js"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `Weglot.initialize({
              api_key: 'wg_ac63135ada309b6942ca2d05e34275383'
          });`
        }}
      />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
