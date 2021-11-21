// Dependencies
import * as React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useI18n } from 'next-rosetta'

// Internals
import { clsx, formatDate } from '@/utils'
import type { PolymorphicComponentPropsWithRef, PolymorphicRef } from '@/types'
import type { Locale } from 'i18n'

interface Props {
  description: string
  image: string
  isHome?: boolean
  priorityImage?: boolean
  title: string
  date?: string
  descriptionClassName?: string
}

type ContentCardProps<C extends React.ElementType> =
  PolymorphicComponentPropsWithRef<C, Props>

type ContentCardComponent = <C extends React.ElementType = 'div'>(
  props: ContentCardProps<C>
) => React.ReactElement | null

export const ContentCard: ContentCardComponent = React.forwardRef(
  <C extends React.ElementType = 'div'>(
    {
      description,
      image,
      isHome,
      title,
      as,
      date,
      descriptionClassName,
      priorityImage,
      ...props
    }: ContentCardProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const router = useRouter()
    const { t } = useI18n<Locale>()

    const Component = as || 'div'

    return (
      <Component {...props} ref={ref}>
        <div className="flex overflow-hidden rounded-lg">
          <Image
            alt={title}
            height={360}
            objectFit="cover"
            priority={priorityImage}
            src={image}
            width={640}
          />
        </div>
        {date && (
          <p className="mt-4 text-xs font-semibold text-primary">
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
        <h2
          className={clsx(
            'text-xl font-bold text-secondary-darker',
            date ? 'mt-[6px]' : 'mt-4',
            isHome ? 'dark:text-white' : 'dark:text-secondary'
          )}
        >
          {title}
        </h2>
        <p
          className={clsx(
            'mt-[6px] text-xs font-semibold text-[#838383]',
            descriptionClassName
          )}
        >
          {/* Remove HTML from description */}
          {description.replace(/<\/?[^>]+(>|$)/g, '')}
        </p>
      </Component>
    )
  }
)

export default ContentCard
