// Dependencies
import clsx from 'clsx';
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
import { useRemixI18Next } from './lib/remix-i18n';
import stylesUrl from './styles/tailwind.css';
import { getDomainUrl, removeTrailingSlash } from './utils/misc';
import { getSeo } from './utils/seo';
import type { Context, Handler } from '~/types';

export let handle: Handler = {
  id: 'root',
};

let [seoMeta, seoLinks] = getSeo();

export let links: LinksFunction = () => {
  return [...seoLinks, { rel: 'stylesheet', href: stylesUrl }];
};

export let meta: MetaFunction = ({ data }) => {
  let { requestInfo } = data as RootLoaderData;

  return {
    viewport: 'width=device-width, initial-scale=1',
    ...seoMeta,
    'twitter:image': `https://cdn.flyyer.io/v2/danestves/_/_${requestInfo?.path}`,
    'og:image': `https://cdn.flyyer.io/v2/danestves/_/_${requestInfo?.path}`,
  };
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
  let { theme: themeSession, i18n } = context as Context;
  let [theme, locale, translations] = await Promise.all([
    themeSession(request),
    i18n.i18next.getLocale(request),
    i18n.i18next.getTranslations(request, 'common'),
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
  headers.append('Set-Cookie', await i18n.cookie.serialize(locale));

  return json(data, {
    headers,
  });
};

function App() {
  let data = useLoaderData<RootLoaderData>();

  let [theme] = useTheme();
  useRemixI18Next(data?.locale || 'en');

  return (
    <html className={clsx(theme)} lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <PreventFlashOnWrongTheme
          ssrTheme={Boolean(data?.requestInfo?.session?.theme)}
        />

        <link
          href={removeTrailingSlash(
            `${data?.requestInfo?.origin}${data?.requestInfo?.path}`
          )}
          rel="canonical"
        />
        <Links />
      </head>

      <body className="bg-white dark:bg-[#292929] transition duration-500">
        <Header />
        <LeftSidebar />
        <RightSidebar />

        <Outlet />

        <Footer />

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  let data = useLoaderData<RootLoaderData>();

  return (
    <ThemeProvider
      specifiedTheme={data?.requestInfo?.session?.theme}
      themeAction="/action/set-theme"
    >
      <App />
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
