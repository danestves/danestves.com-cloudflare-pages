// Dependencies
import { GraphQLClient } from 'graphql-request'

// @types
import {
  Locale,
  GetAllPortfoliosForPortfolioPageQuery,
  GetAllPortfoliosWithSlugQuery,
  GetAllPostsForBlogPageQuery,
  GetAllPostsWithSlugQuery,
  GetPortfolioQuery,
  GetPostQuery,
} from '@/generated/graphql'

// Queries
import GET_ALL_PORTFOLIOS_FOR_PORTFOLIO_PAGE from '@/graphql/getAllPortfoliosForPortfolioPage.query.graphql'
import GET_ALL_PORTFOLIOS_WITH_SLUG from '@/graphql/getAllPortfoliosWithSlug.query.graphql'
import GET_ALL_POSTS_FOR_BLOG_PAGE from '@/graphql/getAllPostsForBlogPage.query.graphql'
import GET_ALL_POSTS_WITH_SLUG from '@/graphql/getAllPostsWithSlug.query.graphql'
import GET_PORTFOLIO from '@/graphql/getPortfolio.query.graphql'
import GET_POST from '@/graphql/getPost.query.graphql'

function fetchAPI(preview?: boolean): GraphQLClient {
  return new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${
        preview ? process.env.GRAPHCMS_DEVELOP_TOKEN : process.env.GRAPHCMS_PRODUCTION_TOKEN
      }`,
    },
  })
}

/**
 * Get an array of portfolios
 *
 * @param locale - The locale to query
 * @returns The array of portfolios by locale
 */
export async function getAllPortfoliosForPortfolioPage(
  locale: Locale
): Promise<GetAllPortfoliosForPortfolioPageQuery> {
  return fetchAPI()
    .request(GET_ALL_PORTFOLIOS_FOR_PORTFOLIO_PAGE, { locale })
    .then((res) => res)
}

/**
 * Get an array of portfolios with slug
 *
 * @param locale - The locale to query
 * @returns The array of portfolios by locale with slug
 */
export async function getAllPortfoliosWithSlug(
  locale: Locale
): Promise<GetAllPortfoliosWithSlugQuery> {
  return fetchAPI()
    .request(GET_ALL_PORTFOLIOS_WITH_SLUG, { locale })
    .then((res) => res)
}

/**
 * Get an array of posts
 *
 * @param locale - The locale to query
 * @param limit - The number of posts
 * @returns The array of posts by locale
 */
export async function getAllPostsForBlogPage(
  locale: Locale,
  limit = 100
): Promise<GetAllPostsForBlogPageQuery> {
  return fetchAPI()
    .request(GET_ALL_POSTS_FOR_BLOG_PAGE, { locale, limit })
    .then((res) => res)
}

/**
 * Get an array of posts with slug
 *
 * @param locale - The locale to query
 * @returns The array of posts by locale with slug
 */
export async function getAllPostsWithSlug(locale: Locale): Promise<GetAllPostsWithSlugQuery> {
  return fetchAPI()
    .request(GET_ALL_POSTS_WITH_SLUG, { locale })
    .then((res) => res)
}

export async function getPortfolio(
  locale: Locale,
  id: string,
  preview?: boolean
): Promise<GetPortfolioQuery> {
  return fetchAPI()
    .request(GET_PORTFOLIO, {
      stage: preview ? 'DRAFT' : 'PUBLISHED',
      locale,
      id,
    })
    .then((res) => res)
}

export async function getPost(
  locale: Locale,
  id: string,
  preview?: boolean
): Promise<GetPostQuery> {
  return fetchAPI()
    .request(GET_POST, {
      stage: preview ? 'DRAFT' : 'PUBLISHED',
      locale,
      id,
    })
    .then((res) => res)
}
