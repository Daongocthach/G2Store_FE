import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Tab, Tabs, Tooltip } from '@mui/material'
import { Print } from '@mui/icons-material'
import { format } from 'date-fns'
import { formatCurrency } from '../../../utils/price'
import orderApi from '../../../apis/orderApi'
import ViewOrder from './FormOrder/ViewOrder'
import OrderItem from './OrderItem/OrderItem'
import Search from '../../../components/Search/Search'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'
import ghnApiV2 from '../../../apis/ghnApiV2'
import PaginationFooter from '../../../components/PaginationFooter/PaginationFooter'
import TrackingOrder from './FormOrder/TrackingOrder'
import ViewRefundImages from './FormOrder/ViewRefundImages'
import CancelOrder from './FormOrder/CancelOrder'
import NextOrder from './FormOrder/NextOrder'

function Orders() {
  const triggerAlert = useAlert()
  const navigate = useNavigate()
  const [reRender, setRerender] = useState(false)
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState('UN_PAID')
  const [page, setPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const handleChange = (event, newTab) => {
    setTab(newTab)
    orderApi.getShopOrders(newTab, 0, 8)
      .then((response) => {
        setOrders(response?.content)
        setTotalElements(response?.totalElements)
      })
  }
  const handlePrint = (orderCode) => {
    ghnApiV2.printOrder(orderCode)
      .then((response) => {
        location.assign(response)
        triggerAlert('In đơn thành công!', false, false)
      })
      .catch((err) => {
        console.log(err)
        triggerAlert('In đơn thất bại!', true, false)

      })
  }
  const fetchData = () => {
    orderApi.getShopOrders(tab, 0, 16)
      .then((response) => { setOrders(response?.content) })
      .catch((error) => {
        if (error?.response?.data?.message == 'Access Denied') {
          navigate('/seller/access-denied')
        }
        console.log(error)
      })
  }
  useEffect(() => {
    fetchData()
  }, [reRender])
  return (
    <Box className='m-5 min-h-screen'>
      <BreadCrumbs links={[{ name: 'Quản lý đơn hàng', href: '' }]} />
      <Box className='flex flex-row items-center justify-between w-full mt-2' >
        <Search setDatas={setOrders} setTab={setTab} isOrder={true} />
      </Box>
      <Box className='mb-2'>
        <Box className='mb-3'>
          <Tabs value={tab} onChange={handleChange} textColor="primary" variant="scrollable" >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab?.label} value={tab?.value} />
            ))}
          </Tabs>
        </Box>
        <Box className='h-fit bg-white' sx={{ boxShadow: '0px 0px 10px  ' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#2a99ff' }} >
                  <TableCell sx={{ fontWeight: 'bold', color: 'white', width: 300 }} >Sản phẩm</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Mã đơn hàng</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Ngày đặt</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Tổng tiền</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Thanh toán</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(orders) && orders?.map((order, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell><Box>{order?.items.map((orderItem, index) => <OrderItem key={index} orderItem={orderItem} />)}</Box></TableCell>
                      <TableCell><Typography variant='body2'>#{order?.order_id}</Typography></TableCell>
                      <TableCell><Typography variant='body2'>{format(new Date(order?.created_date), 'dd/MM/yyyy HH:mm:ss')}</Typography></TableCell>
                      <TableCell ><Typography variant='body2'>{formatCurrency(order?.grand_total)}</Typography></TableCell>
                      <TableCell sx={{ color: '#1C86EE', fontWeight: 'bold' }}>{order?.payment_type}</TableCell>
                      <TableCell >
                        <Box className='flex flex-row items-center gap-2'>
                          <ViewOrder order={order} />
                          <Tooltip title='In đơn giao hàng nhanh'>
                            <Print className='text-gray-700 cursor-pointer' sx={{ display: tab === 'PACKED' ? 'inherit' : 'none' }}
                              onClick={() => handlePrint(order?.ghn_order_code)} />
                          </Tooltip>
                          {(tab === 'PACKED' || tab === 'DELIVERING') && <TrackingOrder order={order} />}
                          {(tab === 'REFUNDING' || tab === 'REFUNDED') && <ViewRefundImages images={order?.refund_images} content={order?.refund_reason}/>}
                          {(tab === 'CONFIRMED' || tab === 'ORDERED' || tab === 'PACKED' || tab === 'DELIVERING') &&
                            <Box className='flex flex-row items-center gap-2'>
                              <NextOrder order={order} reRender={reRender} setReRender={setRerender} />
                              <CancelOrder orderId={order?.order_id} reRender={reRender} setReRender={setRerender} />
                            </Box>}
                        </Box>
                      </TableCell>
                    </TableRow>)
                })}
              </TableBody>
              <PaginationFooter isNotEmpty={(Array.isArray(orders) && orders.length > 0)} content={'Bạn chưa có đơn hàng nào!'}
                totalElements={totalElements} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage} />
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  )
}

export default Orders

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