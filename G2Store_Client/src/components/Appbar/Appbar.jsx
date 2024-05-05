import { ShoppingCart, Notifications } from '@mui/icons-material'
import { Box, Button, Badge, Tooltip, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Account from './Account/Account'
import Search from './Search/Search'
import G2Logo from '../../assets/img/G2Logo.png'

function AppBar() {
  const navigate = useNavigate()
  const cartItems = useSelector(state => state.cart.cartItems)

  return (
    <Box sx={{
      position: 'static', width: '100%', height: (theme) => theme.webCustom.appBarHeight, display: 'flex',
      alignItems: 'center', justifyContent: 'space-between', border: 'none', overflow: 'auto', bgcolor: '#2f3640'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, paddingX: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={G2Logo} style={{ height: '65px', width: '65px' }} />
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Typography variant="h5" sx={{ display: { xs: 'none', sm: 'flex' } }}
              fontWeight="bold" color={'white'}> G2Store</Typography>
          </Link>
        </Box>
        <Link to={'/genre-detail'}><Button sx={{ ...useStyles.button, minWidth: 150 }} >Sản phẩm</Button></Link>
        <Search />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Tooltip title="Thông báo">
          <Badge color="warning" badgeContent={1} sx={{ cursor: 'pointer' }}>
            <Notifications sx={useStyles.button} onClick={() => navigate('/cart')} />
          </Badge>
        </Tooltip>
        <Tooltip title="Giỏ hàng">
          <Badge color="warning" badgeContent={cartItems.length} sx={{ cursor: 'pointer' }}>
            <ShoppingCart sx={useStyles.button} onClick={() => navigate('/cart')} />
          </Badge>
        </Tooltip>
        <Account />
      </Box>
    </Box>
  )
}

export default AppBar

const useStyles = {
  button: {
    color: 'white', fontSize: 25,
    border: 'none', fontWeight: 'bold', '&:hover': { color: 'orange', bgcolor: 'inherit' }
  }
}