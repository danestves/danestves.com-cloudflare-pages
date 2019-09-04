import React from 'react'
import { Typography, Button, makeStyles } from '@material-ui/core'
import { Slider, Link, Skills, Loading } from '../components'
import styles from '../styles/pages/home'
import { getSkills } from '../helpers'

const useStyles = makeStyles(styles)

export default function Index () {
  const classes = useStyles()
  const { loading, data: skills } = getSkills()
  return (
    <>
      <Slider />
      <div data-aos='fade-in' className={classes.container} id='about'>
        <Typography
          variant='h4'
          component='h2'
          align='center'
          className={classes.description}
        >
          <strong>¡Hola! Soy Daniel</strong>, desarrollador web frontend.
          Tengo una gran experiencia en el diseño y construcción de sitios web,
          personalización y optimización. Manejo tecnologías, lenguajes y librerías como:{' '}
          <strong>
            HTML, CSS, JavaScript, React, Gatsby, Next.js, Sass, WordPress,
            Bootstrap y más
          </strong>
          .
        </Typography>

        <Button
          component={Link}
          href='/curriculum'
          variant='outlined'
          size='large'
          className={classes.knowMore}
        >
          ¡Quiero saber más!
        </Button>

        {skills ? (
          <div className={classes.containerSkills}><Skills skills={skills.skills} /></div>
        ) : loading ? (
          <Loading />
        ) : (
          'Error!'
        )}
      </div>
    </>
  )
}
