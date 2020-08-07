// Dependencies
import * as React from 'react';
import LazyLoad from 'react-lazyload';

type ImageProps = {
  alt: string;
  src: string;
};

const Image: React.FC<ImageProps> = ({ alt, src }) => (
  <LazyLoad height={200}>
    <img src={src} alt={`${alt} | Daniel Esteves`} />
  </LazyLoad>
);

export default Image;
