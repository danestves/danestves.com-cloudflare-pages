// Dependencies
import * as React from 'react';
import clsx from 'clsx';

// Internals
import { useSSRLayoutEffect } from '~/utils/misc';

function BlurrableImage({
  img,
  blurDataUrl,
  ...rest
}: {
  img: JSX.Element &
    React.ReactElement<React.ImgHTMLAttributes<HTMLImageElement>>;
  blurDataUrl?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [visible, setVisible] = React.useState(false);
  const jsImgElRef = React.useRef<HTMLImageElement>(null);

  // make this happen asap
  // if it's alrady loaded, don't bother fading it in.
  useSSRLayoutEffect(() => {
    if (jsImgElRef.current?.complete) setVisible(true);
  }, []);

  React.useEffect(() => {
    if (!jsImgElRef.current) return;
    if (jsImgElRef.current.complete) return;

    let current = true;
    jsImgElRef.current.addEventListener('load', () => {
      if (!jsImgElRef.current || !current) return;
      setTimeout(() => {
        setVisible(true);
      }, 0);
    });

    return () => {
      current = false;
    };
  }, []);

  const jsImgEl = React.cloneElement(img, {
    ref: jsImgElRef,
    className: clsx(img.props.className, 'transition-opacity', {
      'opacity-0': !visible,
    }),
  });

  return (
    <div {...rest}>
      {blurDataUrl ? (
        <>
          <img
            alt={img.props.alt}
            className={clsx(img.props.className, 'transition-opacity', {
              'opacity-0': visible,
            })}
            key={blurDataUrl}
            src={blurDataUrl}
          />
          <div className={clsx(img.props.className, 'backdrop-blur-xl')} />
        </>
      ) : null}
      {jsImgEl}
      <noscript>{img}</noscript>
    </div>
  );
}

export { BlurrableImage };
