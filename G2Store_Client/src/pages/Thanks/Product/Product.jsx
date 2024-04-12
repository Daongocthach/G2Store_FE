import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { formatCurrency } from '../../../utils/price'

function Product({ product, quantity }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4 }}>
            <img src={product?.image} alt='omachi'
                style={{ objectFit: 'cover', borderRadius: '5px', height: '70px', with: '70px' }} />
            <Box ml={2}>
                <Typography variant='h6' fontWeight={'bold'}>{product?.name}</Typography>
                <Typography variant='h7' >Số lượng: {quantity}</Typography>
                <Typography variant='h6' color={'red'} fontWeight={'bold'}>{formatCurrency(product?.price)}</Typography>
            </Box>
        </Box>
    )
}

export default Product