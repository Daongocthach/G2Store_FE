import {
  Button, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter,
  TablePagination, Paper, TableContainer, FormControl, Select, MenuItem, Breadcrumbs, Link, Checkbox, Switch
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddCircle } from '@mui/icons-material'
// import UpdateProduct from './FormProduct/UpdateProduct'
// import DeleteProduct from './FormProduct/DeleteProduct'
// import SearchProduct from './SearchProduct/SearchProduct'
// import UpdatePrice from './FormProduct/UpdatePrice'
// import UpdateQuantity from './FormProduct/UpdateQuantity'

function Products() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
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
              {/* {Array.isArray(products) && products?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center"><Checkbox/></TableCell>
                    <TableCell align="center">{product?.name}</TableCell>
                    <TableCell align="center">{product?.price}</TableCell>
                    <TableCell align="center">{product?.description}</TableCell>
                    <TableCell align="center">{product?.discount}</TableCell>
                    <TableCell align="center">{product?.subCategory?.name}</TableCell>
                    <TableCell align="center">{product?.provider?.name}</TableCell>
                    <TableCell align="center">{<img src={product?.image} alt='avatar' width={'50px'} height={'50px'} />}</TableCell>
                    <TableCell align="center">{product?.enabled == 1 ? 'Enable' : 'Disable'}</TableCell>
                    <TableCell align="center"><UpdateProduct product={product} /></TableCell>
                    {product.enabled == 1 && <TableCell align="center"><DeleteProduct productId={product?.id} /></TableCell>}
                  </TableRow>
                )
              })} */}
              <TableRow >
                <TableCell ><Checkbox /></TableCell>
                <TableCell >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {<img src={'https://forums.fanedit.org/data/avatars/l/27/27296.jpg?1671171104'} alt='avatar' style={{ width: '50px', height: '50px', borderRadius: 10 }} />}
                    <Box>
                      <Typography variant='subtitle1' fontWeight={'bold'}>{'Bánh chuối chiên'}</Typography>
                      <Typography variant='body2'>{'Seller SKU: #3456'}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>{'12.000 vnđ'}</Typography>
                    {/* <UpdatePrice /> */}
                  </Box>
                </TableCell>
                <TableCell >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>{'12.000 vnđ'}</Typography>
                    {/* <UpdateQuantity /> */}
                  </Box>
                </TableCell>
                <TableCell >
                  <Switch defaultChecked />
                </TableCell>
                {/* <TableCell ><UpdateProduct /></TableCell>
                <TableCell ><DeleteProduct /></TableCell> */}
              </TableRow>
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