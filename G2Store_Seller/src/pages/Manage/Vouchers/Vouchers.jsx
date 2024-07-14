import {
  Box, Typography, Table, TableBody, TableCell, TableHead, Paper, TableRow,
  TableContainer, FormControl, Select, MenuItem, Button
} from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { formatCurrency } from '../../../utils/price'
import voucherApi from '../../../apis/voucherApi'
import Loading from '../../../components/Loading/Loading'
import Search from '../../../components/Search/Search'
import AddVoucherToProducts from './FormVoucher/AddVoucherToProducts'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import PaginationFooter from '../../../components/PaginationFooter/PaginationFooter'
import PauseVoucher from './FormVoucher/PauseVoucher'

function Vouchers() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [reRender, setReRender] = useState(false)
  const [vouchers, setVouchers] = useState([])
  const [voucherName, setVoucherName] = useState('')
  const [voucherId, setVoucherId] = useState('')
  const [page, setPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [status, setStatus] = useState('ALL')

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const fetchData = async () => {
    setLoading(true)
    voucherApi.getShopVouchers(page, rowsPerPage, status, voucherName, voucherId)
      .then(response => {
        setVouchers(response?.content)
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
  useEffect(() => {
    fetchData()
  }, [page, status, reRender, rowsPerPage])
  return (
    <Box sx={{ m: 5, height: '100vh' }}>
      <BreadCrumbs links={[{ name: 'Quản lý mã giảm giá', href: '' }]} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Button sx={{ fontWeight: 'bold', ':hover': { bgcolor: 'inherit', borderWidth: 2 } }} startIcon={<AddCircle />} variant="outlined"
          onClick={() => { navigate('/seller/manage/add-voucher') }}>
          Thêm
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Search fetchData={fetchData} isVoucherName={true} setVoucherName={setVoucherName} reRender={reRender} setReRender={setReRender} />
          <Search fetchData={fetchData} isVoucherId={true} setVoucherId={setVoucherId} reRender={reRender} setReRender={setReRender} />
          <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
            <Select value={status} onChange={(e) => setStatus(e.target.value)} >
              <MenuItem color='#444444' value={'ALL'}>Tất cả</MenuItem>
              <MenuItem color='#444444' value={'STARTED'}>Đã bắt đầu</MenuItem>
              <MenuItem color='#444444' value={'NOT_STARTED'}>Chưa bắt đầu</MenuItem>
              <MenuItem color='#444444' value={'PAUSED'}>Đã dừng</MenuItem>
              <MenuItem color='#444444' value={'EXPIRED'}>Đã hết hạn</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ height: 'fit-content', bgcolor: 'white', boxShadow: '0px 0px 10px' }}>
        <TableContainer component={Paper} >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#2a99ff' }} >
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Mã</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white', width: 150 }} >Tên</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white', width: 150 }} >Thời gian</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Loại mã</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Kiểu</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Đã dùng / Số lượng</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Đơn tối thiểu (vnđ)</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Giá trị (vnđ/%)</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Trạng thái</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(vouchers) && vouchers?.map((voucher, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell ><Typography variant='body2'>{voucher?.id}</Typography></TableCell>
                    <TableCell ><Typography variant='body2'>{voucher?.name}</Typography></TableCell>
                    <TableCell > <Box>
                      <Typography variant='body2' ><i>Từ:</i> {format(new Date(voucher?.start_date), 'yyyy-MM-dd')}</Typography>
                      <Typography variant='body2' ><i>Đến:</i> {format(new Date(voucher?.end_date), 'yyyy-MM-dd')}</Typography>
                    </Box></TableCell>
                    <TableCell ><Typography variant='body2'>{voucher?.voucher_type}</Typography></TableCell>
                    <TableCell ><Typography variant='body2'>{voucher?.discount_type}</Typography></TableCell>
                    <TableCell ><Typography variant='body2'>{voucher?.use_count}/{voucher?.quantity}</Typography> </TableCell>
                    <TableCell ><Typography variant='body2'>{formatCurrency(voucher?.min_spend)}</Typography> </TableCell>
                    <TableCell >
                      <Typography variant='body2'>
                        {voucher?.discount_type === 'PRICE' ? formatCurrency(voucher?.reduce_price) : (voucher?.reduce_percent + '%')}
                      </Typography>
                    </TableCell>
                    <TableCell >
                      <PauseVoucher voucher={voucher} reRender={reRender} setReRender={setReRender} />
                    </TableCell>
                    <TableCell >
                      <AddVoucherToProducts voucher_id={voucher?.id} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <PaginationFooter isNotEmpty={(Array.isArray(vouchers) && vouchers.length > 0)} content={'Bạn chưa có mã giảm giá nào!'}
              totalElements={totalElements} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage} />
          </Table>
        </TableContainer>
      </Box>
      {loading && <Loading />}
    </Box>
  )
}

export default Vouchers