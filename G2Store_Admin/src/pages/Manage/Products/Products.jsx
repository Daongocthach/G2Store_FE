import {
  Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter,
  TablePagination, Paper, TableContainer, FormControl, Select, MenuItem, Switch, Tooltip
} from '@mui/material'
import { useEffect, useState } from 'react'
import productApi from '../../../apis/productApi'
import { formatCurrency } from '../../../utils/price'
import emptyImage from '../../../assets/img/empty-order.png'
import Loading from '../../../components/Loading/Loading'
import SearchById from '../../../components/Search/Search'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import BanProduct from './BanProduct/BanProduct'

function Products() {
  const triggerAlert = useAlert()
  const [loading, setLoading] = useState(false)
  const [reRender, setReRender] = useState(false)
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [sort, setSort] = useState('DEFAULT')
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeStatus = (status, product_id) => {
    productApi.updateStatusProduct(product_id, status)
      .then(() => { triggerAlert('Cập nhật thành công!', false, false), setReRender(!reRender) })
      .catch(() => triggerAlert('Cập nhật thất bại!', true, false))
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      productApi.getProducts(page, rowsPerPage, '123')
        .then(response => {
          setProducts(response?.content)
          setTotalElements(response?.totalElements)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => setLoading(false))
    }
    fetchData()
  }, [page, reRender, rowsPerPage])
  return (
    <Box sx={{ m: 5, minHeight: '100vh' }}>
      <BreadCrumbs links={[{ name: 'Quản lý sản phẩm', href: 'admin/manage/products' }]} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <SearchById setDatas={setProducts} isProductId={true} />
        <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
          <Select value={sort} onChange={(e) => setSort(e.target.value)} >
            <MenuItem color='#444444' value={'TOP_SELLER'}>Bán chạy</MenuItem>
            <MenuItem color='#444444' value={'DEFAULT'}>Mặc định</MenuItem>
            <MenuItem color='#444444' value={'NEWEST'}>Mới nhất</MenuItem>
            <MenuItem color='#444444' value={'PRICE_ASC'}>Giá tăng dần</MenuItem>
            <MenuItem color='#444444' value={'PRICE_DESC'}>Giá giảm dần</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ height: 'fit-content', boxShadow: '0px 0px 10px  ' }}>
        <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#2a99ff' }} >
                <TableCell sx={{ fontWeight: 'bold', color: 'white', width: 400 }} >Thông tin sản phẩm</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Giá (vnđ)</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Tồn kho (sản phẩm)</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Đã bán (sản phẩm)</TableCell>
                {/* <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Trạng thái</TableCell> */}
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(products) && products?.map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {<img src={product?.thumbnail} alt={product?.name} style={{ width: '50px', height: '50px', borderRadius: 10 }} />}
                        <Box>
                          <Typography variant='subtitle2' color={'#444444'}>{product?.name}</Typography>
                          <Typography> Mã sản phẩm: #{product?.product_id}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell ><Typography>{formatCurrency(product?.price)}</Typography></TableCell>
                    <TableCell ><Typography>{product?.stock_quantity}</Typography> </TableCell>
                    <TableCell ><Typography>{product?.sold_quantity}</Typography> </TableCell>
                    <TableCell ><BanProduct productId={product?.product_id} reRender={reRender} setReRender={setReRender} /></TableCell>
                    {/* <TableCell ><Tooltip title='Ẩn/Hiện sản phẩm'><Switch checked={product?.is_available}
                      onChange={(e) => handleChangeStatus(e.target.checked, product?.product_id)} /></Tooltip></TableCell> */}
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
          <Typography variant='subtitle1' color={'#444444'} >Bạn chưa có sản phẩm nào</Typography>
        </Box>}
      </Box>
      {loading && <Loading />}
    </Box>
  )
}

export default Products