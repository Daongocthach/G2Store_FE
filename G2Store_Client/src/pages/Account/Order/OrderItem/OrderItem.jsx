import { Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../../../utils/price'
import ReviewProduct from '../ReviewProduct/ReviewProduct'

function OrderItem({ orderItem, orderStatus, reRender, setReRender }) {
    const navigate = useNavigate()
    console.log('abc', orderItem?.image)
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between' }}>
                <img src={orderItem?.image || 'https://th.bing.com/th/id/OIP.ZIa3xzj07l3T0PdN67z1iwHaHa?rs=1&pid=ImgDetMain'}
                    style={{ width: '70px', height: '70px', cursor: 'pointer', borderRadius: 5 }}
                    onClick={() => { navigate('/product-detail', { state: orderItem?.product_id }) }} />
                <Box>
                    <Typography variant='subtitle1' fontWeight={'bold'} color={'#444444'} sx={{}}>{orderItem?.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
                        <Typography variant='subtitle2' color={'#444444'}>{formatCurrency(orderItem?.price)}</Typography>
                        <Typography variant='subtitle2' color={'#444444'}>x{orderItem?.quantity}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
                        <Typography variant='subtitle1' fontWeight={'bold'} color={'#cd3333'}>Tiền hàng: {formatCurrency(orderItem?.sub_total)}</Typography>
                        {orderStatus === 'RECEIVED' && !orderItem?.is_reviewed && <ReviewProduct orderItem={orderItem} reRender={reRender} setReRender={setReRender} />}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default OrderItem