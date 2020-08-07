// Dependencies
import * as React from 'react';

const Navbar: React.FC = ({ children }) => {
  return <nav className="container relative flex flex-wrap items-center justify-end">{children}</nav>;
};

export default Navbar;
