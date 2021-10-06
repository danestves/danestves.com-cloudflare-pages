// Dependencies
import { useI18n } from 'next-rosetta'
import { useTheme } from 'next-themes'

// Internals
import { MoonIcon } from './Icons/MoonIcon'
import type { Locale } from 'i18n'

export const ThemeSwitcher = (): JSX.Element => {
  const { t } = useI18n<Locale>()
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      aria-label={t('components.switcher.theme.label')}
      className="inline-flex p-2 text-white rounded-full bg-primary focus:ring-4 focus:outline-none focus:ring-primary focus:ring-opacity-50 dark:text-[#292929]"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      type="button"
    >
      <MoonIcon className="inline-block w-[21px] h-auto" />
    </button>
  )
}

export default ThemeSwitcher
