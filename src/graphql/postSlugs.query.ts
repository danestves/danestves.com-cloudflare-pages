// Dependencies
import { gql } from '@apollo/client'

export default gql`
  query postSlugs($first: Int) {
    posts(first: $first, orderBy: createdAt_ASC) {
      slug
    }
  }
`
