// Dependencies
import * as React from 'react'
import { useI18n } from 'next-rosetta'
import useSWR from 'swr'

// Internals
import fetcher from '@/lib/fetcher'
import { formatCommaNumber } from '@/utils'
import type { MyLocale } from 'i18n'

export const Subscribe = (): JSX.Element => {
  const [form, setForm] = React.useState<{
    status: string
    message?: string
  }>({
    status: '',
  })
  const [email, setEmail] = React.useState('')
  const { t } = useI18n<MyLocale>()
  const { data } = useSWR('/api/subscribers', fetcher)
  const subscriberCount = formatCommaNumber(
    ((data as unknown as Record<string, unknown>)?.count as number) || 0
  )

  const subscribe = async (
    e: React.ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    setForm({ status: 'loading' })

    if (!email) {
      setForm({
        status: 'error',
        message: t('newsletter.response.email.required'),
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
      message: t('newsletter.response.success'),
    })

    setTimeout(() => {
      setForm({
        status: '',
      })
    }, 10000)
  }

  return (
    <div className="mt-12">
      <div className="px-6 py-6 border rounded-lg bg-secondary md:py-12 md:px-12 lg:py-16 lg:px-16">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            {t('newsletter.title')}
          </h2>
          <p className="max-w-3xl mt-3 text-lg leading-6 text-indigo-200">
            {t('newsletter.summary')}
          </p>
        </div>
        <div className="mt-8 sm:w-full sm:max-w-md">
          <form className="sm:flex" onSubmit={subscribe}>
            <label className="sr-only" htmlFor="email">
              {t('newsletter.form.label')}
            </label>
            <input
              autoComplete="email"
              className="w-full px-5 py-3 placeholder-gray-500 border-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-white"
              id="email"
              name="email"
              onChange={({ target }) => setEmail(target.value)}
              placeholder={t('newsletter.form.placeholder')}
              required
              type="email"
              value={email}
            />
            <button
              className="flex items-center justify-center w-full px-5 py-3 mt-3 text-base font-medium border border-transparent rounded-md shadow text-secondary bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
              disabled={!email}
              type="submit"
            >
              {form.status === 'loading' ? (
                <>
                  {t('newsletter.form.button.sending')}
                  <span className="ml-2 animate-pulse">📩</span>
                </>
              ) : (
                t('newsletter.form.button.label')
              )}
            </button>
          </form>
          {form.status === 'error' && (
            <p
              className="flex items-center mt-2 space-x-1 font-semibold text-red-600"
              id="email-error"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  fillRule="evenodd"
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
                aria-hidden="true"
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  fillRule="evenodd"
                />
              </svg>

              <span>{form.message}</span>
            </p>
          )}
          {!form.status && (
            <p className="mt-2 text-sm text-white">
              {subscriberCount || '-'} {t('newsletter.subscribed')}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Subscribe
