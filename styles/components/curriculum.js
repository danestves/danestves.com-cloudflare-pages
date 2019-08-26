const styles = theme => ({
  '@keyframes cd-bounce-1': {
    '0%': {
      opacity: 0,
      transform: 'scale(.5)'
    },
    '60%': {
      opacity: 1,
      transform: 'scale(1.2)'
    },
    '100%': {
      transform: 'scale(1)'
    }
  },
  '@keyframes cd-bounce-2': {
    '0%': {
      opacity: 0,
      transform: 'translateX(-100px)'
    },
    '60%': {
      opacity: 1,
      transform: 'translateX(20px)'
    },
    '100%': {
      transform: 'translateX(0)'
    }
  },
  '@keyframes cd-bounce-2-inverse': {
    '0%': {
      opacity: 0,
      transform: 'translateX(100px)'
    },
    '60%': {
      opacity: 1,
      transform: 'translateX(-20px)'
    },
    '100%': {
      transform: 'translateX(0)'
    }
  },
  containerTimeline: {
    width: '95%',
    maxWidth: 1170,
    margin: '1em auto 2em',
    position: 'relative',
    padding: '2em 0',

    '@media only screen and (min-width: 1170px)': {
      marginTop: '3em',
      marginBottom: '3em',
      width: '90%'
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: theme.spacing(2),
      height: '100%',
      width: 4,
      background: '#fff',

      '@media only screen and (min-width: 1170px)': {
        left: '50%',
        marginLeft: -2
      }
    },

    '&::after': {
      content: '""',
      display: 'table',
      clear: 'both'
    }
  },
  timelineElement: {
    position: 'relative',
    margin: '2em 0',

    '@media only screen and (min-width: 1170px)': {
      margin: '4em 0',

      '&:nth-child(even)': {
        '& .vertical-timeline-element-content': {
          float: 'right',

          '&::before': {
            top: theme.spacing(3),
            left: 'auto',
            right: '100%',
            borderColor: 'transparent',
            borderRightColor: '#fff'
          }
        },

        '& .vertical-timeline-element-date': {
          left: 'auto',
          right: '124%'
        }
      }
    },

    '&::after': {
      content: '""',
      display: 'table',
      clear: 'both'
    },

    '&:first-child': {
      marginTop: 0
    },

    '&:last-child': {
      marginBottom: 0
    },

    '& > div': {
      minHeight: 1,

      '& .vertical-timeline-element-icon': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        borderRadius: '50%',
        boxShadow:
          '0 0 0 4px #fff, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05)',

        '@media only screen and (min-width: 1170px)': {
          width: 60,
          height: 60,
          left: '50%',
          marginLeft: -30
        },

        '&.is-hidden': {
          visibility: 'hidden'
        },

        '&.bounce-in': {
          visibility: 'visible',
          animationName: '$cd-bounce-1',
          animationDuration: '0.6s'
        },

        '& .material-icons': {
          display: 'block',
          position: 'relative',
          left: '50%',
          top: '50%',
          marginLeft: -12,
          marginTop: -12,
          fontSize: theme.spacing(3)
        }
      },

      '& .vertical-timeline-element-content': {
        position: 'relative',
        marginLeft: 60,
        background: '#fff',
        borderRadius: '0.25em',
        padding: '1em',
        boxShadow: '0 3px 0 #ddd',

        '@media only screen and (max-width: 1169px)': {
          visibility: 'visible',
          animationName: '$cd-bounce-2-inverse',
          animationDuration: '0.6s'
        },

        '@media only screen and (min-width: 1170px)': {
          marginLeft: 0,
          padding: '1.5em',
          width: '40%'
        },

        '&.is-hidden': {
          visibility: 'hidden'
        },

        '&.bounce-in': {
          visibility: 'visible',
          animationName: '$cd-bounce-2',
          animationDuration: '0.6s'
        },

        '&::before': {
          content: '""',
          position: 'absolute',
          top: theme.spacing(2),
          right: '100%',
          height: 0,
          width: 0,
          border: '7px solid transparent',
          borderRight: '7px solid #fff',

          '@media only screen and (min-width: 1170px)': {
            top: theme.spacing(3),
            left: '100%',
            borderColor: 'transparent',
            borderLeftColor: '#fff'
          }
        },

        '&::after': {
          content: '""',
          display: 'table',
          clear: 'both'
        }
      },

      '& .vertical-timeline-element-date': {
        float: 'left',
        padding: '0.8em 0',
        opacity: 0.7,
        display: 'inline-block',
        fontWeight: 500,
        color: '#333',

        '@media only screen and (min-width: 1170px)': {
          position: 'absolute',
          width: '100%',
          left: '124%',
          top: 6,
          fontSize: '1rem',
          textAlign: 'center'
        }
      }
    }
  },
  timelineTitle: {
    margin: 0
  },
  timelineSubtitle: {
    margin: 0,
    color: 'rgba(128, 128, 128, 0.75)'
  }
})

export default styles
