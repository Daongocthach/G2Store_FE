import {
  Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
  Paper, TableFooter, TablePagination, FormControl, Select, MenuItem, Breadcrumbs, Link, Switch, Alert
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listShops } from '../../../redux/actions/shops'
import shopApi from '../../../apis/shopApi'
import ShowAlert from '../../../components/ShowAlert/ShowAlert'
import UpdateShop from './FormShop/UpdateShop'
import DeleteShop from './FormShop/DeleteShop'

function Shops() {
  const dispatch = useDispatch()
  const shops = useSelector(state => state.shops.shops)
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
  const handleUpdateStatus = (id, enabled) => {

  }
  useEffect(() => {
    shopApi.getShops()
      .then((response) => {
        dispatch(listShops(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <Box sx={{ m: 5 }}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/dashboard">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/manage/shops">
          Quản lý nhà bán hàng
        </Link>
      </Breadcrumbs>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
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
                <TableCell sx={{ fontWeight: 'bold' }} >Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Vai trò</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Trạng thái</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Cập nhật</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Xóa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(shops) && shops?.map((shop, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell >{shop?.name}</TableCell>
                    <TableCell sx={{ color: 'blue' }}>{'NBH-Toàn quyền truy cập'}</TableCell>
                    <TableCell ><Switch /></TableCell>
                    <TableCell ><UpdateShop /></TableCell>
                    <TableCell ><DeleteShop /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={12}
                  rowsPerPageOptions={[5, 10, { value: shops?.length, label: 'All' }]}
                  count={Array.isArray(shops) ? shops.length : 0}
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

export default Shops
