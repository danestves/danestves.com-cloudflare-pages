// Dependencies
import { gql } from '@apollo/client'

export default gql`
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
`
