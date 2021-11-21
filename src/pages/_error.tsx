// Dependencies
import { useRouter } from 'next/router'
import type { NextLayoutPage } from 'next'

// Internals
import { Link, Seo } from '@/components'
import { formatDate } from '@/utils'

export const ServerErrorPage: NextLayoutPage = ({ statusCode }) => {
  const router = useRouter()

  const text = () => {
    return `Hello Daniel, i have a trouble with this route.

Route: ${router.asPath}
Date: ${formatDate({
      date: new Date(),
      formatter: 'PPpp',
      locale: router.locale,
    })}`
  }

  return (
    <>
      <Seo
        description="An error occurred while trying to load this page."
        title={
          statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'
        }
      />
      <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-secondary-600 sm:text-5xl">
              {statusCode}
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-secondary-darker dark:text-secondary sm:text-5xl">
                  {statusCode
                    ? `An error ${statusCode} occurred on server`
                    : 'An error occurred on client'}
                </h1>
                <p className="mt-1 text-base text-[#838383]">
                  An error occurred while trying to load this page.
                </p>
              </div>
              <div className="flex mt-10 space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 dark:focus:ring-offset-[#292929]"
                  href="/"
                  locale={router.locale}
                >
                  Go back home
                </Link>
                <Link
                  className="inline-flex items-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-secondary-700 bg-secondary-100 hover:bg-secondary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 dark:focus:ring-offset-[#292929]"
                  href={`https://twitter.com/messages/compose?recipient_id=554765148&text=${text()}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Contact support
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

ServerErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404

  return { statusCode }
}

ServerErrorPage.getLayout = (page) => <>{page}</>

export default ServerErrorPage
