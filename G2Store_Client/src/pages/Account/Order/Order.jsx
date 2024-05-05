import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Box, Button, Tab, Tabs, Divider } from '@mui/material'
import { LocalShipping, FiberManualRecord, Storefront, NavigateNext } from '@mui/icons-material'
import { formatCurrency } from '../../../utils/price'
import emptyOrder from '../../../assets/img/empty-order.png'
import orderApi from '../../../apis/orderApi'
import OrderItem from './OrderItem/OrderItem'
import DeleteOrder from './DeleteOrder/DeleteOrder'
import GoodsReceived from './GoodsReceived/GoodsReceived'

function Order() {
  const [rerender, setRerender] = useState(false)
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState('UN_PAID')

  const handleChange = (event, newTab) => {
    setTab(newTab)
    orderApi.getOrders(newTab, 0, 16)
      .then((response) => {
        setOrders(response?.content)
      })
  }
  useEffect(() => {
    orderApi.getOrders(tab, 0, 16)
      .then((response) => { setOrders(response?.content) })
  }, [])
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' color={'#444444'} sx={{ fontWeight: 'bold', minWidth: '100px' }}>Đơn hàng của tôi</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', flexGrow: 1, display: 'flex' }}>
          <Tabs value={tab} onChange={handleChange} textColor="primary" variant="scrollable" >
            <Tab label='Chưa thanh toán' value={'UN_PAID'} />
            <Tab label='Đã đặt hàng' value={'ORDERED'} />
            <Tab label='Đã xác nhận' value={'CONFIRMED'} />
            <Tab label='Đã đóng gói' value={'PACKED'} />
            <Tab label='Đang giao' value={'DELIVERING'} />
            <Tab label='Đã giao' value={'DELIVERED'} />
            <Tab label='Đã nhận' value={'RECEIVED'} />
            <Tab label='Đã hủy' value={'CANCELED'} />
            <Tab label='Chờ hoàn tiền' value={'REFUNDING'} />
            <Tab label='Đã hoàn tiền' value={'REFUNDED'} />
          </Tabs>
        </Box>
        <Box>
          {Array.isArray(orders) && orders.map((order, index) =>
            <Box key={index}>
              <Box sx={useStyles.flexBox}>
                <Box sx={useStyles.flexBox}>
                  <FiberManualRecord sx={{
                    fontSize: 15, color: order?.order_status == 'SUCCESS' ? 'green' :
                      order?.order_status == 'ON_DELIVERY' ? 'orange' :
                        order?.order_status == 'CONFIRMED' ? 'gold' : order?.order_status == 'PENDING' ? 'blue' : '#cd3333'
                  }} />
                  <Typography variant='subtitle1' color={'#444444'} sx={{ fontWeight: 'bold', minWidth: '100px' }}>Đơn hàng</Typography>
                  <Typography variant='subtitle2' color={'#444444'}>#{order?.order_id}</Typography>
                </Box>
                <Box sx={useStyles.flexBox}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <LocalShipping sx={{ color: '#444444' }} />
                    <Typography variant='subtitle1' color={'#444444'} sx={{ fontWeight: 'bold', minWidth: '100px' }}>Giao hàng tận nơi</Typography>
                  </Box>
                </Box>
              </Box>
              <Button sx={{ gap: 2, bgcolor: 'inherit', ':hover': { bgcolor: 'inherit' } }}
                onClick={() => { navigate('/shop-page', { state: order?.shop_id }) }}>
                <Storefront sx={{ fontSize: 25, color: '#444444' }} />
                <Typography variant='subtitle1' fontWeight={'bold'} sx={{ color: '#444444' }}>{order?.shop_name}</Typography>
                <NavigateNext sx={{ fontSize: 25, color: '#444444' }} />
              </Button>
              {order?.items.map((orderItem, index) =>
                <OrderItem key={index} orderItem={orderItem} order_status={order?.order_status} />)}
              <Box sx={useStyles.flexBox}>
                {order?.order_status == 'ORDERED' || order?.order_status == 'CONFIRMED' ?
                  <DeleteOrder orderId={order?.id} /> : <Typography variant='subtitle1' color={'#444444'}></Typography>}
                {order?.order_status == 'ON_DELIVERY' && <GoodsReceived orderId={order?.id} />}
                <Box sx={{ display: 'flex', alignItems: 'end', gap: 1 }}>
                  <Typography color={'#444444'} variant='subtitle1' >Tổng cộng ({order?.items.length}) sản phẩm:</Typography>
                  <Typography color={'#cd3333'} variant='h6' fontWeight={'bold'}>{formatCurrency(order.total)}</Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />
            </Box>)}
          {orders.length < 1 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <img src={emptyOrder} />
            <Typography color={'#444444'} variant='subtitle2' >Bạn chưa có đơn hàng nào</Typography>
            <Typography color={'#444444'} variant='h6' >Cùng khám phá hàng ngàn sản phẩm tại G2Store nhé!</Typography>
            <Button variant='contained' color='warning'
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

const useStyles = {
  flexBox: {
    display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between', flexWrap: 'wrap'
  }
}