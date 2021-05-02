// Dependencies
import Image from '@graphcms/react-image'
import { useI18n } from 'next-rosetta'
import { useRouter } from 'next/dist/client/router'

// @types
import { Post } from '@/generated/graphql'
import { Asset } from '@/interfaces'

// Components
import { Link } from '@/components'

// Locales
import type { MyLocale } from 'i18n'

// Utils
import { formatDate } from '@/utils'

export const BlogCard = (post: Post): JSX.Element => {
  const { t } = useI18n<MyLocale>()
  const { locale } = useRouter()

  return (
    <article className="mb-12">
      <Link
        className="group hover:no-underline focus:no-underline"
        href={`/blog/${post.slug}-${post.id}`}
        locale={locale}
      >
        <div className="flex w-full overflow-hidden duration-200 transform rounded-lg group-hover:shadow-lg group-focus:shadow-lg group-hover:-translate-y-1 group-focus:-translate-y-1">
          <Image
            alt={post.title}
            image={post.cover as Asset}
            outerWrapperClassName="w-full"
            withWebp
          />
        </div>

        <div className="mt-6">
          <p className="my-2 text-xs text-white">
            {t('blog.publishedAt')}{' '}
            {formatDate(new Date(post.published).toISOString().slice(0, 19), 'MMM. d yyy', locale)}
          </p>

          <h2 className="mb-2 text-2xl font-medium leading-tight text-white group-hover:underline group-focus:underline">
            {post.title}
          </h2>
          <p className="text-sm text-white">{post.seo?.description}</p>
        </div>
      </Link>
    </article>
  )
}

export default BlogCard
