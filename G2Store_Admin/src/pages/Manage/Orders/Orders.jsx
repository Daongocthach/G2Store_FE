import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Tab, Tabs, Dialog } from '@mui/material'
import { format } from 'date-fns'
import { formatCurrency } from '../../../utils/price'
import orderApi from '../../../apis/orderApi'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import PaginationFooter from '../../../components/PaginationFooter/PaginationFooter'
import OrderItem from './OrderItem/OrderItem'
import ViewOrder from './FormOrder/ViewOrder'
import UpdateOrder from './FormOrder/UpdateOrder'
import ViewRefundImages from './FormOrder/ViewRefundImages'

function Orders() {
  const navigate = useNavigate()
  const [reRender, setRerender] = useState(false)
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState('refunding')
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
  }
  useEffect(() => {
    if (tab == 'refunding') {
      orderApi.getOrdersRefunding(page, rowsPerPage)
        .then((response) => {
          setOrders(response?.content)
          setTotalElements(response?.totalElements)
        })
        .catch((error) => {
          if (error?.response?.data?.message == 'Access Denied') {
            navigate('/seller/access-denied')
          }
          console.log(error)
        })
    }
    else {
      orderApi.getOrdersRefunded(page, rowsPerPage)
        .then((response) => {
          setOrders(response?.content)
          setTotalElements(response?.totalElements)
        })
        .catch((error) => {
          if (error?.response?.data?.message == 'Access Denied') {
            navigate('/seller/access-denied')
          }
          console.log(error)
        })
    }
  }, [reRender, tab])
  return (
    <Box className='m-5 min-h-screen'>
      <BreadCrumbs links={[{ name: 'Quản lý đơn hàng', href: '' }]} />
      <Box className='mb-2'>
        <Box className='mb-3'>
          <Tabs value={tab} onChange={handleChange} textColor="primary" variant="scrollable" >
            <Tab label={'Chờ hoàn tiền'} value={'refunding'} />
            <Tab label={'Đã hoàn tiền'} value={'refunded'} />
          </Tabs>
        </Box>
        <Box className='h-fit bg-white' sx={{ boxShadow: '0px 0px 10px  ' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#2a99ff' }} >
                  <TableCell sx={{ fontWeight: 'bold', color: 'white', width: 300 }} >Sản phẩm</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Đơn hàng</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Khiếu nại</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(orders) && orders?.map((order, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell><Box>{order?.items.map((orderItem, index) => <OrderItem key={index} orderItem={orderItem} />)}</Box></TableCell>
                      <TableCell>
                        <Box className='flex flex-col gap-2' >
                          <Typography variant='body2' className='text-gray-600'>Mã: #{order?.order_id}</Typography>
                          <Typography variant='body2' className='text-gray-600'>Ngày đặt: {format(new Date(order?.created_date), 'yyyy-MM-dd')}</Typography>
                          <Typography variant='body2' className='text-red-600'>Tổng tiền: {formatCurrency(order?.grand_total)}</Typography>
                          <Typography variant='body2' fontWeight={'bold'} className='text-sky-600'>{order?.payment_type}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ width: 400 }}>{order?.refund_reason}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          {tab === 'refunding' && <UpdateOrder order={order} reRender={reRender} setReRender={setRerender} />}
                          <ViewOrder order={order} />
                          <ViewRefundImages images={order?.refund_images} />
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
