// Dependencies
import * as React from 'react'
import { DocumentNode } from 'graphql'

// Generated
import { PageInfo } from '@/generated/graphql'

type PaginationProps = {
  state: {
    currentPage: number
    pageSize: number
    totalPages: number
  }
  query: DocumentNode
  variables: { first: number; skip: number }
  setState: React.Dispatch<
    React.SetStateAction<{
      currentPage: number
      pageSize: number
      totalPages: number
    }>
  >
  fetchMore: (arg0: any) => void
  count: number
  pageInfo: PageInfo
}

const Pagination = ({
  state,
  query,
  variables,
  setState,
  fetchMore,
  count,
  pageInfo,
}: PaginationProps): JSX.Element => {
  /**
   * Returns the total pages from `count / limit`
   *
   * @param count - The number of items
   * @param pageSize - The limit of items
   */
  const totalPages = (count: number, pageSize: number): number => {
    return Math.ceil(count / pageSize)
  }

  /**
   * Returns if haves next page
   *
   * @param count - The number of items
   * @param currentPage - The current page number
   * @param pageSize- The limit of items
   */
  const hasNextPage = (count: number, currentPage: number, pageSize: number): boolean => {
    return currentPage < totalPages(count, pageSize)
  }

  /**
   * Returns if haves previous page
   *
   * @param currentPage - The current page number
   */
  const hasPrevPage = (currentPage: number): boolean => {
    return currentPage > 1
  }

  /**
   * Handle navigate to previous page
   */
  const handlePreviousPage = (): void => {
    setState((old) => ({ ...old, currentPage: old.currentPage - 1 }))

    fetchMore({
      query,
      variables,
    })
  }

  /**
   * Handle navigate to next page
   *
   * @param cursor - The parameter to navigate to next page
   */
  const handleNextPage = (cursor: string): void => {
    setState((old) => ({ ...old, currentPage: old.currentPage + 1 }))

    fetchMore({
      query,
      variables: {
        first: state.pageSize,
        after: cursor,
      },
    })
  }

  return (
    <div className="flex items-center justify-between my-6">
      <div>
        {hasPrevPage(state.currentPage) && (
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
        {hasNextPage(count, state.currentPage, state.pageSize) && pageInfo?.endCursor && (
          <button
            type="button"
            aria-label="Siguiente"
            className="flex items-center px-6 py-2 font-semibold transition-all duration-150 rounded focus:outline-none bg-primary text-secondary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
            onClick={() => handleNextPage(pageInfo.endCursor || '')}
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
