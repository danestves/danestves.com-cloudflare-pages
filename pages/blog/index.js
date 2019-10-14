import React from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core'
import { Hero, BlogRoll, Loading } from '../../components'
import { getBlogs } from '../../graphql'
import { KEYWORDS } from '../../constants'
import styles from '../../styles/pages/blog'

const useStyles = makeStyles(styles)

export default () => {
  const { loading, data, ...errors } = getBlogs()
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>Blog | Daniel Esteves - Desarrollador Web Frontend</title>
        <meta
          name='description'
          content='Blog de Daniel Esteves para compartir los conocimientos que ha aprendido en el mundo del desarrollo web, un poco de diseño y maneras para aprovechar tu tiempo.'
          key='description'
        />
        <meta
          name='keywords'
          content={`Blog, blog de daniel esteves, blog de danestves, ${KEYWORDS}`}
          key='keywords'
        />
        <meta
          property='og:title'
          content='Blog | Daniel Esteves - Desarrollador Web Frontend'
          key='og:title'
        />
        <meta
          property='og:description'
          content='Blog de Daniel Esteves para compartir los conocimientos que ha aprendido en el mundo del desarrollo web, un poco de diseño y maneras para aprovechar tu tiempo.'
          key='keywords'
        />
        <meta
          name='twitter:title'
          content='Blog | Daniel Esteves - Desarrollador Web Frontend'
          key='twitter:title'
        />
        <meta
          name='twitter:description'
          content='Blog de Daniel Esteves para compartir los conocimientos que ha aprendido en el mundo del desarrollo web, un poco de diseño y maneras para aprovechar tu tiempo.'
          key='twitter:description'
        />
        <meta
          name='twitter:image:alt'
          content='Blog | Daniel Esteves - Desarrollador Web Frontend'
          key='twitter:image:alt'
        />
      </Head>
      <Hero img='/static/blog.jpg' title='Blog' />
      {data ? (
        <div className="container">
          <div className={classes.blogRoll}>
            <BlogRoll blogs={data.blogs} />
          </div>
        </div>
      ) : loading ? (
        <Loading />
      ) : (
        `Error! ${errors}`
      )}
    </>
  )
}
