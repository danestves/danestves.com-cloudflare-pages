// Dependencies
import React from 'react';

export default ({ children }) => {
  return (
    <nav className="container relative flex flex-wrap items-center justify-end">
      {children}
    </nav>
  );
};
