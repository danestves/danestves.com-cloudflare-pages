// Dependencies
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useTranslation } from 'react-i18next';
import { Theme, useTheme } from 'remix-themes';

// Internals
import { MoonIcon } from './icons/moon-icon';
import { Switch } from './switch';
import { Themed } from './themed';

function ThemeSwitcher() {
  let { t } = useTranslation();
  let [theme, setTheme] = useTheme();

  const onCheckedChange = (_checked: boolean) => {
    setTheme((previousTheme) =>
      previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    );
  };

  return (
    <Switch
      aria-label="Toggle dark mode"
      checked={theme === Theme.DARK}
      className="inline-flex rounded-full bg-secondary p-2 text-white focus:outline-none focus:ring-4 focus:ring-secondary/50 dark:text-[#292929]"
      defaultChecked={theme === Theme.DARK}
      onCheckedChange={onCheckedChange}
    >
      <MoonIcon className="inline-block h-auto w-[21px]" />

      <VisuallyHidden.Root>
        <Themed
          dark={t('header.switcher.theme.dark')}
          light={t('header.switcher.theme.light')}
        />
      </VisuallyHidden.Root>
    </Switch>
  );
}

export { ThemeSwitcher };
