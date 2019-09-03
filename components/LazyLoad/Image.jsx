/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'

export default ({ src, alt, placeHolder, ...props }) => {
  const [imageSrc, setImageSrc] = useState(placeHolder)
  const [imageRef, setImageRef] = useState()

  const onLoad = e => {
    e.target.classList.add('loaded')
  }

  const onError = e => {
    e.target.classList.add('has-error')
  }

  useEffect(() => {
    let observer
    let didCancel = false

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src)
                observer.unobserve(imageRef)
              }
            })
          },
          {
            threshold: 0.01,
            rootMargin: '75%'
          }
        )
        observer.observe(imageRef)
      } else {
        // Old browsers fallback
        setImageSrc(src)
      }
    }
    return () => {
      didCancel = true
      // on component cleanup, we remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef)
      }
    }
  }, [src, imageSrc, imageRef])

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
      {...props}
    />
  )
}
