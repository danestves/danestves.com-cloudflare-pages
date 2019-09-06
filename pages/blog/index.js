import React from 'react'
import Markdown from 'react-markdown'
import { Hero, CodeBlock } from '../../components'
import { getBlogs } from '../../graphql'

export default () => {
  const { loading, data, ...errors } = getBlogs()

  console.log(data && data.blogs)

  return (
    <>
      <Hero img='/static/blog.jpg' title='Blog' />
      {
        data && <Markdown className='markdown-content' source={data && data.blogs[0].content} renderers={{ code: CodeBlock }} />
      }
    </>
  )
}
