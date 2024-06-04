import { Container, Grid, Typography, Button, Box, Breadcrumbs, Link } from '@mui/material'
import { Storefront, NavigateNext } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ProductComponent from '../../components/Product/ProductComponent'
import { formatCurrency } from '../../utils/price'
import emptyOrder from '../../assets/img/empty-order.png'
import ShowAlert from '../../components/ShowAlert/ShowAlert'
import cartItemV2Api from '../../apis/cartItemApiV2'

function Cart() {
  const navigate = useNavigate()
  const keep_login = useSelector(state => state.auth.keep_login)
  const [reRender, setReRender] = useState(false)
  const [cart, setCart] = useState([])
  const [isSoldOut, setIsSoldOut] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertWarning, setShowAlertWaring] = useState(false)

  const handleClickCheckout = () => {
    // if (cart.length < 1)
    //   setShowAlert(true)
    // else if (isSoldOut) {
    //   setShowAlertWaring(true)
    // }
    // else {
    //   const data = {
    //     total, cart
    //   }
    //   navigate('/checkout', { state: data })
    // }
  }
  useEffect(() => {
    if (keep_login) {
      cartItemV2Api.getCartItems()
        .then(response => {
          setCart(response)
          setIsSoldOut(false)
        })
    }
  }, [reRender])
  return (
    <Container maxWidth='lg' sx={{ mb: 2 }}>
      <Grid container spacing={3} mt={2} >
        {/* Phần sản phẩm */}
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Breadcrumbs>
            <Link underline="hover" color="inherit" href="/" fontSize={15}>
              Trang chủ
            </Link>
            <Link underline="hover" color="inherit" href="/cart">
              Giỏ hàng
            </Link>
          </Breadcrumbs>
          <Typography variant="h6" fontWeight={'bold'} color={'#444444'} mb={5} >Có {0} Sản phẩm trong giỏ hàng</Typography>
          {Array.isArray(cart) && cart.length <= 0 ?
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
              <img src={emptyOrder} style={{ objectFit: 'cover', height: '200px', width: '200px' }} />
              <Typography variant='h6' >Bạn chưa có sản phẩm nào trong giỏ</Typography>
              <Link href={'/genre-detail'}><Typography variant='h6' >Cùng khám phá hàng ngàn sản phẩm tại G2Store nhé!</Typography></Link>
            </Box>
            :
            <Box>
              {cart.map((cartItem, index) => (
                <Box key={index} mt={2} >
                  <Button sx={{ gap: 2, bgcolor: 'inherit', ':hover': { bgcolor: 'inherit' } }}
                    onClick={() => { navigate('/shop-page', { state: cartItem?.shop_id }) }}>
                    <Storefront sx={{ fontSize: 25, color: '#444444' }} />
                    <Typography variant='subtitle1' fontWeight={'bold'} sx={{ color: '#444444' }}>{cartItem?.shop_name}</Typography>
                    <NavigateNext sx={{ fontSize: 25, color: '#444444' }} />
                  </Button>
                  {Array.isArray(cartItem?.shop_items) && cartItem?.shop_items.map((product, index) => (
                    <ProductComponent key={index} product={product} reRender={reRender} setReRender={setReRender} setIsSoldOut={setIsSoldOut} isCart={true} />
                  ))}
                </Box>))}
            </Box>}
        </Grid>
        {/* Phần tổng cộng và đặt hàng */}
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Box sx={{ display: 'flex', alignItem: 'center', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant='h6' color={'#444444'}>Tổng tiền: </Typography>
            <Typography variant='h6' sx={{ color: '#cb1c22' }}>{formatCurrency(0)}</Typography>
          </Box>
          <Button color='error' variant='contained' fullWidth sx={{ borderRadius: 2, fontWeight: 'bold' }}
            onClick={handleClickCheckout}>
            Thanh toán
          </Button>
        </Grid>
      </Grid>
      <ShowAlert setShowAlert={setShowAlert} showAlert={showAlert} content={'Bạn chưa có sản phẩm nào trong giỏ!'} isWarning={true} />
      <ShowAlert setShowAlert={setShowAlertWaring} showAlert={showAlertWarning} content={'Vui lòng bỏ sản phẩm hết hàng khỏi giỏ!'} isWarning={true} />
    </Container>
  )
}

export default Cart