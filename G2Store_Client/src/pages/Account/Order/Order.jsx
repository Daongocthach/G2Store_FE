import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Typography, Box, Button, Grid, Tab, Tabs } from '@mui/material'
import { LocalShipping, FiberManualRecord } from '@mui/icons-material'
import { formatCurrency } from '../../../utils/price'
import emptyOrder from '../../../assets/img/empty-order.png'
import orderApi from '../../../apis/orderApi'
import OrderItem from './OrderItem/OrderItem'
import DeleteOrder from './DeleteOrder/DeleteOrder'
import { sortByMaxId } from '../../../utils/price'
import GoodsReceived from './GoodsReceived/GoodsReceived'

const useStyles = {
  flexBox: {
    display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between'
  }
}
function Order() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const user = useSelector(state => state.auth)
  const customerId = user.id
  const [tab, setTab] = useState(1)

  const handleAllOrders = () => {
    orderApi.getOrderByCustomerId(customerId)
      .then((response) => { setOrders(sortByMaxId(response.data)) })
  }
  const handlePending = () => {
    orderApi.getOrderByCustomerIdPending(customerId)
      .then((response) => { setOrders(sortByMaxId(response.data)) })
  }
  const handleConfirmed = () => {
    orderApi.getOrderByCustomerIdConfirmed(customerId)
      .then((response) => { setOrders(sortByMaxId(response.data)) })
  }
  const handleOnDelivery = () => {
    orderApi.getOrderByCustomerIdOnDelivery(customerId)
      .then((response) => { setOrders(sortByMaxId(response.data)) })
  }
  const handleCancel = () => {
    orderApi.getOrderByCustomerIdCancel(customerId)
      .then((response) => { setOrders(sortByMaxId(response.data)) })
  }
  const handleSuccess = () => {
    orderApi.getOrderByCustomerIdSuccess(customerId)
      .then((response) => { setOrders(sortByMaxId(response.data)) })
  }
  const handleChange = (event, newTab) => {
    setTab(newTab)

  }
  useEffect(() => {
    orderApi.getOrderByCustomerIdPending(customerId)
      .then((response) => { setOrders(sortByMaxId(response.data)) })
  }, [customerId])
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold', minWidth: '100px' }}>Đơn hàng của tôi</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange} >
            <Tab label='Đã đặt hàng' value={1} onClick={handlePending} />
            <Tab label='Đã xác nhận' value={2} onClick={handleConfirmed} />
            <Tab label='Đang giao' value={3} onClick={handleOnDelivery} />
            <Tab label='Hoàn tất' value={4} onClick={handleSuccess} />
            <Tab label='Đã hủy' value={5} onClick={handleCancel} />
            <Tab label='Tất cả' value={6} onClick={handleAllOrders} />
          </Tabs>
        </Box>
        <Box>
          {Array.isArray(orders) && orders.map((order, index) =>
            <Box key={index}>
              <Box sx={useStyles.flexBox}>
                <Box sx={useStyles.flexBox}>
                  <Typography variant='h7' sx={{ fontWeight: 'bold', minWidth: '100px' }}>Đơn hàng</Typography>
                  <Typography variant='h8'>{order?.id}</Typography>
                </Box>
                <Box sx={useStyles.flexBox}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <LocalShipping />
                    <Typography variant='h7' sx={{ fontWeight: 'bold', minWidth: '100px' }}>Giao hàng tận nơi</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}
                    color={order?.orderStatus == 'SUCCESS' ? 'green' :
                      order?.orderStatus == 'ON_DELIVERY' ? 'orange' :
                        order?.orderStatus == 'CONFIRMED' ? 'gold' : order?.orderStatus == 'PENDING' ? 'blue' : 'red'}>
                    <FiberManualRecord />
                    <Typography variant='body1'>{order?.orderStatus}</Typography>
                  </Box>
                </Box>
              </Box>
              {order?.orderItems.map((orderItem, index) =>
                <OrderItem key={index} customerId={customerId} orderItem={orderItem} orderStatus={order?.orderStatus}/>)}
              <Box sx={useStyles.flexBox}>
                {order?.orderStatus == 'CONFIRMED' || order?.orderStatus == 'PENDING' ?
                  <DeleteOrder handleAllOrders={handleAllOrders} orderId={order?.id} /> : <Typography variant='h6' color={'gray'}>Hủy đơn hàng</Typography>}
                {order?.orderStatus == 'ON_DELIVERY' && <GoodsReceived orderId={order?.id} />}
                <Typography variant='h6'>Thành tiền: {formatCurrency(order.total)}</Typography>
              </Box>
            </Box>)}
          {orders.length < 1 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <img src={emptyOrder} />
            <Typography variant='h7' >Bạn chưa có đơn hàng nào</Typography>
            <Typography variant='h6' >Cùng khám phá hàng ngàn sản phẩm tại G2Store nhé!</Typography>
            <Button
              sx={{ bgcolor: '#CD3333', borderRadius: 10, color: 'white', fontWeight: 'bold', ':hover': { bgcolor: 'red' } }}
              onClick={() => navigate('/genre-detail')}>
              Khám phá ngay
            </Button>
          </Box>}
        </Box>
      </Box>
    </Box >
  )
}

export default Order