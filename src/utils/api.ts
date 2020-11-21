// Interfaces
import { Page, Blog, Portfolio } from '@/interfaces'

export function getStrapiURL(path: string): string {
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${path}`
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path: string): Promise<Record<string, unknown>> {
  const requestUrl = getStrapiURL(path)
  const response = await fetch(requestUrl)
  const data = await response.json()

  return data
}

export async function getPageData(slug: string): Promise<Page[] | null> {
  // Find the pages that match this slug
  const pagesData = await fetchAPI(`/seeed?slug=${slug}`)

  // Make sure we found something, otherwise return null
  if (pagesData === null || pagesData.length === 0) {
    return null
  }

  // Return the first item since there should only be one result per slug
  return pagesData[0] as Page[]
}

export async function getBlogData(slug: string): Promise<Blog[] | null> {
  // Find the pages that match this slug
  const blogsData = await fetchAPI(`/blogs?slug=${slug}`)

  // Make sure we found something, otherwise return null
  if (blogsData === null || blogsData.length === 0) {
    return null
  }

  // Return the first item since there should only be one result per slug
  return blogsData[0] as Blog[]
}

export async function getPortfolioData(slug: string): Promise<Portfolio[] | null> {
  // Find the pages that match this slug
  const portfoliosData = await fetchAPI(`/portfolios?slug=${slug}`)

  // Make sure we found something, otherwise return null
  if (portfoliosData === null || portfoliosData.length === 0) {
    return null
  }

  // Return the first item since there should only be one result per slug
  return portfoliosData[0] as Portfolio[]
}

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData(): Promise<Record<string, unknown>> {
  const global = await fetchAPI('/global')

  return global
}
