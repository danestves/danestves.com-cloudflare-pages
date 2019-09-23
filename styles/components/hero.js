const styles = theme => ({
  container: {
    position: 'relative',
    height: '100%',
    maxHeight: theme.spacing(40),
    background: 'linear-gradient(-135deg, #307FE2, #0090DA, #00A3E1, #00A9E0)',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      background: '#181818',
      opacity: 0.60
    }
  },
  img: {
    maxWidth: '100%',
    verticalAlign: 'middle',
    height: 'auto',
    filter: 'blur(1.5px)'
  },
  title: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    fontWeight: 700,
    fontSize: theme.spacing(6),
    zIndex: 1,
    transition: 'all .2s ease-in-out',
    fontFamily: '"Google Sans", sans-serif',

    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4)
    }
  },
  titleBlogpost: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    fontWeight: 700,
    fontSize: theme.spacing(3),
    zIndex: 1,
    transition: 'all .2s ease-in-out',
    fontFamily: '"Google Sans", sans-serif',
    width: '90%',
    textAlign: 'center',

    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(2)
    },

    [theme.breakpoints.up('md')]: {
      fontSize: theme.spacing(4)
    }
  }
})

export default styles
