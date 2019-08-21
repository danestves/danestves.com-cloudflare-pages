import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Menu as MenuIcon } from 'styled-icons/boxicons-regular/Menu'
import { window } from 'browser-monads'
import styles from '../../styles/components/navbar'
import Drawer from '../Drawer'
import Link from '../../src/Link'

const useStyles = makeStyles(styles)

export default function Navbar () {
  const [anchor, setAnchor] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    window.addEventListener('load', handleNavbarAnimation())
  })

  const handleNavbarAnimation = () => {
    const onm = document.getElementsByClassName(classes.outlinedNavMenu)
    for (let i = 0; i < onm.length; i++) {
      onm[i].onmouseenter = onm[i].onmouseleave = e => {
        const tolerance = 5

        const left = 0
        const right = onm[i].clientWidth

        let x = e.pageX - onm[i].offsetLeft

        if (x - tolerance < left) x = left
        if (x + tolerance > right) x = right

        onm[i].style.setProperty('--x', `${x}px`)
      }
    }
  }

  const handleClick = e => {
    setAnchor(e.currentTarget)
  }

  const handleClose = () => {
    setAnchor(null)
  }

  const toggleDrawer = open => e => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return
    }

    setOpen(open)
  }

  const pathname = window.location.pathname
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  const aboutURLs =
      pathname === '/about/' ||
      pathname === '/certificaciones/' ||
      pathname === '/curriculum/'

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <Link href='/' className={classes.logo}>
            <img
              src='/static/isotype-negative.svg'
              alt='Daniel Esteves | Desarrollador Web Frontend - TSU en Informática'
              width='48'
              height='48'
            />
          </Link>

          {matches ? (
            <>
              <IconButton
                className={classes.menuButton}
                color='default'
                aria-label='Menu'
                onClick={toggleDrawer(true)}
              >
                <MenuIcon size='1.5rem' />
              </IconButton>
              <Drawer open={open} toggleDrawer={toggleDrawer} />
            </>
          ) : (
            <>
              <Button
                component={Link}
                href='/'
                activeClassName={classes.activeItem}
                color='inherit'
                className={classNames(
                  classes.navButton,
                  classes.outlinedNavMenu
                )}>
              Inicio
              </Button>
              <Button
                color='inherit'
                className={classNames(
                  classes.navButton,
                  classes.outlinedNavMenu,
                  aboutURLs ? classes.activeItem : ''
                )}
                aria-owns={anchor ? 'about' : undefined}
                aria-haspopup='true'
                onClick={handleClick}>
              Sobre
              </Button>
              <Button
                component={Link}
                href='/portfolio/'
                activeClassName={classes.activeItem}
                color='inherit'
                className={classNames(
                  classes.navButton,
                  classes.outlinedNavMenu
                )}>
              Portafolio
              </Button>
              <Button
                component={Link}
                href='/blog/'
                activeClassName={classes.activeItem}
                color='inherit'
                className={classNames(
                  classes.navButton,
                  classes.outlinedNavMenu
                )}>
              Blog
              </Button>
              <Button
                component={Link}
                href='/contact/'
                activeClassName={classes.activeItem}
                color='inherit'
                className={classNames(
                  classes.navButton,
                  classes.outlinedNavMenu
                )}>
              Contacto
              </Button>
            </>
          ) }
        </Toolbar>
      </AppBar>
      <Menu
        id='about'
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}>
        <MenuItem
          component={Link}
          href='/curriculum/'
          activeClassName={classes.activeSubItem}
          color='inherit'
          className={classes.outlinedNavSubMenu}
          onClick={handleClose}>
            Curriculum
        </MenuItem>
        <MenuItem
          component={Link}
          href='/certificaciones/'
          activeClassName={classes.activeSubItem}
          color='inherit'
          className={classes.outlinedNavSubMenu}
          onClick={handleClose}>
            Certificaciones
        </MenuItem>
      </Menu>
    </div>
  )
}
