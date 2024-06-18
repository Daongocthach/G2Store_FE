import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../utils/price'

{/**Cart, Checkout, Order */}
function OrderItem({ shop_item, isCheckout }) {
    const navigate = useNavigate()

    return (
        <Box className='flex flex-row gap-2'>
            <img src={shop_item?.image} alt='omachi' className="object-cover h-20 w-20 rounded-md cursor-pointer"
                onClick={() => { navigate('/product-detail', { state: shop_item?.product_id }) }}
            />
            <Box>
                <Typography fontSize={14} className="text-gray-700 w-36 line-clamp-2">{shop_item?.name}</Typography>
                <Typography fontSize={13} className='text-gray-600'>{formatCurrency(shop_item?.price)}</Typography>
                {isCheckout && <Typography fontSize={13} className='text-gray-600'>x{shop_item?.quantity}</Typography>}
            </Box>
        </Box>
    )
}

export default OrderItem