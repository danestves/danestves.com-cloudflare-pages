// Dependencies
import {
  createRequestHandler,
  handleAsset,
} from '@remix-run/cloudflare-workers';

// Internals
// @ts-ignore
import * as build from '../build/index.js';

const handleRequest = createRequestHandler({ build });

const handleEvent = async (event: FetchEvent) => {
  const { request } = event;

  // @ts-ignore
  const cache = caches.default;
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  let response = await handleAsset(event, build);

  if (!response) {
    response = await handleRequest(event);
  }

  response = new Response(response.body, response);
  let relativePath = request.url.replace(/^https?:\/\/[^/]+/, '');

  if (relativePath.includes('build/info.json')) {
    // We need to first delete the cache to avoid the s-maxage for the rest of responses
    response.headers.delete('Cache-Control');
    response.headers.append('Cache-Control', 'no-cache');
  }

  if (relativePath.includes('fonts') || relativePath.includes('build')) {
    // We need to first delete the cache to avoid the s-maxage for the rest of responses
    response.headers.delete('Cache-Control');
    response.headers.append(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }

  event.waitUntil(cache.put(request, response.clone()));

  return response;
};

addEventListener('fetch', (event: FetchEvent) => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e: any) {
    if (process.env.NODE_ENV === 'development') {
      event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        })
      );
    }

    event.respondWith(new Response('Internal Error', { status: 500 }));
  }
});
