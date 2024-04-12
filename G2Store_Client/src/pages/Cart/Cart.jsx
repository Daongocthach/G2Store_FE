import { Container, Grid, Typography, Button, Box, Alert, Snackbar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Product from './Product/Product'
import { formatCurrency } from '../../utils/price'
import emptyOrder from '../../assets/img/empty-order.png'
import { getCookie } from '../../utils/cookie'

function Cart() {
  const navigate = useNavigate()
  const userId = getCookie('userId')
  const cart = useSelector(state => state.cart)
  const [cartItems, setCartItems] = useState([])
  const user = useSelector(state => state.auth)
  const [showAlert, setShowAlert] = useState(false)

  const handleClickCheckout = () => {
    if (cartItems.length < 1)
      setShowAlert(true)
    else {
      navigate('/checkout')
    }
  }
  useEffect(() => {
    if (userId) {
      setCartItems(cart?.cartItems)
    }
    else {
      navigate('/login')
    }
  }, [cart, user, userId, navigate])
  return (
    <Container maxWidth='lg' sx={{ mb: 2 }}>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlert} autoHideDuration={2000} onClose={() => setShowAlert(false)}>
        <Alert severity="warning" variant='filled' onClose={() => setShowAlert(false)}>
          Bạn chưa có sản phẩm nào trong giỏ!
        </Alert>
      </Snackbar>
      <Grid container spacing={3} mt={2} >
        {/* Phần sản phẩm */}
        <Grid item xs={12} sm={12} md={12} lg={8} >
          <Typography variant="body1" mb={2}>Trang chủ / Cart</Typography>
          <Typography variant="h5" fontWeight={'bold'} mb={5} >Có {cartItems.length} Sản phẩm trong giỏ hàng</Typography>
          {cartItems.length <= 0 && <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <img src={emptyOrder} style={{ objectFit: 'cover', height: '200px', width: '200px' }} />
            <Typography variant='h7' >Bạn chưa có sản phẩm nào trong giỏ</Typography>
            <Link to={'/genre-detail'}><Typography variant='h6' >Cùng khám phá hàng ngàn sản phẩm tại G2Store nhé!</Typography></Link>
          </Box>}
          {Array.isArray(cartItems) && cartItems.map((cartItem, index) =>
            <Product key={index} product={cartItem.product} quantity={cartItem.quantity} customerId={user?.id} />)}
        </Grid>

        {/* Phần tổng cộng và đặt hàng */}
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Box sx={{ display: 'flex', alignItem: 'center', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Tổng tiền: </Typography>
            <Typography variant='h5' sx={{ fontWeight: 'bold', color:'red' }}>{formatCurrency(cart?.total)}</Typography>
          </Box>
          <Button sx={{ width: '100%', bgcolor: 'orange', color: 'white', mt: 2, borderRadius: 2, alignItems: 'center' }}
            onClick={handleClickCheckout}>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Thanh toán</Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cart