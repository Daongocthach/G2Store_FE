import { Box, Typography, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { formatCurrency } from '../../../utils/price'

function Product({ product, quantity }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4 }}>
            <img src={product?.image} alt='omachi'
                style={{ objectFit: 'cover', borderRadius: '5px', height: '150px', with: '150px' }} />
            <Box ml={2}>
                <Typography variant='h6' fontWeight={'bold'}>{product?.name}</Typography>
                <Typography variant='h6' color={'red'} fontWeight={'bold'}>{formatCurrency(product?.price)}</Typography>
                <Typography variant='body1' fontWeight={'bold'} color={'gray'} >Số lượng: {quantity}</Typography>
            </Box>
        </Box>
    )
}

export default Product