import { Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../../../utils/price'
import { useState, useEffect } from 'react'
import productApi from '../../../../apis/productApi'
import ReviewProduct from '../ReviewProduct/ReviewProduct'

function OrderItem({ orderItem, orderStatus, reRender, setReRender }) {
    const navigate = useNavigate()
    const [productCart, setProductCart] = useState()
    useEffect(() => {
        productApi.getProduct(orderItem?.product_id)
            .then((response) => {
                setProductCart(response)
            })
    }, [])
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between' }}>
                <img src={orderItem?.image} style={{ width: '70px', height: '70px', cursor: 'pointer', borderRadius: 5 }}
                    onClick={() => { navigate('/product-detail', { state: productCart }) }} />
                <Box>
                    <Typography variant='subtitle1' fontWeight={'bold'} color={'#444444'} sx={{}}>{orderItem?.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
                        <Typography variant='subtitle2' color={'#444444'}>{formatCurrency(orderItem?.price)}</Typography>
                        <Typography variant='subtitle2' color={'#444444'}>x{orderItem?.quantity}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
                        <Typography variant='subtitle1' fontWeight={'bold'} color={'#cd3333'}>Tiền hàng: {formatCurrency(orderItem?.sub_total)}</Typography>
                        {orderStatus === 'RECEIVED' && !orderItem?.is_reviewed && <ReviewProduct orderItem={orderItem} reRender={reRender} setRerender={setReRender} />}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default OrderItem