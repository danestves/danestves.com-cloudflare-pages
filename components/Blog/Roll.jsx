import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { TimeFive } from 'styled-icons/boxicons-regular/TimeFive'
import moment from 'moment'
import removeMd from 'remove-markdown'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from '../'
import styles from '../../styles/components/blog'
moment.locale('es')

const useStyles = makeStyles(styles)

export default ({ blogs }) => {
  const classes = useStyles()

  return (
    <Grid
      container
      spacing={2}
      justify='center'
      className={classes.blogRoll}
    >
      {blogs &&
          blogs.map(blog => (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog.id}
              className={classes.linkPost}
            >
              <Grid item xs={12}>
                <Paper className={classes.paperPost} component='article'>
                  <div className={classes.containerogCover}>
                    <LazyLoadImage
                      src={blog.ogCover.url}
                      alt={blog.title}
                      effect='blur'
                    />
                  </div>
                  <div className={classes.containerMetaData}>
                    <Typography component='h2' variant='h6'>
                      {blog.title}
                    </Typography>
                    <small className={classes.datePost}>
                      <TimeFive size='24' /> {moment(blog.date).fromNow()}
                    </small>
                    <Typography className={classes.excerptPost}>
                      {removeMd(blog.content.substr(0, 154))}...
                    </Typography>
                  </div>
                </Paper>
              </Grid>
            </Link>
          ))}
    </Grid>
  )
}
