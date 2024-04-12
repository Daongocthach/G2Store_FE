import { Typography, Box } from '@mui/material'
import { formatCurrency } from '../../../../utils/price'
import ReviewProduct from '../ReviewProduct/ReviewProduct'
import reviewApi from '../../../../apis/reviewApi'
import { useEffect, useState } from 'react'
function OrderItem({ customerId, orderItem, orderStatus }) {
    var isReviewed = false
    const [review, setReview] = useState()
    if (orderStatus != 'SUCCESS') {
        isReviewed = true
    }
    useEffect(() => {
        reviewApi.getReviewByCustomerAndProduct(customerId, orderItem?.product.id)
            .then((response) => { setReview(response.data) })
    }, [])
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between' }}>
                <img src={orderItem?.product.image} style={{ width: '50px', height: '50px' }} />
                <Typography variant='h7' sx={{ fontWeight: 'bold', minWidth: '100px' }}>{orderItem?.product?.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between' }}>
                <Typography variant='h7'>{formatCurrency(orderItem?.productPrice)}</Typography>
                <Typography variant='h7'>x{orderItem?.quantity}</Typography>
            </Box>
            {!isReviewed && !review && <ReviewProduct product={orderItem?.product} customerId={customerId} />}
        </Box>
    )
}
export default OrderItem