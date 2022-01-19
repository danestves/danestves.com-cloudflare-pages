// Dependencies
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

// Internals
import { getImageBlur, getImageBuilder, getImgProps } from '~/images';
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
      <div className="flex overflow-hidden rounded-lg">
        {/* <Image
          data={post.cover?.responsiveImage as ResponsiveImageType}
          objectFit="cover"
        /> */}
      </div>
      <BlurrableImage
        blurDataUrl={getImageBlur(
          getImageBuilder(post.cover.id, post.cover.alt)
        )}
        className="flex overflow-hidden rounded-lg aspect-w-16 aspect-h-9"
        img={
          <img
            {...getImgProps(getImageBuilder(post.cover.id, post.cover.alt), {
              widths: [240, 480],
              sizes: ['240px', '480px'],
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
