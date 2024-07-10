import { Box, Typography } from '@mui/material'
import { Campaign } from '@mui/icons-material'
import { format } from 'date-fns'

function Notification({ notification, isShort }) {
    return (
        <Box className={`flex flex-row items-center p-2 gap-6 ${isShort ? 'w-80' : ''} `}>
            <Campaign className='text-gray-700' />
            <Box className='flex flex-col gap-1 w-full'>
                <Typography variant='subtitle1' fontWeight={'bold'} className='text-gray-700' >{'Thông báo hệ thống'}</Typography>
                <Typography variant='body2'
                     >{notification?.content}</Typography>
                <Typography className='text-gray-700' fontSize={14}>
                    {notification?.createdDate && format(new Date(notification?.createdDate), 'dd/MM/yyyy HH:mm:ss')}
                </Typography>
            </Box>
        </Box>
    )
}

export default Notification