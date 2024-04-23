import { Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../../../utils/price'
import ReviewProduct from '../ReviewProduct/ReviewProduct'
import reviewApi from '../../../../apis/reviewApi'
import { useEffect, useState } from 'react'
function OrderItem({ orderItem, orderStatus }) {
    const navigate = useNavigate()
    var isReviewed = false
    const [review, setReview] = useState()
    if (orderStatus != 'SUCCESS') {
        isReviewed = true
    }
    // useEffect(() => {
    //     reviewApi.getReviewByCustomerAndProduct(customerId, orderItem?.product.id)
    //         .then((response) => { setReview(response.data) })
    // }, [])
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between' }}>
                <img src={orderItem?.image} style={{ width: '70px', height: '70px', cursor: 'pointer' }}
                    onClick={() => { navigate('/product-detail', { state: orderItem }) }} />
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold', minWidth: '100px' }}>{orderItem?.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between' }}>
                <Typography variant='subtitle1' color={'red'}>{formatCurrency(orderItem?.price)}</Typography>
                <Typography variant='subtitle1'>x{orderItem?.quantity}</Typography>
            </Box>
        </Box>
    )
}
export default OrderItem