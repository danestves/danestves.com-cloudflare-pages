const styles = theme => ({
  // index.js
  containerPortfolios: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  // Portfolio Container
  linkPortfolioContainer: {
    margin: theme.spacing(2),
    textDecoration: 'none'
  },
  // Portfolio Summary
  paperPortfolioSummary: {
    width: '100%',
    maxWidth: 300,
    borderRadius: theme.spacing(2),
    overflow: 'hidden'
  },
  imagePortfolioSummary: {
    '& img': {
      maxWidth: '100%',
      display: 'block'
    }
  },
  portfolioTitle: {
    padding: theme.spacing(1, 0)
  },
  portfolioCategory: {
    padding: theme.spacing(0, 0, 1),
    color: 'rgba(0, 0, 0, 0.4)'
  }
})

export default styles
