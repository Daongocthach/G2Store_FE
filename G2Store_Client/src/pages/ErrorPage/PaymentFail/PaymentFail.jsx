import { useNavigate } from 'react-router-dom'
import { Alert, AlertTitle, Button, Box } from '@mui/material'
import emptyOrder from '../../../assets/img/empty-order.png'

function PaymentFail() {
    const navigate = useNavigate()

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <img src={emptyOrder} alt='thanks'
                style={{ objectFit: 'cover', borderRadius: '5px', height: '200px', with: '200px' }} />
            <Alert severity="error">
                <AlertTitle>Thanh toán thất bại</AlertTitle>
                Sản phẩm đã thay đổi hoặc sai thông tin — <strong>Vui lòng kiểm tra lại!</strong>
                <br />
            </Alert>
            <Button variant='contained' color='warning'
                sx={{ borderRadius: 10, fontWeight: 'bold', ':hover': { bgcolor: 'red' } }}
                onClick={() => { navigate('/genre-detail') }}>
                Xem thêm sản phẩm
            </Button>
        </Box>
    )
}

export default PaymentFail