// Dependencies
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

// Internals
import { getImageBuilder, getImgProps } from '~/images';
import { formatDate } from '~/utils/date';
import { BlurrableImage } from './blurrable-image';
import type { PostFrontmatter } from '~/types';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Prefer<P, T> = P & Omit<T, keyof P>;
type ElementPropsWithoutRef<T extends React.ReactType> = Pick<
  React.ComponentPropsWithoutRef<T>,
  keyof React.ComponentPropsWithoutRef<T>
>;
type OverwritableType<OwnProps, Type extends React.ReactType> = Prefer<
  OwnProps,
  ElementPropsWithoutRef<Type>
>;
type PostCardProps<T> = {
  post: PostFrontmatter;
  as?: T;
  descriptionClassName?: string;
  isHome?: boolean;
};

function PostCard<T extends React.ElementType = 'div'>({
  post,
  // @ts-ignore: is safe
  as = 'div',
  descriptionClassName,
  isHome,
  ...props
}: OverwritableType<PostCardProps<T>, T>) {
  const { i18n, t } = useTranslation();

  const Wrapper: React.ElementType = as;

  return (
    <Wrapper {...props}>
      <BlurrableImage
        blurDataUrl={post.cover.blur}
        className="flex overflow-hidden bg-primary/50 rounded-lg aspect-w-16 aspect-h-9"
        img={
          <img
            className="rounded-lg"
            {...getImgProps(getImageBuilder(post.cover.id, post.cover.alt), {
              widths: [1920, 1280, 640, 320],
              sizes: [
                '(min-width: 1920px) 100vw, 1920px',
                '(min-width: 1280px) 100vw, 1280px',
                '(min-width: 640px) 100vw, 640px',
                '(min-width: 320px) 100vw, 320px',
                '100vw',
              ],
            })}
            height={1080}
            width={1920}
          />
        }
      />
      <p className="mt-4 text-xs font-semibold text-secondary">
        {t('components.post-card.published')}{' '}
        <time dateTime={post.published_at}>
          {formatDate({
            date: new Date(post.published_at).toISOString().slice(0, 19),
            formatter: 'MMM. d yyy',
            locale: i18n.language,
          })}
        </time>
      </p>
      <h2
        className={clsx(
          'mt-[6px] text-xl font-bold text-primary-darker',
          isHome ? 'dark:text-white' : 'dark:text-primary'
        )}
      >
        {post.title}
      </h2>
      <p
        className={clsx(
          'mt-[6px] text-xs font-semibold text-[#838383]',
          descriptionClassName
        )}
      >
        {post.seo.description}
      </p>
    </Wrapper>
  );
}

export { PostCard };
export type { PostCardProps };
