import {
  Button, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter,
  TablePagination, Paper, TableContainer, FormControl, Select, MenuItem, Breadcrumbs, Link, Checkbox, Switch
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AddCircle } from '@mui/icons-material'
import UpdateProduct from './FormProduct/UpdateProduct'
import DeleteProduct from './FormProduct/DeleteProduct'
import UpdatePrice from './FormProduct/UpdatePrice'
import UpdateQuantity from './FormProduct/UpdateQuantity'
import productApi from '../../../apis/productApi'
import { listProducts } from '../../../redux/actions/products'
import { formatCurrency } from '../../../utils/price'

function Products() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const products = useSelector(state => state.products.products)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [select, setSelect] = useState(1)

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
    productApi.getShopProducts(2)
      .then(response => {
        dispatch(listProducts(response.data))
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
        <Link underline="hover" color="inherit" href="/manage/orders">
          Quản lý sản phẩm
        </Link>
      </Breadcrumbs>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Button sx={{ fontWeight: 'bold' }} startIcon={<AddCircle />} variant="outlined"
          onClick={() => { navigate('/manage/add-product') }}>
          Thêm sản phẩm mới
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          <Typography variant='body1' fontWeight={'bold'} >Sắp xếp</Typography>
          <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
            <Select value={select} onChange={handleChange}>
              <MenuItem value={1}>Mới nhất</MenuItem>
              <MenuItem value={2}>Cũ nhất</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ height: 'fit-content', bgcolor: 'white', boxShadow: '0px 0px 10px  ' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell sx={{ fontWeight: 'bold' }} ><Checkbox /></TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Thông tin sản phẩm</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Giá</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Số lượng</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Đang hoạt động</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Cập nhật</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Xóa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(products) && products?.map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell ><Checkbox /></TableCell>
                    <TableCell >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {<img src={ product?.image || 'https://forums.fanedit.org/data/avatars/l/27/27296.jpg?1671171104'} alt={product?.name} style={{ width: '50px', height: '50px', borderRadius: 10 }} />}
                        <Box>
                          <Typography variant='subtitle1' fontWeight={'bold'}>{product?.name}</Typography>
                          <Typography variant='body2'>{'Seller SKU: ' + product?.id}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>{formatCurrency(product?.price)}</Typography>
                        <UpdatePrice />
                      </Box>
                    </TableCell>
                    <TableCell >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>{product?.stockQuantity}</Typography>
                        <UpdateQuantity />
                      </Box>
                    </TableCell>
                    <TableCell >
                      <Switch defaultChecked />
                    </TableCell>
                    <TableCell ><UpdateProduct /></TableCell>
                    <TableCell ><DeleteProduct /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={12}
                  rowsPerPageOptions={[5, 10, { value: products?.length, label: 'All' }]}
                  count={products?.length}
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
    </Box>
  )
}

export default Products