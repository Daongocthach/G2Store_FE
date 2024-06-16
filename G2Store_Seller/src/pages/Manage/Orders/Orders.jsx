import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter,
  TablePagination, Paper, TableContainer, Tab, Tabs, Divider, Tooltip
} from '@mui/material'
import { Chat, Print } from '@mui/icons-material'
import { format, addDays } from 'date-fns'
import { formatCurrency } from '../../../utils/price'
import emptyOrder from '../../../assets/img/empty-order.png'
import orderApi from '../../../apis/orderApi'
import ViewOrder from './FormOrder/ViewOrder'
import UpdateOrder from './FormOrder/UpdateOrder'
import OrderItem from './OrderItem/OrderItem'
import ghnApi from '../../../apis/ghnApi'
import SearchById from '../../../components/Search/Search'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'

function Orders() {
  const triggerAlert = useAlert()
  const navigate = useNavigate()
  const [reRender, setRerender] = useState(false)
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState('UN_PAID')
  const [page, setPage] = useState(0)
  const [order_codes, setOrderCodes] = useState(['LGT338', 'LGT33Y'])
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
  const handlePrint = () => {
    ghnApi.printOrder(order_codes)
      .then((response) => {
        location.assign('https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token=' + response?.data?.data?.token)
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
    <Box sx={{ m: 5, minHeight: '100vh' }}>
      <BreadCrumbs links={[{ name: 'Quản lý đơn hàng', href: '' }]} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant='h5' sx={{ fontWeight: 'bold', minWidth: '100px', m: 2 }}>Quản lý đơn hàng</Typography>
        <SearchById setDatas={setOrders} setTab={setTab} />
      </Box>
      <Divider />
      <Box sx={{ mb: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={handleChange} textColor="primary" variant="scrollable" >
            <Tab label='Tất cả' value={''} />
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
        <Box sx={{ height: 'fit-content', bgcolor: 'white', boxShadow: '0px 0px 10px  ' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#2a99ff' }} >
                  <TableCell sx={{ fontWeight: 'bold', color: 'white', width: 300 }} >Sản phẩm</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Mã đơn hàng</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Ngày đặt</TableCell>
                  {tab === 'ORDERED' && <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Xác nhận trước</TableCell>}
                  {(tab === 'CONFIRMED' || tab === 'PACKED') && <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Giao vận chuyển trước</TableCell>}
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Tổng tiền</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Thanh toán</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(orders) && orders?.map((order, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Box>
                          {order?.items.map((orderItem, index) =>
                            <OrderItem key={index} orderItem={orderItem} />)}
                        </Box>
                      </TableCell>
                      <TableCell><Typography>#{order?.order_id}</Typography></TableCell>
                      <TableCell><Typography>{format(new Date(order?.created_date), 'yyyy-MM-dd')}</Typography></TableCell>
                      {tab === 'ORDERED' && <TableCell ><Typography>{format(addDays(new Date(order?.created_date), 1), 'yyyy-MM-dd HH:mm:ss')}</Typography></TableCell>}
                      {(tab === 'CONFIRMED' || tab === 'PACKED') && <TableCell><Typography>{format(addDays(new Date(order?.created_date), 2), 'yyyy-MM-dd HH:mm:ss')}</Typography></TableCell>}
                      <TableCell ><Typography variant='subtitle2'>{formatCurrency(order?.total)}</Typography></TableCell>
                      <TableCell sx={{ color: '#1C86EE', fontWeight: 'bold' }}>{order?.payment_type}</TableCell>
                      <TableCell >
                        {tab === 'UN_PAID' ?
                          <Tooltip title='Chat với khách'><Chat sx={{ bgcolor: 'inherit', color: '#444444', cursor: 'pointer' }} /></Tooltip>
                          :
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <UpdateOrder order={order} reRender={reRender} setReRender={setRerender} />
                            <ViewOrder order={order} />
                            {tab === 'PACKED' &&
                              <Tooltip title='In hóa đơn'><Print sx={{ bgcolor: 'inherit', color: '#444444', cursor: 'pointer' }} onClick={handlePrint} /></Tooltip>}
                          </Box>}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
              {Array.isArray(orders) && orders.length > 0 && <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={12}
                    labelRowsPerPage={'Số lượng mỗi trang'}
                    rowsPerPageOptions={[5, { value: totalElements, label: 'Tất cả' }]}
                    count={totalElements}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>}
            </Table>
          </TableContainer>
        </Box>
        {Array.isArray(orders) && orders.length < 1 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <img src={emptyOrder} />
          <Typography variant='h6' >Bạn chưa có đơn hàng nào</Typography>
        </Box>}
      </Box>
    </Box>
  )
}

export default Orders
