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
    primary: {
      main: '#307FE2',
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
  MuiAppBar: {
    colorPrimary: {
      background: 'linear-gradient(-135deg, #307FE2, #0090DA, #00A3E1, #00A9E0)'
    }
  },
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
  }
}

const props = {}

const mixins = {
  ...theme.mixins
}

theme = { ...theme, overrides, props, mixins }

export default theme
