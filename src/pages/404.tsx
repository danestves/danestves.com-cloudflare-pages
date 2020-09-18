// Dependencies
import * as React from 'react';
import { window } from 'browser-monads';

import { SEO, Emoji } from '../components';

const NotFoundPage: React.FunctionComponent = () => {
  return (
    <>
      <SEO title="404: Not found" />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-semibold text-white">
          NOT FOUND <Emoji>⚠️</Emoji>
        </h1>
        <p className="text-white">You just hit a route that doesn&#39;t exist... the sadness.</p>
      </div>
    </>
  );
};

export default NotFoundPage;
