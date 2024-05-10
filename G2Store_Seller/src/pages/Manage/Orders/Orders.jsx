import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter,
  TablePagination, Paper, TableContainer, Tab, Tabs, Divider, Breadcrumbs, Link,
} from '@mui/material'
import { format } from 'date-fns'
import { formatCurrency } from '../../../utils/price'
import emptyOrder from '../../../assets/img/empty-order.png'
import orderApi from '../../../apis/orderApi'
import ShowAlert from '../../../components/ShowAlert/ShowAlert'
import ViewOrder from './FormOrder/ViewOrder'
import UpdateOrder from './FormOrder/UpdateOrder'


function Orders() {
  const [reRender, setRerender] = useState(false)
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState('UN_PAID')
  const [page, setPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChange = (event, newTab) => {
    setTab(newTab)
    orderApi.getShopOrders(newTab, 0, 16)
      .then((response) => {
        setOrders(response?.content)
      })
  }
  useEffect(() => {
    orderApi.getShopOrders(tab, 0, 16)
      .then((response) => { setOrders(response?.content) })
  }, [reRender])
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
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
        <Box sx={{ height: 'fit-content', bgcolor: 'white', boxShadow: '0px 0px 10px  ' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow >
                  <TableCell sx={{ fontWeight: 'bold', color: '#444444' }} >Đơn hàng</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444444' }} >Ngày đặt</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444444' }} >Tổng tiền</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444444' }} >Người nhận</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444444' }} >Số điện thoại</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444444' }} >Thanh toán</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444444' }} >Xem Đơn</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444444' }} >Cập nhật</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(orders) && orders?.map((order, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell sx={{ fontWeight: 'bold' }}>#{order?.order_id}</TableCell>
                      <TableCell >{format(new Date(order?.created_date), 'yyyy-MM-dd')}</TableCell>
                      <TableCell sx={{ color: '#cd3333', fontWeight: 'bold' }}>{formatCurrency(order?.total)}</TableCell>
                      <TableCell >{order?.address?.receiver_name}</TableCell>
                      <TableCell >{order?.address?.receiver_phone_no}</TableCell>
                      <TableCell sx={{ color: '#1C86EE', fontWeight: 'bold' }}>{order?.payment_type}</TableCell>
                      <TableCell ><ViewOrder order={order} /></TableCell>
                      <TableCell ><UpdateOrder order={order} reRender={reRender} setReRender={setRerender} /></TableCell>
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
          {Array.isArray(orders) && orders.length < 1 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <img src={emptyOrder} />
            <Typography variant='h6' >Bạn chưa có đơn hàng nào</Typography>
          </Box>}
        </Box>
      </Box>
      <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Xuất file thành công'} />
      <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Xuất file thất bại'} isFail={true} />
    </Box>
  )
}

export default Orders
