// Dependencies
import type { DefaultSeoProps } from 'next-seo'

const baseUrl = 'https://danestves.com'

const common: DefaultSeoProps = {
  languageAlternates: [
    { href: `${baseUrl}/en`, hrefLang: 'en' },
    { href: baseUrl, hrefLang: 'es' },
  ],
  openGraph: {
    defaultImageHeight: 630,
    defaultImageWidth: 1200,
    profile: {
      firstName: 'Daniel',
      gender: 'male',
      lastName: 'Esteves',
      username: 'danestves',
    },
    site_name: 'Daniel Esteves',
    type: 'website',
    url: baseUrl,
  },
  twitter: {
    handle: '@danestves',
    site: '@danestves',
    cardType: 'summary_large_image',
  },
}
const title_by_lang = {
  en: 'Daniel Esteves - Frontend Developer',
  es: 'Daniel Esteves - Frontend Developer',
}
const description_by_lang = {
  en: 'Daniel Esteves has been working as a Frontend Developer for more than 6 years, having experience on projects using React, jQuery, SASS and WordPress.',
  es: 'Daniel Esteves desarrollador web frontend ha realizado sitios web utilizando WordPress, React, Gatsby, NextJS y mucho más. Listo para hacer tus sueños realidad.',
}

const getSeoByLang = (lang: string): DefaultSeoProps => {
  switch (lang) {
    case 'en':
      return {
        ...common,
        description: description_by_lang['en'],
        openGraph: {
          ...common.openGraph,
          description: description_by_lang['en'],
          images: [
            {
              url: `https://cdn.flyyer.io/v2/danestves-com/_/_/${lang}`,
              alt: 'Daniel Esteves',
              height: 630,
              width: 1200,
            },
          ],
          locale: 'en',
          title: title_by_lang['en'],
        },
        title: title_by_lang['en'],
      }
    case 'es':
      return {
        ...common,
        description: description_by_lang['es'],
        openGraph: {
          ...common.openGraph,
          description: description_by_lang['es'],
          images: [
            {
              url: `https://cdn.flyyer.io/v2/danestves-com/_/_/`,
              alt: 'Daniel Esteves',
              height: 630,
              width: 1200,
            },
          ],
          locale: 'es',
          title: title_by_lang['es'],
        },
        title: title_by_lang['es'],
      }
    default:
      return common
  }
}

export default getSeoByLang
