import { Box, Typography, Table, TableBody, TableCell, TableHead, Paper, TableRow, TableContainer, Switch } from '@mui/material'
import { useEffect, useState } from 'react'
import Loading from '../../../components/Loading/Loading'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import customerApi from '../../../apis/customerApi'
import PaginationFooter from '../../../components/PaginationFooter/PaginationFooter'
function Customers() {
  const [page, setPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [loading, setLoading] = useState(false)
  const [customers, setCustomers] = useState([])
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  useEffect(() => {
    customerApi.getCustomers(page, rowsPerPage)
      .then(response => {
        setCustomers(response?.content)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <Box sx={{ m: 5, minHeight: '100vh' }}>
      <BreadCrumbs links={[{ name: 'Quản lý cửa hàng', href: 'admin/manage/customers' }]} />
      <Box sx={{ height: 'fit-content', bgcolor: 'white', boxShadow: '0px 0px 10px', mt: 1 }}>
        <TableContainer component={Paper} >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#2a99ff' }} >
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Tên</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Số điện thoại</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(customers) && customers?.map((customer, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell >
                        <Typography>#{customer?.customer_id}</Typography>
                    </TableCell>
                    <TableCell >
                      <Typography >{customer?.full_name}</Typography>
                    </TableCell>
                    <TableCell >
                      <Typography>{customer?.phone_no ? customer?.phone_no : 'Chưa cập nhật'}</Typography>
                    </TableCell>
                    <TableCell ><Typography>{customer?.email}</Typography></TableCell>
                    <TableCell >
                      <Switch checked={true} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <PaginationFooter isNotEmpty={(Array.isArray(customers) && customers.length > 0)} content={'Bạn chưa có khách hàng nào!'}
              totalElements={totalElements} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage} />
          </Table>
        </TableContainer>
      </Box>
      {loading && <Loading />}
    </Box>
  )
}

export default Customers