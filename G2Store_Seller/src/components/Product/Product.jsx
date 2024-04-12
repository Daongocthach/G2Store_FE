import { Box, Typography } from '@mui/material'
import { formatCurrency } from '../../utils/price'

function Product({ product, quantity }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
                <img src={product?.image} alt='omachi' style={{ objectFit: 'cover', height: '70px', width: '70px', borderRadius: 5 }} />
                <Box ml={2} minWidth={'300px'} display={'flex'} flexDirection={'column'}>
                    <Typography variant='h7' fontWeight={'bold'} maxWidth={'280px'}>{product?.name}</Typography>
                    <Typography variant='h7' color={'red'} fontWeight={'bold'}>{formatCurrency(product?.price)}</Typography>
                    <Typography variant='body1' fontWeight={'bold'} color={'gray'} >Số lượng: {quantity}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                <Typography variant='h7' fontWeight={'bold'}>Thành tiền</Typography>
                <Typography variant='h7' color={'red'} fontWeight={'bold'}>{formatCurrency(product?.price * quantity)}</Typography>
            </Box>
        </Box>
    )
}

export default Product