// Dependencies
import * as React from 'react';
import Glide from '@glidejs/glide';
import Img from 'gatsby-image';
import Markdown from 'react-markdown';

// Icons
import { ArrowIcon } from '../icons';

// Types
import { Features as TFeatures } from '../types';

type ServicesProps = {
  element?: string;
  features?: TFeatures[];
  options?: {
    type: string;
    controls: boolean;
    perView?: number;
    focusAt?: string;
    breakpoints?: Record<string, unknown>;
  };
};

const Features: React.FC<ServicesProps> = ({ element = `glide`, features, options }) => {
  // States
  const [slider] = React.useState(new Glide(`.${element}`, options));

  // Effects
  React.useEffect(() => {
    slider.mount();

    return () => slider.destroy();
  }, []);

  // Render
  return (
    <div className={element}>
      <div className="glide__track" data-glide-el="track">
        <ul className="justify-center py-6 glide__slides">
          {features?.map(item => (
            <li key={item.id} className="glide__slide">
              <div className="font-sans text-4xl font-bold text-center text-primary">
                <Markdown source={item.title} />
              </div>

              <Img fluid={item.icon.childImageSharp.fluid} alt={item.title} className="block w-32 h-32 mx-auto mt-8" />

              <p className="w-full max-w-4xl px-5 mx-auto mt-12 font-mono text-xl text-center text-primary">
                {item.subtitle}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="glide__arrows" data-glide-el="controls">
        <button
          className="left-0 transition-all duration-200 bg-transparent border-none rounded-full text-primary glide__arrow glide__arrow--left hover:opacity-75"
          data-glide-dir="<"
          aria-label="Prev"
        >
          <ArrowIcon className="w-5 h-5 transform rotate-180 fill-current" />
        </button>
        <button
          className="right-0 transition-all duration-200 bg-transparent border-none rounded-full text-primary glide__arrow glide__arrow--right hover:opacity-75"
          data-glide-dir=">"
          aria-label="Next"
        >
          <ArrowIcon className="w-5 h-5 fill-current" />
        </button>
      </div>
    </div>
  );
};

export default Features;
