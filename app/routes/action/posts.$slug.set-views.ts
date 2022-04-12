// Dependencies
import { json } from '@remix-run/cloudflare';
import { notFound } from 'remix-utils';
import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime';

export let action: ActionFunction = async ({ context, params }) => {
  let VIEWS = context.env.VIEWS as KVNamespace;
  let { slug } = params;
  let initViews = await VIEWS.get(slug as string, 'text');
  let views = Number(initViews) + 1;

  await VIEWS.put(slug as string, String(views));

  return json({
    success: true,
  });
};

export let loader: LoaderFunction = async () => {
  return notFound({
    message: 'Not Found',
  });
};
