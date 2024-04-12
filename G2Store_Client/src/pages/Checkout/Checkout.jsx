import { Container, Grid, Typography, Button, Box, Input, Radio, TextField, Alert, Snackbar, Backdrop, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { formatCurrency } from '../../utils/price'
import imgMomo from '../../assets/img/imgMomo.png'
import Product from './Product/Product'
import orderApi from '../../apis/orderApi'
import promotionApi from '../../apis/promotionApi'
import { useEffect, useState } from 'react'
import useStyles from './useStyles'
import ghnApi from '../../apis/ghnApi'

function Checkout() {
  const [checked, setChecked] = useState(0)
  const [note, setNote] = useState('')
  const [code, setCode] = useState('')
  const [voucher, setVoucher] = useState()
  const [feeShip, setFeeShip] = useState(0)
  const cart = useSelector(state => state.cart)
  var valueVoucher = voucher?.value || 0
  var total = cart?.total ? cart.total + feeShip - valueVoucher : 0
  if (total < 0)
    total = 0
  const cartItems = cart.cartItems
  const user = useSelector(state => state.auth)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showAlertSuccess, setShowAlertSuccess] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const [showAlertVoucherSuccess, setShowAlertVoucherSuccess] = useState(false)
  const [showAlertVoucherFail, setShowAlertVoucherFail] = useState(false)

  function handleClickPromotion() {
    promotionApi.checkPromotion(code)
      .then(response => {
        setVoucher(response.data)
        total = total - response.data
        setShowAlertVoucherSuccess(true)
      })
      .catch(err => {
        console.log(err)
        setShowAlertVoucherFail(true)
      })
  }
  function handleClickOrder() {
    setLoading(true)
    const currentTimeString = new Date()
    const orderItems = cartItems.map(cartItem => ({
      product: {
        id: cartItem.product.id,
        price: cartItem.product.price
      },
      quantity: cartItem.quantity
    }))
    const order = {
      'createdDate': currentTimeString,
      'orderStatus': 'PENDING',
      'paymentMethod': checked,
      'shippingFee': feeShip,
      'voucherDiscount': valueVoucher,
      'total': total,
      'note': note,
      'customer': {
        'id': user?.id
      },
      'orderItems': orderItems
    }
    orderApi.addOrder(order)
      .then(() => {
        setShowAlertSuccess(true)
        setTimeout(() => {
          setLoading(false)
          navigate(`/thanks?${cartItems.length}`)
        }, 1000)
      })
      .catch(() => {
        setShowAlertFail(true)
        setLoading(false)
      })
  }
  useEffect(() => {
    if (user)
      ghnApi.calculateFeeShip(user.districtId)
        .then((response) => {
          setFeeShip(response.data.data.total)
        })
        .catch(err => {
          console.log(err)
        })
    else navigate('/login')
  }, [])
  return (
    <Container maxWidth="lg" sx={{ mb: 2 }}>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlertSuccess} autoHideDuration={2000} onClose={() => setShowAlertSuccess(false)}>
        <Alert severity="success" variant='filled' onClose={() => setShowAlertSuccess(false)}>
          Đặt hàng thành công!
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlertFail} autoHideDuration={2000} onClose={() => setShowAlertFail(false)}>
        <Alert severity="error" variant='filled' onClose={() => setShowAlertFail(false)}>
          Đặt hàng thất bại!
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlertVoucherSuccess} autoHideDuration={1000} onClose={() => setShowAlertVoucherSuccess(false)}>
        <Alert severity="success" variant='filled' onClose={() => setShowAlertVoucherSuccess(false)}>
          Thêm voucher thành công!
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlertVoucherFail} autoHideDuration={1000} onClose={() => setShowAlertVoucherFail(false)}>
        <Alert severity="error" variant='filled' onClose={() => setShowAlertVoucherFail(false)}>
          Thêm voucher thất bại!
        </Alert>
      </Snackbar>
      <Grid container spacing={3} mt={2}>
        {/* Phần thông tin đơn hàng */}
        <Grid item xs={12} sm={6} md={6} lg={8}>
          <Typography variant="body1" mb={2}>Trang chủ / Checkout</Typography>
          <Typography variant='h5'>Thông tin người nhận</Typography>
          <Box sx={useStyles.flexBox}>
            <Typography variant='h6' sx={useStyles.titleAddress}>Họ và tên:</Typography>
            <Input sx={{ minWidth: '200px', width: '500px' }} value={user?.fullName} />
          </Box>
          <Box sx={useStyles.flexBox}>
            <Typography variant='h6' sx={useStyles.titleAddress}>Phone:</Typography>
            <Input sx={{ minWidth: '200px', width: '500px' }} value={user?.phoneNo} />
          </Box>
          <Box sx={useStyles.flexBox}>
            <Typography variant='h6' sx={useStyles.titleAddress}>Địa chỉ:</Typography>
            <Input sx={{ minWidth: '200px', width: '500px' }} value={user?.address + ', ' + user?.ward + ', ' + user?.district + ', Tỉnh ' + user?.province} />
          </Box>
          <Button sx={useStyles.button} onClick={() => { navigate('/account') }}>Chỉnh sửa thông tin</Button>
          <Typography variant="h5" mt={2}>Thông tin đơn hàng</Typography>
          {Array.isArray(cartItems) && cartItems.map((cartItem, index) =>
            <Product key={index} product={cartItem.product} quantity={cartItem.quantity} />)}
        </Grid>

        {/* Phần tổng cộng và thanh toán */}
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Box sx={{ ...useStyles.flexBoxPrice, alignItems: 'center' }}>
            <Typography variant='h8' >Mã khuyến mãi: </Typography>
            <TextField value={code} size='small' label='Voucher...' sx={{ width: '150px' }} onChange={(e) => { setCode(e.target.value) }}></TextField>
            <Button sx={useStyles.buttonVoucher} onClick={handleClickPromotion}>Nhập</Button>
          </Box>
          <Box sx={{ ...useStyles.flexBoxPrice, alignItems: 'center' }}>
            <Typography variant='h8' minWidth={'135px'} >Ghi chú: </Typography>
            <TextField value={note} label='Note...' size='small' fullWidth onChange={(e) => { setNote(e.target.value) }}></TextField>
          </Box>
          <Box sx={{ ...useStyles.flexBoxPrice, borderTop: '1px solid gray' }}>
            <Typography variant='h5' >Tổng tiền: </Typography>
            <Typography variant='h7' sx={{ color: 'red', fontWeight: 'bold' }}>{formatCurrency(total)}</Typography>
          </Box>
          <Box sx={useStyles.flexBoxPrice}>
            <Typography variant='h7' >Tiền hàng: </Typography>
            <Typography variant='h7' >{formatCurrency(cart?.total)}</Typography>
          </Box>
          <Box sx={useStyles.flexBoxPrice}>
            <Typography variant='h7' >Phí vận chuyển: </Typography>
            <Typography variant='h7' >{formatCurrency(feeShip)}</Typography>
          </Box>
          <Box sx={useStyles.flexBoxPrice}>
            <Typography variant='h7' >Giảm giá khuyến mãi: </Typography>
            <Typography variant='h7' >{formatCurrency(0)}</Typography>
          </Box>
          {voucher && <Box sx={{ ...useStyles.flexBoxPrice, borderBottom: '1px solid gray' }}>
            <Typography variant='h7' >Giảm giá voucher: </Typography>
            <Typography variant='h7' >{formatCurrency(voucher?.value)}</Typography>
          </Box>}
          <Typography variant='h5' sx={{ mt: 3 }}>Phương thức thanh toán</Typography>
          <Box sx={useStyles.flexBox}>
            <Radio sx={useStyles.radio} checked={checked == 0} onChange={() => setChecked(0)} />
            <Typography variant='h7'>Thanh toán khi nhận hàng</Typography>
          </Box>
          <Box sx={useStyles.flexBox}>
            <Radio sx={useStyles.radio} checked={checked == 1} onChange={() => setChecked(1)} />
            <Typography variant='h7' >Thanh toán bằng momo</Typography>
            <img src={imgMomo} alt='thanh toan momo' style={{ height: '30px', width: '30px' }} />
          </Box>
          <Button sx={useStyles.button} onClick={handleClickOrder}> Hoàn tất đặt hàng </Button>
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Checkout
