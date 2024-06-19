import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Box, Button, Tab, Tabs, Divider } from '@mui/material'
import { LocalShipping, FiberManualRecord } from '@mui/icons-material'
import { format } from 'date-fns'
import { formatCurrency } from '../../../utils/price'
import emptyOrder from '../../../assets/img/empty-order.png'
import orderApi from '../../../apis/orderApi'
import OrderItem from './OrderItem/OrderItem'
import GoodsReceived from './FormOrder/GoodsReceived'
import Loading from '../../../components/Loading/Loading'
import DeleteOrder from './FormOrder/DeleteOrder'
import GoToShop from '../../../components/GoToShop/GoToShop'
import ViewOrder from './FormOrder/ViewOrder'

function Order() {
  const [reRender, setReRender] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState('ORDERED')

  const handleChange = (event, newTab) => {
    setTab(newTab)
    orderApi.getOrders(newTab, 0, 16)
      .then((response) => {
        setOrders(response?.content)
      })
  }
  const handlePayment = (order_id) => {
    setLoading(true)
    orderApi.payUnPaidOrder(order_id)
      .then((response) => {
        if (response?.payment_url) { location.assign(response?.payment_url) }
        else { navigate('/payment-fail') }
      })
      .catch((error) => {
        console.log(error)
        navigate('/payment-fail')
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    orderApi.getOrders(tab, 0, 16)
      .then((response) => { setOrders(response?.content) })
  }, [reRender])
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' className='text-gray-600' sx={{ fontWeight: 'bold', minWidth: '100px' }}>Đơn hàng của tôi</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', flexGrow: 1, display: 'flex' }}>
          <Tabs value={tab} onChange={handleChange} textColor="primary" variant="scrollable" >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab?.label} value={tab?.value} />
            ))}
          </Tabs>
        </Box>
        <Box>
          {Array.isArray(orders) && orders.map((order, index) =>
            <Box key={index}>
              <Box className='flex flex-row items-center gap-2 mt-1 mb-1 justify-between flex-wrap'>
                <Box className='flex flex-row items-center gap-2 mt-1 mb-1 justify-between flex-wrap'>
                  <FiberManualRecord sx={{
                    fontSize: 15, color: order?.order_status == 'SUCCESS' ? 'green' :
                      order?.order_status == 'ON_DELIVERY' ? 'orange' :
                        order?.order_status == 'CONFIRMED' ? 'gold' : order?.order_status == 'PENDING' ? 'blue' : '#cd3333'
                  }} />
                  <Typography className='text-gray-600' variant='subtitle1' sx={{ fontWeight: 'bold' }}>Đơn hàng</Typography>
                  <Typography variant='subtitle2' className='text-gray-600'>{format(order?.created_date, 'dd/MM/yyyy HH:mm:ss')}</Typography>
                  <Typography variant='subtitle2' className='text-gray-600'>#{order?.order_id}</Typography>
                </Box>
                <LocalShipping className='text-gray-600' />
              </Box>
              <GoToShop shop_id={order?.shop_id} shop_name={order?.shop_name} shop_image={order?.shop?.image} />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Box>
                  {order?.items.map((orderItem, index) =>
                    <OrderItem key={index} orderItem={orderItem} orderStatus={order?.order_status}
                      reRender={reRender} setReRender={setReRender} />)}
                </Box>
              </Box>
              <Box>
                <Typography variant='subtitle2' color={'#2e7d32'} >Phí vận chuyển: {formatCurrency(order?.fee_ship)}</Typography>
                <Typography variant='subtitle2' className='text-gray-600'>Thanh toán: {order?.payment_type}</Typography>
              </Box>
              <Box className='flex flex-row items-center gap-2 mt-1 mb-1 justify-between flex-wrap'>
                <Box sx={{ display: 'flex', alignItems: 'end', gap: 1 }}>
                  <ViewOrder order={order} />
                  {(order?.order_status === 'ORDERED') && <DeleteOrder orderId={order?.order_id} reRender={reRender} setReRender={setReRender} />}
                  {order?.order_status === 'UN_PAID' && <Button variant='contained' color='info' size='small' sx={{ borderRadius: 2 }}
                    onClick={() => handlePayment(order?.order_id)} >Thanh toán</Button>}
                  {order?.order_status === 'DELIVERED' && <GoodsReceived orderId={order?.order_id} setReRender={setReRender} rerender={reRender} />}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'end', gap: 1 }}>
                  <Typography className='text-gray-600' sx={{ fontSize: 17 }} >Tổng cộng ({order?.items.length}) sản phẩm:</Typography>
                  <Typography color={'#cd3333'} sx={{ fontSize: 17, fontWeight: 'bold' }}>{formatCurrency(order?.grand_total)}</Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />
            </Box>)}
          {orders.length < 1 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <img src={emptyOrder} />
            <Typography className='text-gray-600' variant='subtitle2' >Bạn chưa có đơn hàng nào</Typography>
            <Typography className='text-gray-600' variant='subtitle1' >Cùng khám phá hàng ngàn sản phẩm tại G2Store nhé!</Typography>
            <Button variant='contained' color='warning'
              onClick={() => navigate('/genre-detail')}>
              Khám phá ngay
            </Button>
          </Box>}
        </Box>
      </Box>
      {loading && <Loading />}
    </Box >
  )
}

export default Order
const tabs = [
  { label: 'Tất cả', value: '' },
  { label: 'Chưa thanh toán', value: 'UN_PAID' },
  { label: 'Đã đặt hàng', value: 'ORDERED' },
  { label: 'Đã xác nhận', value: 'CONFIRMED' },
  { label: 'Đã đóng gói', value: 'PACKED' },
  { label: 'Đang giao', value: 'DELIVERING' },
  { label: 'Đã giao', value: 'DELIVERED' },
  { label: 'Đã nhận', value: 'RECEIVED' },
  { label: 'Đã hủy', value: 'CANCELED' },
  { label: 'Chờ hoàn tiền', value: 'REFUNDING' },
  { label: 'Đã hoàn tiền', value: 'REFUNDED' }
]