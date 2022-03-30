// Dependencies
import * as React from 'react';
import i18next from 'i18next';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { RemixBrowser } from 'remix';

// Internals
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
  // @ts-ignore - this is safe but we need to wait for fully react types
  let root = createRoot(document);

  return root.render(
    <I18nextProvider i18n={i18next}>
      <ClientCacheProvider>
        <RemixBrowser />
      </ClientCacheProvider>
    </I18nextProvider>
  );
});
