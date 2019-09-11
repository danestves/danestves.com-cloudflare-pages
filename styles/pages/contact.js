const styles = theme => ({
  container: {
    width: '100%',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginRight: 'auto',
    marginLeft: 'auto',
    transition: 'all 0.3s ease-in-out',
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      maxWidth: 540
    },

    [theme.breakpoints.down('sm')]: {
      maxWidth: 720
    },

    [theme.breakpoints.down('md')]: {
      maxWidth: 960
    },

    [theme.breakpoints.down('lg')]: {
      maxWidth: 1140
    }
  },
  form: {
    padding: theme.spacing(0, 2)
  },
  defaultValueSelect: {
    color: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255, 255, 255, 0.54)'
  },
  helperGoogle: {
    color: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255, 255, 255, 0.54)',

    '& a': {
      textDecoration: 'none',
      color: '#00A9E0'
    }
  },
  actionButtons: {
    display: 'flex',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),

    '& button': {
      flex: 1,

      '&:first-child': {
        marginRight: 4
      },

      '&:last-child': {
        marginLeft: 4
      }
    }
  }
})

export default styles
