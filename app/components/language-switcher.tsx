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
      <Dropdown.Trigger className="inline-flex items-center space-x-4 rounded-full focus:outline-none focus:ring-4 focus:ring-secondary/50 md:py-2 md:px-4 md:rounded-md">
        <div className="w-9 h-9 rounded-full md:w-6 md:h-6">
          <Flag countryCode={rootData?.country} />
        </div>
        <span className="font-semibold text-secondary uppercase sr-only md:not-sr-only">
          {t('header.switcher.language.text')}{' '}
          <span aria-label="waving hand" role="img">
            👋🏻
          </span>
        </span>
      </Dropdown.Trigger>

      <Dropdown.Content className="!min-w-max bg-white dark:bg-[#303030] rounded-md shadow-lg">
        <Dropdown.Item asChild onSelect={handleChangeLanguage}>
          <button
            className="group inline-flex items-center py-2 px-4 mx-auto space-x-4 hover:bg-secondary transition-colors duration-200"
            type="button"
          >
            <div className="w-6 h-6 rounded-full">
              <Flag countryCode={rootData?.country} locale={locale} />
            </div>
            <span className="font-semibold text-secondary group-hover:text-white uppercase transition-colors duration-200">
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
