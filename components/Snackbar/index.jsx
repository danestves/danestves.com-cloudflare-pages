import React from 'react'
import clsx from 'clsx'
import { Snackbar, SnackbarContent, makeStyles } from '@material-ui/core'
import { CheckCircle } from 'styled-icons/fa-solid/CheckCircle'
import { Warning } from 'styled-icons/typicons/Warning'
import { Error as ErrorIcon } from 'styled-icons/boxicons-regular/Error'
import { InfoCircle as InfoIcon } from 'styled-icons/fa-solid/InfoCircle'
import { amber, green } from '@material-ui/core/colors'

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: ErrorIcon,
  info: InfoIcon
}

const styles = theme => ({
  snackbarContainer: {
    color: '#fff'
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  snackbarMessage: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: theme.spacing(1)
  }
})
const useStyles = makeStyles(styles)

export default function PositionedSnackbar ({ message, open, handleClose, variant, ...props }) {
  const classes = useStyles(props)
  const Icon = variantIcon[variant]

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={handleClose}
    >
      <SnackbarContent
        classes={{
          root: clsx(classes[variant], classes.snackbarContainer)
        }}
        ContentProps={{
          'aria-describedby': 'message-success'
        }}
        message={
          <span className={classes.snackbarMessage} id='message-success'>
            <Icon className={classes.icon} size='24px' />
            {message}
          </span>
        }
      />
    </Snackbar>
  )
}
