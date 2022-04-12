// Dependencies
import { json } from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import { m as motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';
import { route } from 'routes-gen';
import type { LoaderFunction, MetaFunction } from '@remix-run/cloudflare';
import type { Variants } from 'framer-motion';
import type { Language } from 'remix-i18next';

// Internals
import { PostCard } from '~/components/post-card';
import { getSeoMeta } from '~/utils/seo';
import type { Context, Post } from '~/types';

type LoaderData = {
  i18n: Record<string, Language>;
  posts: Omit<Post, 'html'>[];
};

export let loader: LoaderFunction = async ({ context, request }) => {
  let { i18n } = context as Context;
  let CONTENT = context.env.CONTENT as KVNamespace;
  let locale = await i18n.lib.getLocale(request);
  let slugs = await CONTENT.list({ prefix: `posts/${locale}/` });
  let posts = await Promise.all(
    slugs.keys.map(async ({ name }) => {
      let post = (await CONTENT.get(name, 'json')) as Post;
      let { html: _html, ...data } = post;

      return data as Omit<Post, 'html'>;
    })
  );
  let translations = await i18n.lib.getTranslations(request, 'pages');

  let headers = new Headers();
  headers.set('Cache-Control', 'public, max-age=3600');
  headers.set('Vary', 'Cookie');

  let data: LoaderData = {
    i18n: translations,
    posts: posts.sort((a, b) => {
      let aDate = new Date(a.frontmatter.published_at);
      let bDate = new Date(b.frontmatter.published_at);

      return bDate.getTime() - aDate.getTime();
    }),
  };

  return json(data, { headers });
};

export let meta: MetaFunction = ({ data }) => {
  let i18n = data?.i18n;
  let title = i18n?.pages?.posts?.seo?.title;

  return {
    ...getSeoMeta({
      title,
      description: i18n?.pages?.posts?.seo?.description,
    }),
    'og:image:alt': title,
    'twitter:image:alt': title,
  };
};

export default function Posts() {
  let data = useLoaderData<LoaderData>();

  let variants: Variants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section className="w-full py-32">
      <h1 className="text-center text-[26px] font-black uppercase text-primary">
        Blog{' '}
        <span aria-label="victory hand" role="img">
          ✌️
        </span>
      </h1>

      <div className="container mx-auto mt-5 max-w-[977px]">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.posts.map((post, i) => (
            <InView key={post.hash} threshold={0.25}>
              {({ inView, ref }) => (
                <motion.div
                  animate={inView && 'animate'}
                  initial="initial"
                  ref={ref}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                  }}
                  variants={variants}
                >
                  <PostCard
                    as={Link}
                    className="block overflow-hidden rounded-lg p-1 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-primary"
                    descriptionClassName="line-clamp-3"
                    post={post.frontmatter}
                    prefetch="intent"
                    to={route('/posts/:slug', { slug: post.slug as string })}
                  />
                </motion.div>
              )}
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
