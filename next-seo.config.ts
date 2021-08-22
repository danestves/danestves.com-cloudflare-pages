// Dependencies
import type { DefaultSeoProps } from 'next-seo'

const baseURL = 'https://danestves.com'
export const texts = {
  description: {
    en: 'Content about JavaScript, web development, frontend skills, React, Vue, CSS and much, much more.',
    es: 'Contenido sobre JavaScript, desarrollo web, habilidades sobre frontend, React, Vue, CSS y mucho, mucho más.',
  },
  title: {
    en: 'danestves | Frontend Content Creator, React, Vue and CSS',
    es: 'danestves | Creador de contenido Frontend, React, Vue y CSS',
  },
}
export const common: DefaultSeoProps = {
  additionalLinkTags: [
    {
      href: '/static/icons/apple-touch-icon.png',
      rel: 'apple-touch-icon',
      sizes: '180x180',
    },
    {
      href: '/static/icons/favicon-32x32.png',
      rel: 'icon',
      sizes: '32x32',
    },
    {
      href: '/static/icons/favicon-16x16.png',
      rel: 'icon',
      sizes: '16x16',
    },
    {
      href: '/static/icons/site.webmanifest',
      rel: 'manifest',
    },
    {
      href: '/static/icons/safari-pinned-tab.svg',
      rel: 'mask-icon',
      color: '#29abe2',
    },
    {
      href: '/static/icons/favicon.ico',
      rel: 'shortcut icon',
    },
  ],
  additionalMetaTags: [
    {
      content: '#ffffff',
      name: 'msapplication-TileColor',
    },
    {
      content: '/static/icons/browserconfig.xml',
      name: 'msapplication-config',
    },
    {
      content: '#ffffff',
      name: 'theme-color',
    },
  ],
  defaultOpenGraphImageHeight: 630,
  defaultOpenGraphImageWidth: 1200,
  languageAlternates: [
    {
      href: baseURL,
      hrefLang: 'en',
    },
    {
      href: `${baseURL}/es`,
      hrefLang: 'es',
    },
  ],
  openGraph: {
    locale: 'en_US',
    profile: {
      firstName: 'Daniel',
      gender: 'male',
      lastName: 'Esteves',
      username: 'danestves',
    },
    site_name: '@danestves',
    type: 'website',
  },
  twitter: {
    cardType: 'summary_large_image',
    handle: '@danestves',
    site: '@danestves',
  },
}

const seo = (lang: string): DefaultSeoProps => {
  switch (lang) {
    case 'es':
      return {
        ...common,
        description: texts.description.es,
        openGraph: {
          ...common.openGraph,
          locale: 'es_ES',
          title: texts.title.es,
        },
        title: texts.title.es,
      }
    default:
      return {
        ...common,
        description: texts.description.en,
        openGraph: {
          ...common.openGraph,
          locale: 'en_US',
          title: texts.title.en,
        },
        title: texts.title.en,
      }
  }
}

export default seo
