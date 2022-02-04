// Dependencies
import i18next from 'i18next';
import { hydrate } from 'react-dom';
import { RemixBrowser } from 'remix';

// Internals
import { RemixI18NextProvider } from '~/lib/remix-i18n';
import { initI18n } from '~/utils/i18n';

initI18n().then(() => {
  return hydrate(
    <RemixI18NextProvider i18n={i18next}>
      <RemixBrowser />
    </RemixI18NextProvider>,
    document
  );
});
