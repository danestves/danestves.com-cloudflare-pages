import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
  useTheme
} from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Menu as MenuIcon } from 'styled-icons/boxicons-regular/Menu'
import { window } from 'browser-monads'
import styles from '../../styles/components/navbar'
import Drawer from '../Drawer'
import { Link } from '../'

const useStyles = makeStyles(styles)

export default function Navbar ({ toggleTheme, theme: localTheme }) {
  const [dark, setDark] = useState(false)
  const [anchor, setAnchor] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    window.addEventListener('load', handleNavbarAnimation())
  }, [])

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

  const setDarkTheme = () => {
    setDark(!dark)

    toggleTheme(dark ? 'dark' : 'light')
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
      <AppBar className={classes.appBar} position='fixed'>
        <Toolbar>
          <Link href='/' className={classes.logo}>
            <img
              src='/static/isotype-negative.svg'
              alt='Daniel Esteves | Desarrollador Web | @danestves'
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
                )}
              >
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
                onClick={handleClick}
              >
              Sobre
              </Button>
              <Button
                component={Link}
                href='/portafolio'
                activeClassName={classes.activeItem}
                color='inherit'
                className={classNames(
                  classes.navButton,
                  classes.outlinedNavMenu
                )}
              >
              Portafolio
              </Button>
              <Button
                component={Link}
                href='/blog'
                activeClassName={classes.activeItem}
                color='inherit'
                className={classNames(
                  classes.navButton,
                  classes.outlinedNavMenu
                )}
              >
              Blog
              </Button>
              <Button
                component={Link}
                href='/contact'
                activeClassName={classes.activeItem}
                color='inherit'
                className={classNames(
                  classes.navButton,
                  classes.outlinedNavMenu
                )}
              >
              Contacto
              </Button>
            </>
          )}

          <div className='toggleWrapper'>
            <input
              type='checkbox'
              className='dn'
              id='dn'
              checked={localTheme === 'dark'}
              onChange={setDarkTheme}
            />
            <label htmlFor='dn' className='toggle'>
              <span className='toggle__handler'>
                <span className='crater crater--1' />
                <span className='crater crater--2' />
                <span className='crater crater--3' />
              </span>
              <span className='star star--1' />
              <span className='star star--2' />
              <span className='star star--3' />
              <span className='star star--4' />
              <span className='star star--5' />
              <span className='star star--6' />
            </label>
          </div>
        </Toolbar>
      </AppBar>
      <Menu
        id='about'
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        <MenuItem
          component={Link}
          href='/curriculum'
          activeClassName={classes.activeSubItem}
          color='inherit'
          className={classes.outlinedNavSubMenu}
          onClick={handleClose}
        >
            Curriculum
        </MenuItem>
        <MenuItem
          component={Link}
          href='/certificaciones'
          activeClassName={classes.activeSubItem}
          color='inherit'
          className={classes.outlinedNavSubMenu}
          onClick={handleClose}
        >
            Certificaciones
        </MenuItem>
      </Menu>
    </div>
  )
}
