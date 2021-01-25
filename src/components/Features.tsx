// Dependencies
import * as React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import NextImage from 'next/image'
import { BsChevronLeft } from 'react-icons/all'

interface Props {
  element?: string
  features: {
    id: number
    title: string
    icon: string
    subtitle: string
  }[]
}

const Features: React.FC<Props> = ({ features }) => {
  return (
    <div className="relative">
      <button
        className="absolute left-0 z-10 transition-all duration-200 transform -translate-y-1/2 bg-transparent border-none rounded-full focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary top-1/2 focus:outline-none text-primary hover:opacity-75 swiper-button-prev-custom"
        aria-label="Prev"
      >
        <BsChevronLeft className="w-8 h-8 fill-current" />
      </button>

      <Swiper
        slidesPerView={1}
        autoplay
        loop
        speed={500}
        a11y={{ enabled: true }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
      >
        {features.map((item) => (
          <SwiperSlide key={item.id}>
            <h2 className="font-sans text-4xl font-bold text-center text-primary">{item.title}</h2>

            <div className="block w-32 h-32 mx-auto mt-8">
              <NextImage src={item.icon} alt={item.title} width={128} height={128} />
            </div>

            <p className="w-full max-w-4xl px-5 mx-auto mt-12 font-mono text-xl text-center text-primary">
              {item.subtitle}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className="absolute right-0 z-10 transition-all duration-200 transform -translate-y-1/2 bg-transparent border-none rounded-full focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary top-1/2 text-primary hover:opacity-75 focus:outline-none swiper-button-next-custom"
        aria-label="Next"
      >
        <BsChevronLeft className="w-8 h-8 transform rotate-180 fill-current" />
      </button>
    </div>
  )
}

export default Features
