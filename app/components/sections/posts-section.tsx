// Dependencies
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { InView } from 'react-intersection-observer';
import { Link } from 'remix';
import { route } from 'routes-gen';
import type { Variants } from 'framer-motion';

// Internals
import { PostCard } from '../post-card';
import type { Post } from '~/types';

type PostsSectionProps = {
  posts: Omit<Post, 'html'>[];
};

const PostsSection = ({ posts }: PostsSectionProps) => {
  let { t } = useTranslation('sections');

  let variants: Variants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <InView>
      {({ inView, ref }) => (
        <motion.section
          animate={inView && 'animate'}
          className="container py-20"
          id="danestves-section-posts"
          initial="initial"
          ref={ref}
          transition={{ delay: 0.3, duration: 0.5 }}
          variants={variants}
        >
          <h2 className="text-center text-[26px] font-black uppercase text-primary">
            {t('posts.title')}{' '}
            <span aria-label="victory hand" role="img">
              ✌️
            </span>
          </h2>

          <div className="mx-auto mt-6 grid max-w-[977px] grid-cols-1 gap-5 lg:grid-cols-3">
            {posts?.map((post, i) => (
              <InView>
                {({ inView, ref }) => (
                  <motion.div
                    animate={inView && 'animate'}
                    initial="initial"
                    key={post.hash}
                    ref={ref}
                    transition={{ delay: i * 0.3, duration: 0.5 }}
                    variants={{
                      initial: { y: 10, opacity: 0 },
                      animate: { y: 0, opacity: 1 },
                    }}
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
        </motion.section>
      )}
    </InView>
  );
};

export { PostsSection };
export type { PostsSectionProps };
