const styles = theme => ({
  containerPortfolio: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  gridItem: {
    textAlign: 'center'
  },
  bannerPortfolio: {
    maxWidth: 500,
    display: 'block',
    margin: '0 auto',
    borderRadius: theme.spacing(2)
  },
  metadata: {
    margin: '20px auto'
  },
  category: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryIcon: {
    color: '#ff0000',
    marginRight: 4
  },
  titlePortfolio: {
    margin: '10px auto',
    fontSize: theme.spacing(4),
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 700
  },
  buttonUrl: {
    marginTop: theme.spacing(2)
  },
  linkPortfolio: {
    marginLeft: theme.spacing(1)
  },
  tecnologyIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1)
  },
  chipTag: {
    margin: `${theme.spacing(1)}px 4px`,
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
      cursor: 'pointer',
      border: `1px solid ${theme.palette.primary.dark}`
    },

    '& span': {
      fontSize: theme.spacing(2)
    }
  },
  divider: {
    width: '100%',
    height: 1,
    background:
      theme.palette.type === 'light'
        ? 'rgba(0, 0, 0, 0.25)'
        : 'rgba(255, 255, 255, 0.25)',
    margin: '40px auto'
  },
  helpText: {
    color:
      theme.palette.type === 'light'
        ? 'rgba(0, 0, 0, 0.45)'
        : 'rgba(255, 255, 255, 0.45)'
  }
})

export default styles
