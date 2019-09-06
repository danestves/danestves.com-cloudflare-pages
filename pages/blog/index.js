import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Hero, BlogRoll, Loading } from '../../components'
import { getBlogs } from '../../graphql'
import styles from '../../styles/pages/blog'

const useStyles = makeStyles(styles)

export default () => {
  const { loading, data, ...errors } = getBlogs()
  const classes = useStyles()

  return (
    <>
      <Hero img='/static/blog.jpg' title='Blog' />
      {
        data
          ? (
            <div className={classes.container}>
              <div className={classes.blogRoll}>
                <BlogRoll
                  blogs={data.blogs}
                />
              </div>
            </div>
          ) : loading ? (
            <Loading />
          ) : (
            `Error! ${errors}`
          )
      }
    </>
  )
}
