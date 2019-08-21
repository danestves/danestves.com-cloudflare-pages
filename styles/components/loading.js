const styles = theme => ({
  container: {
    height: 'calc(100vh - 56px)',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vh - 64px)'
    }
  }
})

export default styles
