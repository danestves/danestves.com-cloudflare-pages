import React from 'react'
import { Link, makeStyles } from '@material-ui/core'

const styles = theme => ({
  root: {
    textDecoration: theme.palette.type === 'light' ? 'none' : 'underline'
  }
})
const useStyles = makeStyles(styles)

export default ({ href, children }) => {
  const classes = useStyles()

  return (
    <Link href={href} target='_blank' className={classes.root}>
      {children}
    </Link>
  )
}
