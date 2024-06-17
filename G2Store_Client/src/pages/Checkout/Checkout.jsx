import { Container, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import cartItemV2Api from '../../apis/cartItemApiV2'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import RightInformation from './RightInformation/RightInformation'
import LeftInformation from './LeftInformation/LeftInformation'

function Checkout() {
  const keep_login = useSelector(state => state.auth.keep_login)
  const [address, setAddress] = useState()
  const [feeShips, setFeeShips] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [reRender, setReRender] = useState([])

  useEffect(() => {
    if (keep_login) {
      cartItemV2Api.getCartItems()
        .then(response => {
          setCartItems(response)
        })
    }
  }, [keep_login, reRender])
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <BreadCrumbs links={[{ name: 'Thanh toán', href: '' }]} />
      <Grid container spacing={3}>
        {/* Phần thông tin đơn hàng */}
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <LeftInformation address={address} setAddress={setAddress} cartItems={cartItems} feeShips={feeShips}
            reRender={reRender} setRerender={setReRender} />
        </Grid>
        {/* Phần tổng cộng và thanh toán */}
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <RightInformation address={address} cartItems={cartItems} feeShips={feeShips} setFeeShips={setFeeShips} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Checkout
