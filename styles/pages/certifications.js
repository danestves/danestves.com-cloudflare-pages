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
  containerGrid: {
    marginBottom: theme.spacing(2)
  },
  titleItem: {
    margin: theme.spacing(2, 0)
  }
})

export default styles
