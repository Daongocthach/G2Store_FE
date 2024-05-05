import { useNavigate } from 'react-router-dom'
import { Typography, Button, Box } from '@mui/material'
import emptyOrder from '../../assets/img/empty-order.png'

function OrderFail() {
    const navigate = useNavigate()

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <img src={emptyOrder} alt='thanks'
                style={{ objectFit: 'cover', borderRadius: '5px', height: '400px', with: '400px' }} />
            <Typography variant="h5" fontWeight={'bold'} color={'#444444'}>Đặt hàng thất bại!</Typography>
            <Typography variant='h6' color={'#444444'} >Vui lòng thực hiện lại!</Typography>
            <Button variant='contained' color='error'
                sx={{ borderRadius: 10, fontWeight: 'bold', ':hover': { bgcolor: 'red' } }}
                onClick={() => { navigate('/genre-detail') }}>
                Xem thêm sản phẩm
            </Button>


        </Box>
    )
}

export default OrderFail