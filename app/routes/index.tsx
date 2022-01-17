// Dependencies
import { json } from 'remix';
import type { LoaderFunction } from 'remix';
import type { Language } from 'remix-i18next';

// Internals
import { HeroSection } from '~/components/sections/hero-section';
import { i18n } from '~/utils/i18n.server';

type LoaderData = {
  i18n: Record<string, Language>;
};

export let loader: LoaderFunction = async ({ request }) => {
  let [translations] = await Promise.all([
    i18n.getTranslations(request, 'sections'),
  ]);

  let data: LoaderData = {
    i18n: translations,
  };

  return json(data, {
    headers: {
      'Cache-Control': `private, max-age=21600, must-revalidate`,
      Vary: 'Cookie',
    },
  });
};

export default function Index() {
  return (
    <>
      <HeroSection />
    </>
  );
}
