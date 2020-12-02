// Dependencies
import * as React from 'react'
import { Transition } from '@tailwindui/react'

// Components
import { Emoji } from '@/components'

const NewsletterForm = (): JSX.Element => {
  // States
  const [validEmail, setValidEmail] = React.useState(false)

  // Methods
  const isValidEmail = (email: string): void => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (re.test(email)) {
      return setValidEmail(true)
    }

    return setValidEmail(false)
  }

  // Render
  return (
    <div className="w-full bg-secondary">
      <form
        action="https://www.getrevue.co/profile/danestves/add_subscriber"
        method="post"
        className="container px-5 py-16 border-t-2 border-b-2 border-primary"
      >
        <div className="max-w-xl mx-auto">
          <h3 className="font-mono text-lg font-semibold text-center text-primary">
            !No te pierdas ninguna línea de código!
          </h3>

          <h2 className="mt-2 mb-6 text-2xl font-bold text-center text-white">
            ¡Suscríbete a mi Newsletter!
          </h2>

          <input
            type="email"
            name="member[email]"
            id="member[email]"
            placeholder="Correo"
            className="block w-full max-w-sm px-4 py-2 mx-auto font-mono placeholder-opacity-50 bg-white rounded-lg placeholder-secondary focus:outline-none"
            onChange={(e) => isValidEmail(e.target.value)}
          />

          <Transition
            show={validEmail}
            enter="transition-all duration-500"
            enterFrom="max-h-0"
            enterTo="max-h-64"
            leave="transition-all duration-500"
            leaveFrom="max-h-64"
            leaveTo="max-h-0"
            className="overflow-hidden"
          >
            <input
              type="text"
              name="member[first_name]"
              id="member[first_name]"
              placeholder="Nombre (opcional)"
              className="block w-full max-w-sm px-4 py-2 mx-auto mt-4 font-mono placeholder-opacity-50 bg-white rounded-lg placeholder-secondary focus:outline-none"
            />

            <small className="block text-center text-white">
              <b>Opcional:</b> Usamos tu nombre para entregarte un correo <br /> más personalizado
              <Emoji emoji="🤘" />
            </small>
          </Transition>

          <button
            type="submit"
            className="block w-full max-w-sm px-4 py-2 mx-auto mt-4 font-bold text-white transition-all duration-200 border bg-secondary border-primary hover:bg-primary hover:text-secondary rounded-2xl"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="inline w-6 h-6 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            ¡Me suscribo!
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewsletterForm
