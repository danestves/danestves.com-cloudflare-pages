// Dependencies
import Glide from '@glidejs/glide';
import React, { useState, useEffect } from 'react';

// Icons
import {
  HTMLIcon,
  CSSIcon,
  CodeIcon,
  WordPressIcon,
  ReactIcon,
  ArrowIcon
} from '../icons';

export default ({ element = 'glide', services, options }) => {
  // States
  const [slider] = useState(new Glide(`.${element}`, options));

  // Effects
  useEffect(() => {
    slider.mount();

    /* eslint-disable react-hooks/exhaustive-deps */
    return () => slider.destroy();
  }, []);

  // Functions
  const printIcon = icon => {
    switch (icon) {
      case 'html':
        return (
          <HTMLIcon className="w-16 h-16 mx-auto text-indigo-700 fill-current dark:text-gray-200" />
        );
      case 'css':
        return (
          <CSSIcon className="w-16 h-16 mx-auto text-indigo-700 fill-current dark:text-gray-200" />
        );
      case 'code':
        return (
          <CodeIcon className="w-16 h-16 mx-auto text-indigo-700 fill-current dark:text-gray-200" />
        );
      case 'wordpress':
        return (
          <WordPressIcon className="w-16 h-16 mx-auto text-indigo-700 fill-current dark:text-gray-200" />
        );
      case 'react':
        return (
          <ReactIcon className="w-16 h-16 mx-auto text-indigo-700 fill-current dark:text-gray-700" />
        );
      default:
        break;
    }
  };

  // Render
  return (
    <div className={element}>
      <div className="glide__track" data-glide-el="track">
        <ul className="justify-center py-6 glide__slides">
          {services.map((service, index) => (
            <li
              key={index}
              className="flex flex-col justify-between h-auto px-5 py-6 bg-white rounded-lg shadow-lg dark:bg-gray-700 glide__slide"
            >
              {printIcon(service.icon)}
              <h2 className="mt-1 text-2xl text-center capitalize dark:text-gray-200">
                {service.title}
              </h2>
              <p className="mt-2 text-base text-center dark:text-gray-500">
                {service.content}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="glide__arrows" data-glide-el="controls">
        <button
          className="left-0 text-white transition-all duration-200 bg-indigo-700 border-none rounded-full glide__arrow glide__arrow--left hover:bg-indigo-500 dark:bg-gray-200"
          data-glide-dir="<"
          aria-label="Prev"
        >
          <ArrowIcon className="w-5 h-5 text-white transform rotate-180 fill-current dark:text-gray-700" />
        </button>
        <button
          className="right-0 text-white transition-all duration-200 bg-indigo-700 border-none rounded-full glide__arrow glide__arrow--right hover:bg-indigo-500 dark:bg-gray-200"
          data-glide-dir=">"
          aria-label="Next"
        >
          <ArrowIcon className="w-5 h-5 text-white fill-current dark:text-gray-700" />
        </button>
      </div>
    </div>
  );
};
