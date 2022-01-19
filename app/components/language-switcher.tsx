// Dependencies
import * as React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'remix';

// Internals
import { Flag } from './flag';
import { useMatchLoaderData } from '~/hooks/use-match-loader-data';
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
    <Menu as="div" className="inline-flex relative text-left">
      <Menu.Button className="inline-flex items-center space-x-4 rounded-full focus:outline-none focus:ring-4 focus:ring-secondary/50 md:py-2 md:px-4 md:rounded-md">
        <div className="w-9 h-9 rounded-full md:w-6 md:h-6">
          <Flag countryCode={rootData?.country} />
        </div>
        <span className="font-semibold text-secondary uppercase sr-only md:not-sr-only">
          {t('header.switcher.language.text')}{' '}
          <span aria-label="waving hand" role="img">
            👋🏻
          </span>
        </span>
      </Menu.Button>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="overflow-hidden absolute top-full right-0 mt-2 w-max bg-white dark:bg-[#292929] rounded-md focus:outline-none ring-1 ring-black shadow-lg origin-top-right ring-opacity-5">
          <Menu.Item
            as="button"
            className="group inline-flex items-center p-4 mx-auto space-x-4 hover:bg-secondary transition-colors duration-200"
            onClick={handleChangeLanguage}
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
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export { LanguageSwitcher };
