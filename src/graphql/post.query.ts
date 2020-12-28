// Dependencies
import { gql } from '@apollo/client'

export default gql`
  query post($slug: String!) {
    post(where: { slug: $slug }, stage: PUBLISHED) {
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
`
