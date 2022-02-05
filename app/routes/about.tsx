// Dependencies
import { useTranslation } from 'react-i18next';
import { json, MetaFunction } from 'remix';
import type { LoaderFunction } from 'remix';
import type { Language } from 'remix-i18next';

// Internals
import { HeroSection } from '~/components/sections/hero-section';
import { i18n } from '~/utils/i18n.server';
import { FileIcon } from '@radix-ui/react-icons';
import { LinkedInIcon } from '~/components/icons/linkedin-icon';
import { getSeoMeta } from '~/utils/seo';
import { getImageBuilder, images } from '~/images';

export let meta: MetaFunction = ({ data }) => {
  let i18n = data?.i18n;
  let title = i18n?.pages?.about?.seo?.title;
  let image = getImageBuilder(images.aboutOg.id, images.aboutOg.alt);
  let og = image({ format: 'jpg' });

  return {
    ...getSeoMeta({
      title,
      description: i18n?.pages?.about?.seo?.description,
    }),
    'og:image': og,
    'og:image:alt': title,
    'twitter:image': og,
    'twitter:image:alt': title,
  };
};

type LoaderData = {
  i18n: Record<string, Language>;
};

export let loader: LoaderFunction = async ({ request }) => {
  let [translations] = await Promise.all([
    i18n.getTranslations(request, ['pages', 'sections']),
  ]);

  let headers = new Headers();
  headers.set('Cache-Control', 'private, max-age=604800');
  headers.set('Vary', 'Cookie');

  let data: LoaderData = {
    i18n: translations,
  };

  return json(data, {
    headers,
  });
};

export default function AboutPage() {
  let { t } = useTranslation('pages');
  let paragraphs = t('about.paragraphs', { returnObjects: true }) as string[];

  return (
    <>
      <HeroSection />

      <div className="container max-w-[977px] space-y-4">
        <h1 className="text-secondary-darker text-center text-[26px] font-black uppercase dark:text-secondary">
          {t('about.title')}{' '}
          <span aria-label="victory hand" role="img">
            ✌️
          </span>
        </h1>
        {paragraphs?.length
          ? paragraphs?.map((text, i) => (
              <p
                className="text-lg text-[#989898] dark:text-[#B1B1B1]"
                dangerouslySetInnerHTML={{ __html: text }}
                key={i}
              />
            ))
          : null}
        <div className="flex justify-center space-x-4">
          <a
            className="text-secondary-darker inline-flex min-w-[100px] items-center rounded-md border border-primary bg-transparent py-2 px-4 hover:bg-primary dark:text-[#B1B1B1] dark:hover:text-[#292929]"
            href="https://www.linkedin.com/in/danestves/"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t('about.buttons.0')}
            <LinkedInIcon className="ml-2 -mr-1 inline h-auto w-5" />
          </a>
          <a
            className="text-secondary-darker inline-flex min-w-[100px] items-center rounded-md border border-transparent bg-primary py-2 px-4 transition duration-100 hover:brightness-105 dark:text-[#292929]"
            download
            href="https://read.cv/danestves"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t('about.buttons.1')}
            <FileIcon className="ml-2 -mr-1 inline h-auto w-5" />
          </a>
        </div>
      </div>
    </>
  );
}
