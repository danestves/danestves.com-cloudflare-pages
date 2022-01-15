// Internals
import { initSeo } from '~/lib/remix-seo';

let title = 'Daniel Esteves';
let description = [
  'Daniel Esteves a geek  that love to read comics working as a frontend engineer,',
  'speaker, and teacher who haves years of experience building,',
  'creating and delivering final products.',
];

export let { getSeo, getSeoLinks, getSeoMeta } = initSeo({
  title,
  titleTemplate: '%s | @danestves',
  description: description.join(' '),
  openGraph: {
    images: [
      {
        alt: `${title} | @danestves`,
        url: 'https://cdn.flyyer.io/v2/danestves/_/_/',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: {
      id: 'danestves',
    },
    image: {
      alt: `${title} | @danestves`,
      url: 'https://cdn.flyyer.io/v2/danestves/_/_/',
    },
    site: {
      id: 'danestves',
    },
  },
});
