// Dependencies
import { motion } from 'framer-motion';
import { Link, json, useLoaderData } from 'remix';
import { route } from 'routes-gen';
import type { Variants } from 'framer-motion';
import type { LoaderFunction } from 'remix';

// Internals
import { PostCard } from '~/components/post-card';
import { i18n } from '~/utils/i18n.server';
import type { Post } from '~/types';

declare var CONTENT: KVNamespace;

type LoaderData = {
  posts: Omit<Post, 'html'>[];
};

export let loader: LoaderFunction = async ({ request }) => {
  let locale = await i18n.getLocale(request);
  let slugs = await CONTENT.list({ prefix: `posts/${locale}/` });
  let posts = await Promise.all(
    slugs.keys.map(async ({ name }) => {
      let post = (await CONTENT.get(name, 'json')) as Post;
      let { html: _html, ...data } = post;

      return data as Omit<Post, 'html'>;
      // order by published_at
    })
  );

  let data: LoaderData = {
    posts: posts.sort((a, b) => {
      let aDate = new Date(a.frontmatter.published_at);
      let bDate = new Date(b.frontmatter.published_at);

      return bDate.getTime() - aDate.getTime();
    }),
  };

  return json(data);
};

export default function Posts() {
  let data = useLoaderData<LoaderData>();

  let variants: Variants = {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section className="py-32 w-full">
      <h1 className="text-[26px] font-black text-center text-primary uppercase">
        Blog{' '}
        <span aria-label="victory hand" role="img">
          ✌️
        </span>
      </h1>

      <div className="container mx-auto mt-5 max-w-[977px]">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.posts.map((post, i) => (
            <motion.div
              animate="animate"
              initial="initial"
              key={post.hash}
              transition={{ duration: 0.3, delay: i * 0.2 }}
              variants={variants}
            >
              <PostCard
                as={Link}
                className="block overflow-hidden p-1 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-primary transition-colors duration-200"
                descriptionClassName="line-clamp-3"
                post={post.frontmatter}
                prefetch="intent"
                to={route('/posts/:slug', { slug: post.slug as string })}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
