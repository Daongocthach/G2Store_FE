import { Container, Grid, Typography, Button, Box, Breadcrumbs, Link } from '@mui/material'
import { Storefront, NavigateNext } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import ProductComponent from '../../components/Product/ProductComponent'
import { formatCurrency } from '../../utils/price'
import emptyOrder from '../../assets/img/empty-order.png'
import ShowAlert from '../../components/ShowAlert/ShowAlert'
import cartItemApi from '../../apis/cartItemApi'
import { setCart } from '../../redux/actions/cart'

function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const keep_login = useSelector(state => state.auth.keep_login)
  const [reRender, setReRender] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [isSoldOut, setIsSoldOut] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertWarning, setShowAlertWaring] = useState(false)

  var total = 0
  if (Array.isArray(cartItems) && cartItems.length > 0)
    cartItems.map((cartItem) => { total = total + cartItem?.total })
  const handleClickCheckout = () => {
    if (cartItems.length < 1)
      setShowAlert(true)
    else if (isSoldOut) {
      setShowAlertWaring(true)
    }
    else {
      const data = {
        total, cartItems
      }
      navigate('/checkout', { state: data })
    }
  }
  useEffect(() => {
    if (keep_login) {
      cartItemApi.getCartItemsIntended()
        .then(response => {
          setCartItems(response)
          dispatch(setCart(response))
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
          <Typography variant="h6" fontWeight={'bold'} color={'#444444'} mb={5} >Có {Array.isArray(cartItems) ? cartItems.length : 0} Sản phẩm trong giỏ hàng</Typography>
          {Array.isArray(cartItems) && cartItems.length <= 0 && <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <img src={emptyOrder} style={{ objectFit: 'cover', height: '200px', width: '200px' }} />
            <Typography variant='h6' >Bạn chưa có sản phẩm nào trong giỏ</Typography>
            <Link href={'/genre-detail'}><Typography variant='h6' >Cùng khám phá hàng ngàn sản phẩm tại G2Store nhé!</Typography></Link>
          </Box>}
          {Array.isArray(cartItems) && cartItems.length > 0 && cartItems.map((cartItem, index) => (
            <Box key={index} mt={2} >
              <Button sx={{ gap: 2, bgcolor: 'inherit', ':hover': { bgcolor: 'inherit' } }}
                onClick={() => { navigate('/shop-page', { state: cartItem?.shop?.shop_id }) }}>
                <Storefront sx={{ fontSize: 25, color: '#444444' }} />
                <Typography variant='subtitle1' fontWeight={'bold'} sx={{ color: '#444444' }}>{cartItem?.shop?.name}</Typography>
                <NavigateNext sx={{ fontSize: 25, color: '#444444' }} />
              </Button>
              {Array.isArray(cartItem?.items) && cartItem?.items.map((product, index) => (
                <ProductComponent key={index} product={product} reRender={reRender} setReRender={setReRender} setIsSoldOut={setIsSoldOut} isCart={true}/>
              ))}
            </Box>))}
        </Grid>
        {/* Phần tổng cộng và đặt hàng */}
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Box sx={{ display: 'flex', alignItem: 'center', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant='h6' color={'#444444'} sx={{ fontWeight: 'bold' }}>Tổng tiền: </Typography>
            <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#cb1c22' }}>{formatCurrency(total)}</Typography>
          </Box>
          <Button color='error' variant='contained' sx={{ width: '100%', mt: 2, borderRadius: 2, alignItems: 'center' }}
            onClick={handleClickCheckout}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Thanh toán</Typography>
          </Button>
        </Grid>
      </Grid>
      <ShowAlert setShowAlert={setShowAlert} showAlert={showAlert} content={'Bạn chưa có sản phẩm nào trong giỏ!'} isWarning={true} />
      <ShowAlert setShowAlert={setShowAlertWaring} showAlert={showAlertWarning} content={'Vui lòng bỏ sản phẩm hết hàng khỏi giỏ!'} isWarning={true} />
    </Container>
  )
}

export default Cart