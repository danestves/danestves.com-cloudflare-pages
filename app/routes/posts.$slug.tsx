// Dependencies
import { useTranslation } from 'react-i18next';
import { json, useLoaderData } from 'remix';
import type { LinksFunction, LoaderFunction } from 'remix';
import type { Language } from 'remix-i18next';

// Internals
import { BlurrableImage } from '~/components/blurrable-image';
import { mdxComponents } from '~/components/mdx-components';
import { ShareIcon } from '~/components/icons/share-icon';
import { useShare } from '~/hooks/use-share';
import { getImageBlur, getImageBuilder, getImgProps, images } from '~/images';
import prismOne from '~/styles/prism-one.css';
import { formatDate } from '~/utils/date';
import { i18n } from '~/utils/i18n.server';
import { getMDXComponent } from '~/utils/mdx.client';
import type { Post, PostFrontmatter } from '~/types';

declare var CONTENT: KVNamespace;

export let links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: prismOne,
    },
  ];
};

type LoaderData = {
  i18n: Record<string, Language>;
  frontmatter: PostFrontmatter;
  html: string;
  slug: string;
  code?: string;
};

export let loader: LoaderFunction = async ({ params, request }) => {
  let slug = params.slug;
  if (slug === undefined) {
    throw new Response('Not Found', { status: 404 });
  }

  let [locale, translations] = await Promise.all([
    i18n.getLocale(request),
    i18n.getTranslations(request, 'posts'),
  ]);
  let post = await CONTENT.get(`posts/${locale}/${slug}`, 'json');
  if (post === undefined) {
    throw new Response('Not Found', { status: 404 });
  }
  let { code, frontmatter, hash, html } = post as Post;

  let etag = request.headers.get('If-None-Match');
  if (etag === hash) {
    throw new Response('Not Modified', { status: 304 });
  }

  let headers = new Headers();
  if (hash) {
    headers.set('ETag', hash);
  }
  headers.set('Cache-Control', 'max-age=43200');

  let data: LoaderData = {
    i18n: translations,
    code,
    frontmatter,
    html,
    slug,
  };

  return json(data, { headers });
};

export default function PostPage() {
  let { i18n, t } = useTranslation('posts');
  let { code, html, frontmatter: post, slug } = useLoaderData<LoaderData>();

  let { canShare, hasShared, share } = useShare({
    title: post?.title as string,
    text: post?.seo?.description as string,
    url: `https://danestves.com/posts/${slug}`,
  });

  let Component = null;
  if (typeof window !== 'undefined' && code) {
    Component = getMDXComponent(code);
  }

  return (
    <section className="py-32 w-full">
      <h2 className="text-[26px] font-black text-center text-primary uppercase">
        Blog{' '}
        <span aria-label="victory hand" role="img">
          ✌️
        </span>
      </h2>

      <div className="container mx-auto mt-5 max-w-[977px]">
        <div className="grid grid-cols-12 gap-y-5 items-center mb-6 md:gap-10">
          <div className="col-span-12 md:col-span-7">
            <BlurrableImage
              blurDataUrl={post.cover.blur}
              className="flex overflow-hidden bg-primary/50 rounded-[18px] shadow aspect-w-16 aspect-h-9"
              img={
                <img
                  {...getImgProps(
                    getImageBuilder(post.cover.id, post.cover.alt),
                    {
                      widths: [240, 480, 960, 1440, 1920, 2560],
                      sizes: [
                        '(max-width:1023px) 80vw',
                        '(min-width:1024px) and (max-width:1620px) 67vw',
                        '960px',
                      ],
                    }
                  )}
                  height={1080}
                  width={1920}
                />
              }
            />
            <div className="flex relative items-end px-6 -mt-10 space-x-4">
              <BlurrableImage
                blurDataUrl={getImageBlur(
                  getImageBuilder(images.me.id, images.me.alt),
                  10
                )}
                className="overflow-hidden relative w-20 h-20 rounded-full drop-shadow-lg"
                img={
                  <img
                    className="absolute w-full"
                    {...getImgProps(
                      getImageBuilder(images.me.id, images.me.alt),
                      {
                        widths: [128],
                        sizes: ['(min-width: 128px) 100vw, 128px', '100vw'],
                      }
                    )}
                    height={80}
                    width={80}
                  />
                }
              />

              {/* <Views slug={post.slug} views={views} /> */}

              <div className="flex absolute right-6 bottom-6 flex-1 justify-end">
                <button
                  className="flex z-10 items-center py-2 px-3 text-xs font-bold text-black bg-secondary rounded-full"
                  onClick={share}
                  type="button"
                >
                  <span className="sr-only sm:not-sr-only">
                    {hasShared
                      ? !canShare
                        ? t('sharer.copied')
                        : t('sharer.shared')
                      : t('sharer.share')}
                  </span>
                  <ShareIcon
                    aria-hidden="true"
                    className="w-4 h-4 sm:-mr-1 sm:ml-2"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-12 space-y-4 md:col-span-5">
            <h1 className="text-2xl font-bold text-primary">{post?.title}</h1>
            <p className="text-xs font-bold text-secondary">
              {t('published')}{' '}
              <time dateTime={new Date(post.published_at).toISOString()}>
                {formatDate({
                  date: new Date(post.published_at).toISOString(),
                  formatter: 'MMM. d yyy',
                  locale: i18n.language,
                })}
              </time>
            </p>
            <p className="text-xs font-bold text-[#B5B5B5] dark:text-[#b5b5b5] whitespace-pre-line">
              {post?.seo?.description}
            </p>
          </div>
        </div>

        <div
          className="max-w-full prose prose-lg dark:prose-dark"
          dangerouslySetInnerHTML={!Component ? { __html: html } : undefined}
        >
          {Component ? (
            <Component
              // @ts-ignore: we can pass any component that we want to render
              components={mdxComponents}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
