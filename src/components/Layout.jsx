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
      />

      <main>{children}</main>

      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
