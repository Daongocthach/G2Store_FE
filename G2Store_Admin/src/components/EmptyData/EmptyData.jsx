import { Box, Typography } from '@mui/material'
import emptyOrder from '../../assets/img/empty-order.png'

function EmptyData({ content }) {
    return (
        <Box className='flex flex-col items-center p-2 min-w-fit'>
            <img src={emptyOrder} className='object-cover h-52 w-52' />
            <Typography className='text-gray-600'>{content}</Typography>
        </Box>
    )
}

export default EmptyData