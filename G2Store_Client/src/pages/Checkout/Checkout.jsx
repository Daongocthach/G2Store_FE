import { Container, Grid, Typography, Button, Box, Radio, TextField, Breadcrumbs, Link, Chip, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { Storefront, NavigateNext, CheckCircleOutline, LocalShipping } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { formatCurrency } from '../../utils/price'
import Product from './Product/Product'
import orderApi from '../../apis/orderApi'
import useStyles from './useStyles'
import ghnApi from '../../apis/ghnApi'
import addressApi from '../../apis/addressApi'
import ShowAlert from '../../components/ShowAlert/ShowAlert'
import Loading from '../../components/Loading/Loading'
import Address from '../../components/Address/Address'
import { deleteAllCart } from '../../redux/actions/cart'
import imgMomo from '../../assets/img/momo.png'
import productApi from '../../apis/productApi'
import ChangeAddress from './ChangeAddress/ChangeAddress'

function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const data = location.state
  const [checked, setChecked] = useState(0)
  const [note, setNote] = useState('')
  const [code, setCode] = useState('')
  const [voucher, setVoucher] = useState()
  const [feeShip, setFeeShip] = useState(0)
  const [feeShipData, setFeeShipData] = useState({})
  const [addresses, setAddresses] = useState([])
  const [address, setAddress] = useState()
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const [showAlertVoucher, setShowAlertVoucher] = useState(false)
  const [showAlertVoucherFail, setShowAlertVoucherFail] = useState(false)
  var totalProducts = data?.total
  var total = totalProducts + feeShip

  function handleClickPromotion() {
  }
  const convertDataToOrderFormat = (data, feeShip) => {
    const orders = data.map(order => {
      return {
        items: order.items.map(item => {
          return {
            images: item.images,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            customer_id: item.customer_id,
            product_id: item.product_id,
            shop_id: item.shop_id,
            sub_total: item.sub_total
          }
        }),
        shop_id: order.shop.shop_id,
        fee_ship: feeShipData[order.shop.shop_id]
      }
    })
    return { orders }
  }
  function handleClickOrder() {
    // setLoading(true)
    const orderData = convertDataToOrderFormat(data?.cartItems, 5000)
    // orderApi.addOrder(order)
    //   .then(() => {
    //     setShowAlert(true)
    //     setTimeout(() => {
    //       dispatch(deleteAllCart())
    //       navigate('/thanks', { state: data?.cartItems.length })
    //     }, 1000)
    //   })
    //   .catch(() => {
    //     setShowAlertFail(true)
    //   })
    //   .finally(() => setLoading(false))
  }
  const calculateFeeShip = async (shopDistrictId, userDistrictId, height, length, weight, width) => {
    ghnApi.getMethodShip(shopDistrictId, userDistrictId)
      .then((response) => {
        const service_id = response?.data?.data[0]?.service_id
        const data = ghnApi.calculateFeeShip(service_id, shopDistrictId, userDistrictId, height, length, weight, width)
        return data.data.data.total
      })
      .catch((error) => {
        console.error('Error calculating fee ship:', error)
        return null
      })
  }

  const fetchData = async () => {
    setLoading(true)
    addressApi.getAddresses()
      .then((response) => {
        setAddresses(response)
        const defaultAddress = response.find(address => address?.is_default)
        if (defaultAddress) {
          setAddress(defaultAddress)
          const feeShipData = {}
          data?.cartItems.map((cartItem) => {
            const height = 5
            const length = 5
            const weight = 100
            const width = 5
            const feeShip = calculateFeeShip(cartItem?.shop?.district_id, defaultAddress?.address_id, height, length, weight, width)
            feeShipData[cartItem?.shop?.shop_id] = feeShip
          })
          setFeeShipData(feeShipData)
        }

      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Container maxWidth="lg" sx={{ mb: 2 }}>
      <Grid container spacing={3} mt={2}>
        {/* Phần thông tin đơn hàng */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Breadcrumbs>
            <Link underline="hover" color="inherit" href="/" fontSize={15}> Trang chủ </Link>
            <Link underline="hover" color="inherit"> Thanh toán </Link>
          </Breadcrumbs>
          <Box sx={{ ...useStyles.flexBoxPrice, alignItems: 'center', justifyContent: 'flex-start', gap: 2 }}>
            <Chip color='error' icon={<LocalShipping sx={{ color: '#1E90FF' }} />} sx={{ mt: 2 }} variant="outlined"
              label={'Giao đến địa chỉ'} />
            <ChangeAddress addresses={addresses} setAddress={setAddress} />
          </Box>
          <Address address={address} />
          <Typography variant="h6" color={'#444444'} mt={2}>Thông tin đơn hàng</Typography>
          {Array.isArray(data?.cartItems) && data?.cartItems.map((cartItem, index) => (
            <Box key={index} mt={2} >
              <Button sx={{ gap: 2, bgcolor: 'inherit', ':hover': { bgcolor: 'inherit' } }}
                onClick={() => { navigate('/shop-page', { state: cartItem?.shop?.shop_id }) }}>
                <Storefront sx={{ fontSize: 25, color: '#4F4F4F' }} />
                <Typography variant='subtitle1' sx={{ color: '#4F4F4F' }} fontWeight={500}>{cartItem?.shop?.name}</Typography>
                <NavigateNext sx={{ fontSize: 25, color: '#4F4F4F' }} />
              </Button>
              <Divider />
              {Array.isArray(cartItem?.items) && cartItem?.items.map((product, index) => (
                <Product key={index} product={product} />
              ))}
              <Chip color='success' icon={<CheckCircleOutline sx={{ color: 'green' }} />} sx={{ mt: 2 }} variant="outlined"
                label={'Giao hàng tiêu chuẩn: ' + (10000)} />
            </Box>))}
        </Grid>

        {/* Phần tổng cộng và thanh toán */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Box sx={{ ...useStyles.flexBoxPrice, alignItems: 'center', gap: 2 }}>
            <TextField fullWidth value={code} size='small' label='Mã khuyến mãi' onChange={(e) => { setCode(e.target.value) }} />
            <Button sx={useStyles.buttonVoucher} onClick={handleClickPromotion}>Nhập</Button>
          </Box>
          <TextField sx={{ mt: 2 }} value={note} label='Ghi chú' size='small' fullWidth onChange={(e) => { setNote(e.target.value) }} />
          <Box sx={{ ...useStyles.flexBoxPrice, borderTop: '1px solid gray' }}>
            <Typography variant='h6' >Tổng tiền: </Typography>
            <Typography variant='h6' sx={{ color: 'red', fontWeight: 'bold' }}>{formatCurrency(total)}</Typography>
          </Box>
          <Box sx={useStyles.flexBoxPrice}>
            <Typography variant='subtitle1' >Tiền hàng: </Typography>
            <Typography variant='subtitle1' >{formatCurrency(totalProducts)}</Typography>
          </Box>
          <Box sx={useStyles.flexBoxPrice}>
            <Typography variant='subtitle1' >Phí vận chuyển: </Typography>
            <Typography variant='subtitle1' >{formatCurrency(feeShip)}</Typography>
          </Box>
          <Box sx={useStyles.flexBoxPrice}>
            <Typography variant='subtitle1' >Giảm giá khuyến mãi: </Typography>
            <Typography variant='subtitle1' >{formatCurrency(0)}</Typography>
          </Box>
          {voucher && <Box sx={{ ...useStyles.flexBoxPrice, borderBottom: '1px solid gray' }}>
            <Typography variant='subtitle1' >Giảm giá voucher: </Typography>
            <Typography variant='subtitle1' >{formatCurrency(voucher?.value)}</Typography>
          </Box>}
          <Typography variant='h5' sx={{ mt: 3 }}>Phương thức thanh toán</Typography>
          <Box sx={useStyles.flexBox}>
            <Radio sx={useStyles.radio} checked={checked == 0} onChange={() => setChecked(0)} />
            <Typography variant='subtitle1'>Thanh toán khi nhận hàng</Typography>
          </Box>
          <Box sx={useStyles.flexBox}>
            <Radio sx={useStyles.radio} checked={checked == 1} onChange={() => setChecked(1)} />
            <Typography variant='subtitle1' >Thanh toán bằng momo</Typography>
            <img src={imgMomo} alt='thanh toan momo' style={{ height: '30px', width: '30px' }} />
          </Box>
          <Button sx={{ ...useStyles.button, mt: 2 }} onClick={handleClickOrder}> Hoàn tất đặt hàng </Button>
        </Grid>
      </Grid>

      {loading && <Loading />}
      <ShowAlert setShowAlert={setShowAlert} showAlert={showAlert} content={'Bạn đã đặt hàng thành công!'} />
      <ShowAlert setShowAlert={setShowAlertFail} showAlert={showAlertFail} content={'Đặt hàng thất bại!'} isFail={true} />
      <ShowAlert setShowAlert={setShowAlertVoucher} showAlert={showAlertVoucher} content={'Áp mã giảm giá thành công!'} />
      <ShowAlert setShowAlert={setShowAlertVoucherFail} showAlert={showAlertVoucherFail} content={'Voucher không đúng!'} isWarning={true} />

    </Container>
  )
}

export default Checkout
