import { Container, Grid, Typography, Button, Box, Radio, TextField, Breadcrumbs, Link, Chip, Divider, Switch } from '@mui/material'
import { useEffect, useState } from 'react'
import { Storefront, NavigateNext, CheckCircleOutline, LocalShipping } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { formatCurrency } from '../../utils/price'
import ProductComponent from '../../components/Product/ProductComponent'
import orderApi from '../../apis/orderApi'
import useStyles from './useStyles'
import ghnApi from '../../apis/ghnApi'
import addressApi from '../../apis/addressApi'
import ShowAlert from '../../components/ShowAlert/ShowAlert'
import Loading from '../../components/Loading/Loading'
import Address from '../../components/Address/Address'
import { deleteAllCart } from '../../redux/actions/cart'
import imgVNPAY from '../../assets/img/vnpay.png'
import ChangeAddress from './ChangeAddress/ChangeAddress'
import UpdateAddress from '../Account/EditAddress/FormAddress/UpdateAddress'

function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const point = useSelector(state => state.auth.point)
  const location1 = useLocation()
  const data = location1.state
  const [reRender, setReRender] = useState(false)
  const [paymentType, setPaymentType] = useState('COD')
  const [code, setCode] = useState('')
  const [voucher, setVoucher] = useState()
  const [feeShip, setFeeShip] = useState(0)
  const [feeShipData, setFeeShipData] = useState({})
  const [addresses, setAddresses] = useState([])
  const [address, setAddress] = useState()
  const [is_point_spent, setIsPointSpent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertWarning, setShowAlertWaring] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const [showAlertVoucher, setShowAlertVoucher] = useState(false)
  const [showAlertVoucherFail, setShowAlertVoucherFail] = useState(false)
  var totalProducts = data?.total
  var total = totalProducts + feeShip - (is_point_spent ? point : 0)

  const convertDataToOrderFormat = (data) => {
    const address_id = address?.address_id
    const payment_type = paymentType
    const is_point_spent = false
    const orders = data.map(order => {
      return {
        items: order?.shop_items.map(item => {
          return {
            name: item?.name,
            price: item?.price,
            quantity: item?.quantity,
            product_id: item?.product_id,
            // customer_id: item.customer_id,
            // shop_id: item.shop_id,
            // sub_total: item.sub_total
          }
        }),
        shop_id: order?.shop?.shop_id,
        fee_ship: feeShipData[order?.shop?.shop_id]
      }
    })
    return { orders, address_id, payment_type, is_point_spent }
  }
  async function handleClickOrder() {
    if (address) {
      setLoading(true)
      const order = convertDataToOrderFormat(data?.cart)
      orderApi.addOrder(order)
        .then((response) => {
          setShowAlert(true)
          dispatch(deleteAllCart())
          if (paymentType === 'COD')
            navigate('/thanks')
          else if (response?.payment_url) {
            location.assign(response?.payment_url)
          }
          else {
            navigate('/order-fail')
          }
        })
        .catch(() => {
          setShowAlertFail(true)
          navigate('/order-fail')
        })
        .finally(() => setLoading(false))
    } else {
      setShowAlertWaring(true)
    }

  }
  const getFeeShip = async (address) => {
    const feeShipData = {}
    let totalFeeShip = 0
    await Promise.all(data?.cart.map(async (cartItem) => {
      const height = 5
      const length = 5
      const weight = 100
      const width = 5
      const response = await ghnApi.getMethodShip(cartItem?.shop?.district_id, address?.district_id)
      const data = await ghnApi.calculateFeeShip(response?.data?.data[0]?.service_id, cartItem?.shop?.district_id, address?.district_id, height, length, weight, width)
      feeShipData[cartItem?.shop?.shop_id] = data?.data?.data?.total
      totalFeeShip += data?.data?.data?.total
    }))
    setFeeShipData(feeShipData)
    setFeeShip(totalFeeShip)
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const addressesResponse = await addressApi.getAddresses()
        setAddresses(addressesResponse)
        if (!address) {
          const defaultAddress = addressesResponse.find(address => address?.is_default)
          if (defaultAddress) {
            setAddress(defaultAddress)
            getFeeShip(defaultAddress)
          }
          else {
            setAddress(addressesResponse[0])
            getFeeShip(addressesResponse[0])
          }
        }
        else {
          {/**Update address && change Address */ }
          getFeeShip(address)
          const addressUpdated = addressesResponse.find(addressResponse => addressResponse?.address_id == address?.address_id)
          if (addressUpdated)
            setAddress(addressUpdated)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [reRender])
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
            <ChangeAddress addresses={addresses} setAddress={setAddress} reRender={reRender} setReRender={setReRender} />
          </Box>
          <Box sx={{ ...useStyles.flexBoxPrice, alignItems: 'center', justifyContent: 'flex-start', gap: 2 }}>
            <Address address={address} />
            <UpdateAddress address={address} rerender={reRender} setRerender={setReRender} isCheckout={true} />
          </Box>
          <Typography variant="h6" color={'#444444'} mt={2}>Thông tin đơn hàng</Typography>
          {Array.isArray(data?.cart) && data?.cart.map((cartItem, index) => (
            <Box key={index} mt={2} >
              <Button sx={{ gap: 2, bgcolor: 'inherit', ':hover': { bgcolor: 'inherit' } }}
                onClick={() => { navigate('/shop-page', { state: cartItem?.shop_id }) }}>
                <Storefront sx={{ fontSize: 25, color: '#444444' }} />
                <Typography variant='subtitle1' fontWeight={'bold'} sx={{ color: '#444444' }}>{cartItem?.shop_name}</Typography>
                <NavigateNext sx={{ fontSize: 25, color: '#444444' }} />
              </Button>
              <Divider />
              <Box sx={{ pl: 5 }}>
                {Array.isArray(cartItem?.shop_items) && cartItem?.shop_items.map((product, index) => (
                  <ProductComponent key={index} product={product} isCheckout={true} reRender={reRender} setReRender={setReRender} />
                ))}
                <Chip color='success' icon={<CheckCircleOutline sx={{ color: 'green' }} />} sx={{ mt: 2 }} variant="outlined"
                  label={'Phí vận chuyển: ' + formatCurrency(feeShipData[cartItem?.shop_id] ? feeShipData[cartItem?.shop_id] : 0)} />
              </Box>
            </Box>))}
        </Grid>
        {/* Phần tổng cộng và thanh toán */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          {/* <Box sx={{ ...useStyles.flexBoxPrice, alignItems: 'center', gap: 2 }}>
            <TextField fullWidth value={code} size='small' label='Mã khuyến mãi' onChange={(e) => { setCode(e.target.value) }} />
            <Button sx={useStyles.buttonVoucher} onClick={handleClickPromotion}>Nhập</Button>
          </Box> */}
          {/* <Divider sx={{ mt: 2 }} /> */}
          <Box sx={{ ...useStyles.flexBoxPrice }}>
            <Typography variant='h6' sx={{ color: '#4F4F4F' }}>Tổng tiền: </Typography>
            <Typography variant='h6' sx={{ color: '#cb1c22', fontWeight: 'bold' }}>{formatCurrency(total)}</Typography>
          </Box>
          <Box sx={useStyles.flexBoxPrice}>
            <Typography variant='subtitle1' sx={{ color: '#4F4F4F' }}>Tiền hàng: </Typography>
            <Typography variant='subtitle2' sx={{ color: '#cb1c22' }}>{formatCurrency(totalProducts)}</Typography>
          </Box>
          <Box sx={useStyles.flexBoxPrice}>
            <Typography variant='subtitle1' sx={{ color: '#4F4F4F' }}>Phí vận chuyển: </Typography>
            <Typography variant='subtitle2' sx={{ color: '#6ca46f' }}>{formatCurrency(feeShip)}</Typography>
          </Box>
          <Box sx={useStyles.flexBoxPrice}>
            <Typography variant='subtitle1' sx={{ color: '#4F4F4F' }}>Giảm giá khuyến mãi: </Typography>
            <Typography variant='subtitle2' sx={{ color: '#4F4F4F' }}>{formatCurrency(0)}</Typography>
          </Box>
          <Box sx={useStyles.flexBoxPrice}>
            <Typography variant='subtitle1' sx={{ color: '#4F4F4F' }}>Giảm giá voucher: </Typography>
            <Typography variant='subtitle2' sx={{ color: '#4F4F4F' }}>{formatCurrency(voucher?.value || 0)}</Typography>
          </Box>
          <Box sx={{ ...useStyles.flexBoxPrice, borderBottom: '1px solid gray' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='subtitle1' sx={{ color: '#4F4F4F' }}>Sử dụng điểm tích lũy (-{formatCurrency(point || 0)})</Typography>
              <Switch checked={is_point_spent} onChange={() => setIsPointSpent(!is_point_spent)} color="error" />
            </Box>
            <Typography variant='subtitle2' sx={{ color: '#4F4F4F' }}>-{formatCurrency(is_point_spent ? (point || 0) : 0)}</Typography>
          </Box>
          <Typography variant='h6' sx={{ mt: 3, color: '#4F4F4F' }}>Phương thức thanh toán</Typography>
          <Box sx={useStyles.flexBox}>
            <Radio sx={useStyles.radio} checked={paymentType == 'COD'} onChange={() => setPaymentType('COD')} />
            <Typography sx={{ color: '#4F4F4F' }} variant='subtitle1'>Thanh toán khi nhận hàng</Typography>
          </Box>
          <Box sx={useStyles.flexBox}>
            <Radio sx={useStyles.radio} checked={paymentType == 'VNPAY'} onChange={() => setPaymentType('VNPAY')} />
            <Typography variant='subtitle1' sx={{ color: '#4F4F4F' }}>Thanh toán qua VNPAY</Typography>
            <img src={imgVNPAY} alt='thanh toan Vnpay' style={{ height: 50, width: 70 }} />
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Button size='large' fullWidth color='error' variant='contained' sx={{ fontWeight: 'bold' }} onClick={handleClickOrder}> Đặt hàng </Button>
        </Grid>
      </Grid>

      {loading && <Loading />}
      <ShowAlert setShowAlert={setShowAlert} showAlert={showAlert} content={'Bạn đã đặt hàng thành công!'} />
      <ShowAlert setShowAlert={setShowAlertFail} showAlert={showAlertFail} content={'Đặt hàng thất bại!'} isFail={true} />
      <ShowAlert setShowAlert={setShowAlertVoucher} showAlert={showAlertVoucher} content={'Áp mã giảm giá thành công!'} />
      <ShowAlert setShowAlert={setShowAlertVoucherFail} showAlert={showAlertVoucherFail} content={'Voucher không đúng!'} isWarning={true} />
      <ShowAlert setShowAlert={setShowAlertWaring} showAlert={showAlertWarning} content={'Vui lòng nhập địa chỉ!'} isWarning={true} />

    </Container>
  )
}

export default Checkout
