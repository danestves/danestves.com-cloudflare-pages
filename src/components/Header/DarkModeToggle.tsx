// Dependencies
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'

// Inspired by https://codepen.io/carlosngv/pen/VwKKBRK
export const DarkModeToggle = (props: React.ComponentProps<'button'>): JSX.Element => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      {...props}
      className="flex relative justify-around items-center p-[3px] w-[55px] h-[26px] bg-[#359DE6] dark:bg-[#0c1445] rounded-full focus-visible:rounded focus-visible:ring-2 focus-visible:ring-black focus:outline-none"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      title="Dark mode or light mode"
      type="button"
    >
      <MoonIcon className="w-5 h-5 text-[#f4f4f4]" />
      <SunIcon className="w-5 h-5 text-[#F5EC30]" />
      <span className="absolute top-[2px] left-[2px] w-[22px] h-[22px] bg-white rounded-full transition-transform duration-300 ease-linear transform dark:translate-x-[29px]"></span>
    </button>
  )
}

export default DarkModeToggle
