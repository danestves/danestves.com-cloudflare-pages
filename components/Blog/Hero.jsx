import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import styles from '../../styles/components/hero'

const useStyles = makeStyles(styles)

export default ({ title, img }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <LazyLoadImage
        src={img}
        alt={`${title} | Daniel Esteves - @danestves`}
        className={classes.img}
        effect='blur'
      />
      <Typography component='h1' className={classes.titleBlogpost}>
        {title}
      </Typography>
    </div>
  )
}
