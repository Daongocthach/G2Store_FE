import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../../utils/price'

function Product({ product }) {
    const navigate = useNavigate()
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4 }}>
            <img src={product?.images} alt='omachi'
                style={{ objectFit: 'cover', borderRadius: '5px', height: '90px', with: '90px' }}
                onClick={() => { navigate('/product-detail', { state: product }) }} />
            <Box ml={2}>
                <Typography variant='h6' fontWeight={500} color={'#444444'}>{product?.name}</Typography>
                <Box sx={{ display: 'flex', alignItems:'center', gap: 3 }}>
                    <Typography variant='subtitle1' color={'#444444'} fontWeight={550}>{formatCurrency(product?.price)}</Typography>
                    <Typography variant='body1' color={'#444444'} fontWeight={550} >x{product?.quantity}</Typography>
                </Box>
                <Typography variant='h6' color={'#cb1c22'} fontWeight={550} >{formatCurrency(product?.sub_total)}</Typography>
            </Box>
        </Box>
    )
}

export default Product