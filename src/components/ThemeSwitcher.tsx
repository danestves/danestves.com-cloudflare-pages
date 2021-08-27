// Dependencies
import { MoonIcon } from '@heroicons/react/solid'

export const ThemeSwitcher = (): JSX.Element => {
  return (
    <button
      className="inline-flex p-2 text-white rounded-full bg-primary focus:ring-4 focus:outline-none focus:ring-primary focus:ring-opacity-50"
      type="button"
    >
      <MoonIcon className="inline-block w-[21px] h-auto" />
    </button>
  )
}

export default ThemeSwitcher
