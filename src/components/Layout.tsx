// Dependencies
import * as React from 'react';
import { Helmet } from 'react-helmet';
import useDarkMode from 'use-dark-mode';
import { document } from 'browser-monads';

// Components
import { Header, Footer } from '.';

// Styles
import '../styles/main.css';

const Layout: React.FC = ({ children }) => {
  // States
  const darkmode = useDarkMode();

  // Effects
  React.useEffect(() => {
    document.getElementById(`year`).innerHTML = new Date().getFullYear();
  }, []);

  // Render
  return (
    <>
      <Header />
      <Helmet
        htmlAttributes={{
          class: darkmode.value ? `dark-mode` : `light-mode`,
        }}
      />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
