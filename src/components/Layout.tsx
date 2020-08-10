// Dependencies
import * as React from 'react';
import { document } from 'browser-monads';

// Components
import { Header, Footer } from '.';

// Styles
import '../styles/main.css';

const Layout: React.FC = ({ children }) => {
  // Effects
  React.useEffect(() => {
    document.getElementById(`year`).innerHTML = new Date().getFullYear();
  }, []);

  // Render
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
