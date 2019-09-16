import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { makeStyles, Typography, Grid, Button, Chip } from '@material-ui/core'
import { Tag } from 'styled-icons/fa-solid/Tag'
import { LinkAlt } from 'styled-icons/boxicons-regular/LinkAlt'
import { LaptopCode } from 'styled-icons/fa-solid/LaptopCode'
import removeMd from 'remove-markdown'
import { getSinglePortfolio } from '../../../helpers'
import { Loading } from '../../../components'
import { KEYWORDS } from '../../../constants'
import styles from '../../../styles/pages/portfolio'

const useStyles = makeStyles(styles)

export default function Portfolio(props) {
  const classes = useStyles()
  const router = useRouter();
  const { slug } = router.query
  const { loading, data, ...errors } = getSinglePortfolio(slug)

  const portfolio = data && data.portfolios[0]

  return data ? (
    <>
      <Head>
        <title>{portfolio.title} | Daniel Esteves - Desarrollador Web Frontend</title>
        <meta
          name='description'
          content={removeMd(portfolio.content.substr(0, 154)) + '...'}
          key='description'
        />
        <meta
          name='keywords'
          content={`${portfolio.title}, ${KEYWORDS}`}
          key='keywords'
        />
        <meta
          property='og:image'
          content={portfolio.ogCover.url}
          key='og:image'
        />
        <meta
          property='og:title'
          content={`${portfolio.title} | Daniel Esteves - Desarrollador Web Frontend`}
          key='og:title'
        />
        <meta 
          property='og:description'
          content={removeMd(portfolio.content.substr(0, 154)) + '...'}
          key='og:description'
        />
        <meta
          name='twitter:image'
          content={portfolio.ogCover.url}
          key='twitter:image'
        />
        <meta
          name='twitter:title'
          content={`${portfolio.title} | Daniel Esteves - Desarrollador Web Frontend`}
          key='twitter:title'
        />
        <meta 
          name='twitter:description'
          content={removeMd(portfolio.content.substr(0, 154)) + '...'}
          key='twitter:description'
        />
        <meta
          name='twitter:image:alt'
          content={`${portfolio.title} | Daniel Esteves - Desarrollador Web Frontend`}
          key='twitter:image:alt'
        />
      </Head>
      <div className={classes.containerPortfolio}>
        <Grid container spacing={2} alignItems='center' justify='center'>
          <Grid item xs={12} md={6} className={classes.gridItem}>
            <img
              src={portfolio.cover.url}
              alt={`${portfolio.title} | Daniel Esteves - Desarrollador Web`}
              height='auto'
              width='100%'
              className={classes.bannerPortfolio}
            />
            <Typography
              align='center'
              component='h1'
              className={classes.titlePortfolio}>
              {portfolio.title}
            </Typography>
            <div className={classes.metadata}>
              <Typography className={classes.category} variant='h6' component='p'>
                <Tag size='24' className={classes.categoryIcon} />
                Categoría:{' '}
                {portfolio.category.name}
              </Typography>
            </div>

            <Typography align='center' variant='h6' component='p'>
              <LaptopCode size='24' className={classes.tecnologyIcon} />
              Tecnologías:{' '}
              {portfolio.technologies.map(tecnology => (
                <Chip
                  key={tecnology.id}
                  label={tecnology.name}
                  variant='outlined'
                  className={classes.chipTag}
                />
              ))}
            </Typography>

            <Button
              variant='contained'
              color='primary'
              href={portfolio.url}
              target='_blank'
              size='large'
              rel='noopener noreferrer'
              className={classes.buttonUrl}
            >
              Ver proyecto
              <LinkAlt size='24' className={classes.linkPortfolio} />
            </Button>
          </Grid>
        </Grid>

        <div className={classes.divider} />

        <Typography align='center' className={classes.helpText} id='helpText'>
          El desarrollador web cumple con realizar la página solicitada y no se
          hace responsable por enlaces caídos o cambios en el diseño. El uso
          posterior de la página queda a criterio y bajo completa responsabilidad
          del cliente
        </Typography>
      </div>
    </>
  ) : loading ? (
    <Loading />
  ) : (
        `Error! ${errors}`
      )
}
