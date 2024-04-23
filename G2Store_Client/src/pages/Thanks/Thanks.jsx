import { useNavigate, useLocation } from 'react-router-dom'
import { Container, Grid, Typography, Button } from '@mui/material'
import thanksImage from '../../assets/img/thanks.gif'

function Thanks() {
    const navigate = useNavigate()
    const location = useLocation()
    const quantity = location.state

    return (
        <Container maxWidth='lg' >
            <Grid container spacing={3} mt={2} minHeight={'63vh'}>
                <Grid item xs={12} sm={12} md={12} lg={6} >
                    <Typography variant="body1" mb={2}>Trang chủ / Thanks</Typography>
                    <Typography variant="h5" fontWeight={'bold'}>Bạn đã mua {quantity} sản phẩm</Typography>
                    <Typography variant='h6' >Cùng khám phá hàng ngàn sản phẩm tại G2Store nhé!</Typography>
                    <Button
                        sx={{ bgcolor: '#CD3333', borderRadius: 10, color: 'white', fontWeight: 'bold', ':hover': { bgcolor: 'red' } }} 
                        onClick={() => {navigate('/')}}>
                            Về trang chủ
                    </Button>
                </Grid>

                <img src={thanksImage} alt='thanks'
                    style={{ objectFit: 'cover', borderRadius: '5px', height: '400px', with: '400px' }} />
            </Grid>
        </Container>
    )
}

export default Thanks