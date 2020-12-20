enum Stage {
  PUBLISHED,
  DRAFT,
}

enum Locale {
  es_VE,
}

export interface Seo {
  stage: Stage
  id: string | number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  title: string
  description: string
  keywords: [string]
  image: Asset
}

export interface RichText {
  html: string
  narkdown: string
  text: string
}

export interface Asset {
  stage: Stage
  locale: Locale
  id: string | number
  createdAt: string
  updatedAt: string
  publishedAt: string
  handle: string
  fileName: string
  height: number
  width: number
  size?: number
  mimeType: string
  url: string
}

export interface Post {
  stage: Stage
  id: string | number
  createdAt: string
  updatedAt: string
  publishedAt: string
  title: string
  slug: string
  date: string
  excerpt?: string
  coverImage: Asset
  content: string
  tags: [string]
  seo: Seo
}
