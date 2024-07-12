import { Container, Typography, Box, Link } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import emptyOrder from '../../assets/img/empty-order.png'
import cartItemV2Api from '../../apis/cartItemApiV2'
import { setCart } from '../../redux/actions/cart'
import RightInformation from './RightInformation/RightInformation'
import LeftInformation from './LeftInformation/LeftInformation'
import Banner from './Banner/Banner'

function Cart() {
  const dispatch = useDispatch()
  const keep_login = useSelector(state => state.auth.keep_login)
  const [reRender, setReRender] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [isSoldOut, setIsSoldOut] = useState(false)

  useEffect(() => {
    if (keep_login) {
      cartItemV2Api.getCartItems()
        .then(response => {
          setCartItems(response)
          dispatch(setCart(response))
          setIsSoldOut(false)
        })
    }
  }, [reRender, keep_login])
  return (
    <Box>
      <Banner />
      <Container maxWidth='lg' className="mb-8">
        <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Phần sản phẩm */}
          <Box className="col-span-2">
            {Array.isArray(cartItems) && cartItems.length <= 0 ? (
              <Box className="flex flex-col items-center">
                <img src={emptyOrder} className="object-cover h-52 w-52" />
                <Typography>Bạn chưa có sản phẩm nào trong giỏ</Typography>
                <Link href={'/genre-detail'}>
                  <Typography className="text-blue-500">
                    Cùng khám phá hàng ngàn sản phẩm tại G2Store nhé!
                  </Typography>
                </Link>
              </Box>
            ) : (
              <LeftInformation cartItems={cartItems} reRender={reRender} setReRender={setReRender} setIsSoldOut={setIsSoldOut} />
            )}
          </Box>
          {/* Phần tổng cộng và đặt hàng */}
          <RightInformation cartItems={cartItems} isSoldOut={isSoldOut} />
        </Box>
      </Container>
    </Box>
  )
}

export default Cart