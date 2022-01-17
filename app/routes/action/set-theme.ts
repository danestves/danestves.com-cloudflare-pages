// Dependencies
import { json } from 'remix';
import { isTheme } from 'remix-themes';
import { notFound } from 'remix-utils';
import type { ActionFunction, LoaderFunction } from 'remix';

// Internals
import { themeSessionResolver } from '~/utils/theme.server';

export let action: ActionFunction = async ({ request }) => {
  let session = await themeSessionResolver(request);
  let { theme } = await request.json();

  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme.`,
    });
  }

  session.setTheme(theme);
  return json(
    {
      success: true,
      setTheme: session.setTheme(theme),
      'Set-Cookie': await session.commit(),
    },
    {
      headers: { 'Set-Cookie': await session.commit() },
    }
  );
};

export let loader: LoaderFunction = async () => {
  return notFound({
    message: 'Not Found',
  });
};
