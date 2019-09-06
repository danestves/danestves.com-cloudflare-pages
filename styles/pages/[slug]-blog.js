const styles = theme => ({
  container: {
    width: '100%',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginRight: 'auto',
    marginLeft: 'auto',
    transition: 'all 0.3s ease-in-out',

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
  metadataBlogpost: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(2, 0),
    justifyContent: 'space-around'
  },
  containerTags: {
    display: 'flex',
    alignItems: 'center'
  },
  titleTags: {
    marginRight: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      marginRight: 4
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(2)
    }
  },
  chipTag: {
    margin: `${theme.spacing(1)}px 4px`,
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
      cursor: 'pointer',
      border: '1px solid #00A9E0'
    }
  },
  containerReadingTime: {
    display: 'flex',
    alignItems: 'center'
  },
  titleReadingTime: {
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      marginRight: 4
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(2)
    }
  },
  fabWebShare: {
    top: 'auto',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    position: 'fixed',
    color: '#fff',
    background: 'linear-gradient(-135deg, #307FE2, #0090DA, #00A3E1, #00A9E0)'
  },
  sharerList: {
    display: 'flex',
    alignItems: 'center',

    '& $sharerButton': {
      padding: theme.spacing(1),
      color: '#fff',
      margin: 4
    },

    '& > div:first-child': {
      marginRight: 4,

      [theme.breakpoints.down('xs')]: {
        marginRight: 0
      }
    },

    '& > div:last-child': {
      marginLeft: theme.spacing(2),

      [theme.breakpoints.down('xs')]: {
        marginLeft: 0
      }
    },

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  sharerButton: {},
  sharerFacebook: {
    background: '#3b5998',

    '&:hover': {
      background: '#3b5998'
    }
  },
  sharerTwitter: {
    background: '#1da1f2',

    '&:hover': {
      background: '#1da1f2'
    }
  },
  sharerLinkedin: {
    background: '#0077b5',

    '&:hover': {
      background: '#0077b5'
    }
  },
  sharerWhatsapp: {
    background: '#25d366',

    '&:hover': {
      background: '#25d366'
    }
  },
  sharerLink: {
    marginTop: 4
  }
})

export default styles
