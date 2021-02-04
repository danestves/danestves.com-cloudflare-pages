// Dependencies
import Image from 'next/image'

// Components
import { Link } from '@/components'

const CallToAction = (): JSX.Element => {
  return (
    <section className="container px-5">
      <div className="max-w-5xl mx-auto my-16 lg:my-32">
        <div className="flex flex-wrap items-center flex-1 w-full overflow-hidden rounded-lg bg-primary md:flex-no-wrap">
          <div className="w-full md:w-1/3 md:order-last">
            <div className="-mx-12 -mt-12 -mb-12 md:ml-0 md:-mr-24">
              <Image
                src="/programming-animation.gif"
                alt="Persona programando animadas a través de un GIF"
                width={300}
                height={300}
              />
            </div>
          </div>
          <div className="w-full px-4 pt-24 pb-8 md:p-12 md:w-2/3">
            <h2 className="mb-4 text-3xl font-bold text-black lg:mb-4 sm:text-4xl md:text-5xl">
              ¿Tienes una idea?
            </h2>
            <div className="mb-4 lg:mb-4">
              <p className="mb-4">
                Ponte en contacto a través de este botón para que pueda saber más de tu producto o
                servicio y podamos discutir la mejor manera de llevarlo a cabo.
              </p>
            </div>
            <Link
              href="/contacto"
              className="inline-block px-6 py-3 text-gray-300 transition-all duration-150 transform bg-black rounded-lg hover:shadow-lg hover:-translate-y-1 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-primary focus:outline-none"
            >
              Quiero plasmar mi idea
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
