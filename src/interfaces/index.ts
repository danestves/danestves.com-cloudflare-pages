enum Stage {
  PUBLISHED,
  DRAFT,
}

export interface Asset {
  url: string
  width: number
  height: number
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
