// Dependencies
import * as React from 'react'
import { NextPage } from 'next'

// Components
import { SEO } from '@/components'

const BlogPage: NextPage = () => {
  // Render
  return (
    <>
      <SEO
        title="Blog"
        description="Blog sobre noticias, tutoriales, paso a paso para crear funciones que nos ayudarán en nuestro desarrollo y mucho más de la mano de @danestves usando JavaScript."
      />
    </>
  )
}

export default BlogPage
