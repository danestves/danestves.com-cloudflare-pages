// Dependencies
import clsx from 'clsx';
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
} from 'remix';
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from 'remix-themes';
import type { LinksFunction, MetaFunction, LoaderFunction } from 'remix';
import type { Theme } from 'remix-themes';

// Internals
import stylesUrl from './styles/tailwind.css';
import { getDomainUrl, removeTrailingSlash } from './utils/misc';
import type { Context } from '~/types';

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

export let meta: MetaFunction = () => {
  return {
    viewport: 'width=device-width, initial-scale=1',
  };
};

type LoaderData = {
  requestInfo: {
    origin: string;
    path: string;
    session: {
      theme: Theme | null;
    };
  };
};

export let loader: LoaderFunction = async ({ request, context }) => {
  let { theme: themeSession } = context as Context;
  let theme = await themeSession(request);

  let data: LoaderData = {
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
      session: {
        theme: theme.getTheme(),
      },
    },
  };

  return data;
};

function App() {
  const data = useLoaderData<LoaderData>();

  const [theme] = useTheme();

  return (
    <html className={clsx(theme)} lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />

        <link
          href={removeTrailingSlash(
            `${data.requestInfo.origin}${data.requestInfo.path}`
          )}
          rel="canonical"
        />
        <PreventFlashOnWrongTheme
          ssrTheme={Boolean(data.requestInfo.session.theme)}
        />
        <Links />
      </head>

      <body className="bg-white dark:bg-[#292929] transition duration-500">
        <Outlet />

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  let data = useLoaderData<LoaderData>();

  return (
    <ThemeProvider
      specifiedTheme={data.requestInfo.session.theme}
      themeAction="/action/set-theme"
    >
      <App />
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
