import {
  Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Checkbox,
  TableFooter, TablePagination, TableContainer, FormControl, Select, MenuItem, Breadcrumbs, Link, Button, Alert, Snackbar, TextField
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Reorder, FileDownload, Checklist } from '@mui/icons-material'
import { format } from 'date-fns'
import UpdateOrder from './FormOrder/UpdateOrder'
import ViewOrder from './FormOrder/ViewOrder'
import { sortByMaxId, sortByMinId } from '../../../utils/sort'
import Searchorder from './SearchOrder/SearchOrder'
import { formatCurrency } from '../../../utils/price'
import orderApi from '../../../apis/orderApi'

function Orders() {
  const [update, setUpdate] = useState(0)
  var ordersRedux = useSelector(state => state.orders.orders)
  const [orders, setOrders] = useState(sortByMaxId(ordersRedux))
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [select, setSelect] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const [isExport, setIsExport] = useState(false)
  const [checked, setChecked] = useState([])
  const [path, setPath] = useState('C:/Downloads')

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
  const handleSelectAll = () => {
    if (checked.length > 0)
      setChecked([])
    else {
      const allIds = orders?.map((order) => order.id)
      setChecked(allIds)
    }
  }
  const handleExportOrder = () => {
    const orders = checked.map(check => ({
      id: check
    }))
    orderApi.exportOrders(orders, path)
      .then(() => {
        setShowAlert(true)
      })
      .catch(() => {
        setShowAlertFail(true)
      })

  }
  useEffect(() => {
    setOrders(sortByMaxId(ordersRedux))
  }, [update])
  useEffect(() => {
    switch (select) {
      case 1:
        setOrders(sortByMaxId(orders))
        break
      case 2:
        setOrders(sortByMinId(orders))
        break
      default:
        break
    }
  }, [select])
  const handleCheck = (id) => {
    setChecked(prev => {
      const isChecked = checked.includes(id)
      if (isChecked) {
        return checked.filter(item => item != id)
      }
      else {
        return [...prev, id]
      }
    })
  }
  return (
    <Box sx={{ m: 5 }}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/dashboard">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/manage/orders">
          Quản lý đơn hàng
        </Link>
      </Breadcrumbs>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlert} autoHideDuration={1000} onClose={() => setShowAlert(false)}>
        <Alert severity="success" variant='filled' onClose={() => setShowAlert(false)}>
          Xuất file excel thành công!
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlertFail} autoHideDuration={1000} onClose={() => setShowAlertFail(false)}>
        <Alert severity="error" variant='filled' onClose={() => setShowAlertFail(false)}>
          Vui lòng kiểm tra lại nơi lưu file và tên!
        </Alert>
      </Snackbar>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Button startIcon={<Reorder />} sx={{ fontWeight: 'bold' }} variant="outlined" onClick={() => { setIsExport(!isExport) }}>Export Orders</Button>
          {isExport && <Button variant="contained" startIcon={<Checklist />} onClick={handleSelectAll}>Select All</Button>}
          {checked.length > 0 && isExport && <Button variant="contained" startIcon={<FileDownload />} onClick={handleExportOrder}>Export</Button>}
          {checked.length > 0 && isExport && <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Typography variant='h7' fontWeight={'bold'}>Location</Typography>
            <TextField defaultValue={'C:/Downloads'} value={path} size='small' onChange={(e) => { setPath(e.target.value) }}></TextField>
          </Box>}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          <Searchorder setOrders={setOrders} />
          <Typography variant='body1' fontWeight={'bold'} >Sắp xếp</Typography>
          <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
            <Select value={select} onChange={handleChange} defaultValue={10} >
              <MenuItem value={1}>Mới nhất</MenuItem>
              <MenuItem value={2}>Cũ nhất</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ height: 'fit-content', width: '100%', bgcolor: 'white', boxShadow: '0px 0px 10px' }}>
        <TableContainer component={Paper}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                {isExport && <TableCell sx={{ fontWeight: 'bold' }} align="center"></TableCell>}
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Id</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">CreateDate</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Total</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Notes</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">CustomerId</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">View</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Update Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => {
                return (
                  <TableRow key={index}>
                    {isExport && <TableCell align="center"><Checkbox checked={checked.includes(order.id)} onChange={() => handleCheck(order.id)} /></TableCell>}
                    <TableCell align="center">{order?.id}</TableCell>
                    <TableCell align="center">{format(new Date(order?.createdDate), 'yyyy-MM-dd')}</TableCell>
                    <TableCell align="center">{formatCurrency(order?.total)}</TableCell>
                    <TableCell align="center">{order?.note}</TableCell>
                    <TableCell align="center">{order?.customer.id}</TableCell>
                    <TableCell align="center">{order?.orderStatus}</TableCell>
                    <TableCell align="center"><ViewOrder order={order} /></TableCell>
                    {order?.orderStatus != 'CANCEL' && order?.orderStatus != 'SUCCESS' &&
                      <TableCell align="center"><UpdateOrder setUpdate={setUpdate} order={order} /></TableCell>}
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={12}
                  rowsPerPageOptions={[5, 10, { value: orders?.length, label: 'All' }]}
                  count={orders?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Orders