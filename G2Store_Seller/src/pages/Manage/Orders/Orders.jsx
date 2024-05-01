import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Box, Button, Tab, Tabs, Divider, Breadcrumbs, Link } from '@mui/material'
import { LocalShipping, FiberManualRecord, Storefront, NavigateNext } from '@mui/icons-material'
import { formatCurrency } from '../../../utils/price'
import emptyOrder from '../../../assets/img/empty-order.png'
import orderApi from '../../../apis/orderApi'
import OrderItem from './OrderItem/OrderItem'
import DeleteOrder from './DeleteOrder/DeleteOrder'
import { sortByMaxId } from '../../../utils/price'
import ShowAlert from '../../../components/ShowAlert/ShowAlert'

function Orders() {
  const [rerender, setRerender] = useState(false)
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)

  const handleAllOrders = () => {
    orderApi.getOrders()
      .then((response) => { setOrders(sortByMaxId(response)) })
  }
  const handlePending = () => {
    orderApi.getOrders()
      .then((response) => { setOrders(sortByMaxId(response)) })
  }
  const handleConfirmed = () => {
    setOrders([])

  }
  const handleOnDelivery = () => {
    setOrders([])

  }
  const handleCancel = () => {
    setOrders([])

  }
  const handleSuccess = () => {
    setOrders([])

  }
  const handleChange = (event, newTab) => {
    setTab(newTab)

  }
  useEffect(() => {
    // orderApi.getOrders()
    //   .then((response) => { setOrders(response) })
  }, [])
  return (
    <Box sx={{ m: 5, minHeight: '100vh' }}>
      <Breadcrumbs sx={{ m: 2 }}>
        <Link underline="hover" color="inherit" href="/dashboard">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/manage/orders">
          Quản lý đơn hàng
        </Link>
      </Breadcrumbs>
      <Typography variant='h5' sx={{ fontWeight: 'bold', minWidth: '100px', m: 2 }}>Quản lý đơn hàng</Typography>
      <Divider />
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
                  <Typography variant='subtitle1' color={'#444444'} sx={{ fontWeight: 'bold', minWidth: '100px' }}>Đơn hàng</Typography>
                  <Typography variant='subtitle2' color={'#444444'}>#{order?.order_id}</Typography>
                </Box>
                <Box sx={useStyles.flexBox}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <LocalShipping />
                    <Typography variant='subtitle1' color={'#444444'} sx={{ fontWeight: 'bold', minWidth: '100px' }}>Giao hàng tận nơi</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                    color={order?.order_status == 'SUCCESS' ? 'green' :
                      order?.order_status == 'ON_DELIVERY' ? 'orange' :
                        order?.order_status == 'CONFIRMED' ? 'gold' : order?.order_status == 'PENDING' ? 'blue' : '#cd3333'}>
                    <FiberManualRecord sx={{ fontSize: 15 }} />
                    <Typography variant='body2'>{order?.order_status}</Typography>
                  </Box>
                </Box>
              </Box>
              <Button sx={{ gap: 2, bgcolor: 'inherit', ':hover': { bgcolor: 'inherit' } }}
                onClick={() => { navigate('/shop-page', { state: order?.shop_id }) }}>
                <Storefront sx={{ fontSize: 25, color: '#1E90FF' }} />
                <Typography variant='subtitle1' fontWeight={'bold'} sx={{ color: '#1E90FF' }}>{order?.shop_name}</Typography>
                <NavigateNext sx={{ fontSize: 25, color: '#1E90FF' }} />
              </Button>
              {order?.items.map((orderItem, index) =>
                <OrderItem key={index} orderItem={orderItem} order_status={order?.order_status} />)}
              <Box sx={useStyles.flexBox}>
                {order?.order_status == 'ORDERED' || order?.order_status == 'CONFIRMED' ?
                  <DeleteOrder handleAllOrders={handleAllOrders} orderId={order?.id} /> : <Typography variant='h6' color={'gray'}>Hủy đơn hàng</Typography>}
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
          </Box>}
        </Box>
      </Box>
      <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Xuất file thành công'} />
      <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Xuất file thất bại'} isFail={true} />
    </Box>
  )
}

export default Orders

const useStyles = {
  flexBox: {
    display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between'
  }
}