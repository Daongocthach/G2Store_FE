import { Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../../../utils/price'
import { useState, useEffect } from 'react'
import productApi from '../../../../apis/productApi'

function OrderItem({ orderItem }) {
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
                    <Typography variant='h6' fontWeight={'bold'} color={'#cd3333'}>{formatCurrency(orderItem?.sub_total)}</Typography>
                </Box>
            </Box>
        </Box>
    )
}
export default OrderItem