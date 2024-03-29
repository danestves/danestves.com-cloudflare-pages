// Dependencies
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/cloudflare';
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/cloudflare';
import type { Language } from 'remix-i18next';

// Internals
import { HeroSection } from '~/components/sections/hero-section';
import { PostsSection } from '~/components/sections/posts-section';
import { VideosSection } from '~/components/sections/videos-section';
import { getSeoMeta } from '~/utils/seo';
import { getVideos } from '~/utils/youtube.server';
import type { Context, Post, Videos } from '~/types';

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

export let loader: LoaderFunction = async ({ context, request }) => {
  let { i18n } = context as Context;
  let CONTENT = context.env.CONTENT as KVNamespace;
  let [locale, translations, videos] = await Promise.all([
    i18n.lib.getLocale(request),
    i18n.lib.getTranslations(request, 'sections'),
    getVideos(context.env.YOUTUBE_API_KEY),
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

  let headers = new Headers();
  headers.set('Cache-Control', 'private, max-age=21600');
  headers.set('Vary', 'Cookie');

  let data: LoaderData = {
    i18n: translations,
    posts: orderedPosts.slice(0, 3),
    videos,
  };

  return json(data, {
    headers,
  });
};

export let meta: MetaFunction = () => {
  return {
    ...getSeoMeta({
      title: 'Daniel Esteves - @danestves',
    }),
  };
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
