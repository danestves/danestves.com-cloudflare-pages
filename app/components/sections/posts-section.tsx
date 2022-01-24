// Dependencies
import { useTranslation } from 'react-i18next';
import { Link } from 'remix';
import { route } from 'routes-gen';

// Internals
import { PostCard } from '../post-card';
import type { Post } from '~/types';

type PostsSectionProps = {
  posts: Omit<Post, 'html'>[];
};

const PostsSection = ({ posts }: PostsSectionProps) => {
  let { t } = useTranslation('sections');

  return (
    <section className="container py-20" id="danestves-section-posts">
      <h2 className="text-center text-[26px] font-black uppercase text-primary">
        {t('posts.title')}{' '}
        <span aria-label="victory hand" role="img">
          ✌️
        </span>
      </h2>

      <div className="mx-auto mt-6 grid max-w-[977px] grid-cols-1 gap-5 lg:grid-cols-3">
        {posts?.map((post) => (
          <PostCard
            as={Link}
            className="block overflow-hidden rounded-lg p-1 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-primary"
            descriptionClassName="line-clamp-3"
            key={post.hash}
            post={post.frontmatter}
            prefetch="intent"
            to={route('/posts/:slug', { slug: post.slug as string })}
          />
        ))}
      </div>
    </section>
  );
};

export { PostsSection };
export type { PostsSectionProps };
