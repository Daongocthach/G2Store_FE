import {
    Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Checkbox, Tab, Tabs,
    TableFooter, TablePagination, TableContainer, FormControl, Select, MenuItem, Breadcrumbs, Link, Divider
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import { formatCurrency } from '../../../../utils/price'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'

function ManageReviews() {
    const [reviews, setReviews] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [select, setSelect] = useState(1)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)
    const [isExport, setIsExport] = useState(false)
    const [tab, setTab] = useState(1)

    const handleChangeTab = (event, newTab) => {
        setTab(newTab)
    }
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
    return (
        <Box sx={{ m: 5, minHeight: '100vh' }}>
            <Breadcrumbs>
                <Link underline="hover" color="inherit" href="/dashboard">
                    Trang chủ
                </Link>
                <Link underline="hover" color="inherit" href="/manage/reviews">
                    Quản lý đánh giá
                </Link>
            </Breadcrumbs>
            <Typography variant='h5' sx={{ fontWeight: 'bold', minWidth: '100px', m: 2 }}>Quản lý đánh giá</Typography>
            <Divider />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={handleChangeTab} >
                    <Tab label='Chi tiết đánh giá sản phẩm' value={1} sx={{ fontWeight: 'bold' }} />
                    <Tab label='Chưa được đánh giá' value={2} sx={{ fontWeight: 'bold' }} />
                </Tabs>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Button startIcon={<Reorder />} sx={{ fontWeight: 'bold' }} variant="outlined" onClick={() => { setIsExport(!isExport) }}>Export Orders</Button>
            {isExport && <Button variant="contained" startIcon={<Checklist />} onClick={handleSelectAll}>Select All</Button>}
            {checked.length > 0 && isExport && <Button variant="contained" startIcon={<FileDownload />} onClick={handleExportOrder}>Export</Button>}
            {checked.length > 0 && isExport && <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
              <Typography variant='h7' fontWeight={'bold'}>Location</Typography>
              <TextField defaultValue={'C:/Downloads'} value={path} size='small' onChange={(e) => { setPath(e.target.value) }}></TextField>
            </Box>}
          </Box> */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
                    {/* <Search /> */}
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
                                <TableCell sx={{ fontWeight: 'bold' }} >Nội dung</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} >Đánh giá</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} >Chất lượng sản phẩm</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} >Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell >
                                    <Typography variant='body2' sx={{
                                        maxWidth: 250,
                                        flexWrap: 'wrap'
                                    }} >{'Sản phẩm chất lượng tốt agoaij aogijso aogjao ajgoaijg ajoagj'}</Typography>
                                </TableCell>
                                <TableCell >
                                    <Typography variant='body2' maxWidth={150}>{'5 sao'}</Typography>
                                </TableCell>
                                <TableCell >{'Tốt'}</TableCell>
                                <TableCell >Phản hồi</TableCell>
                            </TableRow>
                            {/* {orders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => {
                                return (
                                    <TableRow key={index}>
                                        {isExport && <TableCell ><Checkbox checked={checked.includes(order.id)} onChange={() => handleCheck(order.id)} /></TableCell>}
                                        <TableCell >{order?.id}</TableCell>
                                        <TableCell >{format(new Date(order?.createdDate), 'yyyy-MM-dd')}</TableCell>
                                        <TableCell >{formatCurrency(order?.total)}</TableCell>
                                        <TableCell >{order?.note}</TableCell>
                                        <TableCell >{order?.customer.id}</TableCell>
                                        <TableCell >{order?.orderStatus}</TableCell>
                                        <TableCell ><ViewOrder order={order} /></TableCell>
                                        {order?.orderStatus != 'CANCEL' && order?.orderStatus != 'SUCCESS' &&
                                            <TableCell ><UpdateOrder setUpdate={setUpdate} order={order} /></TableCell>}
                                    </TableRow>
                                )
                            })} */}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={12}
                                    rowsPerPageOptions={[5, 10, { value: 0, label: 'All' }]}
                                    count={0}
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
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Xuất file thành công'} />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Xuất file thất bại'} isFail={true} />
        </Box>
    )
}

export default ManageReviews