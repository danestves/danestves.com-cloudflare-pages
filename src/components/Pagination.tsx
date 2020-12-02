// Dependencies
import * as React from 'react'

type PaginationProps = {
  isFirstPage: boolean
  hasPages: boolean
  handlePrevPage(): void
  handleNextPage(): void
}

const Pagination = ({
  isFirstPage,
  hasPages,
  handlePrevPage,
  handleNextPage,
}: PaginationProps): JSX.Element => {
  // Render
  return (
    <div className="flex items-center justify-between mt-6">
      <div>
        {!isFirstPage && (
          <button
            type="button"
            aria-label="Anterior"
            className="flex items-center px-6 py-2 font-semibold rounded focus:outline-none bg-primary text-secondary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
            onClick={handlePrevPage}
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
        {hasPages && (
          <button
            type="button"
            aria-label="Siguiente"
            className="flex items-center px-6 py-2 font-semibold rounded focus:outline-none bg-primary text-secondary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
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
