import React from 'react'
import PropTypes from 'prop-types'
import { responsiveFontSizes } from '@material-ui/core'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { blue } from '@material-ui/core/colors'
import { getCookie } from '../../helpers'
import deepmerge from 'deepmerge'

export const themeColor = blue[700]

const themeInitialOptions = {
  dense: false,
  direction: 'ltr',
  paletteColors: {},
  spacing: 8 // spacing unit
}

function usingHighDensity (themeOptions) {
  return deepmerge(themeOptions, {
    props: {
      MuiButton: {
        size: 'small'
      },
      MuiFilledInput: {
        margin: 'dense'
      },
      MuiFormControl: {
        margin: 'dense'
      },
      MuiFormHelperText: {
        margin: 'dense'
      },
      MuiIconButton: {
        size: 'small'
      },
      MuiInputBase: {
        margin: 'dense'
      },
      MuiInputLabel: {
        margin: 'dense'
      },
      MuiListItem: {
        dense: true
      },
      MuiOutlinedInput: {
        margin: 'dense'
      },
      MuiFab: {
        size: 'small'
      },
      MuiTable: {
        size: 'small'
      },
      MuiTextField: {
        margin: 'dense'
      },
      MuiToolbar: {
        variant: 'dense'
      }
    },
    overrides: {
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
  })
}

function usingIdentity (themeOptions) {
  return themeOptions
}

export const DispatchContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in ThemeContext.Provider')
})

export function ThemeProvider (props) {
  const { children } = props

  const [themeOptions, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          paletteType: action.payload.paletteType || state.paletteType,
          paletteColors: action.payload.paletteColors || state.paletteColors
        }
      default:
        throw new Error(`Unrecognized type ${action.type}`)
    }
  }, themeInitialOptions)

  const prefersDarkMode = useMediaQuery('@media (prefers-color-scheme: dark)')
  const preferredType = prefersDarkMode ? 'dark' : 'light'
  const { dense, paletteColors, paletteType = preferredType, spacing } = themeOptions

  React.useEffect(() => {
    if (process.browser) {
      const nextPaletteColors = JSON.parse(getCookie('paletteColors') || 'null')
      const nextPaletteType = getCookie('paletteType')

      dispatch({
        type: 'CHANGE',
        payload: { paletteColors: nextPaletteColors, paletteType: nextPaletteType }
      })
    }
  }, [])

  // persist paletteType
  React.useEffect(() => {
    document.cookie = `paletteType=${paletteType};path=/;max-age=31536000`
  }, [paletteType])

  const theme = React.useMemo(() => {
    const themeDecorator = dense ? usingHighDensity : usingIdentity
    const nextTheme = createMuiTheme(
      themeDecorator({
        typography: {
          useNextVariants: true,
          fontFamily: ['"Open Sans"', 'system-ui'].join(', '),
          h1: {
            fontFamily: '"Poppins", system-ui'
          },
          h2: {
            fontFamily: '"Poppins", system-ui'
          },
          h3: {
            fontFamily: '"Poppins", system-ui'
          },
          h4: {
            fontFamily: '"Poppins", system-ui'
          },
          h5: {
            fontFamily: '"Poppins", system-ui'
          },
          h6: {
            fontFamily: '"Poppins", system-ui'
          }
        },
        palette: {
          type: paletteType,
          primary: {
            main: paletteType === 'light' ? '#307FE2' : '#fff',
            light: paletteType === 'light' ? '#0090DA' : '#fff'
          },
          secondary: {
            main: paletteType === 'light' ? '#00A3E1' : '#fff',
            light: paletteType === 'light' ? '#00A9E0' : '#fff'
          },
          background: {
            default: paletteType === 'light' ? '#eaeff1' : '#121212'
          },
          ...paletteColors
        },
        spacing
      })
    )

    nextTheme.palette.background.level2 =
      paletteType === 'light' ? nextTheme.palette.grey[100] : '#333'

    nextTheme.palette.background.level1 =
      paletteType === 'light' ? '#fff' : nextTheme.palette.grey[900]

    return nextTheme
  }, [dense, paletteColors, paletteType, spacing])
  responsiveFontSizes(theme)

  React.useEffect(() => {
    // Expose the theme as a global variable so people can play with it.
    if (process.browser) {
      window.theme = theme
    }
  }, [theme])

  return (
    <MuiThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </MuiThemeProvider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node
}

export function useChangeTheme () {
  const dispatch = React.useContext(DispatchContext)
  return React.useCallback(options => dispatch({ type: 'CHANGE', payload: options }), [dispatch])
}
