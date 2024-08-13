import { ShoppingCart } from '@mui/icons-material'
import { Box, Badge, Tooltip, Typography, Container } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Account from './Account/Account'
import Search from './Search/Search'
import DrawerMenu from '../DrawerMenu/DrawerMenu'
import { mockData } from '../../apis/mockdata'
import MenuNotifications from './MenuNotifications/MenuNotifications'

function AppBar() {
  const navigate = useNavigate()
  const cartItems = useSelector(state => state.cart.cartItems)
  const user = useSelector(state => state.auth)
  const atk = localStorage.getItem('atk')
  return (
    <Box className="bg-gray-800">
      <Container>
        <Box className="static w-full flex items-center justify-between overflow-auto bg-gray-800 h-16">
          <Box className="flex items-center gap-3 flex-1">
            <Box className="flex items-center gap-1">
              <Box className="hidden lg:flex items-center gap-1">
                <img src={mockData.images.G2Logo} className="h-16 w-16" />
                <Link to="/" className="no-underline">
                  <Typography variant="h5" fontWeight={'bold'} className="text-white hover:text-orange-300">G2Store</Typography>
                </Link>
              </Box>
              <Box className="flex md:hidden">
                <DrawerMenu atk={atk} />
              </Box>
            </Box>
            <Search />
          </Box>
          <Box className="flex-row items-center gap-4 hidden md:flex">
            <Box className="flex flex-row items-center gap-5">
              <MenuNotifications />
              <Tooltip title="Giỏ hàng">
                <Badge color="warning" badgeContent={cartItems.length} className="cursor-pointer">
                  <ShoppingCart className="text-white" onClick={() => navigate('/cart')} />
                </Badge>
              </Tooltip>
            </Box>
            <Account atk={atk} avatar={user?.avatar} />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default AppBar