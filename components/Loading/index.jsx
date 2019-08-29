import React from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core'
import styles from '../../styles/components/loading'

const useStyles = makeStyles(styles)

export default function Loading () {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <CircularProgress />
    </div>
  )
}
