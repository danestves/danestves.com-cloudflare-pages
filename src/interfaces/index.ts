export interface Format {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  path: string | null
  url: string
}
export interface Formats {
  thumbnail: Format
  large?: Format
  medium?: Format
  small?: Format
}

export interface Media {
  _id: string
  id: string
  name: string
  alternativeText: string
  caption: string
  hash: string
  ext: string
  mime: string
  size: number
  width: number
  height: number
  url?: string
  formats: Formats
  provider: string
  related: string[]
  createdAt: string
  updatedAt: string
}

export interface Tag {
  _id: string
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Technology {
  _id: string
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  _id: string
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Portfolio {
  _id: string
  id: string
  isActive: boolean
  title: string
  slug: string
  url: string
  body: string
  cover: Media
  ogCover: Media
  category: Category
  technologies: Technology[]
}

export interface Blog {
  _id: string
  id: string
  title: string
  slug: string
  body: string
  cover: Media
  tags: Tag[]
  createdAt: string
  updatedAt: string
}

export interface Page {
  _id: string
  title: string
  seo_description: string
  slug: string
}

export interface Link {
  /** Title of the link */
  label: string
  url?: string
}

export interface Navbar {
  logo?: Media
  links: Link[] & {
    links?: Link[]
  }
}

export interface Metadata {
  title: string
  suffix: string
  description: string
  shareImage: Media
  twitterCardType: string
  twitterUsername: string
  favicon: Media
}

export interface Global {
  metadata: Metadata
}

export interface ArgsUseDocumentType {
  previousScrollTop: number
  currentScrollTop: number
}

export interface UseEntriesReturn {
  /**
   * @returns Retreive if hook is fetching data
   */
  loading: boolean
  /**
   * @returns Array of entries, otherwise undefined.
   */
  items: Portfolio[] | Blog[] | []
  /**
   * @returns True if _start is equal to 0, otherwise false.
   */
  isFirstPage: boolean
  /**
   * @returns True if start + limit are equal less to the count of all entries, otherwise false.
   */
  hasPages: boolean
  /**
   * Handle functionality for previous page
   *
   * @returns Change the current URL for the previous page.
   */
  handlePrevPage(): Promise<boolean>
  /**
   * Handle functionality for next page
   *
   * @returns Change the current URL for the next page.
   */
  handleNextPage(): Promise<boolean>
}
