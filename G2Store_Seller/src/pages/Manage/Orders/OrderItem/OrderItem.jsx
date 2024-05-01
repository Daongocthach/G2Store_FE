import { Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../../../utils/price'
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between' }}>
                <img src={orderItem?.image} style={{ width: '70px', height: '70px', cursor: 'pointer' }}
                    onClick={() => { navigate('/product-detail', { state: orderItem }) }} />
                <Box>
                    <Typography variant='subtitle1' fontWeight={'bold'} color={'#444444'} sx={{}}>{orderItem?.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
                        <Typography variant='subtitle2' color={'#444444'}>{formatCurrency(orderItem?.price)}</Typography>
                        <Typography variant='subtitle2' color={'#444444'}>x{orderItem?.quantity}</Typography>
                    </Box>
                    <Typography variant='h6' fontWeight={'bold'} color={'#cd3333'}>{formatCurrency(orderItem?.sub_total)}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between' }}>

            </Box>
        </Box>
    )
}
export default OrderItem