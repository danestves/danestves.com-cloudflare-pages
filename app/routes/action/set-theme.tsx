// Dependencies
import { createThemeAction } from 'remix-themes';
import { notFound } from 'remix-utils';
import type { ActionFunction, LoaderFunction } from 'remix';

// Internals
import type { Context } from '~/types';

export let action: ActionFunction = async ({ context }) => {
  let { theme: themeSession } = context as Context;

  return createThemeAction(themeSession);
};

export let loader: LoaderFunction = async () => {
  return notFound({
    message: 'Not Found',
  });
};
