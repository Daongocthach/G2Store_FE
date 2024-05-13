import { useNavigate } from 'react-router-dom'
import { Button, Box, Alert, AlertTitle } from '@mui/material'
import emptyOrder from '../../../assets/img/empty-order.png'

function ProductNotExist() {
    const navigate = useNavigate()

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <img src={emptyOrder} alt='thanks'
                style={{ objectFit: 'cover', borderRadius: '5px', height: '200px', with: '200px' }} />
            <Alert severity="error">
                <AlertTitle>Sản phẩm không còn tồn tại</AlertTitle>
                Sản phẩm vừa chọn không còn tồn tại — <strong>Vui lòng chọn sản phẩm khác!</strong>
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

export default ProductNotExist