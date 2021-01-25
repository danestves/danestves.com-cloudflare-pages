// Generated
import {
  Portfolio,
  PortfolioSlugsQuery,
  PortfoliosQuery,
  Post,
  PostSlugsQuery,
  PostsRssQuery,
} from '@/generated/graphql'

/**
 * Custom fetch function to retreive data
 *
 * @param query - The query to make
 * @param
 */
async function fetchAPI(
  query: string,
  { variables, preview }: { variables?: Record<string, unknown>; preview?: boolean } = {}
): Promise<any> {
  const res = await fetch(process.env.GRAPHCMS_PROJECT_API as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        preview ? process.env.GRAPHCMS_DEV_AUTH_TOKEN : process.env.GRAPHCMS_PROD_AUTH_TOKEN
      }`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const json = await res.json()

  if (json.errors) {
    console.log(process.env.NEXT_EXAMPLE_CMS_GCMS_PROJECT_ID)
    console.error(json.errors)

    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getAllPortfoliosWithSlug(): Promise<
  Array<Pick<Portfolio, 'slug' | 'updatedAt' | 'createdAt'>>
> {
  const data: PortfolioSlugsQuery = await fetchAPI(`
    query getAllPortfoliosWithSlug {
      portfolios {
        slug
        createdAt
        updatedAt
      }
    }
  `)

  return data.portfolios
}

export async function getPortfolio(slug: string, preview: boolean): Promise<Portfolio> {
  const data: { portfolio: Portfolio } = await fetchAPI(
    `
    query portfolio($slug: String!) {
      portfolio(where: { slug: $slug }) {
        seo {
          title
          description
          image {
            url
            width
            height
          }
        }
        id
        title
        cover {
          handle
          width
          height
        }
        industry
        technologies
        external_url
        content
      }
    }
    `,
    {
      preview,
      variables: {
        stage: preview ? 'DRAFT' : 'PUBLISHED',
        slug,
      },
    }
  )

  return data.portfolio
}

export async function getPortfolios(
  first = 4,
  skip = 0,
  after?: string | null
): Promise<PortfoliosQuery> {
  const data: PortfoliosQuery = await fetchAPI(
    `
    query portfolios($first: Int, $skip: Int, $after: String) {
      portfolios: portfoliosConnection(
        first: $first
        skip: $skip
        after: $after
        orderBy: updatedAt_DESC
      ) {
        edges {
          node {
            id
            title
            slug
            cover {
              handle
              width
              height
            }
            content
          }
          cursor
        }
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
      }
      count: portfoliosConnection {
        aggregate {
          count
        }
      }
    }
    `,
    {
      variables: {
        first,
        skip,
        after,
      },
    }
  )

  return data
}

export async function getPreviewPostBySlug(slug: string): Promise<{ slug: string }> {
  const data: { post: { slug: string } } = await fetchAPI(
    `
    query PostBySlug($slug: String!, $stage: Stage!) {
      post(where: {slug: $slug}, stage: $stage) {
        slug
      }
    }`,
    {
      preview: true,
      variables: {
        stage: 'DRAFT',
        slug,
      },
    }
  )

  return data.post
}

export async function getAllPostsWithSlug(): Promise<
  Array<Pick<Post, 'slug' | 'updatedAt' | 'createdAt'>>
> {
  const data: PostSlugsQuery = await fetchAPI(`
    query getAllPostsWithSlug {
      posts {
        slug
        createdAt
        updatedAt
      }
    }
  `)

  return data.posts
}

export async function getPost(slug: string, preview: boolean): Promise<Post> {
  const data: { post: Post } = await fetchAPI(
    `
    query post($slug: String!, $stage: Stage!) {
      post(where: { slug: $slug }, stage: $stage) {
        seo {
          title
          description
        }
        id
        title
        tags
        publishedAt
        updatedAt
        coverImage {
          handle
          width
          height
        }
        content
      }
    }
    `,
    {
      preview,
      variables: {
        stage: preview ? 'DRAFT' : 'PUBLISHED',
        slug,
      },
    }
  )

  return data.post
}

export async function getPosts(): Promise<{ featuredPost: Post[]; posts: Post[] }> {
  const data: { featuredPost: Post[]; posts: Post[] } = await fetchAPI(
    `
    query posts {
      featuredPost: posts(orderBy: createdAt_DESC, first: 1) {
        id
        title
        slug
        excerpt
        coverImage {
          handle
          width
          height
        }
        date
      }
      posts(orderBy: createdAt_DESC, skip: 1) {
        id
        title
        slug
        excerpt
        coverImage {
          handle
          width
          height
        }
        date
      }
    }
    `
  )

  return data
}

export async function getRssPosts(): Promise<PostsRssQuery> {
  const data: PostsRssQuery = await fetchAPI(
    `
    query postsRss($first: Int) {
      posts(first: $first, orderBy: createdAt_DESC) {
        title
        slug
        seo {
          description
        }
        createdAt
      }
    }
    `,
    {
      variables: {
        first: 100,
      },
    }
  )

  return data
}
