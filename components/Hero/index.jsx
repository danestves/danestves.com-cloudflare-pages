import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import styles from '../../styles/components/hero'

const useStyles = makeStyles(styles)

export default function Hero ({ title, img }) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <img
        src={img}
        alt='Daniel Esteves | Desarrollador Web Frontend - @danestves'
        className={classes.img}
        width='1920'
        height='320'
      />
      <Typography component='h1' className={classes.title}>
        {title}
      </Typography>
    </div>
  )
}
