import {
  Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
  Paper, Breadcrumbs, Link, Switch
} from '@mui/material'
import { useEffect, useState } from 'react'
import customerApi from '../../../apis/userApi'
import Loading from '../../../components/Loading/Loading'

function Customers() {
  const [loading, setLoading] = useState(false)
  const [customers, setCustomers] = useState([])
  const [role, setRole] = useState(0)

  useEffect(() => {
    // customerApi.getCustomers()
    //   .then(response => {
    //     setCustomers(response)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }, [role])

  return (
    <Box sx={{ m: 5, minHeight: '100vh' }}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/customer/dashboard">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/customer/manage/customers">
          Quản lý người dùng
        </Link>
      </Breadcrumbs>
      <Box sx={{ height: 'fit-content', bgcolor: 'white', boxShadow: '0px 0px 10px', mt: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
            <TableRow sx={{ bgcolor: '#2a99ff' }} >
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Tên</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Số điện thoại</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Xác thực Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(customers) && customers?.map((customer, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell ><Typography maxWidth={150} overflow={'clip'}>{customer?.email || null}</Typography></TableCell>
                    <TableCell ><Typography maxWidth={150} overflow={'clip'}>{customer?.fullName || '(Chưa cập nhật)'}</Typography></TableCell>
                    <TableCell ><Typography maxWidth={150} overflow={'clip'}>{customer?.phone_no || '(Chưa cập nhật)'}</Typography></TableCell>
                    <TableCell ><Typography maxWidth={150} overflow={'clip'}>{customer?.is_email_verified ? '(Đã xác thực)' : '(Chưa cập nhật)'}</Typography></TableCell>
                    <TableCell ><Switch checked={true} /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>

          </Table>
        </TableContainer>
      </Box>

      {loading && <Loading />}
    </Box>
  )
}

export default Customers