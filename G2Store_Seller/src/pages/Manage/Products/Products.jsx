import {
  Button, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter, Checkbox,
  TablePagination, Paper, TableContainer, FormControl, Select, MenuItem, Breadcrumbs, Link, Tooltip, Switch
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddCircle, Create } from '@mui/icons-material'
import DeleteProduct from './FormProduct/DeleteProduct'
import productApi from '../../../apis/productApi'
import { formatCurrency } from '../../../utils/price'
import emptyImage from '../../../assets/img/empty-order.png'
import Loading from '../../../components/Loading/Loading'
import ShowAlert from '../../../components/ShowAlert/ShowAlert'

function Products() {
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checkedProducts, setCheckedProducts] = useState([])
  const [checkedAll, setCheckedAll] = useState(false)
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
  const handleChecked = (product_id) => {
    if (checkedProducts.includes(product_id)) {
      const list = checkedProducts.filter(id => id !== product_id)
      const allSelected = products.every(product => list.includes(product?.product_id))
      setCheckedAll(allSelected)
      setCheckedProducts(list)
    } else {
      const list = [...checkedProducts, product_id]
      const allSelected = products.every(product => list.includes(product?.product_id))
      setCheckedAll(allSelected)
      setCheckedProducts(list)
    }
  }
  const handleChangeAll = () => {
    if (checkedAll) {
      setCheckedProducts([])
    } else {
      setCheckedProducts(products.map(product => product.product_id))
    }
    setCheckedAll(!checkedAll)
  }
  const handleExport = async () => {
    setLoading(true)
    productApi?.exportExcel(checkedProducts, checkedAll)
      .then(() => {})
      .catch((error) => {console.log(error)})
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    if (shop_id) {
      productApi.getShopProducts(shop_id, page, rowsPerPage)
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button sx={{ fontWeight: 'bold', ':hover': { bgcolor: 'inherit', borderWidth: 2 } }} startIcon={<AddCircle />} variant="outlined"
            onClick={() => { navigate('/seller/manage/add-product') }}>
            Thêm sản phẩm mới
          </Button>
          {checkedProducts.length > 0 && <Button sx={{ fontWeight: 'bold' }} startIcon={<AddCircle />} variant="contained"
            onClick={handleExport}>
            Xuất file excel
          </Button>}
        </Box>
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
      <Box sx={{ height: 'fit-content', boxShadow: '0px 0px 10px  ' }}>
        <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#2a99ff' }} >
                <TableCell sx={{ color: 'white' }} ><Checkbox onChange={handleChangeAll} sx={{ '&.Mui-checked': { color: 'white' } }} /></TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white', width: 400 }} >Thông tin sản phẩm</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Giá</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Số lượng</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Đang hoạt động</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(products) && products?.map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell ><Checkbox checked={checkedAll ? true : checkedProducts.includes(product?.product_id)} onChange={() => handleChecked(product?.product_id)} /></TableCell>
                    <TableCell >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {<img src={product?.images[0]?.file_url} alt={product?.name} style={{ width: '50px', height: '50px', borderRadius: 10 }} />}
                        <Typography variant='subtitle2' color={'#444444'}>{product?.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell ><Typography>{formatCurrency(product?.price)}</Typography></TableCell>
                    <TableCell ><Typography>{product?.stock_quantity}</Typography> </TableCell>
                    <TableCell ><Switch defaultChecked /> </TableCell>
                    <TableCell >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Tooltip title='Cập nhật'><Create sx={{ bgcolor: 'inherit', color: '#444444', cursor: 'pointer' }} onClick={() => handleClickUpdate(product)} /></Tooltip>
                        <DeleteProduct productId={product?.product_id} reRender={reRender} setReRender={setReRender} />
                      </Box>
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
      {loading && <Loading />}
    </Box>
  )
}

export default Products