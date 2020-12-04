// Dependencies
import * as React from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { useRouter } from 'next/dist/client/router'

// Animations
import { openSpring, closeSpring } from './animations'

// Components
import { Link } from '@/components'
import ContentPlaceholder from './Content'
import { Title } from './Title'
import { Image } from './Image'

// Hooks
import { useInvertedBorderRadius, useScrollConstraints, useWheelScroll } from '@/hooks'

// Interfaces
import { CardData } from './types'

interface Props extends CardData {
  isSelected: boolean
}

const Overlay = ({ isSelected }: { isSelected: boolean }): JSX.Element => {
  // Hooks
  const router = useRouter()

  // Render
  return (
    <motion.div
      initial={false}
      animate={{ opacity: isSelected ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
      className="overlay"
    >
      <button type="button" className="focus:outline-none" onClick={() => router.back()} />
    </motion.div>
  )
}

// Distance in pixels a user has to scroll a card down before we recognise
// a swipe-to dismiss action.
const dismissDistance = 150

const Card = React.memo(
  ({ isSelected, title, category, slug, cover, body }: Props) => {
    const y = useMotionValue(0)
    const zIndex = useMotionValue(isSelected ? 2 : 0)
    const router = useRouter()

    // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y
    const inverted = useInvertedBorderRadius(20)

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = React.useRef(null)
    const constraints = useScrollConstraints(cardRef, isSelected)

    function checkSwipeToDismiss(): void {
      y.get() > dismissDistance && router.back()
    }

    function checkZIndex(latest: { scaleY: number; scaleX: number }): void {
      if (isSelected) {
        zIndex.set(2)
      } else if (!isSelected && latest.scaleX < 1.01) {
        zIndex.set(0)
      }
    }

    // When this card is selected, attach a wheel event listener
    const containerRef = React.useRef(null)
    useWheelScroll(containerRef, y, constraints, checkSwipeToDismiss, isSelected)

    // Catch all router queries to put in in the link below
    // and avoid change of page when params change
    const routerQueries = Object.keys(router.query)
      .map(function (key) {
        return key + '=' + router.query[key]
      })
      .join('&')

    return (
      <article ref={containerRef} className="card">
        <Overlay isSelected={isSelected} />

        <div className={`card-content-container${isSelected ? ' open' : ''}`}>
          <motion.div
            ref={cardRef}
            className="card-content"
            style={{ ...inverted, zIndex, y }}
            layoutTransition={isSelected ? openSpring : closeSpring}
            drag={isSelected ? 'y' : false}
            dragConstraints={constraints}
            onDrag={checkSwipeToDismiss}
            onUpdate={checkZIndex}
          >
            <Image image={cover.url || ''} title={title} isSelected={isSelected} />

            <Title title={title} category={category.name} isSelected={isSelected} />

            <ContentPlaceholder body={body} />
          </motion.div>
        </div>

        {!isSelected && (
          <Link
            href={`/portafolio?slug=${slug}&${routerQueries}`}
            as={`/portafolio/${slug}`}
            scroll={false}
            className="card-open-link"
          ></Link>
        )}
      </article>
    )
  },
  (prev, next) => prev.isSelected === next.isSelected
)

Card.displayName = 'BlogCard'

export default Card
