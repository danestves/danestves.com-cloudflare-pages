// Dependencies
import { gql } from '@apollo/client'

export default gql`
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
