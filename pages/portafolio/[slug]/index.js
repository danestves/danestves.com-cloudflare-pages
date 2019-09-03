import React from 'react'
import { useRouter } from 'next/router'
import { makeStyles, Typography, Grid, Button, Chip } from '@material-ui/core'
import { Tag } from 'styled-icons/fa-solid/Tag'
import { LinkAlt } from 'styled-icons/boxicons-regular/LinkAlt'
import { LaptopCode } from 'styled-icons/fa-solid/LaptopCode'
import { getSinglePortfolio } from '../../../helpers'
import { Loading } from '../../../components'
import styles from '../../../styles/pages/portfolio'

const useStyles = makeStyles(styles)

export default function Portfolio(props) {
  const classes = useStyles()
  const router = useRouter();
  const { slug } = router.query
  const { loading, data } = getSinglePortfolio(slug)

  const portfolio = data && data.portfolios[0]

  return data ? (
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
              <Tag size='1.2rem' className={classes.categoryIcon} />
              Categoría:{' '}
              {portfolio.category.name}
            </Typography>
          </div>

          <Typography align='center' variant='h6' component='p'>
            <LaptopCode size='1.2rem' className={classes.tecnologyIcon} />
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
            <LinkAlt size='1.2rem' className={classes.linkPortfolio} />
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
  ) : loading ? (
    <Loading />
  ) : (
        'Error!'
      )
}
