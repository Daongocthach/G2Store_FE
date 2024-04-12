import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, teal, deepOrange, orange } from '@mui/material/colors'

const APP_BAR_HEIGHT = '70px'
const BOARD_BAR_HEIGHT = '51px'
const FOOTER_HEIGHT= '180px'
const PROMOTION_BANNER_HEIGHT = '650px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const theme = extendTheme({
  webCustom: {
    appBarHeight: APP_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    promotionBannerHeight: PROMOTION_BANNER_HEIGHT,
    footerHeight: FOOTER_HEIGHT,
  },
  colors: {
    primary: teal,
    secondary: deepOrange,
    tertiary: cyan,
    quaternary: orange,
    menuItemDark: 'white',
    menuItemLight: 'black'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily:'"Roboto", sans-serif',
          color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black'),
          // '&:hover': { backgroundColor: 'inherit' },
          '&.MuiButtonBase-root': {
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black')
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"Roboto", sans-serif',
          fontSize: '0.875rem',
          color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black')
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Roboto", sans-serif',
          '&.MuiTypography-body1': {
            fontSize: '0.800rem'
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar ': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb ': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover ': {
            backgroundColor: 'white'
          },
          overflowX: 'hidden'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderWidth: '1px !important'
          },
          '&:hover fieldset': {
            borderWidth: '2px !important'
          },
          '&.Mui-focused fieldset': {
            borderWidth: '2px !important'
          }
        }
      }
    }
  }

})
export default theme