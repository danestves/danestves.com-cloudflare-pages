import React from 'react'
import { makeStyles } from '@material-ui/core'

const styles = ({
  code: {
    padding: '0.1em',
    borderRadius: '0.3em',
    whiteSpace: 'normal',
    background: '#272822',
    color: '#f8f8f2'
  }
})

const useStyles = makeStyles(styles)

export default ({ children }) => {
  const classes = useStyles()

  return (
    <code className={classes.code}>
      {children}
    </code>
  )
}
