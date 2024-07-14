import {
  Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Button,
  Paper, FormControl, Select, MenuItem, Alert
} from '@mui/material'
import { useEffect, useState } from 'react'
import { AddCircle } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import sellerApi from '../../../apis/sellerApi'
import Loading from '../../../components/Loading/Loading'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import UpdateSellerStatus from './UpdateSellerStatus/UpdateSellerStatus'

function Sellers() {
  const triggerAlert = useAlert()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [reRender, setReRender] = useState(false)
  const [sellers, setSellers] = useState([])
  const [role, setRole] = useState(0)
  const handleChangeRole = async (event, sellerId) => {
    setLoading(true)
    const newRole = event.target.value
    sellerApi.updateSellerRole(sellerId, newRole)
      .then(() => {
        setRole(newRole)
        triggerAlert('Cập nhật thành công!', false, false)
      })
      .catch(error => {
        console.log(error)
        triggerAlert('Cập nhật thất bại!', true, false)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    sellerApi.getShopSellers()
      .then(response => {
        setSellers(response)
      })
      .catch(error => {
        console.log(error)
        if (error?.response?.data?.message == 'Access Denied') {
          navigate('/seller/access-denied')
        }
      })
  }, [role, reRender])

  return (
    <Box className='min-h-screen flex flex-col gap-2 m-3'>
      <BreadCrumbs links={[{ name: 'Quản lý người bán', href: '' }]} />
      <Box>
        <Button sx={{ fontWeight: 'bold', ':hover': { bgcolor: 'inherit' } }} startIcon={<AddCircle />} variant="outlined"
          onClick={() => { navigate('/seller/manage/add-seller') }}>
          Thêm người bán
        </Button>
      </Box>
      <Box sx={{ height: 'fit-content', bgcolor: 'white', boxShadow: '0px 0px 10px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#2a99ff' }} >
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Tên</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Số điện thoại</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Vai trò</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Trạng thái</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Là tài khoản chính</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(sellers) && sellers?.map((seller, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell ><Typography variant='body2' >{seller?.email}</Typography></TableCell>
                    <TableCell ><Typography variant='body2'>{seller?.fullName || '(Chưa cập nhật)'}</Typography></TableCell>
                    <TableCell ><Typography variant='body2'>{seller?.phone_no || '(Chưa cập nhật)'}</Typography></TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select size='small' variant={seller?.is_main_acc ? 'standard' : 'outlined'} color='primary' value={seller?.role_id}
                          readOnly={seller?.is_main_acc ? true : false}
                          onChange={(event) => handleChangeRole(event, seller?.seller_id)}>
                          <MenuItem value={3}>Quản lý khuyến mãi</MenuItem>
                          <MenuItem value={4}>Toàn quyền</MenuItem>
                          <MenuItem value={5}>Quản lý sản phẩm shop</MenuItem>
                          <MenuItem value={6}>Quản lý đơn hàng</MenuItem>
                          <MenuItem value={7}>Chỉ xem</MenuItem>
                          <MenuItem value={8}>Tương tác khách hàng</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell ><UpdateSellerStatus seller={seller} reRender={reRender} setReRender={setReRender} /></TableCell>
                    <TableCell >{seller?.is_main_acc && <Alert severity='success' />}</TableCell>
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

export default Sellers