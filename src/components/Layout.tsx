// Dependencies
import * as React from 'react';
import { PageProps } from 'gatsby';
import { motion, AnimatePresence } from 'framer-motion';
import { document } from 'browser-monads';
import Helmet from 'react-helmet';

// Components
import { Header, Footer } from '.';

// Styles
import '../styles/main.scss';

const duration = 0.5;

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: duration,
      delay: duration,
      when: `beforeChildren`,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration },
  },
};

const Layout: React.FC<PageProps> = ({ children, location }) => {
  // Effects
  React.useEffect(() => {
    document.getElementById(`year`).innerHTML = new Date().getFullYear();
  }, []);

  // Render
  return (
    <>
      <Helmet
        bodyAttributes={{
          class: `bg-secondary`,
        }}
      />
      <Header pathname={location ? location.pathname : ``} />

      <AnimatePresence>
        <motion.main
          key={location ? location.pathname : ``}
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default Layout;
