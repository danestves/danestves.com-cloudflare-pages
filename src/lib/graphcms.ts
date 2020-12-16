// Interfaces
import { Post } from '@/interfaces'

/**
 * @function fetchAPI
 *
 * @description
 * Utility function to build a custom fetch function.
 *
 * @param query - The query in GraphQL format.
 * @param options.variables - The variables to pass in the query.
 * @param options.preview - The preview mode, by default false.
 *
 * @returns The parsed data
 */
async function fetchAPI(
  query: string,
  options?: {
    variables?: Record<string, unknown>
    preview?: boolean
  }
): Promise<Record<string, unknown>> {
  const res = await fetch(process.env.GRAPHCMS_PROJECT_API as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        options?.preview
          ? process.env.GRAPHCMS_DEV_AUTH_TOKEN
          : process.env.GRAPHCMS_PROD_AUTH_TOKEN
      }`,
    },
    body: JSON.stringify({
      query,
      variables: options?.variables,
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

/**
 * @function getPreviewPostBySlug
 *
 * @description
 * Search a post by slug, otherwhise return null.
 *
 * @param slug - The slug to of the post.
 *
 * @returns The slug of the post, otherwhise null.
 */
export async function getPreviewPostBySlug(slug: string): Promise<{ slug: string }> {
  const data = await fetchAPI(
    `
      query getPreviewPostBySlug($slug: String!, $stage: Stage!) {
        post(where: {slug: $slug}, stage: $stage) {
          slug
        }
      }
    `,
    {
      preview: true,
      variables: {
        stage: 'DRAFT',
        slug,
      },
    }
  )

  return data.post as { slug: string }
}

/**
 * @function getAllPostsWithSlug
 *
 * @description
 * Sarch all posts with slug, otherwise return null.
 *
 * @returns The array of posts with slug, otherwise null.
 */
export async function getAllPostsWithSlug(): Promise<[{ slug: string }]> {
  const data = await fetchAPI(`
    {
      posts {
        slug
      }
    }
  `)

  return data.posts as [{ slug: string }]
}

/**
 * @function getPostBySlug
 *
 * @description
 * Search a post by slug and retreive all the information, otherwise null.
 *
 * @param slug - The slug of the post to query.
 * @param preview - The optional preview, if is true see the draft post if not only live.
 *
 * @returns The object with the post, otherwise null.
 */
export async function getPostBySlug(slug: string, preview = false): Promise<Post> {
  const post = await fetchAPI(
    `
    query getPostBySlug($slug: String!, $stage: Stage!) {
      post(stage: $stage, where: {slug: $slug}) {
        title
        excerpt
        content
        coverImage {
          handle
          width
          height
        }
        tags
        seo {
          title
          description
          keywords
        }
        publishedAt
        updatedAt
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

  return post.post as Post
}

/**
 * @function getBlogPageData
 *
 * @description
 * Retreive the featured post (latest) and the rest of the posts
 *
 * @returns And object with the featured posts and an array of posts
 */
export async function getBlogPageData(): Promise<{ featuredPost: Post; posts: [Post] }> {
  const data = await fetchAPI(`
    query blogPage {
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
  `)

  const featuredPost = data.featuredPost as [Post]

  return {
    featuredPost: featuredPost[0],
    posts: data.posts as [Post],
  }
}
