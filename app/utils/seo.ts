// Internals
import { initSeo } from '~/lib/remix-seo';

let title = 'Daniel Esteves - @danestves';
let description = [
  'Daniel Esteves a geek that love to read comics working as a frontend engineer,',
  'speaker, and teacher who haves years of experience building,',
  'creating and delivering final products.',
];

export let { getSeo, getSeoLinks, getSeoMeta } = initSeo({
  title,
  description: description.join(' '),
  languageAlternates: [
    {
      href: 'https://danestves.com/?lng=en',
      hrefLang: 'en',
    },
    {
      href: 'https://danestves.com/?lng=es',
      hrefLang: 'es',
    },
  ],
  twitter: {
    card: 'summary_large_image',
    creator: {
      id: 'danestves',
    },
    site: {
      id: 'danestves',
    },
  },
});
