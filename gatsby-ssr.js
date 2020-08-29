/* eslint-disable */
// Dependencies
import React from 'react';

// Components
import Layout from './src/components/Layout';

export const wrapPageElement = ({ element, props }) => {
  return (
    <Layout {...props}>
      <>{element}</>
    </Layout>
  );
};
