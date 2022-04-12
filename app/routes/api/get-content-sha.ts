// Dependencies
import { json } from '@remix-run/cloudflare';
import type { LoaderFunction } from '@remix-run/cloudflare';

export let loader: LoaderFunction = async ({ context }) => {
  let CONTENT = context.env.CONTENT as KVNamespace;
  let data = (await CONTENT.get('$$content-sha', 'json')) || {
    commit: { sha: '' },
  };

  return json(data);
};
