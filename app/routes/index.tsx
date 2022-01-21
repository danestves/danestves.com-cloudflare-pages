// Dependencies
import { json, useLoaderData } from 'remix';
import type { LinksFunction, LoaderFunction } from 'remix';
import type { Language } from 'remix-i18next';

// Internals
import { HeroSection } from '~/components/sections/hero-section';
import { i18n } from '~/utils/i18n.server';
import { getVideos } from '~/utils/youtube.server';
import { VideosSection } from '~/components/sections/videos-section';
import type { Videos } from '~/types';

export let links: LinksFunction = () => {
  return [
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Roboto-Medium.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Roboto-Regular.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
  ];
};

type LoaderData = {
  i18n: Record<string, Language>;
  videos: Videos;
};

export let loader: LoaderFunction = async ({ request }) => {
  let [translations, videos] = await Promise.all([
    i18n.getTranslations(request, 'sections'),
    getVideos(),
  ]);

  let data: LoaderData = {
    i18n: translations,
    videos,
  };

  return json(data, {
    headers: {
      'Cache-Control': `private, max-age=21600, must-revalidate`,
      Vary: 'Cookie',
    },
  });
};

export default function Index() {
  let data = useLoaderData<LoaderData>();

  return (
    <>
      <HeroSection />
      <VideosSection {...data.videos} />
    </>
  );
}
