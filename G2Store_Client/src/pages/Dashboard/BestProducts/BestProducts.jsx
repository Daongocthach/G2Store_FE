import { Grid, Typography, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import productApi from '../../../apis/productApi'
import Product from '../../../components/Product/Product'

function BestProducts() {
    const [products, setProducts] = useState()
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(8)

    useEffect(() => {
        productApi.getProducts(page, size)
            .then((response) => setProducts(response?.content))
            .catch((error) => console.log(error))
    }, [])
    return (
        <Box>
            <Typography variant='h6' fontWeight={500} marginY={2} color={'#444444'}>Sản phẩm nổi bật</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Grid container spacing={1} maxWidth='lg' sx={{ alignItems: 'center', justifyContent: 'center' }} >
                    {Array.isArray(products) && products.map((product, index) => (
                        <Grid key={index} item xs={6} sm={6} md={4} lg={3} >
                            <Product product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>


    )
}

export default BestProducts
