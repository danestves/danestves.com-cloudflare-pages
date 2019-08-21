const styles = theme => ({
  link: {
    textDecoration: 'none',
    color: 'initial',
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    padding: '0.5rem',
    borderRadius: theme.spacing(2),
    position: 'relative',
    flexGrow: 1,

    '&::after': {
      content: '""',
      background:
        'linear-gradient(-135deg, #307FE2, #0090DA, #00A3E1, #00A9E0)',
      position: 'absolute',
      zIndex: -1,
      top: '50%',
      left: '50%',
      height: '99.9%',
      width: '99.9%',
      opacity: 0.3,
      borderRadius: theme.spacing(2),
      transform: 'translate(-50%, -50%)',
      transition: 'all 0.3s ease-in-out'
    },

    '&:hover': {
      '&::after': {
        filter: 'blur(10px)'
      }
    }
  },
  img: {
    width: 75,
    display: 'block',
    margin: theme.spacing(1, 0)
  },
  title: {
    fontFamily: '"Google Sans", system-ui',
    fontSize: '1.2rem',
    padding: '0 5px 0 0',
    fontWeight: 600
  },
  description: {
    fontFamily: '"Google Sans", system-ui',
    display: 'block',
    color: 'rgba(128, 128, 128, 0.75)'
  }
})

export default styles
