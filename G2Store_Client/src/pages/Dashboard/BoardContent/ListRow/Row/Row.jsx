import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import ListProduct from './ListProduct/ListProduct'
import productApi from '../../../../../apis/productApi'

function Row({ category }) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        if (category.id) {
            productApi.getProductsByCategoryId(category.id)
                .then(response => {
                    setProducts(response.data)
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }, [])

    return (
        <Box height={products.length > 0 ? 'fit-content' : 0} overflow={'hidden'}>
            {products.length > 0 && <Typography variant={'h6'} sx={{ mt: 2, ml: 10, mb: 2, fontWeight: 'bold' }}>
                {category?.name}
            </Typography>}
            <Box sx={{ borderRadius: '6px', width: 'fit-content' }}>
                <ListProduct products={products} />
            </Box>
        </Box >
    )
}

export default Row