import React from 'react'
import { Paper, Typography, makeStyles } from '@material-ui/core'
import styles from '../../styles/components/portfolio'
import { Link } from '../'

const useStyles = makeStyles(styles)

export default function PortfolioRoll ({ portfolios }) {
  const classes = useStyles()

  return (
    <div className={classes.containerPortfolios}>
      {portfolios &&
        portfolios.map(portfolio => (
          <Link
            key={portfolio.id}
            className={classes.linkPortfolioContainer}
            title={portfolio.title}
            href='/portafolio/[slug]'
            as={`/portafolio/${portfolio.slug}/`}
          >
            <Paper
              elevation={0}
              className={classes.paperPortfolioSummary}
              data-aos='fade-up'
              data-aos-anchor-placement='center-bottom'
            >
              <div className={classes.imagePortfolioSummary}>
                <img
                  data-src={portfolio.cover.url}
                  alt={`${portfolio.title} - Portfolio | Daniel Esteves`}
                  height={200}
                  wdith={300}
                  className='lazyload'
                  loading='lazy'
                />
              </div>
              <Typography
                variant='h5'
                component='h2'
                align='center'
                className={classes.portfolioTitle}
              >
                {portfolio.title}
              </Typography>
              <Typography
                component='h3'
                align='center'
                className={classes.portfolioCategory}
              >
                {portfolio.category.name}
              </Typography>
            </Paper>
          </Link>
        ))}
    </div>
  )
}
