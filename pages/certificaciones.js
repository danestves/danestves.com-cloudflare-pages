import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { usePlatziData } from '../hooks/usePlatziData'
import { Loading, Hero, Course, Career } from '../components'
import styles from '../styles/pages/certifications'

const useStyles = makeStyles(styles)

export default function Certifications () {
  const { loading, courses, careers } = usePlatziData()
  const classes = useStyles()

  const coursesJS = courses.filter(course => {
    if (course.career !== null) {
      return course.career.toLowerCase().match('js') ||
        course.career.toLowerCase().match('javascript') ||
        course.title.toLowerCase().match('javascript') ||
        course.title.toLowerCase().match('js')
    }
  })

  const coursesEnglish = courses.filter(course => {
    if (course.career !== null) {
      return course.career.toLowerCase().match('ingles') ||
        course.career.toLowerCase().match('inglés') ||
        course.title.toLowerCase().match('ingles') ||
        course.title.toLowerCase().match('inglés')
    }
  })

  const coursesOther = courses.filter(course => {
    if (course.career !== null) {
      return !course.career.toLowerCase().match('ingles') &&
        !course.career.toLowerCase().match('inglés') &&
        !course.title.toLowerCase().match('ingles') &&
        !course.title.toLowerCase().match('inglés') &&
        !course.career.toLowerCase().match('js') &&
        !course.career.toLowerCase().match('javascript') &&
        !course.title.toLowerCase().match('javascript') &&
        !course.title.toLowerCase().match('js')
    }
  })

  return loading ? <Loading /> : (
    <>
      <Hero title='Certificaciones' img='/static/certifications.jpg' />
      <div className={classes.container}>
        <Grid
          container
          spacing={2}
          justify='center'
          alignItems='center'
          className={classes.containerGrid}>
          <Grid item xs={12}>
            <Typography variant='h4' component='div' align='center'>
              Carreras
            </Typography>
          </Grid>
          {careers &&
            careers.map(career => (
              <Grid item xs={12} sm={6} md={4} key={career.id}>
                <Career career={career} />
              </Grid>
            ))}

          <Grid item xs={12}>
            <Typography variant='h4' component='div' align='center'>
              JavaScript
            </Typography>
          </Grid>
          {coursesJS &&
            coursesJS.map(course => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Course course={course} />
              </Grid>
            ))}

          <Grid item xs={12}>
            <Typography variant='h4' component='div' align='center'>
              Inglés
            </Typography>
          </Grid>
          {coursesEnglish &&
            coursesEnglish.map(course => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Course course={course} />
              </Grid>
            ))}

          <Grid item xs={12}>
            <Typography variant='h4' component='div' align='center'>
              Otros
            </Typography>
          </Grid>
          {coursesOther &&
            coursesOther.map(course => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Course course={course} />
              </Grid>
            ))}
        </Grid>
      </div>

    </>
  )
}
