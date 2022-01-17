// Dependencies
import { createThemeAction } from 'remix-themes';
import { notFound } from 'remix-utils';
import type { ActionFunction, LoaderFunction } from 'remix';

// Internals
import { themeSessionResolver } from '~/utils/theme.server';

export let action: ActionFunction = createThemeAction(themeSessionResolver);

export let loader: LoaderFunction = async () => {
  return notFound({
    message: 'Not Found',
  });
};
