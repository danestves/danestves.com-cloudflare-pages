// Dependencies
import { useRouter } from 'next/router'
import type { GetStaticProps, NextPage } from 'next'
import type { I18nProps } from 'next-rosetta'

// Internals
import { ContentCard, Link } from '@/components'
import { sdk } from '@/lib'
import type { PostsQuery } from '@/generated/graphql'
import type { Locale } from 'i18n'

export type PostsPageProps = {
  posts: PostsQuery['posts']
}

export const PostsPage: NextPage<PostsPageProps> = ({ posts }) => {
  const router = useRouter()

  return (
    <section className="w-full py-32">
      <h1 className="text-[26px] text-[#071D49] font-black text-center uppercase">
        Blog{' '}
        <span aria-label="victory hand" role="img">
          ✌️
        </span>
      </h1>

      <div className="container mt-4 max-w-[977px] mx-auto">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <ContentCard
              as={Link}
              date={post.published}
              description={post.seo.description}
              href={`/posts/${post.slug}`}
              image={post.cover}
              key={post.id}
              locale={router.locale}
              title={post.title}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  const posts = await sdk().posts({
    first: 50,
    locale: locale as any,
  })

  return {
    props: { table, posts: posts.data.posts },
    revalidate: 60 * 60, // 1 hour
  }
}

export default PostsPage
