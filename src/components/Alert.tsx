interface AlertProps {
  children: React.ReactNode
}

const Danger = ({ children }: AlertProps): JSX.Element => {
  return (
    <div className="p-4 bg-red-100 dark:bg-red-50 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          {/* Heroicon name: solid/information-circle */}
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-red-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1 ml-3 md:flex md:justify-between">
          <p className="my-0 text-sm text-red-700">{children}</p>
        </div>
      </div>
    </div>
  )
}

const Info = ({ children }: AlertProps): JSX.Element => {
  return (
    <div className="p-4 bg-blue-100 dark:bg-blue-50 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          {/* Heroicon name: solid/information-circle */}
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-blue-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1 ml-3 md:flex md:justify-between">
          <p className="my-0 text-sm text-blue-700">{children}</p>
        </div>
      </div>
    </div>
  )
}

const Warning = ({ children }: AlertProps): JSX.Element => {
  return (
    <div className="p-4 bg-yellow-100 dark:bg-yellow-50 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          {/* Heroicon name: solid/information-circle */}
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1 ml-3 md:flex md:justify-between">
          <p className="my-0 text-sm text-yellow-700">{children}</p>
        </div>
      </div>
    </div>
  )
}

const Success = ({ children }: AlertProps): JSX.Element => {
  return (
    <div className="p-4 bg-green-100 dark:bg-green-50 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          {/* Heroicon name: solid/information-circle */}
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1 ml-3 md:flex md:justify-between">
          <p className="my-0 text-sm text-green-700">{children}</p>
        </div>
      </div>
    </div>
  )
}

export const Alert = ({ children }: AlertProps): JSX.Element => {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-50 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          {/* Heroicon name: solid/information-circle */}
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1 ml-3 md:flex md:justify-between">
          <p className="my-0 text-sm text-gray-700">{children}</p>
        </div>
      </div>
    </div>
  )
}

Alert.Danger = Danger
Alert.Info = Info
Alert.Warning = Warning
Alert.Success = Success
