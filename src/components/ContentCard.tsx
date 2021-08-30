// Dependencies
import Image from '@graphcms/react-image'
import { useRouter } from 'next/router'
import { useI18n } from 'next-rosetta'

// Internals
import { clsx, formatDate } from '@/utils'
import type { OverwritableType } from '@/types'
import type { Locale } from 'i18n'

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
  descriptionClassName?: string
}

export function ContentCard<T extends React.ElementType = 'div'>({
  as,
  date,
  description,
  descriptionClassName,
  image,
  title,
  ...rest
}: OverwritableType<ContentCardProps<T>, T>): JSX.Element {
  const router = useRouter()
  const { t } = useI18n<Locale>()

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
          {t('components.contentcard.published')}{' '}
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
      <p
        className={clsx(
          'mt-[6px] text-[10px] font-bold text-[#838383]',
          descriptionClassName
        )}
      >
        {description}
      </p>
    </ElementType>
  )
}

export default ContentCard
