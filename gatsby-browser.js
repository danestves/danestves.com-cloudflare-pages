/* eslint-disable */
// Dependencies
import React from 'react';

// Components
import Layout from './src/components/Layout';

const transitionDelay = 100;

export const wrapPageElement = ({ element, props }) => {
  return (
    <Layout {...props}>
      <>{element}</>
    </Layout>
  );
};

export const shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
  if (location.action === `PUSH`) {
    window.setTimeout(() => window.scrollTo(0, 0), transitionDelay);
  } else {
    const savedPosition = getSavedScrollPosition(location);
    window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), transitionDelay);
  }
  return false;
};
