import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
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
