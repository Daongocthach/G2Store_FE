import { Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../../../utils/price'
import ReviewProduct from '../FormOrder/ReviewProduct'

function OrderItem({ orderItem, orderStatus, reRender, setReRender }) {
    const navigate = useNavigate()
    return (
        <Box className='flex flex-row items-center gap-1 mt-1 mb-1 justify-between'>
            <Box className='flex flex-row items-center gap-1 mt-1 mb-1 justify-between'>
                <img src={orderItem?.image || 'https://th.bing.com/th/id/OIP.ZIa3xzj07l3T0PdN67z1iwHaHa?rs=1&pid=ImgDetMain'}
                    className='w-16 h-16 cursor-pointer rounded-md'
                    onClick={() => { navigate('/product-detail', { state: orderItem?.product_id }) }} />
                <Box>
                    <Typography className='text-gray-600' variant='subtitle2'>{orderItem?.name}</Typography>
                    <Typography className='text-gray-600' variant='body2' >{formatCurrency(orderItem?.price)} x{orderItem?.quantity}</Typography>
                    {orderStatus === 'RECEIVED' && !orderItem?.is_reviewed &&
                        <ReviewProduct orderItem={orderItem} reRender={reRender} setReRender={setReRender} />}
                </Box>
            </Box>
        </Box>
    )
}
export default OrderItem