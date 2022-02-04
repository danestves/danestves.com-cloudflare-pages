// Dependencies
import { EntryContext } from '@remix-run/server-runtime';

// Internals
import { getSitemapXml } from './utils';
import type { SEOOptions } from '~/types';

export async function generateSitemap(
  request: Request,
  remixEntryContent: EntryContext,
  options: SEOOptions
) {
  let { siteUrl, headers } = options;
  let sitemap = await getSitemapXml(request, remixEntryContent, {
    siteUrl,
  });
  let bytes = new TextEncoder().encode(sitemap).byteLength;

  return new Response(sitemap, {
    headers: {
      ...headers,
      'Content-Type': 'application/xml',
      'Content-Length': String(bytes),
    },
  });
}
