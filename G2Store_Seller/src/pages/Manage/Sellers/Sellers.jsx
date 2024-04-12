import {
  Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Button,
  Paper, TableFooter, TablePagination, FormControl, Select, MenuItem, Breadcrumbs, Link, Switch, Alert
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AddCircle } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import sellerApi from '../../../apis/sellerApi'
import { listSellers } from '../../../redux/actions/sellers'
import ShowAlert from '../../../components/ShowAlert/ShowAlert'
import UpdateSeller from './FormSeller/UpdateSeller'
import DeleteSeller from './FormSeller/DeleteSeller'
import AddSeller from './AddSeller/AddSeller'

function Sellers() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sellers = useSelector(state => state.sellers.sellers)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [select, setSelect] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChange = (event) => {
    setSelect(event.target.value)
  }
  useEffect(() => {
    sellerApi.getSellers(2)
      .then(response => {
        dispatch(listSellers(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <Box sx={{ m: 5, minHeight: '100vh' }}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/dashboard">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/manage/Sellers">
          Quản lý tài khoản khách hàng
        </Link>
      </Breadcrumbs>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          <Button sx={{ fontWeight: 'bold' }} startIcon={<AddCircle />} variant="outlined"
            onClick={() => { navigate('/manage/add-seller') }}>
            Thêm người dùng
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
              <TableRow >
                <TableCell sx={{ fontWeight: 'bold' }} >Tên</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Số điện thoại</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Vai trò</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Trạng thái</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Là tài khoản chính</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Cập nhật</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Xóa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(sellers) && sellers?.map((seller, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell >{seller?.fullName}</TableCell>
                    <TableCell >{seller?.email}</TableCell>
                    <TableCell >{seller?.phoneNo}</TableCell>
                    <TableCell sx={{ color: 'blue' }}>{seller?.role?.appRole}</TableCell>
                    <TableCell ><Switch /></TableCell>
                    <TableCell >{index==0 && <Alert severity='success' />}</TableCell>
                    <TableCell ><UpdateSeller /></TableCell>
                    <TableCell ><DeleteSeller /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={12}
                  rowsPerPageOptions={[5, 10, { value: sellers?.length, label: 'All' }]}
                  count={Array.isArray(sellers) ? Sellers.length : 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
      <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Cập nhật thành công'} />
      <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Cập nhật thất bại'} isFail={true} />
    </Box>
  )
}

export default Sellers
