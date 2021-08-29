// Dependencies
import Image from '@graphcms/react-image'
import { useRouter } from 'next/router'

// Internals
import { clsx, formatDate } from '@/utils'
import type { OverwritableType } from '@/types'

interface ContentCardProps<T> {
  description: string
  image: {
    handle: string
    height?: number
    width?: number
  }
  title: string
  as?: T
  date?: string
}

export function ContentCard<T extends React.ElementType = 'div'>({
  as,
  date,
  description,
  image,
  title,
  ...rest
}: OverwritableType<ContentCardProps<T>, T>): JSX.Element {
  const router = useRouter()

  const ElementType: React.ElementType = as || 'div'

  return (
    <ElementType {...rest}>
      <div className="overflow-hidden rounded-lg">
        <Image
          alt={title}
          // We make sure to use the correct image size based on the image's aspect ratio
          image={{
            ...image,
            height: Number(image.height),
            width: Number(image.width),
          }}
          withWebp
        />
      </div>
      {date && (
        <p className="mt-4 text-[10px] font-bold text-primary">
          Published at{' '}
          <time dateTime={date}>
            {formatDate({
              date: new Date(date).toISOString().slice(0, 19),
              formatter: 'MMM. d yyy',
              locale: router.locale,
            })}
          </time>
        </p>
      )}
      <h3
        className={clsx(
          'text-xl font-bold text-[#071D49]',
          date ? 'mt-[6px]' : 'mt-4'
        )}
      >
        {title}
      </h3>
      <p className="mt-[6px] text-[10px] font-bold text-[#838383]">
        {description}
      </p>
    </ElementType>
  )
}

export default ContentCard
