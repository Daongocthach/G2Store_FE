import { ShoppingCart, Notifications } from '@mui/icons-material'
import { Box, Badge, Tooltip, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Account from './Account/Account'
import Search from './Search/Search'
import DrawerMenu from '../DrawerMenu/DrawerMenu'
import { mockData } from '../../apis/mockdata'

function AppBar() {
  const navigate = useNavigate()
  const cartItems = useSelector(state => state.cart.cartItems)
  const user = useSelector(state => state.auth)
  const atk = localStorage.getItem('atk')
  return (
    <Box className="static w-full flex items-center justify-between overflow-auto bg-gray-800 h-16 sm:px-2 md:px-10">
      <Box className="flex items-center gap-3 flex-1 px-1">
        <Box className="flex items-center gap-1">
          <img src={mockData.images.G2Logo} className="h-16 w-16 hidden lg:flex" />
          <Link to="/" className="no-underline">
            <Typography variant="h5" fontWeight={'bold'} className="hidden sm:flex text-white hover:text-orange-300">G2Store</Typography>
          </Link>
          <DrawerMenu atk={atk}/>
        </Box>
        <Search />
      </Box>
      <Box className="items-center gap-5 hidden lg:flex">
        <Tooltip title="Thông báo">
          <Badge color="warning" badgeContent={1} className="cursor-pointer">
            <Notifications className="text-white" onClick={() => navigate('/notification')} />
          </Badge>
        </Tooltip>
        <Tooltip title="Giỏ hàng">
          <Badge color="warning" badgeContent={cartItems.length} className="cursor-pointer">
            <ShoppingCart className="text-white" onClick={() => navigate('/cart')} />
          </Badge>
        </Tooltip>
        <Account atk={atk} avatar={user?.avatar}/>
      </Box>
    </Box>
  )
}

export default AppBar