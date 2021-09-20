// Dependencies
import { m } from 'framer-motion'
import { useI18n } from 'next-rosetta'

// Internals
import { Rings, Search } from '../'
import { LocalImage } from '../LocalImage'
import MeMaskD from 'public/static/me-mask-d.png'
import type { Locale } from 'i18n'

export const Hero = (): JSX.Element => {
  const { t } = useI18n<Locale>()

  const MotionRings = m(Rings)

  return (
    <section
      className="container relative overflow-hidden"
      id="danestves-section-hero"
    >
      <div className="relative left-1/2 -translate-x-1/2 mx-auto w-[563px] h-auto sm:left-[46%] md:left-[38%] lg:left-auto lg:transform-none lg:w-full lg:max-w-[731px]">
        <MotionRings
          animate={{ scale: 1, opacity: 1 }}
          className="w-full h-auto"
          exit={{ scale: 0, opacity: 0 }}
          initial={{ scale: 0, opacity: 0 }}
          key="danestves-section-hero"
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
          }}
        />
      </div>

      <div className="absolute mt-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:mt-3">
        <LocalImage
          container={{
            className:
              '-mt-16 h-auto w-[249px] sm:w-full sm:max-w-[248px] md:mt-auto lg:max-w-[320px]',
          }}
          image={{
            alt: '@danestves',
            placeholder: 'blur',
            priority: true,
            src: MeMaskD,
          }}
        />
      </div>

      {/* Floating Card */}
      <div className="w-full max-w-[332px] -mt-16 mx-auto pl-8 pr-5 pt-3 pb-4 bg-opacity-80 bg-primary backdrop-blur-sm rounded-[20px] dark:bg-opacity-[0.65] md:-mt-32 lg:absolute lg:mr-32 lg:mt-auto lg:-translate-y-1/2 lg:top-1/2 lg:right-1/2">
        <h1 className="text-2xl font-black text-white uppercase">
          daniel esteves{' '}
          <span aria-label="victory hand" role="img">
            ✌️
          </span>
        </h1>
        <p className="mt-1 text-xs text-white">
          Lead Frontend Developer @{' '}
          <a href="https://seeed.us" rel="noopener noreferrer" target="_blank">
            Seeed
          </a>
          . <br />{' '}
          <span
            dangerouslySetInnerHTML={{ __html: t('sections.hero.description') }}
          />
        </p>
      </div>

      {/* Search Trigger */}
      <div className="hidden absolute bottom-1/4 lg:block lg:right-[13%] xl:right-[20%]">
        <Search />
      </div>
    </section>
  )
}

export default Hero
