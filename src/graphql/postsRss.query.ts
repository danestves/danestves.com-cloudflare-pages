// Dependencies
import { gql } from '@apollo/client'

export default gql`
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
`
