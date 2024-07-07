import {
  Button, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Checkbox,
  Paper, TableContainer, FormControl, Select, MenuItem, Tooltip, Switch
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddCircle, Create, GetApp, FileUpload } from '@mui/icons-material'
import DeleteProduct from './FormProduct/DeleteProduct'
import productApi from '../../../apis/productApi'
import { formatCurrency } from '../../../utils/price'
import Loading from '../../../components/Loading/Loading'
import SearchById from '../../../components/Search/Search'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'
import PaginationFooter from '../../../components/PaginationFooter/PaginationFooter'
import EmptyData from '../../../components/EmptyData/EmptyData'

function Products() {
  const navigate = useNavigate()
  const triggerAlert = useAlert()
  const [loading, setLoading] = useState(false)
  const [checkedProducts, setCheckedProducts] = useState([])
  const [checkedAll, setCheckedAll] = useState(false)
  const shop_id = useSelector(state => state.auth.shop_id)
  const [reRender, setReRender] = useState(false)
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [sort, setSort] = useState('DEFAULT')
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
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
  const handleImageChange = async (e) => {
    const image = e.target.files[0]
    if (image) {
      handleUpdateImage(image)
    }
  }
  const handleUpdateImage = async (file) => {
    setLoading(true)
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      productApi.importExcel(formData)
        .then(() => {
          triggerAlert('Cập nhật thành công!', false, false)
          setReRender(!reRender)
        })
        .catch((error) => {
          console.log(error)
          triggerAlert('Cập nhật thất bại!', true, false)

        })
        .finally(() => setLoading(false))
    }
  }
  const handleExport = async () => {
    if (Array.isArray(checkedProducts) && checkedProducts.length < 1) {
      triggerAlert('Bạn chưa chọn sản phẩm!', false, true)
    }
    else {
      setLoading(true)
      productApi?.exportExcel(checkedProducts, checkedAll)
        .then((response) => {
          triggerAlert('Xuất file thành công', false, false)
          var link = document.createElement('a')
          var fileUrl = URL.createObjectURL(response)
          link.href = fileUrl
          link.style = 'visibility:hidden'
          link.download = 'products.xlsx'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)

        })
        .catch((error) => { console.log(error), triggerAlert('Xuất file thất bại', true, false) })
        .finally(() => setLoading(false))
    }
  }
  const handleChangeStatus = (status, product_id) => {
    productApi.updateStatusProduct(product_id, status)
      .then(() => { triggerAlert('Cập nhật thành công!', false, false), setReRender(!reRender) })
      .catch(() => triggerAlert('Cập nhật thất bại!', true, false))
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      productApi.getShopProducts(page, rowsPerPage, sort)
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
        .finally(() => setLoading(false))
    }
    if (shop_id) {
      fetchData()
    }
  }, [page, sort, reRender, rowsPerPage, shop_id])
  return (
    <Box sx={{ m: 5, minHeight: '100vh' }}>
      <BreadCrumbs links={[{ name: 'Quản lý sản phẩm', href: '' }]} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button sx={{ fontWeight: 'bold', ':hover': { bgcolor: 'inherit', borderWidth: 2 } }} size='medium'
            startIcon={<AddCircle />} variant="outlined" onClick={() => { navigate('/seller/manage/add-product') }}>
            Thêm
          </Button>
          <Button component="label" htmlFor="upload-image-shop" variant="contained" color="info" size='medium' sx={{ fontWeight: 'bold' }} >
            <FileUpload />
            Nhập file
            <input id="upload-image-shop" type="file" accept=".xlsx, .xls" style={{ display: 'none' }} onChange={handleImageChange} />
          </Button>
          {checkedProducts.length > 0 && <Button sx={{ fontWeight: 'bold' }} startIcon={<GetApp />} variant="contained" size='medium'
            onClick={handleExport}>
            Xuất file
          </Button>}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SearchById setDatas={setProducts} isProductId={true} />
          <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
            <Select value={sort} onChange={(e) => setSort(e.target.value)} >
              <MenuItem color='#444444' value={'DEFAULT'}>Mặc định</MenuItem>
              <MenuItem color='#444444' value={'STOCK_QUANTITY_DESC'}>Tồn kho giảm dần</MenuItem>
              <MenuItem color='#444444' value={'STOCK_QUANTITY_ASC'}>Tồn kho tăng dần</MenuItem>
              <MenuItem color='#444444' value={'SOLD_QUANTITY_DESC'}>Đã bán giảm dần</MenuItem>
              <MenuItem color='#444444' value={'SOLD_QUANTITY_ASC'}>Đã bán tăng dần</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ height: 'fit-content', boxShadow: '0px 0px 10px  ' }}>
        <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#2a99ff' }} >
                <TableCell><Checkbox onChange={handleChangeAll}
                  sx={{ color: 'white', '&.Mui-checked': { color: 'white', outline: '2px auto rgba(19,124,189,.6)' } }} /></TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white', width: 400 }} >Thông tin sản phẩm</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Giá (vnđ)</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Tồn kho (sản phẩm)</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Đã bán (sản phẩm)</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Trạng thái</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(products) && products?.map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell ><Checkbox checked={checkedAll ? true : checkedProducts.includes(product?.product_id)}
                      onChange={() => handleChecked(product?.product_id)} /></TableCell>
                    <TableCell >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {<img src={product?.images[0]?.file_url} alt={product?.name} style={{ width: '50px', height: '50px', borderRadius: 10 }} />}
                        <Box>
                          <Typography variant='subtitle2' color={'#444444'}>{product?.name}</Typography>
                          <Typography> Mã sản phẩm: #{product?.product_id}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell ><Typography>{formatCurrency(product?.price)}</Typography></TableCell>
                    <TableCell ><Typography>{product?.stock_quantity}</Typography> </TableCell>
                    <TableCell ><Typography>{product?.sold_quantity}</Typography> </TableCell>
                    <TableCell >
                      <Tooltip title='Cập nhật trạng thái'><Switch checked={product?.is_available}
                        onChange={(e) => handleChangeStatus(e.target.checked, product?.product_id)} /></Tooltip>
                    </TableCell>
                    <TableCell >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Tooltip title='Cập nhật'><Create sx={{ bgcolor: 'inherit', color: '#444444', cursor: 'pointer' }}
                          onClick={() => handleClickUpdate(product)} /></Tooltip>
                        <DeleteProduct productId={product?.product_id} reRender={reRender} setReRender={setReRender} />
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <PaginationFooter isNotEmpty={(Array.isArray(products) && products.length > 0)} content={'Bạn chưa có sản phẩm nào!'}
              totalElements={totalElements} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage} />
          </Table>
        </TableContainer>
      </Box>
      {loading && <Loading />}
    </Box>
  )
}

export default Products