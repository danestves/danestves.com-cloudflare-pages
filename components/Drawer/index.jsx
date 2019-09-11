import React from 'react'
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core'
import { Home } from 'styled-icons/boxicons-regular/Home'
import { Profile } from 'styled-icons/icomoon/Profile'
import { Graduation } from 'styled-icons/boxicons-solid/Graduation'
import { Work } from 'styled-icons/material/Work'
import { Blog } from 'styled-icons/icomoon/Blog'
import { ContactMail } from 'styled-icons/material/ContactMail'
import styles from '../../styles/components/drawer'
import { Link } from '../'

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
          <ListItem button component={Link} href='/' color='inherit'>
            <ListItemIcon><Home size='24' /></ListItemIcon>
            <ListItemText primary='Inicio' />
          </ListItem>
          <ListItem button component={Link} href='/curriculum' color='inherit'>
            <ListItemIcon><Profile size='24' /></ListItemIcon>
            <ListItemText primary='Curriculum' />
          </ListItem>
          <ListItem button component={Link} href='/certificaciones' color='inherit'>
            <ListItemIcon><Graduation size='24' /></ListItemIcon>
            <ListItemText primary='Certificaciones' />
          </ListItem>
          <ListItem button component={Link} href='/portafolio' color='inherit'>
            <ListItemIcon><Work size='24' /></ListItemIcon>
            <ListItemText primary='Portafolio' />
          </ListItem>
          <ListItem button component={Link} href='/blog' color='inherit'>
            <ListItemIcon><Blog size='24' /></ListItemIcon>
            <ListItemText primary='Blog' />
          </ListItem>
          <ListItem button component={Link} href='/contacto' color='inherit'>
            <ListItemIcon><ContactMail size='24' /></ListItemIcon>
            <ListItemText primary='Contacto' />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  )
}
