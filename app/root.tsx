// Dependencies
import clsx from 'clsx';
import { LazyMotion, domAnimation } from 'framer-motion';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useCatch,
  useLoaderData,
  useLocation,
} from 'remix';
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from 'remix-themes';
import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix';
import type { Language } from 'remix-i18next';
import type { Theme } from 'remix-themes';

// Internals
import { Footer } from './components/footer';
import { Header } from './components/header';
import { LeftSidebar } from './components/left-sidebar';
import { RightSidebar } from './components/right-sidebar';
import { getImageBuilder, images } from './images';
import { useRemixI18Next } from './lib/remix-i18n';
import global from './styles/global.css';
import tailwind from './styles/tailwind.css';
import vendors from './styles/vendors.css';
import { i18n, i18nStorage } from './utils/i18n.server';
import { getDomainUrl, removeTrailingSlash } from './utils/misc';
import { description as seoDescription, getSeo, getSeoMeta } from './utils/seo';
import { themeSessionResolver } from './utils/theme.server';
import type { Handler } from '~/types';

export let handle: Handler = {
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

export let loader: LoaderFunction = async ({ request }) => {
  let [theme, locale, translations] = await Promise.all([
    themeSessionResolver(request),
    i18n.getLocale(request),
    i18n.getTranslations(request, 'common'),
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
        theme: theme.getTheme(),
      },
    },
  };

  const headers: HeadersInit = new Headers();
  headers.append('Set-Cookie', await i18nStorage.serialize(locale));

  return json(data, {
    headers,
  });
};

export let meta: MetaFunction = ({ data }) => {
  let { locale } = data as RootLoaderData;
  let image = getImageBuilder(images.og.id, images.og.alt);
  let og = image({
    format: 'jpg',
  });

  return {
    viewport: 'width=device-width, initial-scale=1',
    ...seoMeta,
    ...getSeoMeta({
      // @ts-ignore
      description: seoDescription[locale as any].join(' '),
    }),
    'og:image': og,
    'og:image:type': 'image/jpeg',
    'og:image:width': '1200',
    'og:image:height': '630',
    'twitter:image': og,
  };
};

function App() {
  let data = useLoaderData<RootLoaderData>();

  let [theme] = useTheme();
  useRemixI18Next(data.locale);

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
      </head>

      <body className="bg-white transition duration-500 dark:bg-[#292929]">
        <Header />
        <LeftSidebar />
        <RightSidebar />

        <Outlet />

        <Footer />

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
        <script
          async
          data-website-id="76378b8f-ea3f-43bf-bf63-bd4c4f273607"
          defer
          src="https://analytics.danestves.com/umami.js"
        ></script>
        {/* Cloudflare Web Analytics */}
        <script
          data-cf-beacon='{"token": "fd6169f72af14672a05fc35ed7ffdbc1"}'
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
        ></script>
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
  let caught = useCatch();
  let location = useLocation();

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
  let location = useLocation();

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
