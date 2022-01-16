// Dependencies
import { json } from 'remix';
import { isTheme } from 'remix-themes';
import { notFound } from 'remix-utils';
import type { ActionFunction, LoaderFunction } from 'remix';

// Internals
import type { Context } from '~/types';

export let action: ActionFunction = async ({ request, context }) => {
  let { theme: themeSessionResolver } = context as Context;
  let session = await themeSessionResolver(request);
  let { theme } = await request.json();

  if (!isTheme(theme))
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme.`,
    });

  session.setTheme(theme);
  return json(
    { success: true },
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
