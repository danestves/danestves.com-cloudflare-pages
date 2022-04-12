// Dependencies
import { json } from '@remix-run/cloudflare';
import { isTheme } from 'remix-themes';
import { notFound } from 'remix-utils';
import type { ActionFunction, LoaderFunction } from '@remix-run/cloudflare';

// Internals
import type { Context } from '~/types';

export let action: ActionFunction = async ({ context, request }) => {
  let { theme: themeContext } = context as Context;
  let session = await themeContext.resolver(request);
  let { theme } = await request.json();

  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme.`,
    });
  }

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
