// Dependencies
import * as React from 'react';

const InlineCode: React.FC = ({ children }) => (
  <code style={{ backgroundColor: `rgb(39, 40, 34)` }} className="p-1 text-sm text-gray-100 whitespace-normal rounded">
    {children}
  </code>
);

export default InlineCode;
