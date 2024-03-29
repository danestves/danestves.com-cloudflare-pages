// Dependencies
import { json } from '@remix-run/cloudflare';
import type { LoaderFunction } from '@remix-run/cloudflare';

export let loader: LoaderFunction = async ({ context }) => {
  let CONTENT = context.env.CONTENT as KVNamespace;
  let data = await CONTENT.list({ prefix: `posts/en/` });
  let posts = data.keys.map((key) => ({
    route: key.name.replace('posts/en', '/posts'),
    priority: 0.7,
  }));

  return json(posts);
};
