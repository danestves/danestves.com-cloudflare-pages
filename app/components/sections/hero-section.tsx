// Dependencies\
import { useTranslation } from 'react-i18next';

// Internals
import { getImageBlur, getImageBuilder, getImgProps, images } from '~/images';
import { BlurrableImage } from '../blurrable-image';
import { Rings } from '../rings';

function HeroSection() {
  let { t } = useTranslation('sections');

  return (
    <section
      className="container relative overflow-hidden"
      id="danestves-section-hero"
    >
      <div className="relative left-1/2 mx-auto h-auto w-[563px] -translate-x-1/2 sm:left-[46%] md:left-[38%] lg:left-auto lg:w-full lg:max-w-[731px] lg:transform-none">
        <Rings className="h-auto w-full" />
      </div>

      <div className="absolute top-1/2 left-1/2 mt-2 -translate-x-1/2 -translate-y-1/2 lg:mt-3">
        <div className="-mt-16 h-auto w-[249px] max-w-none sm:w-[248px] md:mt-auto lg:w-[320px]">
          <BlurrableImage
            blurDataUrl={getImageBlur(
              getImageBuilder(images.heroMask.id, images.heroMask.alt)
            )}
            className="relative pb-[calc((637/646)*100%)]"
            img={
              <img
                className="absolute w-full"
                {...getImgProps(
                  getImageBuilder(images.heroMask.id, images.heroMask.alt),
                  {
                    widths: [318, 646, 984, 1312, 1740],
                    sizes: [
                      '(max-width: 1023px) 80vw',
                      '(min-width: 1024px) and (max-width: 1279px) 50vw',
                      '(min-width: 1280px) 984px',
                    ],
                  }
                )}
                height={646}
                width={637}
              />
            }
          />
        </div>
      </div>

      {/* Floating Card */}
      <div className="mx-auto -mt-16 w-full max-w-[332px] rounded-[20px] bg-secondary/80 pt-3 pr-5 pb-4 pl-8 backdrop-blur-sm dark:bg-secondary/[0.65] md:-mt-32 lg:absolute lg:top-1/2 lg:right-1/2 lg:mt-auto lg:mr-32">
        <h1 className="text-2xl font-black uppercase text-white">
          daniel esteves{' '}
          <span aria-label="victory hand" role="img">
            ✌️
          </span>
        </h1>
        <p className="mt-1 text-xs text-white">
          Senior Frontend Engineer @{' '}
          <a
            href="https://www.reworth.co/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Reworth
          </a>
          . <br />{' '}
          <span
            dangerouslySetInnerHTML={{
              __html: t('hero.description'),
            }}
          />
        </p>
      </div>

      {/* Search Trigger */}
      <div className="absolute bottom-1/4 hidden lg:right-[13%] lg:block xl:right-[20%]">
        {/* <Search /> */}
      </div>
    </section>
  );
}

export { HeroSection };
