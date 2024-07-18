import { Box, Typography, Table, TableBody, TableCell, TableHead, Paper, TableRow, TableContainer } from '@mui/material'
import { useEffect, useState } from 'react'
import shopApi from '../../../apis/shopApi'
import Loading from '../../../components/Loading/Loading'
import { formatCurrency } from '../../../utils/price'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import DeleteShop from './FormShop/DeleteShop'
import PaginationFooter from '../../../components/PaginationFooter/PaginationFooter'
import ViewBank from './FormShop/ViewBank'

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
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Mã shop</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Tên shop</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Địa chỉ</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Doanh thu</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Điểm vi phạm</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(shops) && shops?.map((shop, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell><Typography variant='body2'>#{shop?.shop_id}</Typography></TableCell>
                    <TableCell className='w-40'> <Typography variant='body2' >{shop?.name}</Typography></TableCell>
                    <TableCell className='w-72'>
                      <Typography>
                        {shop?.province_name ? (shop?.street + ', ' + shop?.ward_name + ', ' + shop?.district_name + ', ' + shop?.province_name) : 'Chưa cập nhật'}
                      </Typography>
                    </TableCell>
                    <TableCell variant='body'><Typography >{formatCurrency(shop?.balance)}</Typography></TableCell>
                    <TableCell ><Typography variant='body2'>{shop?.violation_point}</Typography></TableCell>
                    <TableCell sx={{ display: 'flex', gap: 2 }}>
                      <DeleteShop id={shop?.shop_id} />
                      <ViewBank shop={shop} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <PaginationFooter isNotEmpty={(Array.isArray(shops) && shops.length > 0)} content={'Bạn chưa có shop nào!'}
              totalElements={totalElements} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage} />
          </Table>
        </TableContainer>
      </Box>
      {loading && <Loading />}
    </Box>
  )
}

export default Shops