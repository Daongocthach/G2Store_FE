import { Grid, Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import productApi from '../../../apis/productApi'
import CardProduct from '../../../components/Product/CardProduct'
import EmptyData from '../../../components/EmptyData/EmptyData'

function BestProducts() {
    const navigate = useNavigate()
    const [products, setProducts] = useState()

    useEffect(() => {
        productApi.getProducts(0, 16)
            .then((response) => setProducts(response?.content))
            .catch((error) => console.log(error))
    }, [])
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
            <Grid container spacing={1} maxWidth='lg' >
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product, index) => (
                        <Grid key={index} item xs={6} sm={6} md={3} lg={2}>
                            <CardProduct product={product} isShort={true} />
                        </Grid>
                    ))
                ) : (
                    <EmptyData content="Không có sản phẩm nào được tìm thấy!" />
                )}
            </Grid>
            <Button onClick={() => navigate('/genre-detail')} variant="contained" color="warning" sx={{ fontWeight: 'bold', mt: 2, width: '50%' }} >
                Xem thêm
            </Button>
        </Box>
    )
}

export default BestProducts
