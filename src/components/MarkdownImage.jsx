// Dependencies
import React from 'react';
import LazyLoad from 'react-lazyload';

export default ({ alt, src }) => (
  <LazyLoad height={200}>
    <img src={src} alt={`${alt} | Daniel Esteves`} />
  </LazyLoad>
);
