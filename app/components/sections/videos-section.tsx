// Dependencies
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { InView } from 'react-intersection-observer';
import type { Variants } from 'framer-motion';

// Internals
import { getImageBlur, getImageBuilder, getImgProps } from '~/images';
import { fromNow } from '~/utils/date';
import { BlurrableImage } from '../blurrable-image';
import { YoutubeIcon } from '../icons/youtube-icon';
import type { Videos } from '~/types';

const VideosSection = (props: Videos) => {
  let { i18n, t } = useTranslation('sections');

  let variants: Variants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <InView>
      {({ inView, ref }) => (
        <motion.section
          animate={inView && 'animate'}
          className="relative mt-5 w-full overflow-hidden pl-4 lg:-mt-24 lg:px-4"
          id="danestves-section-latest-videos"
          initial="initial"
          ref={ref}
          transition={{ duration: 0.5 }}
          variants={variants}
        >
          <h2 className="mx-auto w-full max-w-[977px] text-[26px] font-black uppercase text-primary lg:pl-8">
            <span>{t('videos.title')}</span>{' '}
            <YoutubeIcon className="ml-3 inline-block h-[22px] w-8" />
          </h2>

          <div className="overflow-x-auto">
            <div className="mx-auto mt-3 w-[977px] rounded-[20px] bg-primary/80 p-5 backdrop-blur-sm lg:py-8 lg:px-12">
              <ul className="grid grid-cols-4 gap-5">
                {props.items?.map((video, i) => (
                  <InView key={video.id}>
                    {({ inView, ref }) => (
                      <motion.li
                        animate={inView && 'animate'}
                        initial="initial"
                        ref={ref}
                        transition={{ delay: i * 0.225, duration: 0.5 }}
                        variants={{
                          initial: { x: 10, opacity: 0 },
                          animate: { x: 0, opacity: 1 },
                        }}
                      >
                        <a
                          className="block"
                          href={`https://www.youtube.com/watch?v=${video.id}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <BlurrableImage
                            blurDataUrl={getImageBlur(
                              getImageBuilder(
                                video.snippet?.thumbnails?.maxres
                                  ?.url as string,
                                video.snippet?.title as string,
                                'fetch'
                              )
                            )}
                            className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-xl"
                            img={
                              <img
                                {...getImgProps(
                                  getImageBuilder(
                                    video.snippet?.thumbnails?.maxres
                                      ?.url as string,
                                    video.snippet?.title as string,
                                    'fetch'
                                  ),
                                  {
                                    widths: [224],
                                    sizes: ['224px'],
                                  }
                                )}
                                className="absolute rounded-xl object-cover object-center"
                                height={1080}
                                loading="lazy"
                                width={1920}
                              />
                            }
                          />
                          <h3 className="sr-only font-roboto text-xs font-bold text-white lg:not-sr-only lg:mt-3 lg:line-clamp-2">
                            {video?.snippet?.title}
                          </h3>
                          <p className="sr-only font-roboto text-xs font-medium text-white lg:not-sr-only lg:mt-2">
                            {video?.statistics?.viewCount} views •{' '}
                            {fromNow({
                              date: video?.snippet?.publishedAt as string,
                              locale: i18n.language,
                            })}
                          </p>
                        </a>
                      </motion.li>
                    )}
                  </InView>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>
      )}
    </InView>
  );
};

export { VideosSection };
