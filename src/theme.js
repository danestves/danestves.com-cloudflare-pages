import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'

let theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ['"Poppins"', 'system-ui'].join(', '),
    h1: {
      fontFamily: '"Google Sans", system-ui'
    },
    h2: {
      fontFamily: '"Google Sans", system-ui'
    },
    h3: {
      fontFamily: '"Google Sans", system-ui'
    },
    h4: {
      fontFamily: '"Google Sans", system-ui'
    },
    h5: {
      fontFamily: '"Google Sans", system-ui'
    },
    h6: {
      fontFamily: '"Google Sans", system-ui'
    }
  },
  palette: {
    type: 'light',
    primary: {
      main: '#0090DA',
      light: '#0090DA'
    },
    secondary: {
      main: '#00A3E1',
      light: '#00A9E0'
    },
    background: {
      default: '#eaeff1'
    }
  }
})
responsiveFontSizes(theme)

const overrides = {
  MuiToolbar: {
    regular: {
      minHeight: 0
    }
  },
  MuiList: {
    padding: {
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  MuiOutlinedInput: {
    root: {
      '&$focused $notchedOutline': {
        borderColor: '#0090DA',
        borderWidth: 2
      }
    }
  },
  MuiFormLabel: {
    root: {
      '&$focused': {
        color: '#0090DA'
      }
    }
  },
  MuiButton: {
    outlinedPrimary: {
      border: '1px solid #0090DA',
      color: '#0090DA',

      '&:hover': {
        border: '1px solid #0090DA'
      }
    },
    containedPrimary: {
      backgroundColor: '#0090DA',

      '&:hover': {
        backgroundColor: 'rgba(0, 144, 218, 0.9)'
      }
    }
  }
}

const props = {}

const mixins = {
  ...theme.mixins
}

theme = { ...theme, overrides, props, mixins }

export default theme
