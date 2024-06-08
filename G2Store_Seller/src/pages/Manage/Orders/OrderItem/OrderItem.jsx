import { Typography, Box } from '@mui/material'
import { formatCurrency } from '../../../../utils/price'

function OrderItem({ orderItem }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 1, mt: 1, mb: 1, justifyContent: 'space-between' }}>
                <img src={orderItem?.image} style={{ width: 60, height: 60, cursor: 'pointer', borderRadius: 5 }} />
                <Box>
                    <Typography color={'#555555'}>{orderItem?.name}</Typography>
                    <Typography >{formatCurrency(orderItem?.price)}</Typography>
                    <Typography >x{orderItem?.quantity}</Typography>
                </Box>
            </Box>
        </Box>
    )
}
export default OrderItem