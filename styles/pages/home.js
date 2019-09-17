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
  description: {
    margin: theme.spacing(4, 0, 2),
    fontWeight: 400,
    transition: 'all 0.3s ease-in-out',

    '& p': {
      margin: 0
    },

    '& strong': {
      background:
        'linear-gradient(-135deg, #307FE2, #0090DA, #00A3E1, #00A9E0)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      fontWeight: 700
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: '1.3rem'
    }
  },
  knowMore: {
    left: '50%',
    transform: 'translateX(-50%)',
    margin: theme.spacing(2, 0),
    color: theme.palette.type === 'dark' ? '#fff' : '#0090DA',
    border:
      theme.palette.type === 'dark'
        ? '1px solid rgba(255, 255, 255, 0.5)'
        : '1px solid #0090DA',

    '&:hover': {
      border: theme.palette.type === 'dark' ? '1px solid #fff' : null,
      backgroundColor:
        theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.1)' : null
    }
  },
  containerSkills: {
    margin: theme.spacing(2, 0)
  }
})

export default styles
