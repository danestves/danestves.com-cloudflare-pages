// Dependencies
import * as React from 'react';
import i18next from 'i18next';
import { hydrate } from 'react-dom';
import { RemixBrowser } from 'remix';

// Internals
import { RemixI18NextProvider } from '~/lib/remix-i18n';
import { initI18n } from '~/utils/i18n';
import { getCssText } from './stitches.config';
import { ClientStyleContext } from './contexts/client.context';

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [sheet, setSheet] = React.useState(getCssText());

  function reset() {
    setSheet(getCssText());
  }

  return (
    <ClientStyleContext.Provider value={{ reset, sheet }}>
      {children}
    </ClientStyleContext.Provider>
  );
}

initI18n().then(() => {
  return hydrate(
    <RemixI18NextProvider i18n={i18next}>
      <ClientCacheProvider>
        <RemixBrowser />
      </ClientCacheProvider>
    </RemixI18NextProvider>,
    document
  );
});
