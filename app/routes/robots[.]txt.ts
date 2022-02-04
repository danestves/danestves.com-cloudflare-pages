// Dependencies
import type { LoaderFunction } from 'remix';

// Internals
import { generateRobotsTxt } from '~/lib/robots.txt';

export let loader: LoaderFunction = async () => {
  return generateRobotsTxt([
    { type: 'sitemap', value: 'https://danestves.com/sitemap.xml' },
  ]);
};
