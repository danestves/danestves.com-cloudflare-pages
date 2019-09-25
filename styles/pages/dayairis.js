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
  title: {
    margin: theme.spacing(2, 0)
  },
  image: {
    width: '100%',
    maxWidth: 400,
    height: 400,
    borderRadius: 16,
    objectFit: 'cover',
    objectPosition: 'top center',
    boxShadow:
      'rgba(0, 0, 0, 0.2) 0px 1px 8px 0px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 3px 3px -2px'
  }
})

export default styles
