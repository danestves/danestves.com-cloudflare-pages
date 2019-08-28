import React from 'react'
import { Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import styles from '../../styles/components/certifications'

const useStyles = makeStyles(styles)

export default function Career ({ career }) {
  const classes = useStyles()

  return (
    <div
      data-aos='zoom-in'
    >
      <a
        href={`https://platzi.com${career.diploma_link}`}
        target='_blank'
        rel='noopener noreferrer'
        className={classes.link}
      >
        <Paper className={classes.paper} elevation={0}>
          <Grid container alignItems='center'>
            <Grid item xs={4}>
              <img
                src={career.golden_achievement}
                alt={`${career.title} | Daniel Esteves`}
                height='75px'
                width='75px'
                className={classes.img}
              />
            </Grid>
            <Grid item xs={8}>
              <div className={classes.title}>{career.title}</div>
            </Grid>
          </Grid>
        </Paper>
      </a>
    </div>
  )
}
