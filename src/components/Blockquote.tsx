// Dependencies
import * as React from 'react';

const Blockquote: React.FC = ({ children }) => (
  <blockquote className="pl-6 mb-6 italic text-gray-500 border-l-8 border-gray-400 dark:text-gray-700 dark:border-gray-700">
    {children}
  </blockquote>
);

export default Blockquote;
