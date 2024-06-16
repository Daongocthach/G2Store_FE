import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Breadcrumbs, Link } from '@mui/material'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { formatCurrency } from '../../../utils/price'
import orderApi from '../../../apis/orderApi'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'

function Orders() {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    // orderApi.getOrders()
    //   .then((response) => {
    //     setOrders(response)
    //   })
  }, [])

  return (
    <Box sx={{ m: 5 }}>
      <BreadCrumbs links={[{ name: 'Quản lý đơn hàng', href: 'admin/manage/orders' }]} />
      <Box sx={{ height: 'fit-content', bgcolor: 'white', boxShadow: '0px 0px 10px  ', mt: 2 }}>
        <TableContainer component={Paper}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow sx={{ bgcolor: '#2a99ff' }} >
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Đơn hàng</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Ngày đặt</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Tổng tiền</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Người nhận</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Số điện thoại</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Thanh toán</TableCell>
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
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Orders