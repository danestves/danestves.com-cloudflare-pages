import React from 'react'
import { DiscussionEmbed } from 'disqus-react'

const disqusShortname = process.env.DISQUS_SHORTNAME

export default ({ identifier, title, slug }) => (
  <DiscussionEmbed
    shortname={disqusShortname}
    config={{
      slug: `https://danestves.com/blog/${slug}`,
      identifier,
      title
    }}
  />
)
