import {
  Button, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter,
  TablePagination, Paper, TableContainer, FormControl, Select, MenuItem, Breadcrumbs, Link, Tooltip, Switch
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddCircle, Create } from '@mui/icons-material'
import DeleteProduct from './FormProduct/DeleteProduct'
import productApi from '../../../apis/productApi'
import { formatCurrency } from '../../../utils/price'
import emptyImage from '../../../assets/img/empty-order.png'


function Products() {
  const navigate = useNavigate()
  const [reRender, setReRender] = useState(false)
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  useEffect(() => {
    productApi.getProducts(page, rowsPerPage)
      .then(response => {
        setProducts(response?.content)
        setTotalElements(response?.totalElements)
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'Access Denied') {
          navigate('/seller/access-denied')
        }
        console.log(error)
      })

  }, [page, reRender, rowsPerPage])
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
      <Box sx={{ height: 'fit-content', boxShadow: '0px 0px 10px ', mt: 2 }}>
        <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#2a99ff' }} >
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Thông tin sản phẩm</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Giá</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Số lượng</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(products) && products?.map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {<img src={product?.images[0]?.file_url} alt={product?.name} style={{ width: '50px', height: '50px', borderRadius: 10 }} />}
                        <Typography variant='subtitle2' color={'#444444'}>{product?.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell ><Typography>{formatCurrency(product?.special_price || product?.price)}</Typography></TableCell>
                    <TableCell > <Typography>{product?.stock_quantity}</Typography> </TableCell>
                    <TableCell >
                      <Switch defaultChecked />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            {Array.isArray(products) && products.length > 0 && <TableFooter>
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
            </TableFooter>}
          </Table>
        </TableContainer>
        {Array.isArray(products) && products.length < 1 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <img src={emptyImage} />
          <Typography variant='h6' >Bạn chưa có sản phẩm nào</Typography>
        </Box>}
      </Box>
    </Box>
  )
}

export default Products