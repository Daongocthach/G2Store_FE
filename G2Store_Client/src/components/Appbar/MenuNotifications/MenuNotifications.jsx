import { useState, useEffect } from 'react'
import { Box, Typography, Popover, Divider, Badge, Tooltip, Snackbar } from '@mui/material'
import { Notifications, Close, Adb, AddBusiness } from '@mui/icons-material'
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import notificationApi from '../../../apis/notificationApi'
import Notification from '../../Notification/Notification'
import EmptyData from '../../EmptyData/EmptyData'

var stompClient = null

function MenuNotifications() {
    const [anchorEl, setAnchorEl] = useState(null)
    const [notifications, setNotifications] = useState([])
    const [newNotification, setNewNotification] = useState({})
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(20)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }
    const connect = () => {
        if (stompClient && stompClient?.connected) {
            return
        }
        let Sock = new SockJS('http://localhost:8080/ws')
        stompClient = over(Sock)
        stompClient.connect({}, function () {
            stompClient.subscribe('/all/notifications', function (result) {
                setNewNotification(JSON.parse(result.body))
                setNotifications([JSON.parse(result.body), ...notifications])
                setSnackbarOpen(true)
            })
        }, function (error) {
            console.error('STOMP connection error:', error)
        })
    }
    useEffect(() => {
        connect()
        notificationApi.getNotifications(page, size)
            .then((response) => {
                setNotifications(response?.content)
            })
            .catch((error) => { console.log(error) })
    }, [])
    return (
        <Box >
            <Tooltip title="Thông báo">
                <Badge color="warning" badgeContent={(Array.isArray(notifications) && notifications.length > 0) ? notifications.length : 0}
                    className="cursor-pointer">
                    <Notifications className="text-white" onClick={handleClick} />
                </Badge>
            </Tooltip>
            <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}>
                <Box className='flex flex-row items-center gap-5 bg-gray-700 p-3 rounded-lg'>
                    <Box className=''>
                        {newNotification?.isPublic ?
                            <Box className='flex flex-row items-center gap-2'>
                                <Adb className='text-white' sx={{ fontSize: 30 }} />
                                <Box>
                                    <Typography variant='body1' fontWeight={'bold'} className='text-white'>Bạn có thông báo từ hệ thống!</Typography>
                                    <Typography variant='body2' className='text-white line-clamp-2 w-52'>{newNotification?.content}</Typography>
                                </Box>
                            </Box>
                            :
                            <Box className='flex flex-row items-center gap-2'>
                                <AddBusiness className='text-white' sx={{ fontSize: 30 }} />
                                <Typography variant='body2' className='text-white'>Bạn có thông báo từ người bán hàng!</Typography>
                            </Box>}
                    </Box>
                    <Close fontSize="small" className='text-white' onClick={handleSnackbarClose} />
                </Box>
            </Snackbar>
            <Popover open={open} anchorEl={anchorEl} onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'center', horizontal: 'right' }} >
                <Box className='flex flex-row items-center justify-between p-2 bg-blue-500 h-12'>
                    <Box className='flex flex-row items-center gap-2'>
                        <Notifications className='text-white' />
                        <Typography variant='subtitle1' fontWeight={'bold'} className='text-white'>Thông báo</Typography>
                    </Box>
                    <Close className='text-white' sx={{ fontSize: 20 }} onClick={handleClose} />
                </Box>
                <Divider />
                {(Array.isArray(notifications) && notifications.length > 0) ?
                    notifications.map((notification, index) => (
                        <Notification notification={notification} key={index} isShort={true} />
                    ))
                    :
                    <EmptyData content={'Không có thông báo nào!'} />
                }
            </Popover>
        </Box>
    )
}

export default MenuNotifications