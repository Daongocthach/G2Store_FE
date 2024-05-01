import { Grid, Typography, Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import productApi from '../../../apis/productApi'
import CardProduct from '../../../components/Product/CardProduct'

function BestProducts() {
    const navigate = useNavigate()
    const [products, setProducts] = useState()

    useEffect(() => {
        productApi.getProducts(0, 16)
            .then((response) => setProducts(response?.content))
            .catch((error) => console.log(error))
    }, [])
    return (
        <Box>
            <Typography variant='h6' fontWeight={500} marginY={2} color={'#444444'}>Sản phẩm nổi bật</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Grid container spacing={1} maxWidth='lg' >
                    {Array.isArray(products) && products.map((product, index) => (
                        <Grid key={index} item xs={6} sm={6} md={3} lg={3} >
                            <CardProduct product={product} />
                        </Grid>
                    ))}
                </Grid>
                <Button onClick={() => navigate('/genre-detail')} variant="contained" color="warning" sx={{ fontWeight:'bold', mt: 2, width: '50%' }} >
                    Xem thêm
                </Button>
            </Box>
        </Box>


    )
}

export default BestProducts
