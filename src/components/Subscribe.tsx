// Dependencies
import { useState } from 'react'
import useSWR from 'swr'
import format from 'comma-number'

// Components
import { Emoji } from '@/components'

// Libraries
import fetcher from '@/lib/fetcher'

const Subscribe = (): JSX.Element => {
  const [form, setForm] = useState<{
    status: string
    message?: string
  }>({
    status: '',
  })
  const [email, setEmail] = useState('')
  const { data } = useSWR('/api/subscribers', fetcher)
  const subscriberCount = format(((data as unknown) as Record<string, unknown>)?.count || 0)

  const subscribe = async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setForm({ status: 'loading' })

    if (!email) {
      setForm({
        status: 'error',
        message: 'Tu correo es requerido para poder suscribirte',
      })
      return
    }

    const res = await fetch('/api/subscribers', {
      body: JSON.stringify({
        email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()

    if (error) {
      setForm({
        status: 'error',
        message: error,
      })
      return
    }

    setEmail('')

    setForm({
      status: 'success',
      message: `Muchas gracias por suscribirte, nuevo contenido cada semana`,
    })

    setTimeout(() => {
      setForm({
        status: '',
      })
    }, 10000)
  }

  // console.log(subscriberCount.count)

  return (
    <div className="mt-12">
      <div className="px-6 py-6 border rounded-lg bg-secondary md:py-12 md:px-12 lg:py-16 lg:px-16">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            ¿Quieres ser el primero en leer mis posts?
          </h2>
          <p className="max-w-3xl mt-3 text-lg leading-6 text-indigo-200">
            Suscríbete al newsletter y tendrás tutoriales, noticias y posts de primera mano.
          </p>
        </div>
        <div className="mt-8 sm:w-full sm:max-w-md">
          <form className="sm:flex" onSubmit={subscribe}>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-5 py-3 placeholder-gray-500 border-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-white"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <button
              type="submit"
              className="flex items-center justify-center w-full px-5 py-3 mt-3 text-base font-medium border border-transparent rounded-md shadow text-secondary bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
              disabled={!email}
            >
              {form.status === 'loading' ? (
                <>
                  Enviando
                  <Emoji emoji="📩" className="ml-2 animate-pulse" />
                </>
              ) : (
                'Suscribirse'
              )}
            </button>
          </form>
          {form.status === 'error' && (
            <p
              className="flex items-center mt-2 space-x-1 font-semibold text-red-600"
              id="email-error"
            >
              <svg
                className="w-5 h-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{form.message}</span>
            </p>
          )}
          {form.status === 'success' && (
            <p
              className="flex items-center mt-2 space-x-1 text-sm font-semibold text-green-600"
              id="email-success"
            >
              <svg
                className="w-4 h-4 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>

              <span>{form.message}</span>
            </p>
          )}
          {!form.status && (
            <p className="mt-2 text-sm text-white">
              {subscriberCount || '-'} personas se han suscrito al newsletter
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Subscribe
