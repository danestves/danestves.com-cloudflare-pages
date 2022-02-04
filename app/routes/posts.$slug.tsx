// Dependencies
import { useTranslation } from 'react-i18next';
import { json, useLoaderData } from 'remix';
import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix';
import type { Language } from 'remix-i18next';

// Internals
import { BlurrableImage } from '~/components/blurrable-image';
import { mdxComponents } from '~/components/mdx-components';
import { Views } from '~/components/views';
import { ShareIcon } from '~/components/icons/share-icon';
import { useShare } from '~/hooks/use-share';
import { getImageBlur, getImageBuilder, getImgProps, images } from '~/images';
import prismOne from '~/styles/prism-one.css';
import { formatDate } from '~/utils/date';
import { i18n } from '~/utils/i18n.server';
import { getMDXComponent } from '~/utils/mdx.client';
import { getSeoMeta } from '~/utils/seo';
import type { Post, PostFrontmatter, SEOHandle } from '~/types';

declare var CONTENT: KVNamespace;
declare var VIEWS: KVNamespace;

export let handle: SEOHandle = {
  getSitemapEntries: async () => {
    let slugs = await CONTENT.list({ prefix: 'posts/en/' });
    let posts = await Promise.all(
      slugs.keys.map(async ({ name }) => {
        let post = (await CONTENT.get(name, 'json')) as Post;

        return post.slug;
      })
    );

    return posts.map((post) => ({
      route: `/posts/${post}`,
      priority: 0.7,
    }));
  },
};

export let links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: prismOne,
    },
  ];
};

export let meta: MetaFunction = ({ data, parentsData }) => {
  let post = data?.frontmatter as PostFrontmatter;
  let locale = parentsData?.root?.locale;

  return {
    ...getSeoMeta({
      title: post?.title,
      description: post?.seo?.description,
      openGraph: {
        type: 'article',
      },
    }),
    'flyyer:content': post?.seo?.description,
    'flyyer:date': new Date(post?.published_at).toISOString(),
    'flyyer:image': getImageBuilder(post?.cover?.id, post?.cover?.alt)(),
    'flyyer:locale': locale,
    'flyyer:title': post?.title,
    'flyyer:views': data?.views,
    'og:image:alt': post?.cover?.alt,
    'twitter:image:alt': post?.cover?.alt,
  };
};

type LoaderData = {
  i18n: Record<string, Language>;
  frontmatter: PostFrontmatter;
  html: string;
  slug: string;
  views: number;
  code?: string;
};

export let loader: LoaderFunction = async ({ params, request }) => {
  let slug = params.slug;
  if (slug === undefined) {
    throw new Response('Not Found', { status: 404 });
  }

  let [locale, translations, views] = await Promise.all([
    i18n.getLocale(request),
    i18n.getTranslations(request, 'posts'),
    VIEWS.get(slug, 'text'),
  ]);
  let post = await CONTENT.get(`posts/${locale}/${slug}`, 'json');
  if (post === undefined) {
    throw new Response('Not Found', { status: 404 });
  }
  let { code, frontmatter, hash, html } = post as Post;

  let weakHash = `W/"${hash}"`;
  let etag = request.headers.get('If-None-Match');
  if (etag === weakHash) {
    throw new Response(null, { status: 304 });
  }

  let headers = new Headers();
  if (hash) {
    headers.set('ETag', weakHash);
  }
  headers.set('Cache-Control', 'max-age=43200, stale-while-revalidate');
  headers.set('Vary', 'Cookie');

  let data: LoaderData = {
    i18n: translations,
    code,
    frontmatter,
    html,
    slug,
    views: Number(views),
  };

  return json(data, { headers });
};

export default function PostPage() {
  let { i18n, t } = useTranslation('posts');
  let {
    code,
    html,
    frontmatter: post,
    slug,
    views,
  } = useLoaderData<LoaderData>();

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
    <section className="w-full py-32">
      <h2 className="text-center text-[26px] font-black uppercase text-primary">
        Blog{' '}
        <span aria-label="victory hand" role="img">
          ✌️
        </span>
      </h2>

      <div className="container mx-auto mt-5 max-w-[977px]">
        <div className="mb-6 grid grid-cols-12 items-center gap-y-5 md:gap-10">
          <div className="col-span-12 md:col-span-7">
            <BlurrableImage
              blurDataUrl={post.cover.blur}
              className="aspect-w-16 aspect-h-9 flex overflow-hidden rounded-[18px] bg-primary/50 shadow"
              img={
                <img
                  className="rounded-[18px]"
                  {...getImgProps(
                    getImageBuilder(post.cover.id, post.cover.alt),
                    {
                      widths: [240, 480, 534, 960, 1440, 1920, 2560],
                      sizes: [
                        '(max-width:1023px) 80vw',
                        '(min-width:1024px) and (max-width:1620px) 67vw',
                        '534px',
                      ],
                    }
                  )}
                  height={1080}
                  width={1920}
                />
              }
            />
            <div className="relative -mt-10 flex items-end space-x-4 px-6">
              <BlurrableImage
                blurDataUrl={getImageBlur(
                  getImageBuilder(images.me.id, images.me.alt),
                  10
                )}
                className="relative h-20 w-20 overflow-hidden rounded-full drop-shadow-lg"
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

              <Views slug={slug} views={views} />

              <div className="absolute right-6 bottom-6 flex flex-1 justify-end">
                <button
                  className="z-10 flex items-center rounded-full bg-secondary py-2 px-3 text-xs font-bold text-black"
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
                    className="h-4 w-4 sm:-mr-1 sm:ml-2"
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
            <p className="whitespace-pre-line text-xs font-bold text-[#B5B5B5] dark:text-[#b5b5b5]">
              {post?.seo?.description}
            </p>
          </div>
        </div>

        <div
          className="prose prose-lg max-w-full dark:prose-dark"
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
