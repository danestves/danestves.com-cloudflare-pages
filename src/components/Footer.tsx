// Dependencies
import * as React from 'react'
import { FaGithubAlt, FaYoutube, FaTwitter } from 'react-icons/fa'

// Components
import { Link, Emoji } from '@/components'

const Footer = (): JSX.Element => (
  <footer className="pt-5 bg-secondary">
    <div className="container px-5">
      <div className="grid grid-cols-12 gap-8">
        <div className="grid col-span-12 gap-4 mb-auto md:col-span-5">
          <p className="text-2xl font-semibold text-white">Daniel Esteves</p>

          <div>
            <p className="mb-4 text-white">
              Plasmo tus ideas y las hago realidad. Trabajaré contigo lado a lado para que tu
              producto final sea mucho mejor de lo que esperas.
            </p>
          </div>

          <div className="-mx-4">
            <div className="flex mx-4 space-x-2">
              <a
                href="https://github.com/danestves"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="text-primary"
              >
                <FaGithubAlt size="20" />
              </a>

              <a
                href="https://www.youtube.com/channel/UC6YYVDKZC3mu1iB8IOCFqcw"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="text-primary"
              >
                <FaYoutube size="20" />
              </a>

              <a
                href="https://twitter.com/danestves"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
                className="text-primary"
              >
                <FaTwitter size="20" />
              </a>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-2">
          <p className="mb-6 font-semibold text-white">Links</p>

          <ul className="grid gap-2">
            <li>
              <Link href="/" className="text-white hover:underline focus:outline-none">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/sobre-mi" className="text-white hover:underline focus:outline-none">
                Sobre Mí
              </Link>
            </li>
            <li>
              <Link href="/open-source" className="text-white hover:underline focus:outline-none">
                Open Source
              </Link>
            </li>
            <li>
              <Link href="/portafolio" className="text-white hover:underline focus:outline-none">
                Portafolio
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-white hover:underline focus:outline-none">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="text-white hover:underline focus:outline-none">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-12 md:col-span-5">
          <p className="mb-6 font-semibold text-white">Unete al Newsletter!</p>

          <p className="mb-4 text-white">
            Prometo no enviarte spam <Emoji emoji="🤘" />. Envío un correo cada vez que hago un
            nuevo blogpost o subo un nuevo video.
          </p>

          <form
            action="https://www.getrevue.co/profile/danestves/add_subscriber"
            method="post"
            className="flex flex-col items-start my-4 space-y-4 md:items-center md:flex-row md:space-y-0 md:space-x-4"
          >
            <div className="flex-1 w-full">
              <label htmlFor="member[email]" className="sr-only">
                Email
              </label>
              <input
                type="email"
                name="member[email]"
                id="member[email]"
                placeholder="Correo"
                className="block w-full px-4 py-2 mx-auto font-mono leading-5 text-white placeholder-opacity-50 bg-transparent border border-white rounded-lg md:flex-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-secondary bg-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary focus:outline-none"
            >
              Unete <Emoji emoji="👉" />
            </button>
          </form>
        </div>
      </div>
    </div>

    <div className="w-full py-5 mt-8 bg-secondary-800">
      <div className="container px-5">
        <p className="font-mono text-sm text-center text-primary">
          Daniel Esteves © <span>{new Date().getFullYear()}</span> - Todos los derechos reservados
          <span className="block mt-2 font-mono text-sm text-center text-primary">
            Designed by{` `}
            <a href="https://twitter.com/vibrawifi" target="_blank" rel="noopener noreferrer">
              <b>Vibra Wifi</b>
            </a>
            {` `}
            with
            {` `}
            <a href="https://twitter.com/vicman_ve" target="_blank" rel="noopener noreferrer">
              <b>Victor Velasquez</b>
            </a>
          </span>
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
