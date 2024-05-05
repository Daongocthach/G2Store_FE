import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter,
  TablePagination, Paper, TableContainer, Tab, Tabs, Divider, Breadcrumbs, Link, Checkbox, Switch
} from '@mui/material'
import { LocalShipping, FiberManualRecord, Storefront, NavigateNext, AddCircle, Create } from '@mui/icons-material'
import { formatCurrency } from '../../../utils/price'
import emptyOrder from '../../../assets/img/empty-order.png'
import orderApi from '../../../apis/orderApi'
import ShowAlert from '../../../components/ShowAlert/ShowAlert'

function Orders() {
  const [rerender, setRerender] = useState(false)
  const navigate = useNavigate()
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

  const handleClickUpdate = (product) => {
    navigate('/seller/manage/add-product', { state: product })
  }
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
                  <TableCell sx={{ fontWeight: 'bold', color: '#444444' }} >Ngày đặt</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444444' }} >Tổng tiền</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444444' }} >Giao tới</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444444' }} >Trạng thái</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444444' }} >Hủy đơn</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(orders) && orders?.map((order, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {<img src={order?.images[0]?.file_url} alt={order?.name} style={{ width: '50px', height: '50px', borderRadius: 10 }} />}
                          <Typography variant='subtitle2' color={'#444444'}>{order?.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell ><Typography>{formatCurrency(order?.special_price || order?.price)}</Typography></TableCell>
                      <TableCell > <Typography>{order?.stock_quantity}</Typography> </TableCell>
                      <TableCell >
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell ><Button sx={{ bgcolor: 'orange', color: '#363636' }} onClick={() => handleClickUpdate(order)}><Create /></Button></TableCell>
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

const useStyles = {
  flexBox: {
    display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between'
  }
}