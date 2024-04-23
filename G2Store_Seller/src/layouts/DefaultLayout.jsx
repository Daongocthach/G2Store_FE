import { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { Drawer, Box, Toolbar, CssBaseline, Divider, IconButton, Link, Typography } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import { Menu, ChevronLeft, ChevronRight } from '@mui/icons-material'
import AppBar from '../components/Appbar/Appbar'
import Footer from '../components/Footer/Footer'
import ListCommand from '../components/ListCommand/ListCommand'
import G2Logo from '../assets/img/G2Logo.png'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const TopAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const LeftDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': {
        ...openedMixin(theme),
        backgroundColor: '#2f3640'
      }
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': {
        ...closedMixin(theme),
        backgroundColor: '#2f3640'
      }
    })
  })
)
export default function DefaultLayout({ children }) {
  const theme = useTheme()
  const [open, setOpen] = useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: '' }}>
      <CssBaseline />
      <TopAppBar position="fixed" open={open} sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1C1C1C' : '#2f3640'),
        height: (theme) => theme.webCustom.appBarHeight, overflow: 'auto'
      }}>
        <Toolbar>
          <IconButton color="white" aria-label="open drawer" onClick={handleDrawerOpen} edge="start"
            sx={{ marginRight: 5, ...(open && { display: 'none' }) }} >
            <Menu sx={{ color: 'white' }} />
          </IconButton>
          <AppBar />
        </Toolbar>
      </TopAppBar>
      <LeftDrawer variant="permanent" open={open} >
        <Box sx={{ bgcolor: '#2f3640' }}>
          <DrawerHeader>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Link to={'/dashboard'} >
                {<img src={G2Logo} style={{ height: '70px', width: '70px', objectFit: 'contain' }} />}
              </Link>
              <Link to={'/dashboard'} style={{ textDecoration: 'none' }}>
                <Typography variant="h5" fontWeight="bold" color={'white'}>G2Store</Typography>
              </Link>
            </Box>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRight color={'white'} /> : <ChevronLeft sx={{ color: 'white' }} />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <ListCommand open={open} />
        </Box>
      </LeftDrawer>
      <Box component="main" sx={{ flexGrow: 1, pt: 10 }}>
        {children}
        <Footer />
      </Box>
    </Box>
  )
}