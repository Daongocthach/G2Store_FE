import { Container, Grid, Typography, Button, Box, Breadcrumbs, Link, Divider } from '@mui/material'
import { NavigateNext } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ProductComponent from '../../components/Product/ProductComponent'
import { formatCurrency } from '../../utils/price'
import emptyOrder from '../../assets/img/empty-order.png'
import ShowAlert from '../../components/ShowAlert/ShowAlert'
import cartItemV2Api from '../../apis/cartItemApiV2'
import DeleteItem from './DeleteItem/DeleteItem'
import Shop from '../../components/Shop/Shop'

function Cart() {
  const navigate = useNavigate()
  const keep_login = useSelector(state => state.auth.keep_login)
  const [feeShip, setFeeShip] = useState(0)
  const [reRender, setReRender] = useState(false)
  const [cart, setCart] = useState([])
  const [isSoldOut, setIsSoldOut] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertWarning, setShowAlertWaring] = useState(false)
  var totalProducts = 0
  cart.forEach(cartItem => totalProducts += cartItem?.shop_subtotal)
  var total = totalProducts + feeShip
  // if (Array.isArray(cart) && cart.length > 0)
  //   cart?.map((cartItem) => { total = total + cartItem?.shop_subtotal })
  const handleClickCheckout = () => {
    if (cart.length < 1)
      setShowAlert(true)
    else if (isSoldOut) {
      setShowAlertWaring(true)
    }
    else {
      const data = {
        total, cart
      }
      navigate('/checkout', { state: data })
    }
  }
  useEffect(() => {
    if (keep_login) {
      cartItemV2Api.getCartItems()
        .then(response => {
          setCart(response)
          setIsSoldOut(false)
        })
    }
  }, [reRender, keep_login])
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
          <Typography variant="h6" fontWeight={'bold'} color={'#444444'} mb={5} >Có {cart?.length} Sản phẩm trong giỏ hàng</Typography>
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
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Shop shop_id={cartItem?.shop?.shop_id} shop_name={cartItem?.shop?.name} shop_image={cartItem?.shop?.image}/>
                    <DeleteItem cartItemId={cartItem?.cart_item_id} reRender={reRender} setReRender={setReRender} />
                  </Box>
                  <Box sx={{ pl: 5 }}>
                    {Array.isArray(cartItem?.shop_items) && cartItem?.shop_items.map((product, index) => (
                      <ProductComponent key={index} product={product} reRender={reRender} setReRender={setReRender} setIsSoldOut={setIsSoldOut} isCart={true} />
                    ))}
                  </Box>
                </Box>))}
            </Box>}
        </Grid>
        {/* Phần tổng cộng và đặt hàng */}
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, marginTop: 1 }}>
            <Typography variant='h6' sx={{ color: '#4F4F4F' }}>Tổng tiền: </Typography>
            <Typography variant='h6' sx={{ color: '#cb1c22', fontWeight: 'bold' }}>{formatCurrency(total)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, marginTop: 1 }}>
            <Typography variant='subtitle1' sx={{ color: '#4F4F4F' }}>Tiền hàng: </Typography>
            <Typography variant='subtitle2' sx={{ color: '#cb1c22' }}>{formatCurrency(0)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, marginTop: 1 }}>
            <Typography variant='subtitle1' sx={{ color: '#4F4F4F' }}>Phí vận chuyển: </Typography>
            <Typography variant='subtitle2' sx={{ color: '#6ca46f' }}>{formatCurrency(feeShip)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, marginTop: 1 }}>
            <Typography variant='subtitle1' sx={{ color: '#4F4F4F' }}>Giảm giá khuyến mãi: </Typography>
            <Typography variant='subtitle2' sx={{ color: '#4F4F4F' }}>{formatCurrency(0)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, marginTop: 1 }}>
            <Typography variant='subtitle1' sx={{ color: '#4F4F4F' }}>Giảm giá voucher: </Typography>
            <Typography variant='subtitle2' sx={{ color: '#4F4F4F' }}>{formatCurrency(0)}</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
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