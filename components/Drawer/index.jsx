import React from 'react'
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Home } from 'styled-icons/boxicons-regular/Home'
import { Profile } from 'styled-icons/icomoon/Profile'
import { Graduation } from 'styled-icons/boxicons-solid/Graduation'
import { Work } from 'styled-icons/material/Work'
import { Blog } from 'styled-icons/icomoon/Blog'
import { ContactMail } from 'styled-icons/material/ContactMail'
import styles from '../../styles/components/drawer'
import Link from '../../src/Link'

const useStyles = makeStyles(styles)

export default function DrawerMenu (props) {
  const { open, toggleDrawer } = props
  const classes = useStyles()

  return (
    <SwipeableDrawer
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      anchor='right'
      id='drawer-menu'
    >
      <div
        className={classes.list}
        role='presentation'
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem button component={Link} href='/'>
            <ListItemIcon><Home size='1.5rem' /></ListItemIcon>
            <ListItemText primary='Inicio' />
          </ListItem>
          <ListItem button component={Link} href='/curriculum/'>
            <ListItemIcon><Profile size='1.5rem' /></ListItemIcon>
            <ListItemText primary='Curriculum' />
          </ListItem>
          <ListItem button component={Link} href='/certificaciones/'>
            <ListItemIcon><Graduation size='1.5rem' /></ListItemIcon>
            <ListItemText primary='Certificaciones' />
          </ListItem>
          <ListItem button component={Link} href='/portfolio/'>
            <ListItemIcon><Work size='1.5rem' /></ListItemIcon>
            <ListItemText primary='Portafolio' />
          </ListItem>
          <ListItem button component={Link} href='/blog/'>
            <ListItemIcon><Blog size='1.5rem' /></ListItemIcon>
            <ListItemText primary='Blog' />
          </ListItem>
          <ListItem button component={Link} href='/contact/'>
            <ListItemIcon><ContactMail size='1.5rem' /></ListItemIcon>
            <ListItemText primary='Contacto' />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  )
}
