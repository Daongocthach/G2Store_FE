import { Typography, Box } from '@mui/material'
import { formatCurrency } from '../../../../utils/price'

function OrderItem({ orderItem }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between' }}>
                <img src={orderItem?.image} style={{ width: '70px', height: '70px', cursor: 'pointer', borderRadius: 5 }} />
                <Box>
                    <Typography variant='subtitle1' fontWeight={'bold'} color={'#444444'} sx={{}}>{orderItem?.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
                        <Typography variant='subtitle2' color={'#444444'}>{formatCurrency(orderItem?.price)}</Typography>
                        <Typography variant='subtitle2' color={'#444444'}>x{orderItem?.quantity}</Typography>
                    </Box>
                    <Typography variant='subtitle1' fontWeight={'bold'} color={'#cd3333'}>Tiền hàng: {formatCurrency(orderItem?.sub_total)}</Typography>
                </Box>
            </Box>
        </Box>
    )
}
export default OrderItem