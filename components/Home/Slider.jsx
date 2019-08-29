import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import Slider from 'react-animated-slider'
import { ReactLogo } from 'styled-icons/fa-brands/ReactLogo'
import { Wordpress as WordPressLogo } from 'styled-icons/boxicons-logos/Wordpress'
import styles from '../../styles/components/home.js'

const useStyles = makeStyles(styles)

export default function SliderHome () {
  const classes = useStyles()

  return (
    <Slider
      autoplay={6000}
      className={classes.slider}
    >
      <div
        className={classes.sliderItem}
      >
        <img
          src='/static/isotype-negative.svg'
          alt='Daniel Esteves | Desarrollador Web | @danestves'
          className={classes.img}
          width='128'
          height='128'
        />
        <Typography
          variant='h4'
          component='h1'
          className={classes.title}
        >
          Daniel Esteves
        </Typography>
        <Typography
          variant='h5'
          component='h2'
          align='center'
          className={classes.description}
        >
          Desarrollador Web
        </Typography>
      </div>

      <div
        className={classes.sliderItem}
      >
        <WordPressLogo
          className={classes.img}
        />
        <Typography
          variant='h4'
          component='h1'
          className={classes.title}
        >
          WordPress
        </Typography>
        <Typography
          variant='h5'
          component='h2'
          align='center'
          className={classes.description}
        >
          ¿Necesitas una página web dinámica o crear una tienda en poco pasos? WordPress es tu solución
        </Typography>
      </div>

      <div
        className={classes.sliderItem}
      >
        <ReactLogo
          className={classes.img}
        />
        <Typography
          variant='h4'
          component='h1'
          className={classes.title}
        >
          React
        </Typography>
        <Typography
          variant='h5'
          component='h2'
          align='center'
          className={classes.description}
        >
          ¿Necesitas una SPA, aplicación web o solo tu portafolio con React? Yo puedo ayudarte
        </Typography>
      </div>
    </Slider>
  )
}
