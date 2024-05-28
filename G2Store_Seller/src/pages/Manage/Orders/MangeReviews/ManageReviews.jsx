import {
  Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter,
  TablePagination, Paper, TableContainer, FormControl, Select, MenuItem, Breadcrumbs, Link, Tooltip
} from '@mui/material'
import { Create } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import reviewApi from '../../../../apis/reviewApi'
import { formatCurrency } from '../../../../utils/price'
import emptyImage from '../../../../assets/img/empty-order.png'
import FeedBack from './FeedBack/FeedBack'

function ManageReviews() {
  const [reRender, setReRender] = useState(false)
  const [reviews, setReviews] = useState([])
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
  const handleClickUpdate = () => {

  }
  useEffect(() => {
    reviewApi.getShopReviews()
      .then((response) => {
        setReviews(response)
      })
      .catch((error) => {
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
          Quản lý đánh giá
        </Link>
      </Breadcrumbs>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
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
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Hình ảnh</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Khách hàng</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Đánh giá</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Nội dung</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(reviews) && reviews
                ?.filter(review => review.shop_feed_back === null)
                ?.map((review, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <img src={review?.files[0]?.file_url || emptyImage} alt={'Đánh giá'} style={{ width: '50px', height: '50px', borderRadius: 10 }} />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography>{review?.customer_name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{review?.content}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{review?.rate}</Typography>
                      </TableCell>
                      <TableCell>
                        <FeedBack review={review} reRender={reRender} setReRender={setReRender} />
                      </TableCell>
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
        {Array.isArray(reviews) && reviews.length < 1 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <img src={emptyImage} />
          <Typography variant='h6' >Bạn chưa có sản phẩm nào</Typography>
        </Box>}
      </Box>
    </Box>
  )
}

export default ManageReviews