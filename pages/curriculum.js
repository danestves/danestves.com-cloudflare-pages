import React from 'react'
import Head from 'next/head'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import { Hero, Timeline } from '../components'
import { getEducationsAndExperiences } from '../helpers'
import { KEYWORDS } from '../constants'
import styles from '../styles/pages/curriculum'

const useStyles = makeStyles(styles)

export default function Curriculum () {
  const classes = useStyles()
  const { loading, data } = getEducationsAndExperiences()

  return (
    <>
      <Head>
        <title>Curriculum | Daniel Esteves - Desarrollador Web Frontend</title>
        <meta name='description' content='Curriculum de Daniel Esteves. Educación autodidacta en distintas plataformas como Platzi e Udemy. Experiencia en trabajos freelance usando WordPress y React.' />
        <meta
          name='keywords'
          content={`Curriculum, curriculum de daniel esteves, curriculum de danestves, ${KEYWORDS}`}
        />
        <meta
          property='og:title'
          content='Curriculum | Daniel Esteves - Desarrollador Web Frontend'
        />
        <meta property='og:description' content='Curriculum de Daniel Esteves. Educación autodidacta en distintas plataformas como Platzi e Udemy. Experiencia en trabajos freelance usando WordPress y React.' />
        <meta
          name='twitter:title'
          content='Curriculum | Daniel Esteves - Desarrollador Web Frontend'
        />
        <meta name='twitter:description' content='Curriculum de Daniel Esteves. Educación autodidacta en distintas plataformas como Platzi e Udemy. Experiencia en trabajos freelance usando WordPress y React.' />
        <meta
          name='twitter:image:alt'
          content='Curriculum | Daniel Esteves - Desarrollador Web Frontend'
        />
      </Head>
      <Hero title='Curriculum' img='/static/curriculum.jpg' />
      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant='h4' component='h2' align='center'>
              Experiencia
            </Typography>

            {data ? <Timeline items={data.experiences} /> : loading ? 'Loading...' : ''}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant='h4' component='h2' align='center'>
              Eduación
            </Typography>

            {data ? <Timeline items={data.educations} /> : loading ? 'Loading...' : ''}
          </Grid>
        </Grid>
      </div>
    </>
  )
}
