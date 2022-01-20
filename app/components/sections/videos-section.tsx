// Dependencies
import { useTranslation } from 'react-i18next';

// Internals
import { getImageBlur, getImageBuilder, getImgProps } from '~/images';
import { fromNow } from '~/utils/date';
import { BlurrableImage } from '../blurrable-image';
import { YoutubeIcon } from '../icons/youtube-icon';
import type { Videos } from '~/types';

const VideosSection = (props: Videos) => {
  let { i18n, t } = useTranslation('sections');

  return (
    <section
      className="overflow-hidden relative pl-4 mt-5 w-full lg:px-4 lg:-mt-24"
      id="danestves-section-latest-videos"
    >
      <h2 className="mx-auto w-full max-w-[977px] text-[26px] font-black text-primary uppercase lg:pl-8">
        <span>{t('videos.title')}</span>{' '}
        <YoutubeIcon className="inline-block ml-3 w-8 h-[22px]" />
      </h2>

      <div className="overflow-x-auto">
        <div className="p-5 mx-auto mt-3 w-[977px] bg-primary/80 rounded-[20px] backdrop-blur-sm lg:py-8 lg:px-12">
          <ul className="grid grid-cols-4 gap-5">
            {props.items?.map((video) => (
              <li key={video.id}>
                <a
                  className="block"
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <BlurrableImage
                    blurDataUrl={getImageBlur(
                      getImageBuilder(
                        video.snippet?.thumbnails?.maxres?.url as string,
                        video.snippet?.title as string,
                        'fetch'
                      )
                    )}
                    className="overflow-hidden relative rounded-xl aspect-w-16 aspect-h-9"
                    img={
                      <img
                        {...getImgProps(
                          getImageBuilder(
                            video.snippet?.thumbnails?.maxres?.url as string,
                            video.snippet?.title as string,
                            'fetch'
                          ),
                          {
                            widths: [224],
                            sizes: ['224px'],
                          }
                        )}
                        className="object-cover object-center absolute"
                        height={1080}
                        loading="lazy"
                        width={1920}
                      />
                    }
                  />
                  <h3 className="font-roboto text-xs font-bold text-white sr-only lg:mt-3 lg:not-sr-only lg:line-clamp-2">
                    {video?.snippet?.title}
                  </h3>
                  <p className="font-roboto text-xs font-medium text-white sr-only lg:mt-2 lg:not-sr-only">
                    {video?.statistics?.viewCount} views •{' '}
                    {fromNow({
                      date: video?.snippet?.publishedAt as string,
                      locale: i18n.language,
                    })}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { VideosSection };
