// Dependencies
import { useI18n } from 'next-rosetta'

// Internals
import { MoonIcon } from '@/components/Icons'
import type { Locale } from 'i18n'

export const ThemeSwitcher = (): JSX.Element => {
  const { t } = useI18n<Locale>()

  return (
    <button
      aria-label={t('components.switcher.theme.label')}
      className="inline-flex p-2 text-white rounded-full bg-primary focus:ring-4 focus:outline-none focus:ring-primary focus:ring-opacity-50"
      type="button"
    >
      <MoonIcon className="inline-block w-[21px] h-auto" />
    </button>
  )
}

export default ThemeSwitcher
