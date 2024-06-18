import { Typography, Box } from '@mui/material'
import { formatCurrency } from '../../../../utils/price'

function OrderItem({ orderItem }) {
    return (
        <Box className='flex flex-row items-center justify-between gap-1 mt-1'>
            <Box sx={{ display: 'flex', gap: 1, mt: 1, mb: 1, justifyContent: 'space-between' }}>
                <img src={orderItem?.image} className="object-cover h-20 w-20 rounded-md cursor-pointer" />
                <Box>
                    <Typography fontSize={14} className="text-gray-700 w-36 line-clamp-2">{orderItem?.name}</Typography>
                    <Typography fontSize={13} className='text-gray-600'>{formatCurrency(orderItem?.price)}</Typography>
                    <Typography fontSize={13} className='text-gray-600'>x{orderItem?.quantity}</Typography>
                </Box>
            </Box>
        </Box>
    )
}
export default OrderItem