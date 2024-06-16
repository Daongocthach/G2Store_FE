import { Grid, Box, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import productApi from '../../../apis/productApi'
import CardProduct from '../../../components/Product/CardProduct'

function RelativeProducts({ category }) {
    const navigate = useNavigate()
    const [products, setProducts] = useState()

    useEffect(() => {
        productApi.getProductsByCategoryId(category?.category_id, 0, 16)
            .then((response) => setProducts(response?.content))
            .catch((error) => console.log(error))
    }, [])
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }} >
                <Typography variant='body1' sx={{ width: 5, bgcolor: '#007fff', color: '#007fff' }}>|</Typography>
                <Typography variant='h6' color={'#444444'}>Sản phẩm liên quan</Typography>
            </Box>
            <Grid container spacing={1} maxWidth='lg' >
                {Array.isArray(products) && products.map((product, index) => (
                    <Grid key={index} item xs={6} sm={6} md={3} lg={2} >
                        <CardProduct product={product} isShort={true} />
                    </Grid>
                ))}
            </Grid>
            <Button onClick={() => navigate('/genre-detail', { state: { category: category } })} variant="contained" color="warning" sx={{ fontWeight: 'bold', mt: 2, width: '30%' }} >
                Xem thêm
            </Button>
        </Box>
    )
}

export default RelativeProducts
