// Dependencies
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'remix';

// Internals
import { useMatchLoaderData } from '~/hooks/use-match-loader-data';
import { Dropdown } from './dropdown';
import { Flag } from './flag';
import type { RootLoaderData } from '~/root';

const LanguageSwitcher = (): JSX.Element => {
  let { i18n, t } = useTranslation('common');
  let navigate = useNavigate();
  let rootData = useMatchLoaderData('root') as RootLoaderData;
  let locale = i18n.language === 'en' ? 'es' : 'en';

  const handleChangeLanguage = () => {
    let url = new URL(rootData.requestInfo.origin);
    url.searchParams.set('lng', locale);

    return navigate({
      search: url.search,
    });
  };

  return (
    <Dropdown>
      <Dropdown.Trigger className="inline-flex items-center space-x-4 rounded-full focus:outline-none focus:ring-4 focus:ring-secondary/50 md:rounded-md md:py-2 md:px-4">
        <div className="h-9 w-9 rounded-full md:h-6 md:w-6">
          <Flag countryCode={rootData?.country} />
        </div>
        <span className="sr-only font-semibold uppercase text-secondary md:not-sr-only">
          {t('header.switcher.language.text')}{' '}
          <span aria-label="waving hand" role="img">
            👋🏻
          </span>
        </span>
      </Dropdown.Trigger>

      <Dropdown.Content className="!min-w-max rounded-md bg-white shadow-lg dark:bg-[#303030]">
        <Dropdown.Item asChild onSelect={handleChangeLanguage}>
          <button
            className="group mx-auto inline-flex items-center space-x-4 py-2 px-4 transition-colors duration-200 hover:bg-secondary"
            type="button"
          >
            <div className="h-6 w-6 rounded-full">
              <Flag countryCode={rootData?.country} locale={locale} />
            </div>
            <span className="font-semibold uppercase text-secondary transition-colors duration-200 group-hover:text-white">
              {i18n.language === 'en' ? 'Hola' : 'Hello'}{' '}
              <span aria-label="waving hand" role="img">
                👋🏻
              </span>
            </span>
          </button>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
};

export { LanguageSwitcher };
