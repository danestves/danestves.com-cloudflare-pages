// Dependencies
import * as React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/dist/client/router'

// Components
import { Link } from '@/components'

// Interfaces
import { FrontMatterPost } from '@/interfaces'

// Utils
import { formatDate } from '@/utils'

const BlogCard = ({ slug, image, title, publishedAt, summary }: FrontMatterPost): JSX.Element => {
  const { locale } = useRouter()

  return (
    <article className="mb-12">
      <Link
        href={`/blog/${slug}`}
        locale={locale}
        className="group hover:no-underline focus:no-underline"
      >
        <div className="flex w-full overflow-hidden duration-200 transform rounded-lg group-hover:shadow-lg group-focus:shadow-lg group-hover:-translate-y-1 group-focus:-translate-y-1">
          <Image src={image} width={800} height={540} alt={title} />
        </div>

        <div className="mt-6">
          <p className="my-2 text-xs text-white">
            Publicado en{' '}
            {formatDate(new Date(publishedAt).toISOString().slice(0, 19), 'MMM. d yyy')}
          </p>

          <h2 className="mb-2 text-2xl font-medium leading-tight text-white group-hover:underline group-focus:underline">
            {title}
          </h2>
          <p className="text-sm text-white">{summary}</p>
        </div>
      </Link>
    </article>
  )
}

export default BlogCard
