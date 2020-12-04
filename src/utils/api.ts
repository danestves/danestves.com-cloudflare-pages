// Lib
import axios from '@/lib/axios'

// Interfaces
import { Page, Blog, Portfolio, Global } from '@/interfaces'
import { Params } from 'next/dist/next-server/server/router'

/**
 * Gets url from strapi, production or local
 *
 * @param path - The path to append in the url
 * @returns String with the url
 */
export function getStrapiURL(path: string): string {
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${path}`
}

/**
 * Helper to make GET requests to Strapi
 *
 * @param path - The path that we going to fetch
 * @returns Parsed data in JSON
 */
export async function fetchAPI(path: string): Promise<unknown> {
  const requestUrl = getStrapiURL(path)
  const response = await axios.get(requestUrl)
  const data = await response.data

  return data
}

/**
 * Gets a page by an slug.
 *
 * @param slug - The unique identifier slug of a page
 * @returns The page object if exists
 */
export async function getPageData(slug: string): Promise<Page | null> {
  // Find the pages that match this slug
  const pagesData = (await fetchAPI(`/seeed?slug=${slug}`)) as Page[]

  // Make sure we found something, otherwise return null
  if (pagesData === null || pagesData.length === 0) {
    return null
  }

  // Return the first item since there should only be one result per slug
  return pagesData[0]
}

/**
 * Gets a list of posts
 *
 * @param limit - The limit of posts to show
 * @param start - The number of items to paginate
 * @returns The array of posts paginateddocker-com
 */
export async function getPosts(
  limit = 10,
  start = 0,
  preview: boolean | null = null
): Promise<{ posts: Blog[]; count: string } | null> {
  const posts = (await fetchAPI(
    `/blogs?_limit=${limit}&_start=${start}&_sort=createdAt:DESC${
      preview ? '' : '&_publicationState=live'
    }`
  )) as Blog[]
  const postsCount = (await fetchAPI('/blogs/count')) as string

  if (posts === null || posts.length === 0) {
    return null
  }

  return {
    posts,
    count: postsCount,
  }
}

/**
 * Gets a blog by an slug.
 *
 * @param slug - The unique identifier slug of a blog
 * @returns The blog object if exists
 */
export async function getBlogData(slug: string): Promise<Blog | null> {
  // Find the pages that match this slug
  const blogsData = (await fetchAPI(`/blogs?slug=${slug}`)) as Blog[]

  // Make sure we found something, otherwise return null
  if (blogsData === null || blogsData.length === 0) {
    return null
  }

  // Return the first item since there should only be one result per slug
  return blogsData[0]
}

/**
 * Gets a list of entries
 *
 * @param slug - The url where you want to retreive the entries
 * @param params - The parameters of the URL
 * @returns The array of entries
 */
export async function getEntries(
  slug: string,
  params: Params
): Promise<{ entries: Portfolio[] | Blog[]; count: number } | null> {
  const entries = (await (await axios.get(getStrapiURL(slug), { params })).data) as
    | Portfolio[]
    | Blog[]
  const entriesCount = (await (await axios.get(getStrapiURL(`${slug}/count`))).data) as string

  if (entries === null) {
    return null
  }

  return {
    entries,
    count: Number(entriesCount),
  }
}

/**
 * Gets a portfolio by an slug.
 *
 * @param slug - The unique identifier slug of a portfolio
 * @returns The portfolio object if exists
 */
export async function getPortfolioData(slug: string): Promise<Portfolio | null> {
  // Find the pages that match this slug
  const portfoliosData = (await fetchAPI(`/portfolios?slug=${slug}`)) as Portfolio[]

  // Make sure we found something, otherwise return null
  if (portfoliosData === null || portfoliosData.length === 0) {
    return null
  }

  // Return the first item since there should only be one result per slug
  return portfoliosData[0]
}

/**
 * Gets all the information from the site
 *
 * @returns Metadata, navbar, and footer
 */
export async function getGlobalData(): Promise<Global | null> {
  const global = (await fetchAPI('/global')) as Global

  return global
}
