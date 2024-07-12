import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../utils/price'
import productApi from '../../apis/productApi'
import { useEffect, useState } from 'react'

{/**Cart, Checkout, Order */ }
function OrderItem({ shop_item, isCheckout, isCart, setIsSoldOut }) {
    const navigate = useNavigate()
    const [soldOut, setSoldOut] = useState(false)
    useEffect(() => {
        if (isCart)
            productApi.getProduct(shop_item?.product_id)
                .then(response => {
                    if (response?.stock_quantity < 1) {
                        setSoldOut(true)
                        setIsSoldOut(true)
                    }
                })
    }, [shop_item?.product_id])
    return (
        <Box className='flex flex-row gap-2'>
            <Box className='relative h-16 w-16 rounded-md cursor-pointer'>
                <img src={shop_item?.image} alt='omachi' className="object-cover h-16 w-16 rounded-md"
                    style={{ opacity: soldOut ? 0.8 : 1 }}
                    onClick={() => { navigate('/product-detail', { state: shop_item?.product_id }) }} />
                {soldOut && <Typography variant='body2' className='absolute inset-0 flex items-center justify-center text-red-600' >
                    Hết hàng
                </Typography>}
            </Box>
            <Box>
                <Typography fontSize={14} className="text-gray-700 w-36 line-clamp-2">{shop_item?.name}</Typography>
                <Typography fontSize={13} className='text-gray-600'>{formatCurrency(shop_item?.price)}</Typography>
                {isCheckout && <Typography fontSize={13} className='text-gray-600'>x{shop_item?.quantity}</Typography>}
            </Box>
        </Box>
    )
}

export default OrderItem