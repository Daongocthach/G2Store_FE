import { Container, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import cartItemV2Api from '../../apis/cartItemApiV2'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import RightInformation from './RightInformation/RightInformation'
import LeftInformation from './LeftInformation/LeftInformation'

function Checkout() {
  const keep_login = useSelector(state => state.auth.keep_login)
  const [totalFeeShip, setTotalFeeShip] = useState(0)
  const [paymentType, setPaymentType] = useState('COD')
  const [cartItems, setCartItems] = useState([])
  useEffect(() => {
    if (keep_login) {
      cartItemV2Api.getCartItems()
        .then(response => {
          setCartItems(response)
        })
    }
  }, [keep_login])
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <BreadCrumbs links={[{ name: 'Thanh toán', href: '' }]} />
      <Grid container spacing={3}>
        {/* Phần thông tin đơn hàng */}
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <LeftInformation cartItems={cartItems} paymentType={paymentType} totalFeeShip={totalFeeShip} setTotalFeeShip={setTotalFeeShip} />
        </Grid>
        {/* Phần tổng cộng và thanh toán */}
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <RightInformation cartItems={cartItems} paymentType={paymentType} setPaymentType={setPaymentType} totalFeeShip={totalFeeShip} setTotalFeeShip={setTotalFeeShip} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Checkout
