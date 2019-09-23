const styles = theme => ({
  linkPost: {
    textDecoration: 'none',
    width: '100%',
    margin: theme.spacing(1, 0)
  },
  paperPost: {
    padding: theme.spacing(2, 3),
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',

    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  },
  containerogCover: {
    display: 'flex',
    maxWidth: 300,

    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%'
    },

    '& img': {
      maxWidth: 300,
      width: '100%',
      borderRadius: 4,
      height: 157,
      display: 'block',

      [theme.breakpoints.down('xs')]: {
        maxWidth: 400,
        width: '100%',
        height: 210
      }
    }
  },
  containerMetaData: {
    marginLeft: theme.spacing(4),
    display: 'flex',
    flex: 1,
    flexDirection: 'column',

    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    }
  },
  datePost: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      marginRight: 4
    }
  },
  excerptPost: {
    color:
      theme.palette.type === 'dark'
        ? 'rgba(255, 255, 255, 0.57)'
        : 'rgba(0, 0, 0, 0.57)',

    [theme.breakpoints.up('sm')]: {
      width: '92%'
    }
  }
})

export default styles
