const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    background: theme.palette.type === 'light'
      ? 'linear-gradient(-135deg, #307FE2, #0090DA, #00A3E1, #00A9E0)'
      : 'linear-gradient(-135deg, #103e78, #00486d, #005170, #005470)',
    color: '#fff'
  },
  logo: {
    width: theme.spacing(6),
    marginRight: 'auto',

    '& img': {
      display: 'block'
    }
  },
  menuButton: {
    margin: '4px 0',
    color: '#fff'
  },
  navButton: {
    padding: theme.spacing(2, 1),
    borderRadius: 0
  },
  outlinedNavMenu: {
    position: 'relative',
    color: '#fff',

    '&:hover': {
      '&::after': {
        '--scale': 1
      }
    },

    '&::after': {
      '--scale': 0,
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      top: '95%',
      height: 3,
      background: '#fff',
      transform: 'scaleX(var(--scale))',
      transformOrigin: 'var(--x) 50%',
      transition: 'transform 0.3s cubic-bezier(0.535, 0.05, 0.355, 1)'
    }
  },
  activeItem: {
    '&::before': {
      '--scale': 1,
      content: '""',
      position: 'absolute',
      top: '95%',
      height: 3,
      background: '#fff',
      width: '100%'
    }
  },
  outlinedNavSubMenu: {
    position: 'relative',

    '&:hover': {
      '&::after': {
        '--scale': 1
      }
    },

    '&::after': {
      '--scale': 0,
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      top: '94%',
      height: 3,
      background: theme.palette.type === 'light'
        ? 'linear-gradient(-135deg, #307FE2, #0090DA, #00A3E1, #00A9E0)'
        : 'linear-gradient(-135deg, #103e78, #00486d, #005170, #005470)',
      transform: 'scaleX(var(--scale))',
      transformOrigin: 'var(--x) 50%',
      transition: 'transform 0.3s cubic-bezier(0.535, 0.05, 0.355, 1)'
    }
  },
  activeSubItem: {
    '&::before': {
      '--scale': 1,
      content: '""',
      position: 'absolute',
      top: '94%',
      height: 3,
      background: theme.palette.type === 'light'
        ? 'linear-gradient(-135deg, #307FE2, #0090DA, #00A3E1, #00A9E0)'
        : 'linear-gradient(-135deg, #103e78, #00486d, #005170, #005470)',
      width: '100%',
      left: 0
    }
  }
})

export default styles
