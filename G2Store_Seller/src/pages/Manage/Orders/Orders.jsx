import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter,
  TablePagination, Paper, TableContainer, Tab, Tabs, Tooltip
} from '@mui/material'
import { Chat, Print } from '@mui/icons-material'
import { format } from 'date-fns'
import { formatCurrency } from '../../../utils/price'
import emptyOrder from '../../../assets/img/empty-order.png'
import orderApi from '../../../apis/orderApi'
import ViewOrder from './FormOrder/ViewOrder'
import UpdateOrder from './FormOrder/UpdateOrder'
import OrderItem from './OrderItem/OrderItem'
import SearchById from '../../../components/Search/Search'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'
import ghnApiV2 from '../../../apis/ghnApiV2'
import PaginationFooter from '../../../components/PaginationFooter/PaginationFooter'

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
  useEffect(() => {
    orderApi.getShopOrders(tab, 0, 16)
      .then((response) => { setOrders(response?.content) })
      .catch((error) => {
        if (error?.response?.data?.message == 'Access Denied') {
          navigate('/seller/access-denied')
        }
        console.log(error)
      })
  }, [reRender])
  return (
    <Box className='m-5 min-h-screen'>
      <BreadCrumbs links={[{ name: 'Quản lý đơn hàng', href: '' }]} />
      <Box className='flex flex-row items-center justify-between w-full mt-2' >
        <SearchById setDatas={setOrders} setTab={setTab} />
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
                      <TableCell><Typography>#{order?.order_id}</Typography></TableCell>
                      <TableCell><Typography>{format(new Date(order?.created_date), 'yyyy-MM-dd')}</Typography></TableCell>
                      <TableCell ><Typography variant='subtitle2'>{formatCurrency(order?.grand_total)}</Typography></TableCell>
                      <TableCell sx={{ color: '#1C86EE', fontWeight: 'bold' }}>{order?.payment_type}</TableCell>
                      <TableCell >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Tooltip title='Chat với khách' >
                            <Chat className='text-gray-600 cursor-pointer' sx={{ display: tab === 'UN_PAID' ? 'inherit' : 'none' }}
                              onClick={() => navigate('/seller/chat', { state: order?.customer_id })} />
                          </Tooltip>
                          {tab !== 'UN_PAID' && <UpdateOrder order={order} reRender={reRender} setReRender={setRerender} />}
                          <ViewOrder order={order} />
                          <Tooltip title='In hóa đơn'>
                            <Print className='text-gray-600 cursor-pointer' sx={{ display: tab === 'PACKED' ? 'inherit' : 'none' }}
                              onClick={() => handlePrint(order?.ghn_order_code)} />
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>)
                })}
              </TableBody>
              <PaginationFooter isNotEmpty={(Array.isArray(orders) && orders.length > 0)} totalElements={totalElements}
                rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
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