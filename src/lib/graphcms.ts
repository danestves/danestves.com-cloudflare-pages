// Dependencies
import { GraphQLClient } from 'graphql-request'

// @types
import {
  Locale,
  GetAllPostsWithSlugQuery,
  GetAllPostsForBlogPageQuery,
  GetPostQuery,
} from '@/generated/graphql'

// Queries
import GET_ALL_POSTS_WITH_SLUG from '@/graphql/getAllPostsWithSlug.query.graphql'
import GET_ALL_POSTS_FOR_BLOG_PAGE from '@/graphql/getAllPostsForBlogPage.query.graphql'
import GET_POST from '@/graphql/getPost.query.graphql'

function fetchAPI(preview?: boolean): GraphQLClient {
  return new GraphQLClient(process.env.GRAPHCMS_ENDPOINT as string, {
    headers: {
      Authorization: `Bearer ${
        preview ? process.env.GRAPHCMS_DEVELOP_TOKEN : process.env.GRAPHCMS_PRODUCTION_TOKEN
      }`,
    },
  })
}

export async function getAllPostsWithSlug(locale: Locale): Promise<GetAllPostsWithSlugQuery> {
  return fetchAPI()
    .request(GET_ALL_POSTS_WITH_SLUG, { locale })
    .then((res) => res)
}

export async function getAllPostsForBlogPage(locale: Locale): Promise<GetAllPostsForBlogPageQuery> {
  return fetchAPI()
    .request(GET_ALL_POSTS_FOR_BLOG_PAGE, { locale })
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
