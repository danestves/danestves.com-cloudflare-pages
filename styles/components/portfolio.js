const styles = theme => ({
  '@keyframes loaded': {
    '0%': {
      opacity: 0.1
    },

    '100%': {
      opacity: 1
    }
  },
  containerPortfolios: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  },
  linkPortfolioContainer: {
    margin: theme.spacing(2),
    textDecoration: 'none'
  },
  paperPortfolioSummary: {
    width: '100%',
    maxWidth: 300,
    borderRadius: theme.spacing(2),
    overflow: 'hidden'
  },
  imagePortfolioSummary: {
    '& img': {
      maxWidth: '100%',
      display: 'block',
      width: 300,
      height: 200,
      // I use utilitary classes instead of props to avoid style regenerating
      '&.loaded:not(.has-error)': {
        animation: '$loaded 300ms ease-in-out'
      },

      '&.has-error': {}
    }
  },
  portfolioTitle: {
    padding: theme.spacing(1, 0)
  },
  portfolioCategory: {
    padding: theme.spacing(0, 0, 1),
    color: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'
  }
})

export default styles
