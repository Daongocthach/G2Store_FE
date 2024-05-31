import {
  Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter,
  TablePagination, Paper, TableContainer, Divider, Tab, Tabs, Breadcrumbs, Link
} from '@mui/material'
import { useEffect, useState } from 'react'
import reviewApi from '../../../../apis/reviewApi'
import emptyImage from '../../../../assets/img/empty-order.png'
import FeedBack from './FeedBack/FeedBack'

function ManageReviews() {
  const [tab, setTab] = useState('')
  const [reRender, setReRender] = useState(false)
  const [reviews, setReviews] = useState([])
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
  const handleChange = (event, newTab) => {
    setTab(newTab)
    reviewApi.getShopReviews(0, rowsPerPage, newTab)
      .then((response) => { setReviews(response?.content) })
      .catch((error) => { console.log(error) })
  }
  useEffect(() => {
    reviewApi.getShopReviews(page, rowsPerPage)
      .then((response) => { setReviews(response?.content) })
      .catch((error) => { console.log(error) })
  }, [page, reRender, rowsPerPage])
  return (
    <Box sx={{ m: 5, minHeight: '100vh' }}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/dashboard">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/manage/orders">
          Quản lý đánh giá
        </Link>
      </Breadcrumbs>
      <Typography variant='h5' sx={{ fontWeight: 'bold', minWidth: '100px', m: 2 }}>Quản lý đơn hàng</Typography>
      <Divider />
      <Box sx={{ mb: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={handleChange} textColor="primary" variant="scrollable" >
            <Tab label='Tất cả' value={''} />
            <Tab label='5 Sao' value={5} color='blue' />
            <Tab label='4 Sao' value={4} />
            <Tab label='3 Sao' value={3} />
            <Tab label='2 Sao' value={2} />
            <Tab label='1 Sao' value={1} />
          </Tabs>
        </Box>
      </Box>
      <Box sx={{ height: 'fit-content', boxShadow: '0px 0px 10px', mt: 2 }}>
        <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#2a99ff' }} >
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Hình ảnh</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Khách hàng</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white', width: 300 }} >Nội dung</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Đánh giá</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(reviews) && reviews
                ?.map((review, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <img src={review?.files[0]?.file_url || emptyImage} alt={'Đánh giá'} style={{ width: '50px', height: '50px', borderRadius: 10 }} />
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '' }}>{review?.customer_name}</TableCell>
                      <TableCell>{review?.content}</TableCell>
                      <TableCell sx={{ color: 'orange', fontWeight: 'bold' }}>{review?.rate} sao</TableCell>
                      <TableCell><FeedBack review={review} reRender={reRender} setReRender={setReRender} /></TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
            {Array.isArray(reviews) && reviews.length > 0 && <TableFooter>
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
        {Array.isArray(reviews) && reviews.length < 1 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 2 }}>
          <img src={emptyImage} />
          <Typography variant='h6' >Bạn chưa có sản phẩm nào được đánh giá!</Typography>
        </Box>}
      </Box>
    </Box>
  )
}

export default ManageReviews