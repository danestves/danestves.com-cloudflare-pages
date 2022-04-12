// Dependencies
import * as React from 'react';
import { Flyyer } from '@flyyer/flyyer';
import { json } from '@remix-run/cloudflare';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useLocation,
} from '@remix-run/react';
import clsx from 'clsx';
import { LazyMotion, domAnimation } from 'framer-motion';
import { useSetupTranslations } from 'remix-i18next/build/react';
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from 'remix-themes';
import { StructuredData } from 'remix-utils';
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/server-runtime';
import type { Language } from 'remix-i18next';
import type { Theme } from 'remix-themes';
import type { HandleStructuredData } from 'remix-utils';

// Internals
import { Footer } from './components/footer';
import { Header } from './components/header';
import { LeftSidebar } from './components/left-sidebar';
import { RightSidebar } from './components/right-sidebar';
import { ClientStyleContext } from './contexts/client.context';
import { ServerStyleContext } from './contexts/server.context';
import { externalLinks } from './external-links';
import global from './styles/global.css';
import tailwind from './styles/tailwind.css';
import vendors from './styles/vendors.css';
import { getDomainUrl, removeTrailingSlash } from './utils/misc';
import { description as seoDescription, getSeo, getSeoMeta } from './utils/seo';
import type { Context, Handler } from '~/types';

export let handle: HandleStructuredData<RootLoaderData> & Handler = {
  structuredData() {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Daniel Esteves - @danestves',
        url: externalLinks.self,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        image:
          'https://res.cloudinary.com/danestves/image/upload/v1642025007/danestves.com/me.jpg',
        jobTitle: 'Senior Frontend Engineer',
        name: 'Daniel Esteves',
        sameAs: [
          externalLinks.github,
          externalLinks.instagram,
          externalLinks.linkedin,
          externalLinks.self,
          externalLinks.twitter,
          externalLinks.youtube,
        ],
        url: externalLinks.self,
        worksFor: {
          '@type': 'Organization',
          name: 'REWORTH',
        },
      },
    ];
  },
  id: 'root',
};

let [seoMeta, seoLinks] = getSeo();

export let links: LinksFunction = () => {
  return [
    ...seoLinks,
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Poppins-Bold.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Poppins-Regular.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicons/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicons/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicons/favicon-16x16.png',
    },
    { rel: 'manifest', href: '/site.webmanifest' },
    {
      href: '/safari-pinned-tab.svg',
      rel: 'mask-icon',
      color: '#29abe2',
    },
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: vendors },
    { rel: 'stylesheet', href: tailwind },
    { rel: 'stylesheet', href: global },
  ];
};

export type RootLoaderData = {
  country: string;
  i18n: Record<string, Language>;
  locale: string;
  requestInfo: {
    origin: string;
    path: string;
    session: {
      theme: Theme | null;
    };
  };
};

export let loader: LoaderFunction = async ({ request, context }) => {
  let { i18n, theme } = context as Context;
  let [{ getTheme }, locale, translations] = await Promise.all([
    theme.resolver(request),
    i18n.lib.getLocale(request),
    i18n.lib.getTranslations(request, 'common'),
  ]);
  let country = request.headers.get('CF-IPCOUNTRY') || 'US';

  let data: RootLoaderData = {
    country,
    i18n: translations,
    locale,
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
      session: {
        theme: getTheme(),
      },
    },
  };

  let headers: HeadersInit = new Headers();
  headers.append('Set-Cookie', await i18n.storage.serialize(locale));
  headers.append('Cache-Control', 'max-age=43200');

  return json(data, {
    headers,
  });
};

export let meta: MetaFunction = ({ data }) => {
  let { locale, requestInfo } = data as RootLoaderData;
  let flyyer = new Flyyer({
    project: 'danestves',
    path: requestInfo.path,
  });

  return {
    viewport: 'width=device-width, initial-scale=1',
    ...seoMeta,
    ...getSeoMeta({
      // @ts-ignore
      description: seoDescription[locale as any].join(' '),
      openGraph: {
        images: [
          {
            alt: 'Daniel Esteves - @danestves',
            url: flyyer.href(),
            height: 630,
            width: 1200,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        image: {
          alt: 'Daniel Esteves - @danestves',
          url: flyyer.href(),
        },
      },
    }),
  };
};

function App() {
  let serverStyleData = React.useContext(ServerStyleContext);
  let clientStyleData = React.useContext(ClientStyleContext);
  let data = useLoaderData<RootLoaderData>();

  let [theme] = useTheme();
  useSetupTranslations(data.locale);

  // Only executed on client
  React.useEffect(() => {
    // reset cache to re-apply global styles
    clientStyleData.reset();
  }, [clientStyleData, serverStyleData]);

  return (
    <html className={clsx(theme)} lang={data.locale}>
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <PreventFlashOnWrongTheme
          ssrTheme={Boolean(data.requestInfo.session.theme)}
        />

        <link
          href={removeTrailingSlash(
            `${data.requestInfo.origin}${data.requestInfo.path}`
          )}
          rel="canonical"
        />
        <Links />

        <style
          dangerouslySetInnerHTML={{ __html: clientStyleData.sheet }}
          id="stitches"
          suppressHydrationWarning
        />

        <StructuredData />
      </head>

      <body className="bg-white transition duration-500 dark:bg-[#292929]">
        <Header />
        <LeftSidebar />
        <RightSidebar />

        <Outlet />

        <Footer />

        <ScrollRestoration />
        <Scripts />
        <script
          async
          data-website-id="76378b8f-ea3f-43bf-bf63-bd4c4f273607"
          defer
          src="https://analytics.danestves.com/umami.js"
        ></script>
        {/* Cloudflare Web Analytics */}
        <script
          data-cf-beacon='{"token": "43c6ba9961f942c28ccacb530d74e5d4"}'
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
        ></script>
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  let data = useLoaderData<RootLoaderData>();

  return (
    <ThemeProvider
      specifiedTheme={data.requestInfo.session.theme}
      themeAction="/action/set-theme"
    >
      <LazyMotion features={domAnimation}>
        <App />
      </LazyMotion>
    </ThemeProvider>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch();
  const location = useLocation();

  console.error('CatchBoundary', caught);

  if (caught.status === 404) {
    return (
      <html lang="en">
        <head>
          <title>Oh no...</title>

          <Links />
        </head>

        <body>
          <p>404 - Oh no, you found a page that's missing stuff.</p>
          <p>
            "${location.pathname}" is not a page on danestves.com. So sorry.
          </p>

          <Scripts />
        </body>
      </html>
    );
  }

  throw new Error(`Unhandled error: ${caught.status}`);
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  const location = useLocation();

  console.error(error);

  return (
    <html lang="en">
      <head>
        <title>Oh no...</title>

        <Links />
      </head>

      <body>
        <p>500 - Oh no, something did not go well.</p>
        <p>"${location.pathname}" is currently not working. So sorry.</p>

        <Scripts />
      </body>
    </html>
  );
}
