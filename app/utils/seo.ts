// Internals
import { initSeo } from '~/lib/remix-seo';

let title = 'Daniel Esteves - @danestves';
export let description = {
  en: [
    'Daniel Esteves a geek that love to read comics working as a frontend engineer,',
    'speaker, and teacher who haves years of experience building,',
    'creating and optimization of web applications.',
  ],
  es: [
    'Daniel Esteves es un geek al que le encanta leer cómics y que trabaja como frontend engineer,',
    'speaker y profesor con años de experiencia en la construcción,',
    'creación y optimización de web applications.',
  ],
};

export let { getSeo, getSeoLinks, getSeoMeta } = initSeo({
  title,
  description: description.en.join(' '),
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
