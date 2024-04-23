import {
  Button, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter,
  TablePagination, Paper, TableContainer, FormControl, Select, MenuItem, Breadcrumbs, Link, Checkbox, Switch
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AddCircle, Create } from '@mui/icons-material'
import DeleteProduct from './FormProduct/DeleteProduct'
import productApi from '../../../apis/productApi'
import { formatCurrency } from '../../../utils/price'

function Products() {
  const navigate = useNavigate()
  const shop_id = useSelector(state => state.auth.shop_id)
  const [reRender, setReRender] = useState(false)
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [select, setSelect] = useState(1)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const handleChange = (event) => {
    setSelect(event.target.value)
  }
  const handleClickUpdate = (product) => {
    navigate('/seller/manage/add-product', { state: product })
  }
  useEffect(() => {
    if (shop_id) {
      productApi.getShopProducts(shop_id, page, rowsPerPage)
        .then(response => {
          setProducts(response?.content)
          setTotalElements(response?.totalElements)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [page, reRender, rowsPerPage, shop_id])
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
          onClick={() => { navigate('/seller/manage/add-product') }}>
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
                        {<img src={product?.images} alt={product?.name} style={{ width: '50px', height: '50px', borderRadius: 10 }} />}
                        <Box>
                          <Typography variant='subtitle1' fontWeight={'bold'}>{product?.name}</Typography>
                          <Typography variant='body2'>{'Product ID: ' + product?.product_id}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>{formatCurrency(product?.price)}</Typography>
                        {/* <UpdatePrice /> */}
                      </Box>
                    </TableCell>
                    <TableCell >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>{product?.stock_quantity}</Typography>
                        {/* <UpdateQuantity /> */}
                      </Box>
                    </TableCell>
                    <TableCell >
                      <Switch defaultChecked />
                    </TableCell>
                    <TableCell ><Button sx={{ bgcolor: 'orange', color: '#363636' }} onClick={() => handleClickUpdate(product)}><Create /></Button></TableCell>
                    <TableCell ><DeleteProduct productId={product?.product_id} reRender={reRender} setReRender={setReRender} /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={12}
                  labelRowsPerPage={'Số lượng mỗi trang'}
                  rowsPerPageOptions={[5, { value: totalElements, label: 'Tất cả' }]}
                  count={totalElements}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
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