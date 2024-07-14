import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Tab, Tabs, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import reviewApi from '../../../../apis/reviewApi'
import FeedBack from './FeedBack/FeedBack'
import BreadCrumbs from '../../../../components/BreadCrumbs/BreadCrumbs'
import PaginationFooter from '../../../../components/PaginationFooter/PaginationFooter'
import ViewReviewImages from './ViewReviewImages/ViewReviewImages'

function ManageReviews() {
  const navigate = useNavigate()
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
      .then((response) => {
        setReviews(response?.content)
        setTotalElements(response?.totalElements)
      })
      .catch((error) => { console.log(error) })
  }
  useEffect(() => {
    reviewApi.getShopReviews(page, rowsPerPage)
      .then((response) => { setReviews(response?.content) })
      .catch((error) => {
        console.log(error)
        if (error?.response?.data?.message == 'Access Denied') {
          navigate('/seller/access-denied')
        }
      })
  }, [page, reRender, rowsPerPage])
  return (
    <Box sx={{ m: 5, minHeight: '100vh' }}>
      <BreadCrumbs links={[{ name: 'Quản lý đánh giá', href: '' }]} />
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
                      <TableCell >
                        <Typography variant='body2' className='text-gray-600'>{review?.customer_name}</Typography>
                      </TableCell>
                      <TableCell >
                        <Typography variant='body2' className='text-gray-600'>{review?.content}</Typography>
                      </TableCell>
                      <TableCell >
                        <Typography variant='body2' fontWeight={'bold'} className='text-orange-600'>{review?.rate} sao</Typography>
                      </TableCell>
                      <TableCell >
                        <Box className='flex flex-row gap-2'>
                          <ViewReviewImages images={review?.files} />
                          <FeedBack review={review} reRender={reRender} setReRender={setReRender} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
            <PaginationFooter isNotEmpty={(Array.isArray(reviews) && reviews.length > 0)} content={'Bạn chưa có đánh giá sản phẩm nào!'}
              totalElements={totalElements} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage} />
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default ManageReviews