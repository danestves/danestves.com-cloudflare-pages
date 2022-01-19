// Dependencies
import { useTranslation } from 'react-i18next';

// Internals
import { getImageBlur, getImageBuilder, getImgProps, images } from '~/images';
import { BlurrableImage } from '../blurrable-image';
import { Rings } from '../rings';

function HeroSection() {
  let { t } = useTranslation('sections');

  return (
    <section
      className="container overflow-hidden relative"
      id="danestves-section-hero"
    >
      <div className="relative left-1/2 mx-auto w-[563px] h-auto -translate-x-1/2 sm:left-[46%] md:left-[38%] lg:left-auto lg:w-full lg:max-w-[731px] lg:transform-none">
        <Rings className="w-full h-auto" />
      </div>

      <div className="absolute top-1/2 left-1/2 mt-2 -translate-x-1/2 -translate-y-1/2 lg:mt-3">
        <div className="-mt-16 w-[249px] max-w-none h-auto sm:w-[248px] md:mt-auto lg:w-[320px]">
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
                    widths: [320, 248],
                    sizes: [
                      '(max-width: 320px) 100vw, 320px',
                      '(max-width: 768px) 100vw, 248px',
                      '248px',
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
      <div className="pt-3 pr-5 pb-4 pl-8 mx-auto -mt-16 w-full max-w-[332px] bg-secondary/80 dark:bg-secondary/[0.65] rounded-[20px] backdrop-blur-sm md:-mt-32 lg:absolute lg:top-1/2 lg:right-1/2 lg:mt-auto lg:mr-32 lg:-translate-y-1/2">
        <h1 className="text-2xl font-black text-white uppercase">
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
      <div className="hidden absolute bottom-1/4 lg:block lg:right-[13%] xl:right-[20%]">
        {/* <Search /> */}
      </div>
    </section>
  );
}

export { HeroSection };
