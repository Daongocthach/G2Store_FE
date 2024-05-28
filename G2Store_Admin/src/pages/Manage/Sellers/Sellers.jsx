import {
  Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
  Paper, FormControl, Select, MenuItem, Breadcrumbs, Link, Switch
} from '@mui/material'
import { useEffect, useState } from 'react'
import sellerApi from '../../../apis/sellerApi'
import ShowAlert from '../../../components/ShowAlert/ShowAlert'
import Loading from '../../../components/Loading/Loading'

function Sellers() {
  const [loading, setLoading] = useState(false)
  const [sellers, setSellers] = useState([])
  const [role, setRole] = useState(0)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)

  useEffect(() => {
    sellerApi.getSellers()
      .then(response => {
        setSellers(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [role])

  return (
    <Box sx={{ m: 5, minHeight: '100vh' }}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/seller/dashboard">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/seller/manage/sellers">
          Quản lý tài khoản người bán
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
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Vai trò</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(sellers) && sellers?.map((seller, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell ><Typography maxWidth={150} overflow={'clip'}>{seller?.email || null}</Typography></TableCell>
                    <TableCell ><Typography maxWidth={150} overflow={'clip'}>{seller?.fullName || '(Chưa cập nhật)'}</Typography></TableCell>
                    <TableCell ><Typography maxWidth={150} overflow={'clip'}>{seller?.phone_no || '(Chưa cập nhật)'}</Typography></TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select size='small' variant={'standard'} color='primary' value={seller?.role_id}
                        readOnly={true}>
                          <MenuItem value={3}>Quản lý khuyến mãi</MenuItem>
                          <MenuItem value={4}>Toàn quyền</MenuItem>
                          <MenuItem value={5}>Quản lý sản phẩm shop</MenuItem>
                          <MenuItem value={6}>Quản lý đơn hàng</MenuItem>
                          <MenuItem value={7}>Chỉ xem</MenuItem>
                          <MenuItem value={8}>Tương tác khách hàng</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell ><Switch checked={seller?.is_enabled} /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>

          </Table>
        </TableContainer>
      </Box>
      <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Cập nhật thành công'} />
      <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Cập nhật thất bại'} isFail={true} />
      {loading && <Loading />}
    </Box>
  )
}

export default Sellers