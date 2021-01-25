// Dependencies
import * as React from 'react'
import { useRouter } from 'next/dist/client/router'
import { window } from 'browser-monads'

// Generated
import { PageInfo } from '@/generated/graphql'

interface Props {
  count: number
  limit: number
  pageInfo: Pick<PageInfo, 'hasNextPage' | 'startCursor' | 'endCursor'>
}

const Pagination = ({ count, limit }: Props): JSX.Element => {
  const router = useRouter()

  const totalPages = Math.ceil(count / limit)
  const currentPage = Number(router.query.skip || 0) / limit + 1
  const hasPrevPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  /**
   * Handle navigate to previous page
   */
  const handlePreviousPage = async (): Promise<void> => {
    // await router.push(router.pathname, {
    //   query: {
    //     ...router.query,
    //     first: limit,
    //     skip: Number(router.query.skip) - limit,
    //   },
    // })

    // TODO: Change this code when Next can update server side props https://github.com/vercel/next.js/issues/13910
    window.location.href = `?first=${limit}&skip=${Number(router.query.skip) - limit}`
  }

  /**
   * Handle navigate to next page
   */
  const handleNextPage = async (): Promise<void> => {
    // await router.push(router.pathname, {
    //   query: {
    //     ...router.query,
    //     first: limit,
    //     skip: Number(router.query.skip || 0) + limit,
    //   },
    // })

    // TODO: Change this code when Next can update server side props https://github.com/vercel/next.js/issues/13910
    window.location.href = `?first=${limit}&skip=${Number(router.query.skip || 0) + limit}`
  }

  return (
    <div className="flex items-center justify-between my-6">
      <div>
        {hasPrevPage && (
          <button
            type="button"
            aria-label="Anterior"
            className="flex items-center px-6 py-2 font-semibold transition-all duration-150 rounded focus:outline-none bg-primary text-secondary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
            onClick={handlePreviousPage}
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Anterior
          </button>
        )}
      </div>

      <div>
        {hasNextPage && (
          <button
            type="button"
            aria-label="Siguiente"
            className="flex items-center px-6 py-2 font-semibold transition-all duration-150 rounded focus:outline-none bg-primary text-secondary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
            onClick={handleNextPage}
          >
            Siguiente
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default Pagination
