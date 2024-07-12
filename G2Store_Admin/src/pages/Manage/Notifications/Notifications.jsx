import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import format from 'date-fns/format'
import Loading from '../../../components/Loading/Loading'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import AddNotification from './AddNotification/AddNotification'
import PaginationFooter from '../../../components/PaginationFooter/PaginationFooter'
import DeleteNotification from './DeleteNotification/DeleteNotification'
import notificationApi from '../../../apis/notificationApi'

function Notifications() {
    const [loading, setLoading] = useState(false)
    const [notifications, setNotifications] = useState([])
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
    useEffect(() => {
        setLoading(true)
        notificationApi.getNotifications(page, rowsPerPage)
            .then(response => {
                setNotifications(response?.content)
                setTotalElements(response?.totalElements)
            })
            .finally(() => setLoading(false))
    }, [page, rowsPerPage])

    return (
        <Box sx={{ m: 5, minHeight: '100vh' }}>
            <BreadCrumbs links={[{ name: 'Quản lý thông báo', href: '' }]} />
            <AddNotification notifications={notifications} setNotifications={setNotifications} />
            <Box sx={{ height: 'fit-content', bgcolor: 'white', boxShadow: '0px 0px 10px', mt: 1 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#2a99ff' }} >
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Id</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Ngày tạo</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Nội dung</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} >Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(notifications) && notifications?.map((notification, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell ><Typography >{notification?.notificationId}</Typography></TableCell>
                                        <TableCell><Typography>
                                            {notification?.createdDate && format(new Date(notification?.createdDate), 'dd/MM/yyyy HH:mm:ss')}
                                        </Typography></TableCell>
                                        <TableCell ><Typography className='w-52 line-clamp-2' >{notification?.content}</Typography></TableCell>
                                        <TableCell><DeleteNotification /></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                        <PaginationFooter isNotEmpty={(Array.isArray(notifications) && notifications.length > 0)}
                            content={'Bạn chưa có thông báo nào!'}
                            totalElements={totalElements} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage} />
                    </Table>
                </TableContainer>
            </Box>
            {loading && <Loading />}
        </Box>
    )
}

export default Notifications