import { ShoppingCart, Notifications } from '@mui/icons-material'
import { Box, Button, Badge, Tooltip, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Account from './Account/Account'
import Search from './Search/Search'
import G2Logo from '../../assets/img/G2Logo.png'
import { setSubCategory } from '../../redux/actions/subCategory'

function AppBar() {
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()

  const onClickGenreDetail = () => {
    dispatch(setSubCategory(subCategory))
    navigate('/genre-detail')
  }
  useEffect(() => {
    setQuantity(cart?.cartItems.length)
  }, [cart])
  return (
    <Box sx={{
      position: 'static', width: '100%', height: (theme) => theme.webCustom.appBarHeight, display: 'flex',
      alignItems: 'center', justifyContent: 'space-between', border: 'none', overflow: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1C1C1C' : '#FFFAFA')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, paddingX: 2 }}>
        <img src={G2Logo} style={{ height: '50px', width: '50px' }} />
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <Typography variant="h5" sx={{ display: { xs: 'none', sm: 'flex' } }}
            fontWeight="bold" color={(theme) => (theme.palette.mode === 'dark' ? 'white' : '#333333')}> G2Store</Typography>
        </Link>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button sx={useStyles.button} onClick={onClickGenreDetail}>Sản phẩm</Button>
          <Link to={'/promotion'}><Button sx={useStyles.button}>Khuyến mãi</Button></Link>
        </Box>
      </Box>
      <Search />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Cart">
          <Badge color="warning" badgeContent={quantity} sx={{ cursor: 'pointer' }}>
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
    color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black'),
    border: 'none', fontWeight: 'bold', '&:hover': { color: 'red' }
  }
}
const subCategory = {
  id: '0',
  name: ''
}