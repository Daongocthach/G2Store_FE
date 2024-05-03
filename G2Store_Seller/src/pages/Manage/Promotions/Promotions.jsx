import {
  Box, Typography, Table, TableBody, TableCell, TableHead, Paper, TableRow, TableFooter,
  TablePagination, TableContainer, FormControl, Select, MenuItem, Breadcrumbs, Link, Button
} from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import UpdatePromotion from './FormPromotion/UpdatePromotion'
import DeletePromotion from './FormPromotion/DeletePromotion'
import promotionApi from '../../../apis/promotionApi'
import { listPromotions } from '../../../redux/actions/promotions'
import { formatCurrency } from '../../../utils/price'
import emptyImage from '../../../assets/img/empty-order.png'

function Promotions() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const promotions = useSelector(state => state.promotions.promotions)
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
    // promotionApi.getShopPromotions(1)
    //   .then(response => {
    //     dispatch(listPromotions(response.data))
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }, [])
  return (
    <Box sx={{ m: 5, height: '100vh' }}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/seller/dashboard">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/seller/manage/promotions">
          Quản lý khuyến mãi
        </Link>
      </Breadcrumbs>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Button sx={{ fontWeight: 'bold', ':hover': { bgcolor: 'inherit', borderWidth: 2 } }} startIcon={<AddCircle />} variant="outlined"
          onClick={() => { navigate('/seller/manage/add-promotion') }}>
          Thêm khuyến mãi
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          <Typography variant='body1' fontWeight={'bold'} >Sắp xếp</Typography>
          <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
            <Select value={select} onChange={handleChange} >
              <MenuItem value={1}>Mới nhất</MenuItem>
              <MenuItem value={2}>Cũ nhất</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ height: 'fit-content', bgcolor: 'white', boxShadow: '0px 0px 10px' }}>
        <TableContainer component={Paper} >
          <Table>
            <TableHead>
              <TableRow >
                <TableCell sx={{ fontWeight: 'bold' }} >Tên khuyến mãi</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Thời gian sử dụng</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Loại khuyến mãi</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Số lượng</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Giá trị khuyến mãi</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Update</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {Array.isArray(promotions) && promotions.map((promotion, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell >
                      <Typography variant='body2' maxWidth={150}>{promotion?.name}</Typography>
                    </TableCell>
                    <TableCell >
                      <Box>
                        <Typography variant='body2' maxWidth={150}><i>Từ:</i> {format(new Date(promotion?.startDate), 'yyyy-MM-dd')}</Typography>
                        <Typography variant='body2' maxWidth={150}><i>Đến:</i> {format(new Date(promotion?.endDate), 'yyyy-MM-dd')}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell >{promotion?.promotionType}</TableCell>
                    <TableCell >{promotion?.quantity}</TableCell>
                    <TableCell >
                      <Box>
                        <Typography variant='body2' maxWidth={150}><i>Giá trị:</i> {formatCurrency(promotion?.priceDiscount)}</Typography>
                        <Typography variant='body2' maxWidth={150}><i>Giá trị tối thiểu:</i> {formatCurrency(promotion?.minSpend)}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell ><UpdatePromotion /></TableCell>
                    <TableCell ><DeletePromotion /></TableCell>
                  </TableRow>
                )
              })} */}
            </TableBody>
            {Array.isArray(promotions) && promotions.length > 0 && <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={12}
                  labelRowsPerPage={'Số lượng mỗi trang'}
                  rowsPerPageOptions={[5, { value: 5, label: 'Tất cả' }]}
                  count={5}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>}
          </Table>
        </TableContainer>
        {Array.isArray(promotions) && promotions.length < 1 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <img src={emptyImage} />
          <Typography variant='h6' >Bạn chưa có mã khuyến mãi nào</Typography>
        </Box>}
      </Box>
    </Box>
  )
}

export default Promotions