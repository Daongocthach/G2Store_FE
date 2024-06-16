import { ShoppingCart, Notifications } from '@mui/icons-material'
import { Box, Badge, Tooltip, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Account from './Account/Account'
import Search from './Search/Search'
import G2Logo from '../../assets/img/G2Logo.png'

function AppBar() {
  const navigate = useNavigate()
  const cartItems = useSelector(state => state.cart.cartItems)

  return (
    <Box className="static w-full flex items-center justify-between overflow-auto bg-gray-800" style={{ height: 'var(--app-bar-height)' }}>
      <Box className="flex items-center gap-2 px-4">
        <Box className="flex items-center">
          <img src={G2Logo} className="h-16 w-16" />
          <Link to="/" className="no-underline">
            <Typography variant="h5" fontWeight={'bold'} className="hidden sm:flex text-white hover:text-orange-300">
              G2Store
            </Typography>
          </Link>
        </Box>
        <Typography fontWeight={'bold'}
          className="text-white font-bold py-2 px-4 rounded cursor-pointer hover:text-orange-300"
          onClick={() => navigate('/genre-detail')}>
          Sản phẩm
        </Typography>
        <Search />
      </Box>
      <Box className="flex items-center gap-5">
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
        <Account />
      </Box>
    </Box>
  )
}

export default AppBar