import { useNavigate, useLocation } from 'react-router-dom'
import { Container, Typography, Button, Box } from '@mui/material'
import thanksImage from '../../assets/img/thanks.gif'

function Thanks() {
    const navigate = useNavigate()
    const location = useLocation()
    const quantity = location.state

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <img src={thanksImage} alt='thanks'
                style={{ objectFit: 'cover', borderRadius: '5px', height: '400px', with: '400px' }} />
            <Typography variant="h5" fontWeight={'bold'} color={'#444444'}> Cảm ơn bạn đã mua sản phẩm</Typography>
            <Typography variant='h6' color={'#444444'} >Cùng khám phá hàng ngàn sản phẩm tại G2Store nhé!</Typography>
            <Button variant=''
                sx={{ bgcolor: '#CD3333', borderRadius: 10, color: 'white', fontWeight: 'bold', ':hover': { bgcolor: 'red' } }}
                onClick={() => { navigate('/genre-detail') }}>
                Xem thêm sản phẩm
            </Button>


        </Box>
    )
}

export default Thanks