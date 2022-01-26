// Dependencies
import { json, useLoaderData } from 'remix';
import type { LinksFunction, LoaderFunction } from 'remix';
import type { Language } from 'remix-i18next';

// Internals
import { HeroSection } from '~/components/sections/hero-section';
import { PostsSection } from '~/components/sections/posts-section';
import { i18n } from '~/utils/i18n.server';
import { getVideos } from '~/utils/youtube.server';
import { VideosSection } from '~/components/sections/videos-section';
import type { Post, Videos } from '~/types';

declare var CONTENT: KVNamespace;

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
  posts: Omit<Post, 'html'>[];
  videos: Videos;
};

export let loader: LoaderFunction = async ({ request }) => {
  let [locale, translations, videos] = await Promise.all([
    i18n.getLocale(request),
    i18n.getTranslations(request, 'sections'),
    getVideos(),
  ]);
  let slugs = await CONTENT.list({
    prefix: `posts/${locale}/`,
  });
  let posts = await Promise.all(
    slugs.keys.map(async ({ name }) => {
      let post = (await CONTENT.get(name, 'json')) as Post;
      let { html: _html, ...data } = post;

      return data as Omit<Post, 'html'>;
    })
  );
  let orderedPosts = posts.sort((a, b) => {
    let aDate = new Date(a.frontmatter.published_at);
    let bDate = new Date(b.frontmatter.published_at);

    return bDate.getTime() - aDate.getTime();
  });

  let data: LoaderData = {
    i18n: translations,
    posts: orderedPosts.slice(0, 3),
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
      <PostsSection posts={data.posts} />
    </>
  );
}
