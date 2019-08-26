import React from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import { Hero, Timeline } from '../components'
import { getEducationsAndExperiences } from '../helpers'
import styles from '../styles/pages/curriculum'

const useStyles = makeStyles(styles)

export default function Curriculum () {
  const classes = useStyles()
  const { loading, data } = getEducationsAndExperiences()

  return (
    <>
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
