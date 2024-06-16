import {
  Box, Typography, Table, TableBody, TableCell, TableHead, Paper, TableRow, TableFooter,
  TablePagination, TableContainer
} from '@mui/material'
import { useEffect, useState } from 'react'
import shopApi from '../../../apis/shopApi'
import emptyImage from '../../../assets/img/empty-order.png'
import Loading from '../../../components/Loading/Loading'
import { formatCurrency } from '../../../utils/price'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import DeleteShop from './FormShop/DeleteShop'

function Shops() {
  const [loading, setLoading] = useState(false)
  const [reRender, setReRender] = useState(false)
  const [shops, setShops] = useState([])
  const [page, setPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      shopApi.getShops(page, rowsPerPage)
        .then(response => {
          setShops(response?.content)
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
    <Box sx={{ m: 5, height: '100vh' }}>
      <BreadCrumbs links={[{ name: 'Quản lý cửa hàng', href: 'admin/manage/shops' }]} />
      <Box sx={{ height: 'fit-content', bgcolor: 'white', boxShadow: '0px 0px 10px', mt: 1 }}>
        <TableContainer component={Paper} >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#2a99ff' }} >
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Thôg tin shop</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Địa chỉ</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Doanh thu</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(shops) && shops?.map((shop, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {<img src={shop?.image} alt={shop?.name} style={{ width: '50px', height: '50px', borderRadius: 10 }} />}
                        <Box>
                          <Typography variant='subtitle2' color={'#444444'}>{shop?.name}</Typography>
                          <Typography>Id: #{shop?.shop_id}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell >
                      <Typography>{shop?.province ? (shop?.street + ', ' + shop?.ward + ', ' + shop?.district + ', ' + shop?.province) : 'Chưa cập nhật'}</Typography>
                    </TableCell>
                    <TableCell ><Typography>{formatCurrency(shop?.balance)}</Typography></TableCell>
                    <TableCell >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <DeleteShop id={shop?.shop_id} />
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            {Array.isArray(shops) && shops.length > 0 && <TableFooter>
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
        {Array.isArray(shops) && shops.length < 1 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <img src={emptyImage} />
          <Typography variant='subtitle1' color={'#444444'} >Hệ thống chưa có cửa hàng nào</Typography>
        </Box>}
      </Box>
      {loading && <Loading />}
    </Box>
  )
}

export default Shops