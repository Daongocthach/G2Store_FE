import {
  Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Button,
  Paper, FormControl, Select, MenuItem, Switch, Alert
} from '@mui/material'
import { useEffect, useState } from 'react'
import { AddCircle } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import sellerApi from '../../../apis/sellerApi'
import DeleteSeller from './FormSeller/DeleteSeller'
import Loading from '../../../components/Loading/Loading'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'

function Sellers() {
  const triggerAlert = useAlert()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [sellers, setSellers] = useState([])
  const [role, setRole] = useState(0)
  const [select, setSelect] = useState(1)
  const handleChange = (event) => {
    setSelect(event.target.value)
  }
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
      })
  }, [role])

  return (
    <Box sx={{ m: 5, minHeight: '100vh' }}>
      <BreadCrumbs links={[{ name: 'Quản lý người bán', href: '' }]} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          <Button sx={{ fontWeight: 'bold', ':hover': { bgcolor: 'inherit' } }} startIcon={<AddCircle />} variant="outlined"
            onClick={() => { navigate('/seller/manage/add-seller') }}>
            Thêm người bán
          </Button>
          <Typography variant='body1' fontWeight={'bold'} >Sắp xếp</Typography>
          <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
            <Select value={select} onChange={handleChange} defaultValue={1} >
              <MenuItem value={1}>Mới nhất</MenuItem>
              <MenuItem value={2}>Cũ nhất</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(sellers) && sellers?.map((seller, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell ><Typography maxWidth={150} className='line-clamp-1'>{seller?.email || null}</Typography></TableCell>
                    <TableCell ><Typography maxWidth={150} overflow={'clip'}>{seller?.fullName || '(Chưa cập nhật)'}</Typography></TableCell>
                    <TableCell ><Typography maxWidth={150} overflow={'clip'}>{seller?.phone_no || '(Chưa cập nhật)'}</Typography></TableCell>
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
                    <TableCell ><Switch checked={seller?.is_enabled} /></TableCell>
                    <TableCell >{seller?.is_main_acc && <Alert severity='success' />}</TableCell>
                    <TableCell >{!seller?.is_main_acc && <DeleteSeller />}</TableCell>
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