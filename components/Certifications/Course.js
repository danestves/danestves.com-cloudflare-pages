import React from 'react'
import { Paper, Grid, makeStyles } from '@material-ui/core'
import styles from '../../styles/components/certifications'

const useStyles = makeStyles(styles)

export default function Course (props) {
  const { course } = props
  const classes = useStyles()

  return (
    <div
      data-aos='fade-up'
    >
      <a
        href={`https://platzi.com${course.diploma_link}`}
        target='_blank'
        rel='noopener noreferrer'
        className={classes.link}
      >
        <Paper className={classes.paper} elevation={0}>
          <Grid container alignItems='center'>
            <Grid item xs={4}>
              <img
                src={course.badge}
                alt={`${course.title} | Daniel Esteves`}
                height='75px'
                width='75px'
                className={classes.img}
              />
            </Grid>
            <Grid item xs={8}>
              <div className={classes.title}>{course.title}</div>
              <small className={classes.description}>
                  Carrera: {course.career}
              </small>
            </Grid>
          </Grid>
        </Paper>
      </a>
    </div>
  )
}
