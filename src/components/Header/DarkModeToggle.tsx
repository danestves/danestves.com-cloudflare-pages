// Dependencies
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'

// Inspired by https://codepen.io/carlosngv/pen/VwKKBRK
export const DarkModeToggle = (props: React.ComponentProps<'button'>): JSX.Element => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      {...props}
      className="bg-[#359DE6] flex items-center justify-around p-[3px] rounded-full relative w-[55px] h-[26px] dark:bg-[#0c1445] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:rounded"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      title="Dark mode or light mode"
      type="button"
    >
      <MoonIcon className="text-[#f4f4f4] w-5 h-5" />
      <SunIcon className="text-[#F5EC30] w-5 h-5" />
      <span className="bg-white rounded-full absolute top-[2px] left-[2px] w-[22px] h-[22px] transition-transform transform duration-300 ease-linear dark:translate-x-[29px]"></span>
    </button>
  )
}

export default DarkModeToggle
